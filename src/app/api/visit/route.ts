import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { page } = await request.json();

    if (!page) {
      return NextResponse.json({ error: 'Page path is required.' }, { status: 400 });
    }

    // Resolve IP from headers
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    let ip = realIp || (forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1');
    if (ip === '::1') ip = '127.0.0.1'; // local loopback normalization

    // Resolve Device/User-Agent
    const userAgent = request.headers.get('user-agent') || 'Unknown Device';
    let device = 'PC / Browser';
    if (/mobile/i.test(userAgent)) {
      device = 'Mobile / Browser';
      if (/iphone/i.test(userAgent)) device = 'iPhone / Safari';
      else if (/android/i.test(userAgent)) device = 'Android / Chrome';
    } else if (/macintosh/i.test(userAgent)) {
      device = 'macOS / Browser';
      if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) device = 'macOS / Safari';
    } else if (/windows/i.test(userAgent)) {
      device = 'Windows / Browser';
      if (/chrome/i.test(userAgent)) device = 'Windows / Chrome';
      else if (/edge/i.test(userAgent)) device = 'Windows / Edge';
    }

    // Insert log into database
    await query(
      'INSERT INTO visitor_logs (ip, device, page) VALUES (?, ?, ?)',
      [ip, device.slice(0, 150), page.slice(0, 150)]
    );

    try {
      // Calculate today's unique visitors count
      const countRes = await query(
        'SELECT COUNT(DISTINCT ip) AS count FROM visitor_logs WHERE DATE(created_at) = CURDATE()'
      );
      const todayCount = countRes[0]?.count || 0;

      // Save or update today's visitor count in daily_visitors table
      await query(
        'INSERT INTO daily_visitors (visit_date, visitor_count) VALUES (CURDATE(), ?) ON DUPLICATE KEY UPDATE visitor_count = ?',
        [todayCount, todayCount]
      );
    } catch (dbErr) {
      // Log DB statistics error but do not block the main visit logging success response
      console.error('Failed to update daily_visitors stats:', dbErr);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('API Visit Log Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
