// app/signin/page.jsx (or src/app/signin/page.jsx)
import SignInForm from './SignInForm';

export default async function SignInPage({ searchParams }) {
  const { next = '/' } = await searchParams;

  return (
    <SignInForm
      nextUrl={next}
      showDemoCredentials={process.env.NODE_ENV !== 'production'}
      demoCustomerEmail={process.env.ADDIS_CUSTOMER_EMAIL || 'user@example.com'}
      demoCustomerPassword={process.env.ADDIS_CUSTOMER_PASSWORD || 'password123'}
    />
  );
}
