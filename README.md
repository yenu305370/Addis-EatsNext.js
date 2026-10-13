# Addis Eats

Addis Eats is an Ethiopian food ordering demo built with Next.js App Router. Customers can browse dishes, manage a cart, check out, view their own order history, and follow order status. Staff can manage incoming orders through a role-protected kitchen queue.

This README is organized around the project's main features and presentation walkthrough.

## 1. Authentication and authorization

- The demo has customer and staff roles. Local demo credentials are `user@example.com` / `password123` and `staff@example.com` / `password123`.
- Sign-in creates a signed, seven-day `HttpOnly` session cookie. Production requires a `SESSION_SECRET` of at least 32 characters and configured account credentials.
- Orders, checkout, and the kitchen queue require authentication. Server layouts, pages, and actions validate the session instead of relying only on client navigation.
- Customers can see only orders owned by their account. Order details and the order status API enforce ownership.
- Staff-only kitchen actions are checked on the server. Customer order placement validates submitted dish IDs and quantities and calculates prices from the server-side catalog.
- After authentication, the app returns visitors to the protected page they originally requested.

See [AUTH.md](./AUTH.md) for the account model, session details, access-control boundaries, and production limitations. These hardcoded demo accounts are for demonstration only, not production identity management.

## 2. Data fetching: server and client

- **Server-rendered data:** protected pages read the authenticated session and retrieve the current user's orders from the order store.
- **Server actions:** sign-in, sign-out, checkout, order cancellation, and staff status updates run on the server and validate authorization and input there.
- **Client state:** menu filters, favorites, and the persistent cart are managed in the browser. Checkout submits item IDs and quantities; the server revalidates them against the catalog.
- **Order tracking:** the signed-in customer page polls the protected status endpoint every five seconds. Updates are periodic polling, not push-based real time.
- **Storage:** menu catalog data is in `lib/data.js`; orders are stored in a local JSON file by `lib/db/orders.js`. The file store is intended for this demo and a single persistent Node.js instance, not a horizontally scaled production deployment.

See [DATA.md](./DATA.md) for the order lifecycle and storage boundaries.

## 3. Performance

The project includes performance-oriented implementation choices, but a measured speed improvement must be established with a before-and-after run; do not claim a specific time or score without collecting that evidence.

- Local images avoid third-party image requests at runtime, and menu images use `next/image` with responsive sizing.
- The app uses `next/font` so fonts are served with the application rather than fetched by the browser from a font provider at runtime.
- Menu filters and cart interactions use client-side state to update the interface without a full-page navigation.

For the presentation, run a production build and measure the deployed production site using Lighthouse or PageSpeed Insights. Record the URL, device profile, date, and before/after results (including LCP and other reported Core Web Vitals). Compare the same pages under comparable network and device settings. A successful `npm run build` is a build check, not a performance measurement.

See [PERF.md](./PERF.md) for current implementation notes and measurement guidance.

## 4. Metadata, previews, and discovery

- The root layout defines the site title, description, keywords, Open Graph metadata, and a large Twitter card.
- The social preview features the real Doro Wat photo from `public/images/Special Doro Wat.jpg`. It is composed into the compressed `public/images/addis-eats-whatsapp-preview.jpg` image (1200 × 630) and served by `app/opengraph-image.jsx` for Open Graph and Twitter cards.
- Menu cards and dish details use Next.js `Image` for responsive food photography. Social crawlers receive the ready-to-use JPEG directly from the Open Graph route.
- `app/robots.js` and `app/sitemap.js` provide crawler discovery endpoints.
- Private order-detail pages are marked `noindex`; personalized status responses use `Cache-Control: private, no-store`.
- Set `NEXT_PUBLIC_SITE_URL` to the public HTTPS origin for production so generated metadata uses correct absolute URLs.

For WhatsApp previews, the production site and `/opengraph-image` endpoint must be publicly accessible. A Vercel deployment-specific URL may require login; use the public production domain or adjust the project's Deployment Protection settings. Social platforms may cache previews, so use their refresh/debug tools or share a new URL after changing metadata or the image.

## 5. Strategies and boundaries

### Strategies

- **Enforce trust on the server:** derive the customer or staff identity from the signed session, check order ownership for customer requests, and validate staff actions on the server.
- **Keep prices authoritative:** submit dish IDs and quantities from the cart, then look up current dishes and calculate totals from the server-side menu during checkout.
- **Use the right state location:** keep interactive menu, favorites, and cart state in the browser; render account-specific order data on the server.
- **Make the order lifecycle explicit:** allow customer cancellation only while an order is `PENDING`, and let staff advance orders through the documented status sequence.
- **Keep the demo lightweight:** use local food images, a small catalog, and file-backed order data to make the project easy to run and demonstrate.

### Boundaries and limitations

- This is a capstone demo with fixed customer and staff accounts. It has no public registration, password reset, or password hashing; replace the demo authentication before serving real customers.
- Orders are stored in `.addis-eats/orders.json`. The file store is for a single persistent Node.js instance; it is not durable shared storage for multi-instance or ephemeral deployments such as serverless hosting.
- Checkout records an order for payment on delivery. It does not connect to a payment gateway.
- Order tracking polls the app every five seconds. It does not provide push-based updates or live courier GPS tracking.
- Performance choices are documented, but no performance improvement should be claimed without comparable before-and-after measurements.

## 6. Documentation and walkthrough

### Local setup

Requirements: Node.js 20.9 or later and npm (the version required by this project's Next.js dependency).

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

### Suggested 2-minute presentation

**Opening (15 seconds):** “Addis Eats is a Next.js food-ordering demo for Ethiopian dishes. Customers can order and track food, while staff manage the kitchen queue.”

**Customer journey (50 seconds):**

1. Show Doro Wat on `/menu`, add it to the cart, and briefly show `/cart`.
2. Show the customer’s order in `/orders` or its tracking page.

**Staff journey (25 seconds):**

3. Switch to the staff demo account, open `/kitchen`, and advance an order status.

**Implementation and close (30 seconds):**

4. Explain that order ownership and staff permissions are checked on the server. Close by noting that the demo uses fixed accounts and local JSON order storage; a real service would need production identity and persistent shared storage.

### Demo preparation

- Start the app and sign in once with both demo accounts so you know the credentials and each role's screen.
- Confirm the kitchen queue contains an order before presenting, and be ready to place a fresh order during the demo.
- Local demo credentials are `user@example.com` / `password123` (customer) and `staff@example.com` / `password123` (staff).
- For a deployed presentation, use the public production URL. Check that the site and `/opengraph-image` open without a Vercel login prompt.

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
