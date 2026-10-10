'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { cancelOrder } from '@/actions/orders';
import { useToast } from '@/components/ToastProvider';

export default function CancelOrderButton({ orderId }) {
  const router = useRouter();
  const notify = useToast();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const handleCancel = () => {
    if (!window.confirm(`Cancel order ${orderId}? This cannot be undone.`)) {
      return;
    }

    setError('');
    startTransition(async () => {
      try {
        const result = await cancelOrder(orderId);
        if (!result.success) {
          setError(result.error);
          return;
        }

        notify(`Order ${orderId} was cancelled.`);
        router.refresh();
      } catch {
        setError('We could not cancel this order. Please try again.');
      }
    });
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleCancel}
        disabled={pending}
        className="rounded-xl border border-rose-200 px-4 py-2.5 text-xs font-bold text-rose-700 transition hover:bg-rose-50 disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? 'Cancelling…' : 'Cancel order'}
      </button>
      {error && (
        <p role="alert" className="max-w-56 text-right text-xs text-rose-700">
          {error}
        </p>
      )}
    </div>
  );
}
