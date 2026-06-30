import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ error: '이메일과 인증번호를 모두 입력해주세요.' }, { status: 400 });
    }

    const checkSql = `
      SELECT id, (expires_at > NOW()) as is_valid FROM email_verifications 
      WHERE email = ? AND code = ? AND is_verified = 0 
      ORDER BY id DESC LIMIT 1
    `;
    const rows = await query<any[]>(checkSql, [email, code]);

    if (rows.length === 0) {
      return NextResponse.json({ error: '인증번호가 일치하지 않거나 유효하지 않습니다.' }, { status: 400 });
    }

    const verification = rows[0];
    
    if (!verification.is_valid) {
      return NextResponse.json({ error: '인증번호가 만료되었습니다. 다시 요청해주세요.' }, { status: 400 });
    }

    // Mark as verified
    const updateSql = `UPDATE email_verifications SET is_verified = 1 WHERE id = ?`;
    await query(updateSql, [verification.id]);

    return NextResponse.json({ success: true, message: '이메일 인증이 완료되었습니다.' });
  } catch (error: any) {
    console.error('Failed to verify code:', error);
    return NextResponse.json({ error: '인증 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
