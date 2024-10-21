'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
const sortCat = [
  { id: 1, name: 'Default Sort' },
  { id: 2, name: 'price low to high' },
  { id: 3, name: 'price high to low' },
];

const ProductCategory = ({ params }: { params: { title: string } }) => {
  console.log(decodeURI(params.title), 'params');
  const [allSpace, setAllSpace] = useState([]);
  const [selectedSort, setSelectedSort] = useState('Default Sort');
  useEffect(() => {
    const getTileProduct = async () => {
      try {
        if (params.title) {
          const response = await axios.get(
            `https://space-booking-psi.vercel.app/api/category?cat=${decodeURI(
              params.title
            ).replace(/20%/g, '/')}&sort=${selectedSort}`
          );
          setAllSpace(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTileProduct();
  }, [params.title, selectedSort]);
  return (
    <div className='w-10/12 mx-auto'>
      <div className=''>
        <div className=' mt-12 mb-16'>
          <h1 className='text-5xl font-bold text-first '>
            {decodeURI(params.title).replace(/20%/g, '/')}
          </h1>
        </div>
        {allSpace?.length > 0 && (
          <div className='mb-6 flex justify-between items-center'>
            <h6 className='text-fourth'>
              Showing all {allSpace?.length} results
            </h6>
            <div>
              <Select value={selectedSort} onValueChange={setSelectedSort}>
                <SelectTrigger className='w-[220px] bg-[#FBF4EA]'>
                  <SelectValue placeholder='Select a category' />
                </SelectTrigger>
                <SelectContent className='bg-[#FBF4EA]'>
                  <SelectGroup>
                    {sortCat.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        <div className='grid grid-cols-4 gap-4'>
          {allSpace?.map((space: any) => (
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
      </div>
    </div>
  );
};

export default ProductCategory;
