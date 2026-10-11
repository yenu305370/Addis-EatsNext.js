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
  const accounts = [];
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const customerEmail = process.env.ADDIS_CUSTOMER_EMAIL ||
    (isDevelopment ? DEMO_CREDENTIALS.customer.email : '');
  const customerPassword = process.env.ADDIS_CUSTOMER_PASSWORD ||
    (isDevelopment ? DEMO_CREDENTIALS.customer.password : '');
  const staffEmail = process.env.ADDIS_STAFF_EMAIL ||
    (isDevelopment ? DEMO_CREDENTIALS.staff.email : '');
  const staffPassword = process.env.ADDIS_STAFF_PASSWORD ||
    (isDevelopment ? DEMO_CREDENTIALS.staff.password : '');

  if (customerEmail && customerPassword) {
    accounts.push({
      email: customerEmail.trim().toLowerCase(),
      password: customerPassword,
      id: 'usr_123',
      name: 'Demo Customer',
      role: 'customer',
    });
  }

  if (staffEmail && staffPassword) {
    accounts.push({
      email: staffEmail.trim().toLowerCase(),
      password: staffPassword,
      id: 'usr_456',
      name: 'Demo Staff',
      role: 'staff',
    });
  }

  // Keep the sample accounts available for the educational demo deployment.
  accounts.push(
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
    }
  );

  return accounts;
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
