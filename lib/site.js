// lib/site.js
export const siteUrl = (() => {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (rawUrl) {
    return rawUrl.replace(/\/$/, '');
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, '');
  }

  return 'http://localhost:3000';
})();