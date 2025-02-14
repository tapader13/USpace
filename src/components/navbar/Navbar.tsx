import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import NavMenu from './NavMenu';
import NavvarSheet from './NavvarSheet';
import AuthManage from './../AuthManage';

const Navbar = ({ sticky }: { sticky: boolean }) => {
  return (
    <div
      className={
        sticky
          ? 'fixed left-0 w-full top-0 z-50 shadow-md transition-all duration-700 ease-in-out'
          : 'relative'
      }
    >
      <div className='flex items-center justify-between px-5 py-5 bg-second'>
        <div>
          <Image
            src='/asset 0.png'
            alt='logo'
            objectFit='cover'
            width={120}
            height={100}
            className='cursor-pointer'
          />
        </div>
        <div>
          <ul className='md:flex items-center space-x-10 sm:space-x-4 lg:space-x-10 sm:mx-3 lg:mx-0 font-dm font-medium text-[17px] hidden '>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/search'>Browse Spaces</Link>
            </li>
            <li>
              <NavMenu />
            </li>
            <li>
              <Link href='/contact'>Contact us</Link>
            </li>
          </ul>
        </div>

        <div className='flex items-center space-x-2'>
          <AuthManage />
          <Link href={`/product-listing`}>
            <Button className='uppercase bg-third text-second font-extrabold px-5 py-3 text-[16px]'>
              List space
            </Button>
          </Link>
          <div className='md:hidden flex'>
            <NavvarSheet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
