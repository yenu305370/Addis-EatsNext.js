'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { login } from '@/actions/auth';

const initialState = { error: '' };

export default function SignInForm({ nextUrl, showDemoCredentials }) {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-orange-50/40 p-6">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-orange-100 bg-white p-8 shadow-[0_24px_80px_rgba(124,45,18,0.1)]">
        <div className="space-y-1.5 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-600 text-2xl font-black text-white shadow-md">
            AE
          </div>
          <h1 className="pt-2 text-2xl font-black tracking-tight text-slate-900">
            Welcome Back
          </h1>
          <p className="text-xs font-medium text-slate-500">
            Sign in to track orders and manage your Addis Eats account
          </p>
        </div>

        {state?.error && (
          <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs font-semibold text-rose-700">
            {state.error}
          </p>
        )}

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="next" value={nextUrl} />
          <div className="space-y-1">
            <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="name@example.com"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="mt-2 w-full rounded-xl bg-orange-600 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-orange-700 disabled:opacity-50"
          >
            {pending ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {showDemoCredentials && (
          <div className="space-y-2 rounded-xl bg-orange-50 p-3 text-xs leading-5 text-orange-900">
            <p>
              Demo customer: <strong>user@example.com</strong> · password:{' '}
              <strong>password123</strong>
            </p>
            <p>
              Demo staff: <strong>staff@example.com</strong> · password:{' '}
              <strong>password123</strong>
            </p>
          </div>
        )}

        <div className="border-t border-slate-100 pt-4 text-center text-xs text-slate-500">
          Need an account?{' '}
          <Link href="/menu" className="font-bold text-orange-700 transition-colors hover:text-orange-800">
            Browse the menu
          </Link>
        </div>
      </div>
    </main>
  );
}
