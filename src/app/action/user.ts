'use server';

import { signIn } from '../../../auth';

export const credentialLogin = async (email: string, password: string) => {
  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      throw new Error(result.error);
    }

    return { success: true, message: 'Login successful' };
  } catch (error: any) {
    return { success: false, message: error.message.split('.')[0] };
  }
};

export const googleLogin = async (callbackUrlgoogle: string) => {
  await signIn('google', { callbackUrl: callbackUrlgoogle });
};
