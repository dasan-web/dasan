import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer: Buffer, folder: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: folder, resource_type: 'auto' },
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
    const { searchParams } = new URL(request.url);
    const removeBg = searchParams.get('removeBg') === 'true';

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: '파일이 업로드되지 않았습니다.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (removeBg && file.type.startsWith('image/')) {
      const tempDir = os.tmpdir();
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9.\u3131-\u318E\uAC00-\uD7A3_-]/g, '_');
      const fileName = `${timestamp}_${safeName}`;
      const filePath = path.join(tempDir, fileName);

      // Save original file to temp directory
      fs.writeFileSync(filePath, buffer);

      // Run background removal script
      try {
        const { execSync } = require('child_process');
        const scriptPath = path.join(process.cwd(), 'scripts', 'removeBg.js');
        execSync(`node "${scriptPath}" "${filePath}"`, { stdio: 'inherit' });
      } catch (aiError) {
        console.error('AI Background Removal Error:', aiError);
      }

      // Read processed file and upload to Cloudinary
      const processedBuffer = fs.readFileSync(filePath);
      const result = await uploadToCloudinary(processedBuffer, 'dasan');

      // Clean up temp file
      try {
        fs.unlinkSync(filePath);
      } catch (cleanupError) {
        console.error('Failed to cleanup temp file:', cleanupError);
      }

      return NextResponse.json({
        url: result.secure_url,
        name: file.name
      });
    }

    // Standard upload without background removal
    const result = await uploadToCloudinary(buffer, 'dasan');

    return NextResponse.json({
      url: result.secure_url,
      name: file.name
    });
  } catch (err: any) {
    console.error('File upload error:', err);
    return NextResponse.json({ error: '파일 업로드 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
