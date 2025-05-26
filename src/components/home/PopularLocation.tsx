import axios from 'axios';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
const getAllSpace = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/items');
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
const PopularLocation = async () => {
  const allSpace: any = await getAllSpace();
  return (
    <div className='sm:w-10/12 mx-auto w-[95%]'>
      <div className='mt-16'>
        <div className='text-center py-12'>
          <h3 className='text-xl uppercase font-bold text-fourth'>
            Be inspired to meet, create, and innovate.
          </h3>
          <h1 className='text-5xl font-bold text-first mt-2'>
            Our most popular locations
          </h1>
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-4'>
          {allSpace?.slice(0, 8).map((space: any) => (
            <Link href={`/product/${space.id}`} key={space.id}>
              <div className='relative group  '>
                <div className='h-[300px] cursor-pointer relative w-full overflow-hidden'>
                  <img
                    className='w-full h-full group-hover:scale-125 transition-all duration-500 group-hover:bg-black/50 '
                    src={space.image[0]}
                    alt=''
                  />
                  <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                </div>

                <h4 className=' font-bold my-1 cursor-pointer hover:text-third transition-colors duration-300'>
                  {space.name.length > 33
                    ? space.name.slice(0, 33) + '...'
                    : space.name}
                </h4>
                <h6 className='text-fourth'>${space.price}.00/Hour</h6>
              </div>
            </Link>
          ))}
        </div>
        <div className='text-center'>
          <Link href='/search'>
            <Button className='my-5 text-second text-xl px-7 py-3 bg-sixth'>
              See all spaces
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularLocation;
