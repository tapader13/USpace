'use client';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { CiSearch } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
const Hero = () => {
  const [search, setSearch] = useState('');
  const navigate = useRouter();

  const handleSrc = () => {
    if (search.trim()) {
      navigate.push(`/search?title=${search}`);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSrc();
    }
  };
  return (
    <div className=' bg-center bg-bg-hero bg-cover bg-no-repeat h-[89vh] w-screen'>
      <div className='w-10/12 mx-auto relative top-1/2 -translate-y-1/2'>
        <div className='w-fit'>
          <h1 className='text-5xl font-bold mb-5 text-second'>
            Book a space that suits you
          </h1>
          <div className='relative'>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className='text-fourth bg-second p-8 rounded-full'
              placeholder='What space are you looking for?'
            />
            <div>
              <CiSearch
                onClick={handleSrc}
                className='absolute top-1/2 -translate-y-1/2 right-3 text-second font-extrabold cursor-pointer bg-red-600 h-10 w-10 rounded-full p-2'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
