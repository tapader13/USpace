import LoginForm from '@/components/ui/LoginForm';
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';

const Login = async () => {
  const user = await auth();

  if (user?.user?.email) redirect('/');
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <div className='w-1/4 p-5 rounded-lg shadow-md'>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
