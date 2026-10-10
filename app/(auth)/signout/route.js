import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const requestOrigin = new URL(request.url).origin;
  if (request.headers.get('origin') !== requestOrigin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const cookieStore = await cookies();
  cookieStore.delete('session_token');
  return NextResponse.redirect(new URL('/signin', request.url), 303);
}
