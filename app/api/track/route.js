import { getOrderById } from '@/lib/db/orders';
import { getSession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const session = await getSession();
  if (!session || session.role !== 'customer') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401, headers: { 'Cache-Control': 'private, no-store' } }
    );
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400, headers: { 'Cache-Control': 'private, no-store' } }
    );
  }

  const orderId = typeof body?.orderId === 'string' ? body.orderId.trim() : '';
  if (!orderId || orderId.length > 50) {
    return NextResponse.json(
      { error: 'Order not found' },
      { status: 404, headers: { 'Cache-Control': 'private, no-store' } }
    );
  }

  const order = await getOrderById(orderId);
  if (!order || String(order.userId) !== session.id) {
    return NextResponse.json(
      { error: 'Order not found' },
      { status: 404, headers: { 'Cache-Control': 'private, no-store' } }
    );
  }

  return NextResponse.json(
    { status: order.status },
    { headers: { 'Cache-Control': 'private, no-store' } }
  );
}
