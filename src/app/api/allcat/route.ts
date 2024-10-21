import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const items = await db.product.findMany({
    distinct: ['category'],
    select: {
      category: true,
      image: true,
    },
  });
  return NextResponse.json({ success: true, data: items });
}
