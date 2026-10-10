# Performance and Sharing

## Images

- Dish photos and the Doro Wat hero use local assets under `public/images`; the app does not depend on a third-party image host at runtime.
- Menu images use `next/image`, which generates responsive AVIF/WebP variants where supported.
- `components/DishCard.jsx` supplies a responsive `sizes` hint based on the menu layout, including the sidebar and grid breakpoints. This lets the browser request a candidate closer to the rendered card width instead of assuming a full-width image.
- The hero and the first two menu images are prioritized. Other menu images remain eligible for lazy loading.
- Replacing an oversized original with a smaller source is still useful even when using `next/image`: optimization reduces delivered dimensions and format, while a smaller source reduces build/processing and storage costs.

## Fonts

The site uses Manrope through `next/font/google` in `app/layout.jsx`. Next.js serves the generated font files with the app, avoiding a runtime request to Google Fonts and enabling font-display optimization.

## Metadata and shared links

The root layout provides Open Graph and Twitter card metadata and uses the local Doro Wat photo for the share image. In production, configure `NEXT_PUBLIC_SITE_URL` as the public HTTPS origin so canonical and social image URLs are absolute and correct. Development metadata derives its host from the incoming request.

Private order-detail pages are marked `noindex`; personalized order API responses use `Cache-Control: private, no-store`.

## Measurement

These are implementation choices, not measured performance results. No Lighthouse score, Core Web Vitals value, or fixed load-time improvement is claimed here. Measure a production deployment on representative devices and network conditions before setting or reporting performance targets. Check image requests at multiple viewport widths and DPRs, and verify metadata with a link-preview debugger after deployment.
