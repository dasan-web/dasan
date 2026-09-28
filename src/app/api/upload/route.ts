import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer: Buffer, folder: string, filename: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const lastDotIndex = filename.lastIndexOf('.');
    const ext = lastDotIndex !== -1 ? filename.slice(lastDotIndex) : '';
    const base = lastDotIndex !== -1 ? filename.slice(0, lastDotIndex) : filename;
    const cleanBase = base.replace(/[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ._-]/g, '_');
    const uniquePublicId = `${cleanBase}_${Date.now()}${ext}`;

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'auto',
        use_filename: true,
        unique_filename: true,
        filename_override: filename,
        public_id: uniquePublicId,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: '파일이 업로드되지 않았습니다.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Standard upload to Cloudinary with filename preserved
    const result = await uploadToCloudinary(buffer, 'dasan', file.name);

    return NextResponse.json({
      url: result.secure_url,
      name: file.name
    });
  } catch (err: any) {
    console.error('File upload error:', err);
    return NextResponse.json({ error: '파일 업로드 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

