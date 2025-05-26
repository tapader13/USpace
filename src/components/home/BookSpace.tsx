import axios from 'axios';
import Link from 'next/link';
import React from 'react';

const getAllSpace = async () => {
  try {
    const response = await axios.get(
      `https://space-booking-psi.vercel.app/api/items`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
const BookSpace = async () => {
  const allSpace: any = await getAllSpace();
  return (
    <div className='sm:w-10/12 w-[95%] mx-auto'>
      <div className='mt-10'>
        <div className='text-center py-10'>
          <h3 className='text-xl uppercase font-bold text-fourth'>
            Be inspired to meet, create, and innovate.
          </h3>
          <h1 className='text-5xl font-bold text-first mt-2'>
            Book a space that suits you
          </h1>
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-4'>
          {allSpace?.map((space: any) => (
            <div className='relative group' key={space.id}>
              <img className='w-full h-[250px]' src={space.image[0]} alt='' />
              <div className='absolute inset-0 bg-black/30 w-full '>
                <Link
                  href={`/product-category/${encodeURI(
                    space.category.trim().replace(/\//g, '20%')
                  )}`}
                >
                  <h1 className='text-[22px] group-hover:scale-105 absolute left-0 bottom-0 transition-all duration-300 cursor-pointer  p-5 font-bold text-second'>
                    {space.category}
                  </h1>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookSpace;
