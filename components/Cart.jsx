'use client';

import { formatETB } from '@/lib/formatters';

export default function Cart({ items, onRemove, onCheckout }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="p-6 border rounded-2xl bg-white text-center shadow-sm">
        <p className="text-slate-400 text-sm">Your cart is currently empty.</p>
      </div>
    );
  }

  return (
    <div className="border border-slate-200/80 rounded-2xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-bold mb-4 text-slate-900">Your Current Order</h2>
      <ul className="divide-y divide-slate-100 mb-4">
        {items.map((item) => (
          <li key={item.id} className="py-3 flex justify-between items-center text-xs">
            <div>
              <p className="font-bold text-slate-800">{item.name}</p>
              <p className="text-slate-400">
                {item.quantity} x {formatETB(item.price)}
              </p>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="text-rose-500 hover:text-rose-700 font-bold"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="border-t border-slate-100 pt-4 flex justify-between font-bold text-slate-900 text-base mb-4">
        <span>Total Amount:</span>
        <span>{formatETB(total)}</span>
      </div>
      <button
        onClick={onCheckout}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-colors text-xs"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
