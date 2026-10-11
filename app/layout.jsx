import { Geist } from "next/font/google";
import { siteUrl } from "@/lib/site";
import { getSession } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import ToastProvider from "@/components/ToastProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Addis Eats | Authentic Ethiopian Dining",
    template: "%s | Addis Eats",
  },
  description:
    "Authentic Ethiopian dining delivered fresh in Addis Ababa. Experience slow-simmered Doro Wat, colorful fasting favorites, and warm Ethiopian hospitality.",
  applicationName: "Addis Eats",
  keywords: [
    "Addis Eats",
    "Ethiopian Food",
    "Addis Ababa",
    "Doro Wat",
    "Ethiopian Dining",
    "Food Delivery",
  ],
  authors: [{ name: "Addis Eats Team" }],
  creator: "Addis Eats",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Addis Eats",
    title: "Addis Eats | Authentic Ethiopian Dining",
    description:
      "Authentic Ethiopian food, made for sharing. Slow-simmered Doro Wat to colorful fasting favorites, delivered fresh in Addis Ababa.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Addis Eats | Authentic Ethiopian Dining",
    description:
      "Authentic Ethiopian food, made for sharing. Delivered fresh in Addis Ababa.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <ToastProvider>
          <Navbar session={session} />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
