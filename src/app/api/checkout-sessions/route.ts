import { db } from '@/lib/db';
import { Cart } from '@/store/useCartStore';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia',
});
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, items } = body;
  const itemArrenge = items.map((itm: Cart) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: itm.name,
        images: [itm?.image],
        description: `${itm?.rentalDate} [${itm?.startTime} -> ${itm?.endTime}]`,
      },
      unit_amount:
        itm?.price * 100 * convertIntoNumber(itm.startTime, itm?.endTime),
    },
    quantity: itm.quantity,
  }));
  const amount = items.reduce(
    (total: number, item: Cart) =>
      total +
      item.price *
        item.quantity *
        convertIntoNumber(item.startTime, item.endTime),
    0
  );
  console.log(email, 'amount', amount);

  try {
    const order = await db.order.create({
      data: {
        email: email,
        amount: amount,
      },
    });

    await Promise.all(
      items.map(async (itm: Cart) => {
        await db.orderProduct.create({
          data: {
            orderId: order.id,
            productId: itm.id,
            quantity: itm.quantity,
            rentalDate: itm.rentalDate || '',
            startTime: itm.startTime || '',
            endTime: itm.endTime || '',
          },
        });
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['BB', 'US', 'CA'],
      },
      line_items: itemArrenge,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URl}/success?order_id=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URl}/cart`,
      metadata: {
        order_id: order.id,
        email: email,
      },
    });

    console.log(session.id, 'Stripe session ID');

    return NextResponse.json({
      id: session.id,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      {
        message: 'Failed to create order',
      },
      {
        status: 500,
      }
    );
  }
}
const convertIntoNumber = (
  time1: string | undefined,
  time2: string | undefined
) => {
  if (!time1 || !time2) return 0;

  const convertTo24Hour = (time: string) => {
    const [timePart, period] = time.split(' ');
    const [hour, minute] = timePart.split(':').map(Number);
    let hourNumber = hour;

    if (period.toUpperCase() === 'PM' && hourNumber !== 12) {
      hourNumber += 12;
    } else if (period.toUpperCase() === 'AM' && hourNumber === 12) {
      hourNumber = 0;
    }

    return hourNumber + (minute ? minute / 60 : 0);
  };

  const startHour = convertTo24Hour(time1);
  const endHour = convertTo24Hour(time2);

  let duration = endHour - startHour;

  if (duration < 0) {
    duration += 24;
  }

  return duration;
};
