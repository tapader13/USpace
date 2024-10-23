'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
const formSchema = z
  .object({
    username: z.string().min(3, {
      message: 'Username must be at least 3 characters.',
    }),
    email: z.string().email({
      message: 'Please enter a valid email address.',
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
const Signup = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  const user = useSession();
  useEffect(() => {
    if (user?.data?.user?.email) {
      router.push('/');
    }
  }, [user, router]);
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('/api/auth/signup', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.success) {
        console.log(response.data.user, 'user');
        toast({
          description: 'User created successfully',
        });
        router.push('/login');
        form.reset();
      }
      console.log(response, 'response');
    } catch (error: any) {
      toast({
        description: `${error.response.data.message}`,
        variant: 'destructive',
      });
    }
  };
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <div className='sm:w-1/4 p-5 rounded-lg shadow-md w-[95%]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your email address' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder='Confirm your password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='px-6 rounded-md py-2'>
              Signup
            </Button>
          </form>
        </Form>
        <span className='text-sm mt-1'>
          Already have an account?{' '}
          <Link className='text-blue-500' href='/login'>
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
