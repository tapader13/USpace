import { NextResponse } from 'next/server';
// import bcrypt from 'bcrypt';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return NextResponse.json({
      success: false,
      message: 'User not found',
    });
  }

  const isMatch = await bcrypt.compare(password, user.password as string);
  if (!isMatch) {
    return NextResponse.json({
      success: false,
      message: 'Password not match',
    });
  }

  return NextResponse.json({
    success: true,
    user,
  });
}
