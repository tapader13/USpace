import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '../ui/button';
import useCartStore from '@/store/useCartStore';
import { Product } from '@/app/types/cartType';
import { useToast } from '@/hooks/use-toast';

const DatePick = ({ data }: { data: Product }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();
  const now = new Date();
  const { addToCart } = useCartStore();

  // const getMinTime = () => {
  //   if (selectedDate) {
  //     return new Date(
  //       selectedDate.getFullYear(),
  //       selectedDate.getMonth(),
  //       selectedDate.getDate(),
  //       0,
  //       0
  //     );
  //   }
  //   return null;
  // };
  const getMinTime = () => {
    if (selectedDate) {
      if (selectedDate.toDateString() === now.toDateString()) {
        // If today, set the minimum time to the current time
        return new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          now.getHours(),
          now.getMinutes()
        );
      } else {
        // For future dates, start from 00:00
        return new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          0,
          0
        );
      }
    }
    return null;
  };
  const handleRent = () => {
    if (!selectedDate || !startTime || !endTime) {
      setError('Please select all fields');
      return;
    }

    const formattedDate = Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(selectedDate);

    const formattedStartTime = Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(startTime);

    const formattedEndTime = Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(endTime);

    addToCart({
      id: data.id,
      name: data.name,
      price: data.price,
      quantity: 1,
      image: data.image[0],
      rentalDate: formattedDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
    });

    setSelectedDate(null);
    setStartTime(null);
    setEndTime(null);
    setError('');
    toast({
      description: 'Product added to cart',
    });
  };

  return (
    <div className=''>
      <div className='w-full'>
        <label className='block text-lg font-medium mb-1 mt-6'>
          Pick a date
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => {
            setSelectedDate(date);
            setStartTime(null);
            setEndTime(null);
          }}
          minDate={new Date()}
          placeholderText='Select Date..'
          dateFormat='MMMM d, yyyy'
          className='w-full p-2 border cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-center bg-gray-200'
        />
      </div>

      <div>
        <label className='block text-lg font-semibold mb-[2px]'>
          Pick a time
        </label>
        <div className='flex space-x-4'>
          <DatePicker
            selected={startTime}
            onChange={(time: Date | null) => {
              setStartTime(time);
              setEndTime(null);
            }}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            timeCaption='Time'
            dateFormat='h:mm aa'
            placeholderText='00:00'
            disabled={!selectedDate}
            minTime={getMinTime()} // This should always return the minimum time based on selectedDate
            maxTime={
              selectedDate
                ? new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate(),
                    23,
                    59
                  )
                : undefined
            }
            className={`w-full p-2 cursor-pointer text-center border bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              !selectedDate ? 'cursor-not-allowed' : ''
            }`}
          />
          <DatePicker
            selected={endTime}
            onChange={(time: Date | null) => {
              setEndTime(time);
            }}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            timeCaption='Time'
            dateFormat='h:mm aa'
            placeholderText='00:00'
            disabled={!startTime}
            minTime={
              startTime ? new Date(startTime.getTime() + 3600000) : undefined // At least 1 hour after start time
            }
            maxTime={
              selectedDate
                ? new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate(),
                    23,
                    59
                  )
                : undefined
            }
            className={`w-full p-2 border text-center bg-gray-200 rounded-md focus:outline-none cursor-pointer focus:ring-2 focus:ring-blue-400 ${
              !startTime ? 'cursor-not-allowed' : ''
            }`}
          />
        </div>
        <div className='mt-10 flex flex-col items-center'>
          {(!selectedDate || !startTime || !endTime) && (
            <p className='text-red-500'>{error}</p>
          )}
          <Button
            onClick={handleRent}
            className='bg-third text-second px-12 w-full font-bold text-[18px] py-3'
          >
            Rent Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DatePick;
