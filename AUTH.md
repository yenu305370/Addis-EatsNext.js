# Authentication, Accounts, and Access Control

## Account model

This capstone currently uses two configured demo accounts; it does not implement account registration, a user database, password resets, or password hashing.

| Environment | Customer | Staff |
| --- | --- | --- |
| Local development | `user@example.com` / `password123` | `staff@example.com` / `password123` |
| Production | `ADDIS_CUSTOMER_EMAIL` / `ADDIS_CUSTOMER_PASSWORD` | `ADDIS_STAFF_EMAIL` / `ADDIS_STAFF_PASSWORD` |

Production sign-in also requires `SESSION_SECRET`, at least 32 characters long. Do not use the local demo credentials or commit production credentials to source control.

## Session cookie

Sign-in is handled by the server action in `actions/auth.js`. On successful authentication it issues a signed, seven-day `session_token` cookie with:

- `HttpOnly`, so browser JavaScript cannot read the session token.
- `Secure` in production; production must be served over HTTPS.
- `SameSite=Lax` and `Path=/`.
- A seven-day `Max-Age`.

The token contains the account ID, email, name, role, and expiry, signed with HMAC-SHA256. `lib/auth.js` checks the signature and expiry before returning a session. Middleware checks for a cookie on protected paths; protected pages and server actions perform session validation and role/ownership checks.

This is a signed stateless token, not a server-side session record. Signing out deletes the browser cookie, but there is no server-side revocation list for a copied token before its expiry.

## Authorization boundaries

| Surface | Enforcement |
| --- | --- |
| `/orders`, `/checkout`, `/kitchen` | Middleware redirects requests without a session cookie; each page independently validates the signed session. |
| Order history | `listOrdersForUser(session.id)` returns only the signed-in account's orders. |
| `/orders/[id]` and `GET /api/orders/[id]` | Requires a valid session and matching `order.userId`; another account's order is denied. The status API response is `private, no-store`. |
| `/kitchen` and order status transitions | Require a valid staff session. Status changes are restricted to the server-side sequence `PENDING` → `PREPARING` → `ON_THE_WAY` → `DELIVERED`. |
| `placeOrder` | Revalidates the session, validates address, phone, dish IDs, and quantities, and calculates prices from the server menu. |
| `cancelOrder` | Revalidates the session, verifies ownership, and permits cancellation only while `PENDING`. |
| `/signout` | Accepts same-origin POST only and removes the session cookie. |

Redirect destinations after sign-in are restricted to same-origin paths.

## Production requirements

Before using this demo for real customers, replace configured demo accounts with a persistent identity system and properly hashed passwords. Add server-side session revocation/rotation, rate limiting and monitoring for authentication attempts, and a persistent transactional data store. Review CSRF protections if cookie or `SameSite` behavior is changed.
