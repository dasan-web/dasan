import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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
    let buffer = Buffer.from(bytes);

    if (removeBg && file.type.startsWith('image/')) {
      // Create uploads directory if it doesn't exist under public/uploads
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Generate unique name
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9.\u3131-\u318E\uAC00-\uD7A3_-]/g, '_');
      const fileName = `${timestamp}_${safeName}`;
      const filePath = path.join(uploadsDir, fileName);

      // Save original file
      fs.writeFileSync(filePath, buffer);

      // Run background removal script
      try {
        const { execSync } = require('child_process');
        const scriptPath = path.join(process.cwd(), 'scripts', 'removeBg.js');
        execSync(`node "${scriptPath}" "${filePath}"`, { stdio: 'inherit' });
      } catch (aiError) {
        console.error('AI Background Removal Error:', aiError);
      }

      return NextResponse.json({
        url: `/uploads/${fileName}`,
        name: file.name
      });
    }

    // Create uploads directory if it doesn't exist under public/uploads
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Generate unique name
    const timestamp = Date.now();
    // Replace characters that might cause issues, preserving Korean/English/Numbers and dots/hyphens
    const safeName = file.name.replace(/[^a-zA-Z0-9.\u3131-\u318E\uAC00-\uD7A3_-]/g, '_');
    const fileName = `${timestamp}_${safeName}`;
    const filePath = path.join(uploadsDir, fileName);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      url: `/uploads/${fileName}`,
      name: file.name
    });
  } catch (err: any) {
    console.error('File upload error:', err);
    return NextResponse.json({ error: '파일 업로드 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
