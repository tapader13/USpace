import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password, username, image, createdAt, updatedAt } = body;
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    const newUser = await db.user.create({
      data: {
        username,
        email,
        image,
        createdAt,
        updatedAt,
        password: await bcrypt.hash(password, 10),
      },
    });
    return NextResponse.json(
      {
        success: true,
        user: newUser,
      },
      {
        status: 201,
      }
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: 'User already exists',
    },
    {
      status: 400,
    }
  );
}
