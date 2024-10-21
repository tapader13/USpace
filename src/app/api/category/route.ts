import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('cat');
  const sort = searchParams.get('sort');

  const andConditions: Prisma.ProductWhereInput[] = [];
  let orderBy: Prisma.ProductOrderByWithRelationInput = {};
  if (category) {
    andConditions.push({
      category: { contains: category, mode: 'insensitive' },
    });
  }
  if (sort === 'price high to low') {
    orderBy = { price: 'desc' };
  } else if (sort === 'price low to high') {
    orderBy = { price: 'asc' };
  }

  const data = await db.product.findMany({
    where: andConditions.length > 0 ? { AND: andConditions } : {},
    orderBy,
  });

  return NextResponse.json({ success: true, data: data });
}
