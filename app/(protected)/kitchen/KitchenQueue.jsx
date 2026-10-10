'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { advanceOrderStatus } from '@/actions/orders';
import { useToast } from '@/components/ToastProvider';

const NEXT_STEP = {
  PENDING: { status: 'PREPARING', label: 'Start preparing' },
  PREPARING: { status: 'ON_THE_WAY', label: 'Mark on the way' },
  ON_THE_WAY: { status: 'DELIVERED', label: 'Mark delivered' },
};

export default function KitchenQueue({ orders }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const notify = useToast();

  const handleAdvance = (orderId) => {
    startTransition(async () => {
      try {
        const result = await advanceOrderStatus(orderId);
        if (!result.success) {
          notify(result.error);
          return;
        }

        notify(`Order ${orderId} is now ${result.status.replaceAll('_', ' ').toLowerCase()}.`);
        router.refresh();
      } catch {
        notify('The order status could not be updated. Please try again.');
      }
    });
  };

  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-orange-200 bg-white p-8 text-center text-sm text-slate-500">
          There are no active orders in the kitchen queue.
        </p>
      ) : (
        orders.map((order) => {
          const nextStep = NEXT_STEP[order.status];

          return (
            <article
              key={order.id}
              className="flex flex-col gap-4 rounded-2xl border border-orange-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="font-bold text-slate-900">
                  {order.id} <span className="text-slate-400">·</span> {order.customerName}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {order.items.map((item) => `${item.quantity} × ${item.name}`).join(', ')}
                </p>
                <span className="mt-3 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                  {order.status.replaceAll('_', ' ')}
                </span>
              </div>

              {nextStep && (
                <button
                  type="button"
                  onClick={() => handleAdvance(order.id)}
                  disabled={isPending}
                  className="shrink-0 rounded-xl bg-orange-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-orange-700 disabled:cursor-wait disabled:opacity-60"
                >
                  {isPending ? 'Updating…' : nextStep.label}
                </button>
              )}
            </article>
          );
        })
      )}
    </div>
  );
}
