import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const order = await db.order.findUnique({
    where: {
      id: params.id,
    },
    include: {
      products: {
        include: {
          product: true,
        },
      },
      shippingAddress: true,
      billingAddress: true,
    },
  });

  if (!order) {
    return NextResponse.json(
      { success: false, message: 'Order not found.' },
      { status: 404 }
    );
  }
  console.log(order, 'order');
  return NextResponse.json({ success: true, data: order });
}
