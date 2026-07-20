import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decryptSession } from '@/lib/auth';
import { query } from '@/lib/db';
import fs from 'fs';
import path from 'path';
import { PassThrough } from 'stream';

// Next.js App Router dynamic route config
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { ZipArchive } = require('archiver');
    // 1. Verify Authentication
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('dasan-admin-session');
    
    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = decryptSession(sessionCookie.value);
    if (!payload || payload.role !== 'super_admin') {
      return NextResponse.json({ error: 'Forbidden. Super admin only.' }, { status: 403 });
    }

    const url = new URL(request.url);
    const type = url.searchParams.get('type') === 'db_only' ? 'db_only' : 'full';
    
    // Log backup attempt
    let ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown IP';
    if (ip === '::1' || ip === '127.0.0.1' || ip === 'Unknown IP') {
      const os = require('os');
      const interfaces = os.networkInterfaces();
      for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name] || []) {
          if (iface.family === 'IPv4' && !iface.internal) {
            ip = iface.address;
            break;
          }
        }
        if (ip !== '::1' && ip !== '127.0.0.1' && ip !== 'Unknown IP') break;
      }
    }
    
    try {
      await query(
        `INSERT INTO backup_logs (username, name, type, ip_address) VALUES (?, ?, ?, ?)`,
        [payload.username, payload.name, type, ip]
      );
    } catch (logErr) {
      console.error('Failed to log backup attempt', logErr);
    }

    // 2. Fetch Data from all tables
    const tables = [
      'admin_contents', 'admin_users', 'daily_visitors', 
      'inquiries', 'news', 'pipeline', 'products', 'visitor_logs'
    ];
    
    const dbData: Record<string, any[]> = {};
    
    for (const table of tables) {
      try {
        const rows = await query(`SELECT * FROM ${table}`);
        dbData[table] = rows;
      } catch (err) {
        console.error(`Failed to export table ${table}`, err);
      }
    }

    const dbJsonString = JSON.stringify(dbData, null, 2);

    // 3. Create zip stream
    const passThrough = new PassThrough();
    const archive = new ZipArchive({
      zlib: { level: 9 } // Maximum compression
    });

    // Handle archive errors
    archive.on('error', function(err) {
      console.error('Archive error:', err);
      passThrough.end();
    });

    // Pipe archive data to the passThrough stream
    archive.pipe(passThrough);

    // Append DB JSON
    archive.append(dbJsonString, { name: 'database_backup.json' });

    // Append uploads directory if it exists and type is not db_only
    if (type !== 'db_only') {
      const uploadsPath = path.join(process.cwd(), 'public', 'uploads');
      if (fs.existsSync(uploadsPath)) {
        archive.directory(uploadsPath, 'uploads');
      }
    }

    // Finalize the archive (this will end the stream once done)
    archive.finalize();

    // Convert Node.js PassThrough stream to Web ReadableStream
    const readableStream = new ReadableStream({
      start(controller) {
        passThrough.on('data', (chunk) => controller.enqueue(chunk));
        passThrough.on('end', () => controller.close());
        passThrough.on('error', (err) => controller.error(err));
      }
    });

    // 4. Return as downloadable zip
    const dateStr = new Date().toISOString().replace(/[:.]/g, '-');
    return new NextResponse(readableStream, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="dasan_backup_${dateStr}.zip"`,
      }
    });
  } catch (error: any) {
    console.error('Backup generation failed:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error', stack: error.stack }, { status: 500 });
  }
}
