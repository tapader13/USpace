'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import useCartStore from '@/store/useCartStore';
// import { useSession } from 'next-auth/react';
import Link from 'next/link';
// import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useXSession } from '@/lib/FactoriesProvider';
const CartPage = () => {
  const { cart, removeFromCart } = useCartStore();
  const session = useXSession();
  const router = useRouter();
  // useEffect(() => {
  //   if (session?.status === 'unauthenticated') {
  //     router.push('/login');
  //   }
  // }, [session.status, router]);
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

  const total = cart.reduce(
    (acc, item) =>
      acc +
      item.price *
        item.quantity *
        convertIntoNumber(item.startTime, item.endTime),
    0
  );
  console.log(session, 'ses');
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISABLE_KEY!
  );
  console.log(session?.session?.user, 'suser');
  const createStripeSession = async () => {
    const stripe = await stripePromise;

    try {
      const user = session?.data?.user || session?.session?.user;
      console.log(user, 'user');
      console.log(session?.user?.name, 'user2');
      if (!user) {
        router.push('/login');
        return null;
      }
      console.log('Creating checkout session with data:', {
        items: cart,
        email: user?.email,
      });

      const checkoutSession = await axios.post(
        'https://space-booking-psi.vercel.app/api/checkout-sessions',
        {
          items: cart,
          email: user?.email,
        }
      );

      console.log('Checkout Session:', checkoutSession.data);

      const result = await stripe?.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });

      if (result?.error) {
        console.log('Stripe Error:', result.error);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };
  return (
    <div>
      <div className='sm:w-10/12 w-[95%] mx-auto'>
        <div className='my-20'>
          <h1 className='text-5xl mb-5 font-bold text-first'>Cart</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href='/'>Home</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link href='/cart'>Cart</Link>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div>
          {cart.length > 0 ? (
            cart.map((item, i) => (
              <div className='relative group' key={i}>
                <div className='w-full grid sm:grid-cols-12 grid-cols-1 gap-2'>
                  <div className='sm:col-span-6 col-span-1 flex sm:items-center sm:gap-10 gap-2'>
                    <div className='sm:hidden block'>
                      <p className='text-sm font-bold text-first'>
                        Name: {item.name}
                      </p>
                    </div>
                    <div>
                      <img
                        className='h-[110px] hidden sm:block rounded-lg w-[100px]'
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                    <div className='hidden sm:block'>
                      <p className='text-sm font-bold text-first'>
                        {item.name}
                      </p>
                      {convertIntoNumber(item.startTime, item.endTime) > 1 && (
                        <>
                          <p className='text-sm text-fourth my-1'>
                            {item.rentalDate} [{item.startTime} -&gt;
                            {item.endTime}]
                          </p>
                          <p className='text-sm text-fourth'>
                            Duration:{' '}
                            {convertIntoNumber(item.startTime, item.endTime)}{' '}
                            Hours
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className='sm:col-span-6 col-span-1 grid sm:grid-cols-2 grid-cols-1 sm:gap-0 gap-2'>
                    <div className='flex sm:justify-end justify-start sm:items-center items-start sm:flex-row flex-col sm:gap-5 gap-5'>
                      <h6 className='text-fourth flex items-center'>
                        <span className='sm:hidden block'>Price: </span>$
                        {item.price}.00
                      </h6>
                      <h6 className='font-bold text-first flex items-center'>
                        <span className='sm:hidden block'>Quantity: </span>
                        {item.quantity}
                      </h6>
                    </div>
                    <div className='flex sm:justify-end justify-start items-center'>
                      <p className='font-bold flex items-center text-first'>
                        <span className='sm:hidden block'>Total Price: </span> $
                        {item.price *
                          item.quantity *
                          convertIntoNumber(item.startTime, item.endTime)}
                        .00
                      </p>
                    </div>
                  </div>
                </div>
                <div className='absolute hidden group-hover:block -top-3 -left-3'>
                  <FaTimes
                    onClick={() => removeFromCart(item)}
                    className='text-second cursor-pointer h-6 w-6 rounded-full bg-first p-1.5'
                  />
                </div>
                <hr className='my-5' />
              </div>
            ))
          ) : (
            <h1 className='text-5xl font-bold text-first'>Cart is empty</h1>
          )}
        </div>
        {cart.length > 0 && (
          <div className='bg-[#FDF8F2] mt-20 py-10 w-full px-5 sm:w-1/2 ml-auto'>
            <h3 className='text-2xl'>Cart totals</h3>
            <hr className='mt-2 mb-5' />
            <div className='flex w-1/2 justify-between'>
              <h6 className='font-bold'>Subtotal </h6>
              <h6>${total}.00</h6>
            </div>
            <hr className='my-2' />
            <div className='flex justify-between w-1/2'>
              <h6 className='font-bold'>Total </h6>
              <h6 className='font-bold'>${total}.00</h6>
            </div>
            <hr className='my-2' />
            <Button
              onClick={createStripeSession}
              className='mt-5 w-full py-2 text-white bg-third'
            >
              Proceed to checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
