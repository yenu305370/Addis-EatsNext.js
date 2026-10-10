
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSessionToken } from '@/lib/auth';

function getAccounts() {
  if (process.env.NODE_ENV === 'production') {
    const accounts = [
      {
        email: process.env.ADDIS_CUSTOMER_EMAIL,
        password: process.env.ADDIS_CUSTOMER_PASSWORD,
        id: 'usr_123',
        name: 'Addis Eats Customer',
        role: 'customer',
      },
      {
        email: process.env.ADDIS_STAFF_EMAIL,
        password: process.env.ADDIS_STAFF_PASSWORD,
        id: 'usr_456',
        name: 'Addis Eats Staff',
        role: 'staff',
      },
    ];
    if (accounts.some((account) => !account.email || !account.password)) {
      throw new Error('Production sign-in requires customer and staff credentials.');
    }
    return accounts;
  }

  return [
    {
      email: 'user@example.com',
      password: 'password123',
      id: 'usr_123',
      name: 'Yenenesh Shaka',
      role: 'customer',
    },
    {
      email: 'staff@example.com',
      password: 'password123',
      id: 'usr_456',
      name: 'Executive Chef',
      role: 'staff',
    },
  ];
}

function safeRedirectPath(value) {
  if (typeof value !== 'string') return '/';
  try {
    const destination = new URL(value, 'http://addis-eats.local');
    if (
      destination.origin !== 'http://addis-eats.local' ||
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
  const user = getAccounts().find(
    (account) =>
      account.email.toLowerCase() === normalizedEmail &&
      account.password === password
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
