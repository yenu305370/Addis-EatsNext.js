'use client';

import { useEffect, useState } from 'react';

const STATUS_LABELS = {
  PENDING: 'Received',
  PREPARING: 'Being prepared',
  ON_THE_WAY: 'On the way',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

export default function TrackStatus({ orderId, customerName, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    if (status === 'DELIVERED' || status === 'CANCELLED') return;

    let active = true;
    const refreshStatus = async () => {
      try {
        const response = await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId, customerName }),
          cache: 'no-store',
        });
        if (!response.ok) throw new Error('Status unavailable');
        const result = await response.json();
        if (active && result.status) {
          setStatus(result.status);
          setUnavailable(false);
        }
      } catch {
        if (active) setUnavailable(true);
      }
    };

    void refreshStatus();
    const interval = setInterval(() => void refreshStatus(), 10000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [orderId, customerName, status]);

  return (
    <section aria-live="polite" className="rounded-3xl border border-orange-200 bg-orange-50 p-6">
      <p className="text-xs font-black uppercase tracking-[0.15em] text-orange-800">Order {orderId}</p>
      <h2 className="mt-2 text-2xl font-extrabold text-slate-900">{STATUS_LABELS[status] ?? 'Status updated'}</h2>
      <p className="mt-2 text-sm font-semibold text-slate-700">Customer: {customerName}</p>
      <p className="mt-2 text-sm text-slate-600">Order status refreshes automatically.</p>
      {unavailable && <p className="mt-2 text-sm text-orange-800">Live updates are temporarily unavailable. Retrying automatically.</p>}
    </section>
  );
}
