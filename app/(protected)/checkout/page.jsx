import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import CheckoutForm from './CheckoutForm';

export const metadata = {
  title: 'Checkout',
  description: 'Complete your food order.',
};

export default async function CheckoutPage() {
  const session = await getSession();
  if (!session) redirect('/signin?next=/checkout');

  return (
    <main className="mx-auto max-w-6xl p-6 md:p-10">
      <div className="border-b border-orange-100 pb-5">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-700">
          Addis Eats · Secure checkout
        </p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Checkout</h1>
        <p className="mt-2 text-sm text-slate-600">
          Review your dishes and confirm where you would like them delivered.
        </p>
      </div>
      <CheckoutForm customerName={session.name} />
    </main>
  );
}