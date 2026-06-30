import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const popups = await query('SELECT * FROM popups');
    return NextResponse.json(popups);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
