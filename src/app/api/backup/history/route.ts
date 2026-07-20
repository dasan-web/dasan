import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decryptSession } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
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

    // 2. Fetch Logs
    const rows = await query(`
      SELECT id, username, name, type, ip_address,
             DATE_ADD(created_at, INTERVAL 9 HOUR) as created_at
      FROM backup_logs 
      ORDER BY id DESC 
      LIMIT 20
    `);

    return NextResponse.json({ success: true, logs: rows });
  } catch (error: any) {
    console.error('Failed to fetch backup history:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
