import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { activeOrders } from '@/lib/data';

const dataDirectory = path.resolve(
  process.env.ADDIS_EATS_DATA_DIR || path.join(process.cwd(), '.addis-eats')
);
const ordersFile = path.join(dataDirectory, 'orders.json');
const writeQueueKey = Symbol.for('addis-eats.orders.write-queue');

async function readOrders() {
  await mkdir(dataDirectory, { recursive: true });

  try {
    const contents = await readFile(ordersFile, 'utf8');
    const orders = JSON.parse(contents);
    if (!Array.isArray(orders)) {
      throw new TypeError('The Addis Eats order store must contain a JSON array.');
    }
    return orders;
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;

    try {
      await writeFile(ordersFile, JSON.stringify(activeOrders, null, 2), {
        encoding: 'utf8',
        flag: 'wx',
      });
    } catch (writeError) {
      if (writeError.code !== 'EEXIST') throw writeError;
    }

    const contents = await readFile(ordersFile, 'utf8');
    const orders = JSON.parse(contents);
    if (!Array.isArray(orders)) {
      throw new TypeError('The Addis Eats order store must contain a JSON array.');
    }
    return orders;
  }
}

async function writeOrders(orders) {
  const temporaryFile = path.join(
    dataDirectory,
    `orders.${process.pid}.${randomUUID()}.tmp`
  );

  try {
    await writeFile(temporaryFile, JSON.stringify(orders, null, 2), 'utf8');
    await rename(temporaryFile, ordersFile);
  } catch (error) {
    await unlink(temporaryFile).catch(() => {});
    throw error;
  }
}

function withWriteLock(operation) {
  const previous = globalThis[writeQueueKey] ?? Promise.resolve();
  const current = previous.then(operation);
  globalThis[writeQueueKey] = current.then(
    () => undefined,
    () => undefined
  );
  return current;
}

export async function listOrdersForUser(userId) {
  const orders = await readOrders();
  return orders
    .filter((order) => String(order.userId) === String(userId))
    .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt));
}

export async function listAllOrders() {
  const orders = await readOrders();
  return orders.sort(
    (left, right) => new Date(right.createdAt) - new Date(left.createdAt)
  );
}

export async function getOrderById(orderId) {
  const orders = await readOrders();
  return orders.find((order) => String(order.id) === String(orderId)) ?? null;
}

export async function createOrder(order) {
  return withWriteLock(async () => {
    const orders = await readOrders();
    orders.unshift(order);
    await writeOrders(orders);
    return order;
  });
}

export async function cancelOrderForUser(orderId, userId) {
  return withWriteLock(async () => {
    const orders = await readOrders();
    const order = orders.find((item) => String(item.id) === String(orderId));

    if (!order) return { success: false, error: 'Order not found.' };
    if (String(order.userId) !== String(userId)) {
      return {
        success: false,
        error: 'You do not have permission to cancel this order.',
      };
    }
    if (order.status !== 'PENDING') {
      return {
        success: false,
        error: 'Only orders that have not started preparation can be cancelled.',
      };
    }

    order.status = 'CANCELLED';
    await writeOrders(orders);
    return { success: true };
  });
}

const NEXT_ORDER_STATUS = {
  PENDING: 'PREPARING',
  PREPARING: 'ON_THE_WAY',
  ON_THE_WAY: 'DELIVERED',
};

export async function advanceOrderStatusForStaff(orderId) {
  return withWriteLock(async () => {
    const orders = await readOrders();
    const order = orders.find((item) => String(item.id) === String(orderId));

    if (!order) return { success: false, error: 'Order not found.' };

    const nextStatus = NEXT_ORDER_STATUS[order.status];
    if (!nextStatus) {
      return {
        success: false,
        error: 'This order cannot advance to another status.',
      };
    }

    order.status = nextStatus;
    await writeOrders(orders);
    return { success: true, status: nextStatus };
  });
}