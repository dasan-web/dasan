import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    // Fetch popups that are active, and within the valid date range (or no date range set)
    const sql = `
      SELECT id, title, content, link_url, width, height, top_pos, left_pos 
      FROM popups 
      WHERE is_active = 1 
        AND (start_date IS NULL OR DATE(start_date) <= DATE(?))
        AND (end_date IS NULL OR DATE(end_date) >= DATE(?))
    `;
    const popups = await query(sql, [now, now]);

    return NextResponse.json(popups);
  } catch (err: any) {
    console.error('API Active Popups fetch error:', err);
    return NextResponse.json(
      { error: '팝업 목록을 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
