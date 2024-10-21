import React from 'react';
import { Button } from '@/components/ui/button';

const Rental = () => {
  return (
    <div className='w-10/12 mx-auto my-28'>
      <div className='grid grid-cols-2 gap-10 '>
        <div className='relative'>
          <img className='w-full h-[600px]' src='/asset 26.jpeg' alt='' />
          <div className='absolute bg-black/60 w-[250px] bottom-0 right-0'>
            <h6 className='text-xl text-center text-white p-5 '>
              Book a unique space for your activity
            </h6>
          </div>
        </div>
        <div>
          <h4 className='uppercase font-extrabold text-fourth text-xl'>
            Rental Venues and Spaces
          </h4>
          <h1 className='my-2 font-extrabold  text-[43px] leading-[51px]'>
            Rental Spaces: Tailored Solutions for Every Event
          </h1>
          <p className='text-fifth mt-5 mb-7 text-[19px]'>
            Are you looking for a unique and versatile space for your next
            event? Look no further than our selection of rental venues and
            spaces! Our selection includes a variety of options to suit events
            of all sizes and types.
          </p>
          <p className='text-fifth mb-7 text-[19px]'>
            Looking for the perfect venue for your event? Our rental options
            suit events of all sizes and types. From audiovisual equipment to
            catering services, we have everything you need to make your event a
            success.
          </p>
          <p className='text-fifth mb-7 text-[19px]'>
            Our team is dedicated to providing you with the highest level of
            service and support. We understand that every event is unique, and
            we are committed to working with you to make your vision a reality.
            So why wait? Book a space, and start planning your next event.
          </p>
          <Button className='px-5 py-3'>Explore Spaces</Button>
        </div>
      </div>
    </div>
  );
};

export default Rental;
