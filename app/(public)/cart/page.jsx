'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/cartStore';
import { useHydrated } from '@/lib/hooks/useHydrated';

function formatPrice(amount) {
  return `${amount.toLocaleString()} ETB`;
}

export default function CartPage() {
  const hydrated = useHydrated();
  const items = useCartStore((cart) => cart.items);
  const updateQuantity = useCartStore((cart) => cart.updateQuantity);
  const removeItem = useCartStore((cart) => cart.removeItem);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!hydrated) {
    return (
      <main className="mx-auto max-w-5xl p-6 md:p-10">
        <div
          aria-label="Loading your cart"
          className="h-48 animate-pulse rounded-3xl bg-orange-50"
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-6 md:p-10">
      <div className="border-b border-orange-100 pb-5">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-700">
          Addis Eats · Your selection
        </p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Cart</h1>
        <p className="mt-2 text-sm text-slate-600">
          Review your dishes and adjust quantities before checkout.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-orange-200 bg-white p-10 text-center">
          <p className="text-lg font-extrabold text-slate-900">Your cart is empty</p>
          <p className="mt-2 text-sm text-slate-600">
            Browse the menu and add a few Ethiopian favorites.
          </p>
          <Link
            href="/menu"
            className="mt-5 inline-flex rounded-xl bg-orange-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-700"
          >
            Browse the menu
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
          <section className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
            <ul className="divide-y divide-slate-100">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-40 flex-1">
                    <p className="font-bold text-slate-900">{item.name}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {formatPrice(item.price)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label={`Decrease ${item.name} quantity`}
                      className="h-8 w-8 rounded-lg border border-slate-200 font-bold text-slate-700 hover:bg-orange-50"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-bold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label={`Increase ${item.name} quantity`}
                      className="h-8 w-8 rounded-lg border border-slate-200 font-bold text-slate-700 hover:bg-orange-50"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="ml-2 text-xs font-bold text-rose-600 hover:text-rose-800"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="w-full text-right text-sm font-extrabold text-slate-900 sm:w-24">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <aside className="h-fit rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-slate-900">Order summary</h2>
            <div className="mt-5 flex justify-between border-t border-slate-100 pt-4 font-extrabold text-slate-900">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Delivery is calculated at checkout.
            </p>
            <Link
              href="/checkout"
              className="mt-6 inline-flex w-full justify-center rounded-xl bg-orange-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-700"
            >
              Proceed to checkout
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
