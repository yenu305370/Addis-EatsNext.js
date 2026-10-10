'use client';

import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/components/ToastProvider';

const STATUS_STEPS = ['PENDING', 'PREPARING', 'ON_THE_WAY', 'DELIVERED'];

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
    pollStatus();
    interval = setInterval(pollStatus, 5000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [orderId, notify, isTerminalStatus]);

  const currentStepIndex = STATUS_STEPS.indexOf(status);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-bold text-slate-900">Live Order Status</h3>
        <span
          aria-live="polite"
          className={`rounded-full border px-3 py-1 text-xs font-extrabold ${
            status === 'CANCELLED'
              ? 'border-rose-200 bg-rose-100 text-rose-800'
              : status === 'DELIVERED'
                ? 'border-slate-200 bg-slate-100 text-slate-700'
                : 'animate-status-pulse border-emerald-200 bg-emerald-100 text-emerald-800'
          }`}
        >
          ● {status}
        </span>
      </div>
      {status === 'CANCELLED' ? (
        <p role="status" className="rounded-xl bg-rose-50 p-4 text-sm font-semibold text-rose-800">
          This order has been cancelled.
        </p>
      ) : (
        <>
      {pollError && (
        <p role="status" className="mb-4 text-xs font-medium text-amber-700">
          Live updates are temporarily unavailable. Retrying automatically.
        </p>
      )}

      <div className="grid grid-cols-4 gap-2 text-center relative">
        {STATUS_STEPS.map((step, idx) => {
          const isCompleted = idx <= currentStepIndex;
          return (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-colors ${
                  isCompleted
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}
              >
                {idx + 1}
              </div>
              <span className={`text-xs font-medium ${
                isCompleted ? 'text-slate-900 font-bold' : 'text-slate-400'
              }`}>
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