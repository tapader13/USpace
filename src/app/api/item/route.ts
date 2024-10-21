import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tit = searchParams.get('title');
  const items = await db.product.findUnique({
    where: {
      id: tit || undefined,
    },
  });
  if (!items)
    return NextResponse.json({ success: false, message: 'Item not found' });
  return NextResponse.json({ success: true, data: items });
}
