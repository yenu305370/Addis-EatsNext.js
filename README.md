# Addis Eats

Addis Eats is an Ethiopian food ordering demo built with Next.js App Router. Customers can browse dishes, manage a cart, check out, view their own order history, and follow order status. Staff can manage incoming orders through a role-protected kitchen queue.

This README is organized around the project presentation and assessment criteria:

| Assessment area | Weight |
| --- | ---: |
| Authentication and authorization | 30% |
| Data fetching: server and client | 20% |
| Measured performance improvement | 20% |
| Metadata, previews, and discovery | 15% |
| Documentation and walkthrough | 15% |

## 1. Authentication and authorization — 30%

- The demo has customer and staff roles. Local demo credentials are `user@example.com` / `password123` and `staff@example.com` / `password123`.
- Sign-in creates a signed, seven-day `HttpOnly` session cookie. Production requires a `SESSION_SECRET` of at least 32 characters and configured account credentials.
- Orders, checkout, and the kitchen queue require authentication. Server layouts, pages, and actions validate the session instead of relying only on client navigation.
- Customers can see only orders owned by their account. Order details and the order status API enforce ownership.
- Staff-only kitchen actions are checked on the server. Customer order placement validates submitted dish IDs and quantities and calculates prices from the server-side catalog.
- After authentication, the app returns visitors to the protected page they originally requested.

See [AUTH.md](./AUTH.md) for the account model, session details, access-control boundaries, and production limitations. These hardcoded demo accounts are for demonstration only, not production identity management.

## 2. Data fetching: server and client — 20%

- **Server-rendered data:** protected pages read the authenticated session and retrieve the current user's orders from the order store.
- **Server actions:** sign-in, sign-out, checkout, order cancellation, and staff status updates run on the server and validate authorization and input there.
- **Client state:** menu filters, favorites, and the persistent cart are managed in the browser. Checkout submits item IDs and quantities; the server revalidates them against the catalog.
- **Order tracking:** the signed-in customer page polls the protected status endpoint every five seconds. Updates are periodic polling, not push-based real time.
- **Storage:** menu catalog data is in `lib/data.js`; orders are stored in a local JSON file by `lib/db/orders.js`. The file store is intended for this demo and a single persistent Node.js instance, not a horizontally scaled production deployment.

See [DATA.md](./DATA.md) for the order lifecycle and storage boundaries.

## 3. Measured performance improvement — 20%

The project includes performance-oriented implementation choices, but a measured speed improvement must be established with a before-and-after run; do not claim a specific time or score without collecting that evidence.

- Local images avoid third-party image requests at runtime, and menu images use `next/image` with responsive sizing.
- The app uses `next/font` so fonts are served with the application rather than fetched by the browser from a font provider at runtime.
- Menu filters and cart interactions use client-side state to update the interface without a full-page navigation.

For the presentation, run a production build and measure the deployed production site using Lighthouse or PageSpeed Insights. Record the URL, device profile, date, and before/after results (including LCP and other reported Core Web Vitals). Compare the same pages under comparable network and device settings. A successful `npm run build` is a build check, not a performance measurement.

See [PERF.md](./PERF.md) for current implementation notes and measurement guidance.

## 4. Metadata, previews, and discovery — 15%

- The root layout defines the site title, description, keywords, Open Graph metadata, and a large Twitter card.
- The social preview uses the local `public/og-image.jpg` asset.
- `app/robots.js` and `app/sitemap.js` provide crawler discovery endpoints.
- Private order-detail pages are marked `noindex`; personalized status responses use `Cache-Control: private, no-store`.
- Set `NEXT_PUBLIC_SITE_URL` to the public HTTPS origin for production so generated metadata uses correct absolute URLs.

After deployment, inspect the page source and test the public URL with link-preview debuggers. Social platforms may cache previews, so use their refresh/debug tools after changing metadata or the image.

## 5. Documentation and walkthrough — 15%

### Local setup

Requirements: Node.js 18 or later and npm.

```powershell
cd "d:\Addis-eatsNext.js\Day_45\addis-eats-capstone"
npm install
npm run dev
```

Open `http://localhost:3000`. Before presenting, verify the app with:

```powershell
npm run build
npm start
```

### Suggested presentation walkthrough

1. Open the homepage and introduce Addis Eats.
2. Browse `/menu`, filter dishes, and add an item to the cart.
3. Open `/cart` and adjust the item quantity.
4. Visit `/checkout` while signed out to demonstrate the sign-in redirect and return destination.
5. Sign in as the customer demo account and place an order with delivery details.
6. Open `/orders` and the new order's tracking page. Explain ownership checks and the five-second polling interval.
7. Sign out, sign in with the staff demo account, open `/kitchen`, and advance an order status.
8. Show the Open Graph metadata and preview image. Present measured performance results only if a before-and-after test has been recorded.

### Main project folders

- `app/` — App Router routes, layouts, pages, and API endpoints.
- `components/` — shared UI components such as the Navbar, dish cards, and notifications.
- `actions/` — server actions for authentication and order operations.
- `lib/` — session utilities, catalog data, client stores, and order persistence.
- `public/` — local images and other static assets.

### Verification commands

```powershell
npm run build
```

The build verifies compilation and static analysis; it does not replace end-to-end authentication, authorization, or performance testing.
