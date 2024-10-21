import { db } from '@/lib/db';
import { uploadImg } from '@/lib/uploadImg';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.formData();
  const name = data.get('name') as string;
  const description = data.get('description') as string;
  const category = data.get('category') as string;
  const price = data.get('price') as string;
  const features = JSON.parse(data.get('features') as string);
  const renting_roles = JSON.parse(data.get('renting_roles') as string);
  const dimensions = JSON.parse(data.get('dimensions') as string);
  const amenities = JSON.parse(data.get('amenities') as string);
  const imageKeys = ['image1', 'image2', 'image3', 'image4'];
  const imageResponses: string[] = [];
  try {
    for (const key of imageKeys) {
      const imgFile = data.get(key) as File;
      if (imgFile) {
        const imgResponse: any = await uploadImg(imgFile);
        if (imgResponse && imgResponse.secure_url) {
          imageResponses.push(imgResponse.secure_url);
        }
      }
    }
    const video = data.get('video') as File;
    let videoResponse: string = '';
    if (video) {
      const uploadedVideoResponse: any = await uploadImg(video);
      if (uploadedVideoResponse && uploadedVideoResponse.secure_url) {
        videoResponse = uploadedVideoResponse.secure_url;
      }
    }
    console.log(
      name,
      description,
      category,
      price,
      features,
      renting_roles,
      dimensions,
      amenities,
      videoResponse,
      imageResponses
    );

    const newItems = await db.product.create({
      data: {
        name,
        description,
        category,
        price: parseFloat(price),
        features,
        renting_roles,
        dimensions,
        amenities,
        video: videoResponse,
        image: imageResponses,
      },
    });
    return NextResponse.json(
      {
        success: true,
        data: newItems,
        message: 'Item created successfully',
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error('Error uploading files:', error);
    return NextResponse.json(
      { success: false, message: 'File upload failed' },
      {
        status: 400,
      }
    );
  }
}

export async function GET() {
  const items = await db.product.findMany({});
  return NextResponse.json({ success: true, data: items });
}
