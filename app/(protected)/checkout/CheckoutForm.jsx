'use client';

import { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { placeOrder } from '@/actions/orders';
import { useCartStore } from '@/lib/cartStore';

const initialState = { error: '', orderId: '' };

function formatPrice(amount) {
  return `${amount.toLocaleString()} ETB`;
}

export default function CheckoutForm({ customerName }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(placeOrder, initialState);
  const [hydrated, setHydrated] = useState(false);
  const items = useCartStore((cart) => cart.items);
  const updateQuantity = useCartStore((cart) => cart.updateQuantity);
  const removeItem = useCartStore((cart) => cart.removeItem);
  const clearCart = useCartStore((cart) => cart.clearCart);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!state.orderId) return;
    clearCart();
    router.replace(`/orders/${state.orderId}`);
  }, [clearCart, router, state.orderId]);

  if (!hydrated) {
    return (
      <div
        aria-label="Loading your cart"
        className="mt-8 h-48 animate-pulse rounded-3xl bg-orange-50"
      />
    );
  }

  if (items.length === 0) {
    return (
      <div className="mt-8 rounded-3xl border border-dashed border-orange-200 bg-white p-10 text-center">
        <p className="text-lg font-extrabold text-slate-900">Your bag is empty</p>
        <p className="mt-2 text-sm text-slate-600">
          Add a few Ethiopian favorites before you check out.
        </p>
        <Link
          href="/menu"
          className="mt-5 inline-flex rounded-xl bg-orange-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-700"
        >
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-8 grid gap-6 lg:grid-cols-[1fr_20rem]">
      <input
        type="hidden"
        name="items"
        value={JSON.stringify(items.map(({ id, quantity }) => ({ id, quantity })))}
      />

      <div className="space-y-6">
        <section className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900">Delivery details</h2>
          <p className="mt-1 text-sm text-slate-500">
            Ordering as {customerName}
          </p>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
              Delivery address
              <textarea
                name="deliveryAddress"
                required
                minLength={8}
                maxLength={300}
                rows={3}
                autoComplete="street-address"
                placeholder="Street, neighborhood, building, and delivery notes"
                className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
              Contact phone
              <input
                type="tel"
                name="phone"
                required
                minLength={7}
                maxLength={30}
                autoComplete="tel"
                placeholder="+251 9..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </label>
          </div>
        </section>

        <section className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900">Your order</h2>
            <Link
              href="/menu"
              className="text-sm font-bold text-orange-700 hover:text-orange-900"
            >
              Add more
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-slate-100">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
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
      </div>

      <aside className="h-fit rounded-3xl border border-orange-100 bg-white p-6 shadow-sm lg:sticky lg:top-28">
        <h2 className="text-lg font-extrabold text-slate-900">Order summary</h2>
        <div className="mt-5 flex justify-between text-sm text-slate-600">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="mt-3 flex justify-between text-sm text-slate-600">
          <span>Delivery</span>
          <span className="font-semibold text-emerald-700">Calculated at delivery</span>
        </div>
        <div className="mt-5 flex justify-between border-t border-slate-100 pt-4 font-extrabold text-slate-900">
          <span>Food total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {state.error && (
          <p
            role="alert"
            className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-700"
          >
            {state.error}
          </p>
        )}
        <button
          type="submit"
          disabled={pending || items.length === 0}
          className="mt-6 w-full rounded-xl bg-orange-600 px-5 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-orange-700 disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? 'Placing your order…' : 'Place order'}
        </button>
        <p className="mt-3 text-center text-xs leading-5 text-slate-500">
          Payment is collected on delivery. Your order total is recalculated securely.
        </p>
      </aside>
    </form>
  );
}
