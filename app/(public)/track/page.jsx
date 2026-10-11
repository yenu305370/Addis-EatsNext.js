import { getOrderById } from '@/lib/db/orders';
import TrackStatus from './TrackStatus';

export const metadata = {
  title: 'Track an Order',
  description: 'Look up your Addis Eats order by order ID and customer name.',
  robots: { index: false, follow: false },
};

export default async function TrackOrderPage({ searchParams }) {
  const params = await searchParams;
  const orderId = typeof params?.id === 'string' ? params.id.trim() : '';
  const customerName = typeof params?.name === 'string' ? params.name.trim() : '';
  let order = null;

  if (orderId && customerName && orderId.length <= 50 && customerName.length <= 100) {
    const candidate = await getOrderById(orderId);
    if (candidate?.customerName?.trim().toLocaleLowerCase() === customerName.toLocaleLowerCase()) {
      order = candidate;
    }
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6 md:p-10">
      <header>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-700">Addis Eats delivery</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Track your order</h1>
        <p className="mt-2 text-sm text-slate-600">Enter the order ID and the customer name used at checkout.</p>
      </header>

      <form action="/track" className="space-y-4 rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
        <label className="block text-sm font-bold text-slate-800">
          Order ID
          <input required name="id" defaultValue={orderId} placeholder="ORD-XXXXXXXX" autoComplete="off" className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
        </label>
        <label className="block text-sm font-bold text-slate-800">
          Customer name
          <input required name="name" defaultValue={customerName} autoComplete="name" className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
        </label>
        <button type="submit" className="rounded-xl bg-orange-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-700">Find order</button>
      </form>

      {order ? (
        <TrackStatus orderId={order.id} customerName={order.customerName} initialStatus={order.status} />
      ) : orderId || customerName ? (
        <p role="status" className="rounded-2xl border border-orange-200 bg-orange-50 p-4 text-sm text-orange-900">We couldn’t find an order with that ID and customer name. Check the details and try again.</p>
      ) : null}
    </main>
  );
}
