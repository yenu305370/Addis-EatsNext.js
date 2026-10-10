import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import CancelOrderButton from '@/components/CancelOrderButton';
import { listOrdersForUser } from '@/lib/db/orders';

export const metadata = {
  title: 'My Orders',
  description: 'View your Addis Eats order history and track active deliveries.',
};

function getOrderStatusBadgeStyle(status) {
  switch (status) {
    case 'PENDING':
      return 'bg-amber-100 text-amber-800';
    case 'PREPARING':
      return 'bg-orange-100 text-orange-800';
    case 'ON_THE_WAY':
      return 'bg-sky-100 text-sky-800';
    case 'DELIVERED':
      return 'bg-emerald-100 text-emerald-800';
    case 'CANCELLED':
      return 'bg-rose-100 text-rose-800';
    default:
      return 'bg-slate-100 text-slate-700';
  }
}

export default async function OrdersPage() {
  const session = await getSession();
  if (!session) {
    redirect('/signin?next=/orders');
  }

  const userOrders = await listOrdersForUser(session.id);

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-6 md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-orange-100 pb-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-700">
            Your Addis Eats account
          </p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">My Orders</h1>
          <p className="mt-1 text-sm text-slate-500">
            Welcome back, {session.name}. View your order history and follow deliveries.
          </p>
        </div>
        <span className="rounded-full bg-orange-100 px-3 py-1.5 text-xs font-bold text-orange-900">
          {userOrders.length} {userOrders.length === 1 ? 'Order' : 'Orders'}
        </span>
      </div>

      {userOrders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-orange-200 bg-white p-12 text-center">
          <span aria-hidden="true" className="text-4xl">🍽️</span>
          <h2 className="mt-4 text-lg font-extrabold text-slate-900">
            Your order history is waiting
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
            Your orders will appear here after checkout. Browse the menu to find something you love.
          </p>
          <Link
            href="/menu"
            className="mt-5 inline-flex rounded-xl bg-orange-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-700"
          >
            Explore the menu
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {userOrders.map((order) => (
            <article
              key={order.id}
              className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm transition hover:border-orange-300 hover:shadow-md md:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-extrabold text-slate-900">Order #{order.id}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
               <span className={`rounded-full px-3 py-1 text-xs font-bold ${getOrderStatusBadgeStyle(order.status)}`}>
  {order.status.replaceAll('_', ' ')}
</span>
              </div>

              <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                {order.items.map((item, index) => (
                  <li
                    key={`${item.dishId ?? item.name}-${index}`}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <span className="text-slate-600">
                      {item.quantity} × {item.name}
                    </span>
                    <span className="shrink-0 font-semibold text-slate-800">
                      {(item.price * item.quantity).toLocaleString()} ETB
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                <p className="text-sm font-extrabold text-slate-900">
                  Total: {order.total.toLocaleString()} ETB
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {order.status === 'PENDING' && (
                    <CancelOrderButton orderId={order.id} />
                  )}
                  <Link
                    href={`/orders/${order.id}`}
                    className="inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-orange-600"
                  >
                    Track this order <span aria-hidden="true" className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}