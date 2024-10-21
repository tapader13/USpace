'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import useCartStore from '@/store/useCartStore';
import Confetti from 'react-confetti';
const ThankYou = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id') || '';
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { clearCart } = useCartStore();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/orders/${orderId}`
        );
        clearCart();
        setData(response.data.data);
        setShowConfetti(true);
      } catch (err) {
        setError('Error fetching payment status. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchPaymentStatus();
    }
  }, [orderId]);
  setTimeout(() => {
    setShowConfetti(false);
  }, 10000);
  if (loading) {
    return (
      <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='h-8 w-8 animate-spin text-zinc-500' />
          <h3 className='font-semibold text-xl'>Loading your order...</h3>
          <p>This won't take long.</p>
        </div>
      </div>
    );
  }
  console.log(data, 'data');
  if (error) {
    return (
      <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='h-8 w-8 animate-spin text-zinc-500' />
          <h3 className='font-semibold text-xl'>{error}</h3>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className='w-full mt-24 flex justify-center'>
        <h3 className='font-semibold text-xl'>Order not found.</h3>
      </div>
    );
  }

  const { amount, shippingAddress, billingAddress, products } = data;

  return (
    <div className='bg-white'>
      {showConfetti && (
        <Confetti
          height={window.innerHeight}
          width={window.innerWidth}
          colors={['#f44336', '#9c27b0', '#3f51b5']}
          wind={0.1}
          gravity={0.2}
        />
      )}
      <div className='mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
        <div className='max-w-xl'>
          <p className='text-base font-medium text-primary'>Thank you!</p>
          <h1 className='mt-2 text-4xl font-bold tracking-tight sm:text-5xl'>
            Your order is on the way!
          </h1>
          <p className='mt-2 text-base text-zinc-500'>
            We've received your order and are now processing it.
          </p>

          <div className='mt-12 text-sm font-medium'>
            <p className='text-zinc-900'>Order number</p>
            <p className='mt-2 text-zinc-500'>{orderId}</p>
          </div>
        </div>

        <div className='mt-10 border-t border-zinc-200'>
          <div className='mt-10'>
            <h4 className='font-semibold text-zinc-900'>
              You made a great choice!
            </h4>
            <p className='mt-2 text-sm text-zinc-600'>
              We at CaseCobra believe that a phone case doesn't only need to
              look good, but also last you for the years to come. We offer a
              5-year print guarantee: If your case isn't of the highest quality,
              we'll replace it for free.
            </p>
          </div>
        </div>

        <div className='mt-10'>
          <h3 className='font-semibold text-zinc-900'>
            Products in your order
          </h3>
          <div className='mt-4 grid gap-6'>
            {products.map((product, index) => (
              <div
                key={index}
                className='flex items-center gap-4 p-4 border rounded-lg'
              >
                <div
                  className='h-32 w-32 rounded-lg bg-gray-900/5 ring-1 ring-inset ring-gray-900/10'
                  style={{
                    backgroundImage: `url(${product.product.image[0]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {!product.product.image[0] && (
                    <p className='text-zinc-500'>Image not available</p>
                  )}
                </div>
                <div>
                  <p className='font-medium text-zinc-900'>{product.name}</p>
                  <p className='text-sm text-zinc-600'>
                    Rental Date: {product.rentalDate}, Time: {product.startTime}{' '}
                    - {product.endTime}
                  </p>
                  <p className='text-sm text-zinc-600'>
                    Quantity: {product.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-2 gap-x-6 py-10 text-sm'>
          <div>
            <p className='font-medium text-gray-900'>Shipping address</p>
            <div className='mt-2 text-zinc-700'>
              <address className='not-italic'>
                <span className='block'>{shippingAddress?.name}</span>
                <span className='block'>{shippingAddress?.street}</span>
                <span className='block'>
                  {shippingAddress?.postalCode} {shippingAddress?.city}
                </span>
              </address>
            </div>
          </div>
          <div>
            <p className='font-medium text-gray-900'>Billing address</p>
            <div className='mt-2 text-zinc-700'>
              <address className='not-italic'>
                <span className='block'>{billingAddress?.name}</span>
                <span className='block'>{billingAddress?.street}</span>
                <span className='block'>
                  {billingAddress?.postalCode} {billingAddress?.city}
                </span>
              </address>
            </div>
          </div>
        </div>

        <div className='space-y-6 border-t border-zinc-200 pt-10 text-sm'>
          <div className='flex justify-between'>
            <p className='font-medium text-zinc-900'>Subtotal</p>
            <p className='text-zinc-700'>{amount}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-medium text-zinc-900'>Payment status</p>
            <p className='text-zinc-700'>{data?.isPaid}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-medium text-zinc-900'>Total</p>
            <p className='text-zinc-700'>{amount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
