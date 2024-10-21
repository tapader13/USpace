import axios from 'axios';
import Link from 'next/link';
import React from 'react';
const API_URL =
  process.env.NEXT_PUBLIC_URl || 'http://localhost:3000/api/items';
const getAllSpace = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
const BookSpace = async () => {
  const allSpace: any = await getAllSpace();
  return (
    <div className='w-10/12 mx-auto'>
      <div className='mt-10'>
        <div className='text-center py-10'>
          <h3 className='text-xl uppercase font-bold text-fourth'>
            Be inspired to meet, create, and innovate.
          </h3>
          <h1 className='text-5xl font-bold text-first mt-2'>
            Book a space that suits you
          </h1>
        </div>
        <div className='grid grid-cols-4 gap-4'>
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
