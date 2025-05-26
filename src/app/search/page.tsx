'use client';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import axios from 'axios';
import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const categories = [
  { id: 1, name: 'Category (All)' },
  { id: 2, name: 'Workspaces' },
  { id: 3, name: 'Auditorium/Theatre' },
  { id: 4, name: 'Commercial Kitchen' },
  { id: 5, name: 'Commercial Loft' },
  { id: 6, name: 'Event Space' },
  { id: 7, name: 'Home' },
  { id: 8, name: 'Networking Events' },
  { id: 9, name: 'Office/Conference/Co-Working' },
  { id: 10, name: 'Outdoor Space' },
  { id: 11, name: 'Rooftop' },
  { id: 12, name: 'Warehouse' },
];

const SearchPage = () => {
  // const srcParams = useSearchParams();
  // const title = srcParams.get('title');
  const [title, setTitle] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState('');
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    console.log(queryParams, '23');
    const titleParam = queryParams.get('title');
    setTitle(titleParam);
  }, []);
  useEffect(() => {
    setSelectedTitle(title || '');
  }, [title]);
  const [selectedCategory, setSelectedCategory] = useState('Category (All)');

  const [price, setPrice] = useState(100);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/search?title=${selectedTitle}&category=${selectedCategory}&price=${price}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [price, selectedTitle, selectedCategory]);

  return (
    <div className='px-5 py-5 min-h-screen'>
      <div className='flex space-x-4'>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className='w-[220px]'>
            <SelectValue placeholder='Select a category' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className='w-[220px]'>
          <Input
            type='text'
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
            placeholder='Product title'
          />
        </div>
        <Select>
          <SelectTrigger className='w-[220px]'>
            <SelectValue placeholder='Price' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className='p-5'>
              <Slider
                defaultValue={[price]}
                max={2000}
                step={1}
                onValueChange={(value) => setPrice(value[0])}
              />
              <div className='mt-5'>
                <span className='text-first text-xl'>
                  Price: ${1} - ${price} USD
                </span>
              </div>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <div className='mt-5'>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 grid-cols-1 gap-4'>
            {data?.slice(0, 24).map((space: any) => (
              <Link href={`/product/${space.id}`} key={space.id}>
                <div className='relative group'>
                  <div className='h-[250px] cursor-pointer relative w-full overflow-hidden'>
                    <img
                      className='w-full h-full group-hover:scale-125 transition-all duration-500 group-hover:bg-black/50 '
                      src={space.image[0]}
                      alt=''
                    />
                    <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                  </div>

                  <h4 className='font-bold my-1 cursor-pointer hover:text-third transition-colors duration-300'>
                    {space.name.length > 24
                      ? space.name.slice(0, 24) + '...'
                      : space.name}
                  </h4>
                  <h6 className='text-fourth'>${space.price}.00/Hour</h6>
                </div>
              </Link>
            ))}
            {loading &&
              Array.from({ length: 24 }).map((_, i) => (
                <div className='grid grid-cols-6 gap-4' key={i}>
                  <div className='flex flex-col space-y-3'>
                    <Skeleton className='h-[125px] w-[250px] rounded-xl' />
                    <div className='space-y-2'>
                      <Skeleton className='h-4 w-[250px]' />
                      <Skeleton className='h-4 w-[200px]' />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
