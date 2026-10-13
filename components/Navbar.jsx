'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/actions/auth';
import { useCartStore } from '@/lib/cartStore';
import { useHydrated } from '@/lib/hooks/useHydrated';

const baseLinks = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'Track order', href: '/track' },
  { name: 'My orders', href: '/orders' },
];

export default function Navbar({ session }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartHydrated = useHydrated();
  const pathname = usePathname();
  const storedCartCount = useCartStore((state) => state.getTotalCount());
  const cartCount = cartHydrated ? storedCartCount : 0;
  const navLinks = [
    ...baseLinks,
    ...(session?.role === 'staff' ? [{ name: 'Kitchen', href: '/kitchen' }] : []),
  ];

  const isActive = (href) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-[#eadfd1]/80 bg-[#fbf8f2]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.75rem] max-w-[88rem] items-center justify-between px-4 sm:px-6 md:px-8">
        <Link href="/" aria-label="Addis Eats home" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-[0.9rem] bg-orange-600 font-sans text-lg font-black tracking-tight text-white shadow-sm transition group-hover:-rotate-3 group-hover:bg-orange-700">A<span className="text-orange-100">E</span></span>
          <span className="flex flex-col">
            <span className="text-sm font-black tracking-[0.15em] text-orange-700">ADDIS EATS</span>
            <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-stone-500">An Ethiopian table</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? 'page' : undefined} className={`rounded-full px-4 py-2.5 text-xs font-bold transition ${isActive(link.href) ? 'bg-[#efe5d8] text-[#321c13]' : 'text-stone-600 hover:bg-[#f3ede4] hover:text-[#321c13]'}`}>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {session && <span className="max-w-32 truncate text-xs font-semibold text-stone-500">Hi, {session.name.split(' ')[0]}</span>}
          {session ? (
            <form action={logout}>
              <button type="submit" className="rounded-full px-3 py-2 text-xs font-bold text-stone-500 transition hover:text-orange-800">Sign out</button>
            </form>
          ) : (
            <Link href="/signin" className="rounded-full px-3 py-2 text-xs font-bold text-stone-600 transition hover:text-orange-800">Sign in</Link>
          )}
          <Link href="/cart" aria-label={`Cart, ${cartCount} items`} className="group inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-3 text-xs font-extrabold text-white shadow-sm transition hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700">
            <span>Cart</span><span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/15 px-1.5 text-[10px]">{cartCount}</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/cart" aria-label={`Cart, ${cartCount} items`} className="inline-flex h-10 items-center gap-2 rounded-full bg-orange-600 px-3 text-xs font-bold text-white transition hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700">
            Cart <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/15 px-1">{cartCount}</span>
          </Link>
          <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e8dccd] text-lg text-[#321c13] transition hover:bg-[#f2e9dd]">
            {mobileMenuOpen ? '×' : '☰'}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="border-t border-[#eadfd1] bg-[#fbf8f2] px-4 pb-5 pt-3 shadow-xl lg:hidden sm:px-6">
          <nav aria-label="Mobile navigation" className="mx-auto flex max-w-[88rem] flex-col gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} aria-current={isActive(link.href) ? 'page' : undefined} className={`rounded-xl px-4 py-3 text-sm font-bold transition ${isActive(link.href) ? 'bg-[#efe5d8] text-[#321c13]' : 'text-stone-600 hover:bg-[#f3ede4]'}`}>
                {link.name}
              </Link>
            ))}
            {session ? (
              <div className="mt-2 flex items-center justify-between border-t border-[#eadfd1] px-4 pt-4">
                <span className="text-xs font-semibold text-stone-500">Signed in as {session.name}</span>
                <form action={logout}><button type="submit" className="text-xs font-bold text-orange-800">Sign out</button></form>
              </div>
            ) : (
              <Link href="/signin" className="mt-2 rounded-xl border border-[#eadfd1] px-4 py-3 text-sm font-bold text-[#321c13]">Sign in</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
