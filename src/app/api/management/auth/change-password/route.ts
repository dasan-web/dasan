import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '@/lib/db';
import { decryptSession, hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('dasan-admin-session')?.value;
    const session = token ? decryptSession(token) : null;

    if (!session || !session.expiresAt || Date.now() > session.expiresAt) {
      return NextResponse.json(
        { error: '인증 세션이 만료되었습니다. 다시 로그인해주세요.' },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: '현재 비밀번호와 새 비밀번호를 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // Fetch user from DB to verify current password
    const userRows = await query('SELECT * FROM admin_users WHERE username = ?', [session.username]);
    if (userRows.length === 0) {
      return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
    }

    const user = userRows[0];
    const currentHashed = hashPassword(currentPassword);

    if (user.password !== currentHashed) {
      return NextResponse.json({ error: '현재 비밀번호가 일치하지 않습니다.' }, { status: 400 });
    }

    // Update to new password
    const newHashed = hashPassword(newPassword);
    await query('UPDATE admin_users SET password = ? WHERE id = ?', [newHashed, user.id]);

    return NextResponse.json({ message: '비밀번호가 성공적으로 변경되었습니다.' });
  } catch (err: any) {
    console.error('API change-password POST error:', err);
    return NextResponse.json(
      { error: '비밀번호 변경 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
