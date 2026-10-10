'use client';

import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/components/ToastProvider';

const STATUS_STEPS = ['PENDING', 'PREPARING', 'ON_THE_WAY', 'DELIVERED'];

function getStatusBadgeStyle(currentStatus) {
  if (currentStatus === 'CANCELLED') {
    return 'border-rose-200 bg-rose-100 text-rose-800';
  }
  if (currentStatus === 'DELIVERED') {
    return 'border-slate-200 bg-slate-100 text-slate-700';
  }
  return 'animate-status-pulse border-emerald-200 bg-emerald-100 text-emerald-800';
}

export default function OrderStatus({ initialStatus, orderId }) {
  const [status, setStatus] = useState(initialStatus);
  const [pollError, setPollError] = useState(false);
  const lastNotifiedStatus = useRef(initialStatus);
  const notify = useToast();
  const isTerminalStatus = status === 'DELIVERED' || status === 'CANCELLED';

  useEffect(() => {
    if (isTerminalStatus) return;

    let active = true;
    let interval;

    const pollStatus = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`, {
          cache: 'no-store',
        });
        if (!res.ok) {
          throw new Error(`Order status request failed (${res.status}).`);
        }
        const data = await res.json();
        if (active && data.status) {
          if (data.status !== lastNotifiedStatus.current) {
            lastNotifiedStatus.current = data.status;
            notify(
              `Order ${orderId} status updated to ${data.status.replaceAll('_', ' ').toLowerCase()}.`
            );
          }
          setStatus(data.status);
          setPollError(false);
          if (data.status === 'DELIVERED' || data.status === 'CANCELLED') {
            clearInterval(interval);
          }
        }
      } catch {
        if (active) setPollError(true);
      }
    };

    void pollStatus();
    interval = setInterval(() => {
      void pollStatus();
    }, 5000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [orderId, notify, isTerminalStatus]);

  const currentStepIndex = STATUS_STEPS.indexOf(status);

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900">Live Order Status</h3>
        <span
          aria-live="polite"
          className={`rounded-full border px-3 py-1 text-xs font-extrabold ${getStatusBadgeStyle(status)}`}
        >
          ● {status}
        </span>
      </div>
{status === 'CANCELLED' ? (
        <output className="block rounded-xl bg-rose-50 p-4 text-sm font-semibold text-rose-800">
          This order has been cancelled.
        </output>
      ) : (
        <>
          {pollError && (
            <output className="mb-4 block text-xs font-medium text-amber-700">
              Live updates are temporarily unavailable. Retrying automatically.
            </output>
          )}

          <div className="relative grid grid-cols-4 gap-2 text-center">
            {STATUS_STEPS.map((step, idx) => {
              const isCompleted = idx <= currentStepIndex;
              return (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                      isCompleted
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'border border-slate-200 bg-slate-100 text-slate-400'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span
                    className={`text-xs ${
                      isCompleted ? 'font-bold text-slate-900' : 'font-medium text-slate-400'
                    }`}
                  >
                    {step.replaceAll('_', ' ')}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}