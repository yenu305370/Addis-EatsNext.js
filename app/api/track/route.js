import { getOrderById } from '@/lib/db/orders';
import { NextResponse } from 'next/server';

export async function POST(request) {
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
  const customerName = typeof body?.customerName === 'string' ? body.customerName.trim() : '';
  if (!orderId || orderId.length > 50 || !customerName || customerName.length > 100) {
    return NextResponse.json(
      { error: 'Order not found' },
      { status: 404, headers: { 'Cache-Control': 'private, no-store' } }
    );
  }

  const order = await getOrderById(orderId);
  if (order?.customerName?.trim().toLocaleLowerCase() !== customerName.toLocaleLowerCase()) {
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
