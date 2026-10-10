import { getSession } from '@/lib/auth';
import { listAllOrders } from '@/lib/db/orders';
import { redirect } from 'next/navigation';
import KitchenQueue from './KitchenQueue';

export const metadata = {
  title: 'Kitchen Dashboard',
  description: 'Staff order management dashboard.',
};

export default async function KitchenPage() {
  const session = await getSession();
  if (!session) redirect('/signin?next=/kitchen');

  if (session.role !== 'staff') redirect('/orders');

  const orders = (await listAllOrders()).filter(
    (order) => !['CANCELLED', 'DELIVERED'].includes(order.status)
  );

  return (
    <main className="max-w-7xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Kitchen Preparation Queue</h1>
      <p className="text-slate-500 text-xs mb-6">Active orders, newest first.</p>

      <KitchenQueue orders={orders} />
    </main>
  );
}