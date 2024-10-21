'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';
import React from 'react';

const NavMenu = () => {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className='font-dm font-medium text-[17px]'>
              My account
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <ul className=' px-4 flex flex-col gap-5 py-8 w-[200px]'>
                <Link
                  className='hover:translate-x-2 hover:text-sixth transition-all duration-200'
                  href='/cart'
                  title='Cart'
                >
                  Cart
                </Link>
                <Link
                  className='hover:translate-x-2 hover:text-sixth transition-all duration-200'
                  href='/orders'
                  title='Cart'
                >
                  Orders
                </Link>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavMenu;
