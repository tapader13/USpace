import axios from 'axios';
import React from 'react';
import { auth } from '../../../auth';
import Link from 'next/link';

const getOrders = async (email: string) => {
  const response = await axios.get(
    `http://localhost:3000/api/orders?email=${email}`
  );
  return response.data.data;
};

const OrdersPage = async () => {
  const session = await auth();
  let orders = [];

  if (session?.user?.email) {
    orders = await getOrders(session.user.email);
  }

  return (
    <div className='w-10/12 mx-auto py-16'>
      <h1 className='text-3xl font-bold mb-8'>Your Orders</h1>
      {orders.length === 0 ? (
        <div className='text-center'>
          <p className='text-lg'>No orders found.</p>
          <Link href={'/login'}>Login now!</Link>
        </div>
      ) : (
        <div className='grid gap-6'>
          {orders.map((order, index) => (
            <div
              key={index}
              className='border border-gray-200 rounded-lg p-6 bg-white shadow-sm'
            >
              <div className='flex justify-between items-center mb-4'>
                <div>
                  <p className='text-sm text-gray-500'>Order ID: {order.id}</p>
                  <p className='text-lg font-medium text-gray-900'>
                    Total Amount: ${order.amount}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.isPaid === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {order.isPaid === 'paid' ? 'Paid' : 'Pending'}
                </span>
              </div>
              <div className='mt-4'>
                <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                  Products
                </h3>
                <ul className='space-y-2'>
                  {order.products.map((product, idx) => (
                    <li
                      key={idx}
                      className='flex items-center gap-4 p-4 border rounded-lg'
                    >
                      <div
                        className='h-24 w-24 rounded-lg bg-gray-100'
                        style={{
                          backgroundImage: `url(${product.product.image[0]})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      <div>
                        <p className='font-medium text-gray-900'>
                          {product.product.name}
                        </p>
                        <p className='text-sm text-gray-600'>
                          Quantity: {product.quantity}
                        </p>
                        <p className='text-sm text-gray-600'>
                          Rental Date: {product.rentalDate} [{product.startTime}{' '}
                          -&gt;
                          {product.endTime}]
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='mt-6 text-sm text-gray-600'>
                <p>
                  <span className='font-medium text-gray-800'>Ordered on:</span>{' '}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
