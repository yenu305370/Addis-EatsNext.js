import { getSession } from '@/lib/auth';
import { getOrderById } from '@/lib/db/orders';
import { NextResponse } from 'next/server';

export async function GET(_request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401, headers: { 'Cache-Control': 'private, no-store' } }
    );
  }

  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) {
    return NextResponse.json(
      { error: 'Order not found' },
      { status: 404, headers: { 'Cache-Control': 'private, no-store' } }
    );
  }

  if (String(order.userId) !== String(session.id)) {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403, headers: { 'Cache-Control': 'private, no-store' } }
    );
  }

  return NextResponse.json(
    { id: order.id, status: order.status },
    { headers: { 'Cache-Control': 'private, no-store' } }
  );
}
