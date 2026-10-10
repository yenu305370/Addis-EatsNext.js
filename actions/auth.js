'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSessionToken, destroySessionCookie } from '@/lib/auth';

// Standard demo credentials available as guaranteed fallbacks
const DEMO_CREDENTIALS = {
  customer: {
    email: 'user@example.com',
    password: 'password123',
  },
  staff: {
    email: 'staff@example.com',
    password: 'password123',
  },
};

function getAccounts() {
  const customerEmail = (
    process.env.ADDIS_CUSTOMER_EMAIL || DEMO_CREDENTIALS.customer.email
  ).trim().toLowerCase();
  const customerPassword =
    process.env.ADDIS_CUSTOMER_PASSWORD || DEMO_CREDENTIALS.customer.password;

  const staffEmail = (
    process.env.ADDIS_STAFF_EMAIL || DEMO_CREDENTIALS.staff.email
  ).trim().toLowerCase();
  const staffPassword =
    process.env.ADDIS_STAFF_PASSWORD || DEMO_CREDENTIALS.staff.password;

  return [
    {
      email: customerEmail,
      password: customerPassword,
      id: 'usr_123',
      name: 'Demo Customer',
      role: 'customer',
    },
    {
      email: staffEmail,
      password: staffPassword,
      id: 'usr_456',
      name: 'Demo Staff',
      role: 'staff',
    },
    // Also keep the literal demo accounts active as fallbacks even if custom envs are set
    {
      email: DEMO_CREDENTIALS.customer.email,
      password: DEMO_CREDENTIALS.customer.password,
      id: 'usr_123',
      name: 'Demo Customer',
      role: 'customer',
    },
    {
      email: DEMO_CREDENTIALS.staff.email,
      password: DEMO_CREDENTIALS.staff.password,
      id: 'usr_456',
      name: 'Demo Staff',
      role: 'staff',
    },
  ];
}
function safeRedirectPath(value) {
  if (typeof value !== 'string') return '/';
  try {
    const destination = new URL(value, 'https://addis-eats.local');
    if (
      destination.origin !== 'https://addis-eats.local' ||
      !value.startsWith('/') ||
      value.startsWith('//')
    ) {
      return '/';
    }
    return `${destination.pathname}${destination.search}${destination.hash}`;
  } catch {
    return '/';
  }
}

export async function login(_previousState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email.trim() ||
    !password
  ) {
    return { error: 'Email and password are required.' };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const accounts = getAccounts();

  const user = accounts.find(
    (account) =>
      account.email === normalizedEmail && account.password === password
  );

  if (!user) {
    return { error: 'Invalid email or password.' };
  }

  const cookieStore = await cookies();
  cookieStore.set('session_token', createSessionToken(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect(safeRedirectPath(formData.get('next')));
}

export async function logout() {
  await destroySessionCookie();
  redirect('/signin');
}