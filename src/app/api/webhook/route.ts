import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { headers } from 'next/headers';
import { sendOrderEmail } from '@/app/mailtrap/email';
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);
export async function POST(req: Request) {
  const payload = await req.text();

  const sig = headers().get('Stripe-Signature');

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(session, 'session');
      const { email, order_id } = session.metadata || {
        email: null,
        order_id: null,
      };
      console.log(email, 'email', order_id, 'order_id');
      if (!email || !order_id) {
        throw new Error('Invalid request metadata');
      }
      const billingAddress = session.customer_details!.address;
      const shippingAddress = session.shipping_details!.address;
      console.log(billingAddress, 'billingAddress');
      console.log(shippingAddress, 'shippingAddress');
      const updatedOrder = await db.order.update({
        where: {
          id: order_id,
        },
        data: {
          isPaid: 'paid',
          shippingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: shippingAddress!.city!,
              country: shippingAddress!.country!,
              postalCode: shippingAddress!.postal_code!,
              street: shippingAddress!.line1!,
              state: shippingAddress!.state,
            },
          },
          billingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: billingAddress!.city!,
              country: billingAddress!.country!,
              postalCode: billingAddress!.postal_code!,
              street: billingAddress!.line1!,
              state: billingAddress!.state,
            },
          },
        },
      });
      const order = await db.order.findUnique({
        where: {
          id: order_id,
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
      console.log(updatedOrder, 'updatedOrder');
      console.log(order, 'order');
      await sendOrderEmail(email!, order);
      return NextResponse.json({
        status: 'sucess',
        event: event.type,
        success: true,
      });
    } else {
      return NextResponse.json({
        status: 'Failed',
        message: 'Event type not handled',
        success: false,
      });
    }
  } catch (error) {
    return NextResponse.json({ status: 'Failed', success: false });
  }
}
