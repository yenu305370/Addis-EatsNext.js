'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/lib/cartStore';

export default function Navbar({ session }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartHydrated, setCartHydrated] = useState(false);
  const pathname = usePathname();
  const storedCartCount = useCartStore((state) => state.getTotalCount());
  const cartCount = cartHydrated ? storedCartCount : 0;

  useEffect(() => {
    setCartHydrated(true);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'My Orders', href: '/orders' },
    { name: 'Checkout', href: '/checkout' },
    ...(session?.role === 'staff' ? [{ name: 'Kitchen', href: '/kitchen' }] : []),
  ];

  // Matches exact path for root '/', and prefix for nested routes like '/orders/1'
  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-10 h-10 rounded-xl bg-orange-600 text-white font-black text-xl flex items-center justify-center shadow-md shadow-orange-900/20 group-hover:scale-105 transition-transform">
            AE
          </span>
          <div className="flex flex-col">
            <span className="font-black text-orange-800 text-lg tracking-tight group-hover:text-orange-600 transition-colors">
              ADDIS EATS
            </span>
            <span className="text-[10px] font-bold text-orange-700 uppercase tracking-widest -mt-1">
              Luxury Dining
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  active
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-orange-800 hover:bg-orange-50'
                }`}
              >
                {link.name}
                {link.href === '/checkout' && (
                  <span aria-label={`${cartCount} items in cart`} className="ml-1.5 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">
                    🛒 {cartCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Account actions */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <>
              <span className="max-w-36 truncate text-xs font-semibold text-slate-600">
                Hi, {session.name}
              </span>
              <form action="/signout" method="post">
                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-orange-600 active:scale-95"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/signin"
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-orange-600 active:scale-95"
            >
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? (
            <span className="font-bold text-lg leading-none">✕</span>
          ) : (
            <span className="font-bold text-lg leading-none">☰</span>
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                    active
                      ? 'bg-orange-600 text-white'
                      : 'text-slate-700 hover:bg-orange-50 hover:text-orange-800'
                  }`}
                >
                  {link.name}
                  {link.href === '/checkout' && (
                    <span aria-label={`${cartCount} items in cart`} className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-[10px]">
                      🛒 {cartCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
            {session ? (
              <>
                <p className="px-4 py-2 text-xs font-semibold text-slate-600">
                  Signed in as {session.name}
                </p>
                <form action="/signout" method="post">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-slate-900 py-3 text-xs font-bold text-white"
                  >
                    Sign out
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full rounded-xl bg-slate-900 py-3 text-center text-xs font-bold text-white"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}