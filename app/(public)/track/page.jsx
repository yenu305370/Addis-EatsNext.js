import { getOrderById } from '@/lib/db/orders';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import TrackStatus from './TrackStatus';

export const metadata = {
  title: 'Track an Order',
  description: 'Track an Addis Eats order linked to your account.',
  robots: { index: false, follow: false },
};

export default async function TrackOrderPage({ searchParams }) {
  const session = await getSession();
  if (!session || session.role !== 'customer') redirect('/signin?next=/track');
  const params = await searchParams;
  const orderId = typeof params?.id === 'string' ? params.id.trim() : '';
  let order = null;

  if (orderId && orderId.length <= 50) {
    const candidate = await getOrderById(orderId);
    if (candidate && String(candidate.userId) === session.id) {
      order = candidate;
    }
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6 md:p-10">
      <header>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-700">Addis Eats delivery</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Track your order</h1>
        <p className="mt-2 text-sm text-slate-600">Enter an order ID linked to your account.</p>
      </header>

      <form action="/track" className="space-y-4 rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
        <label className="block text-sm font-bold text-slate-800">
          Order ID
          <input required name="id" defaultValue={orderId} placeholder="ORD-XXXXXXXX" autoComplete="off" className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
        </label>
        <button type="submit" className="rounded-xl bg-orange-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-700">Find order</button>
      </form>

      {order ? (
        <TrackStatus orderId={order.id} initialStatus={order.status} />
      ) : orderId ? (
        <p role="status" className="rounded-2xl border border-orange-200 bg-orange-50 p-4 text-sm text-orange-900">We couldn’t find that order in your account. Check the ID and try again.</p>
      ) : null}
    </main>
  );
}
