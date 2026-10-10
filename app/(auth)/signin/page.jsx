import SignInForm from './SignInForm';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function SignInPage({ searchParams }) {
  const [{ next = '/' }, session] = await Promise.all([
    searchParams,
    getSession(),
  ]);

  if (session) {
    const destination =
      typeof next === 'string' &&
      next.startsWith('/') &&
      !next.startsWith('//')
        ? next
        : '/';
    redirect(destination);
  }

  return (
    <SignInForm
      nextUrl={next}
      showDemoCredentials={process.env.NODE_ENV !== 'production'}
    />
  );
}
