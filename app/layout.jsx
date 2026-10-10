import { Manrope } from 'next/font/google';
import { headers } from 'next/headers';
import Navbar from '@/components/Navbar';
import ToastProvider from '@/components/ToastProvider';
import { getSession } from '@/lib/auth';
import { siteUrl } from '@/lib/site';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

const siteMetadata = {
  title: {
    default: 'Addis Eats | Authentic Ethiopian Food Delivery',
    template: '%s | Addis Eats',
  },
  description:
    'Discover authentic Ethiopian favorites, from slow-simmered Doro Wat to colorful fasting dishes. Order with Addis Eats and follow your delivery.',
  openGraph: {
    title: 'Addis Eats | Authentic Ethiopian Food, Made for Sharing',
    description:
      'Discover and order beloved Ethiopian dishes, prepared with care and delivered with the warmth of Ethiopian hospitality.',
    url: '/',
    siteName: 'Addis Eats',
    images: [{
      url: '/images/Special%20Doro%20Wat.jpg',
      alt: 'Special Ethiopian Doro Wat served with injera',
      width: 495,
      height: 619,
    }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Addis Eats | Authentic Ethiopian Food, Made for Sharing',
    description:
      'Discover and order Ethiopian classics, signature Doro Wat, and fasting favorites made for sharing.',
    images: [{
      url: '/images/Special%20Doro%20Wat.jpg',
      alt: 'Special Ethiopian Doro Wat served with injera',
    }],
  },
};

export async function generateMetadata() {
  let resolvedSiteUrl = siteUrl;
  if (
    process.env.NODE_ENV !== 'production' &&
    !process.env.NEXT_PUBLIC_SITE_URL &&
    !process.env.VERCEL_URL
  ) {
    const host = (await headers()).get('host');
    if (host) resolvedSiteUrl = `http://${host}`;
  }

  return {
    ...siteMetadata,
    metadataBase: new URL(resolvedSiteUrl),
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f8fafc',
};

export default async function RootLayout({ children }) {
  const session = await getSession();

  return (
    <html lang="en" className={manrope.variable}>
      <body className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 antialiased">
        <ToastProvider>
          <Navbar session={session} />
          <main className="flex-1">{children}</main>
        </ToastProvider>
      </body>
    </html>
  );
}