'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AuthManage = () => {
  const { data: session, status } = useSession();
  console.log(session, 'seslay 12');
  const router = useRouter();
  return (
    <>
      {session?.user?.email ? (
        <button
          onClick={() => signOut()}
          className='uppercase mr-2 bg-red-500 text-second font-extrabold px-5 py-3 text-[16px]'
        >
          LogOut
        </button>
      ) : (
        <button
          onClick={() => router.push('/login')}
          className='uppercase mr-2 bg-third text-second font-extrabold px-5 py-3 text-[16px]'
        >
          Login
        </button>
      )}
    </>
  );
};

export default AuthManage;
