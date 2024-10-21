import cloudinary from './cloudinary';

export const uploadImg = async (file: File) => {
  console.log(file, 'file');

  const buffer = await file.arrayBuffer();
  const byts = Buffer.from(buffer);

  return new Promise((resolve, reject) => {
    const resourceType = file.type.startsWith('video/') ? 'video' : 'auto';
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType,
      },
      (err, response) => {
        if (err) {
          console.error('Upload Error:', err);
          return reject(err.message);
        }
        console.log('Upload Response:', response);
        return resolve(response);
      }
    );

    stream.end(byts);
  });
};
