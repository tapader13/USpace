import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title');
  const category = searchParams.get('category');
  const price = searchParams.get('price');

  const andConditions: Prisma.ProductWhereInput[] = [];
  if (title) {
    andConditions.push({ name: { contains: title, mode: 'insensitive' } });
  }
  if (category && category !== 'Category (All)') {
    andConditions.push({
      category: { contains: category, mode: 'insensitive' },
    });
  }
  if (price && price !== '100') {
    andConditions.push({ price: { lte: parseFloat(price) } });
  }

  console.log(andConditions);
  const data = await db.product.findMany({
    where: andConditions.length > 0 ? { AND: andConditions } : {},
  });

  console.log(data.length, 1);

  return NextResponse.json({ success: true, data });
}
