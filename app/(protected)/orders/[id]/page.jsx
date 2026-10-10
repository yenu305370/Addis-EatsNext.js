import { getSession } from '@/lib/auth';
import { getOrderById } from '@/lib/db/orders';
import OrderStatus from './OrderStatus';
import { redirect, notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Order ${id}`,
    robots: { index: false, follow: false },
  };
}

export default async function OrderDetailPage({ params }) {
  const { id } = await params;

  const session = await getSession();
  if (!session) redirect(`/signin?next=/orders/${id}`);

  const order = await getOrderById(id);
  if (!order) notFound();

  if (String(order.userId) !== String(session.id)) {
    redirect('/orders');
  }

  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6 md:p-10">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-700">
          Order tracking
        </p>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">
          Order {order.id}
        </h1>
      </div>
      <OrderStatus initialStatus={order.status} orderId={order.id} />
      <section className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
        <h2 className="text-base font-extrabold text-slate-900">Order details</h2>
        <ul className="mt-4 divide-y divide-slate-100">
          {order.items.map((item, index) => (
            <li
              key={`${item.dishId ?? item.name}-${index}`}
              className="flex justify-between gap-4 py-3 text-sm first:pt-0 last:pb-0"
            >
              <span className="text-slate-600">
                {item.quantity} × {item.name}
              </span>
              <span className="font-semibold text-slate-900">
                {(item.price * item.quantity).toLocaleString()} ETB
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t border-slate-100 pt-4 text-right font-extrabold text-slate-900">
          Total: {order.total.toLocaleString()} ETB
        </p>
        {order.deliveryAddress && (
          <p className="mt-3 text-sm text-slate-600">
            <span className="font-bold text-slate-800">Delivering to: </span>
            {order.deliveryAddress}
          </p>
        )}
      </section>
    </main>
  );
}