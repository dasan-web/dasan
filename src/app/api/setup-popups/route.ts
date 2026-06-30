import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const sql = `
      CREATE TABLE IF NOT EXISTS popups (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        link_url VARCHAR(255),
        start_date DATETIME,
        end_date DATETIME,
        is_active BOOLEAN DEFAULT 1,
        width INT DEFAULT 400,
        height INT DEFAULT 400,
        top_pos INT DEFAULT 100,
        left_pos INT DEFAULT 100,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `;
    await query(sql);
    return NextResponse.json({ success: true, message: 'Popups table created successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
