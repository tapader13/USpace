'use client';

import { credentialLogin, googleLogin } from '@/app/action/user';
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
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});
const LoginForm = () => {
  const router = useRouter();

  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    const { email, password } = data;
    const response = await credentialLogin(email, password);
    if (response.success) {
      toast({
        description: response.message,
      });
      // router.refresh();
      router.push('/');
      form.reset();
    } else {
      toast({
        description: response.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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

          <div className='flex justify-center'>
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </Form>
      <p className='text-sm text-center my-1'>Or</p>

      <div className='flex justify-center'>
        <Button
          onClick={async () => {
            await googleLogin();
          }}
          className='text-white bg-transparent rounded-xl bg-red-400'
        >
          Login with Google
        </Button>
      </div>
      <p className='text-sm mt-1'>
        Don&apos;t have an account?{' '}
        <Link className='text-blue-500' href='/signup'>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
