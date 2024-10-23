'use client';

import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet';
import Link from 'next/link';
import NavMenu from './NavMenu';
import { CiMenuFries } from 'react-icons/ci';
const NavvarSheet = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <CiMenuFries />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader></SheetHeader>
          <ul className='p-5 space-y-5 font-dm font-medium text-[17px] mt-5'>
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavvarSheet;
