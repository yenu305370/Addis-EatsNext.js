'use server';

import { requireAuth, requireRole } from '@/lib/auth';
import { dishes } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { randomUUID } from 'node:crypto';
import {
  advanceOrderStatusForStaff,
  cancelOrderForUser,
  createOrder,
} from '@/lib/db/orders';

export async function placeOrder(_previousState, formData) {
  const session = await requireAuth();
  const address = formData.get('deliveryAddress');
  const phone = formData.get('phone');
  const rawItems = formData.get('items');

  if (
    typeof address !== 'string' ||
    address.trim().length < 8 ||
    address.trim().length > 300
  ) {
    return { error: 'Enter a delivery address between 8 and 300 characters.' };
  }

  if (
    typeof phone !== 'string' ||
    phone.trim().length < 7 ||
    phone.trim().length > 30
  ) {
    return { error: 'Enter a valid contact phone number.' };
  }

  if (typeof rawItems !== 'string') {
    return { error: 'Your cart is empty. Add dishes before placing an order.' };
  }

  let requestedItems;
  try {
    requestedItems = JSON.parse(rawItems);
  } catch {
    return { error: 'Your cart could not be read. Refresh and try again.' };
  }

  if (
    !Array.isArray(requestedItems) ||
    requestedItems.length === 0 ||
    requestedItems.length > 50
  ) {
    return { error: 'Your cart is empty or contains too many items.' };
  }

  const orderItems = [];
  for (const requestedItem of requestedItems) {
    if (
      !requestedItem ||
      typeof requestedItem.id !== 'string' ||
      !Number.isInteger(requestedItem.quantity) ||
      requestedItem.quantity < 1 ||
      requestedItem.quantity > 20
    ) {
      return { error: 'Your cart contains an invalid item or quantity.' };
    }

    const dish = dishes.find((availableDish) => availableDish.id === requestedItem.id);
    if (!dish) {
      return { error: 'A dish in your cart is no longer available.' };
    }

    orderItems.push({
      dishId: dish.id,
      name: dish.name,
      quantity: requestedItem.quantity,
      price: dish.price,
    });
  }

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const orderId = `ORD-${randomUUID().slice(0, 8).toUpperCase()}`;

  await createOrder({
    id: orderId,
    userId: session.id,
    customerName: session.name,
    total,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    deliveryAddress: address.trim(),
    phone: phone.trim(),
    items: orderItems,
  });

  revalidatePath('/orders');
  revalidatePath(`/orders/${orderId}`);
  return { orderId };
}

export async function cancelOrder(orderId) {
  const session = await requireAuth();

  if (typeof orderId !== 'string' || !orderId) {
    return { success: false, error: 'Invalid order ID.' };
  }

  const result = await cancelOrderForUser(orderId, session.id);
  if (!result.success) return result;

  revalidatePath('/orders');
  revalidatePath(`/orders/${orderId}`);
  return { success: true };
}

export async function advanceOrderStatus(orderId) {
  await requireRole('staff');

  if (typeof orderId !== 'string' || !orderId) {
    return { success: false, error: 'Invalid order ID.' };
  }

  const result = await advanceOrderStatusForStaff(orderId);
  if (!result.success) return result;

  revalidatePath('/kitchen');
  revalidatePath('/orders');
  revalidatePath(`/orders/${orderId}`);
  return result;
}
