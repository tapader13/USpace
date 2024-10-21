import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  let order;
  if (email) {
    order = await db.order.findMany({
      where: {
        email,
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
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  if (!order) {
    return NextResponse.json(
      { success: false, message: 'No Orders found.' },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, data: order });
}
