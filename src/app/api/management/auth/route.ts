import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '@/lib/db';
import { hashPassword, encryptSession, decryptSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: '아이디와 비밀번호를 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // Query DB for the user
    const users = await query('SELECT * FROM admin_users WHERE username = ?', [username]);
    if (users.length === 0) {
      return NextResponse.json(
        { error: '아이디 또는 비밀번호가 잘못되었습니다.' },
        { status: 401 }
      );
    }

    const user = users[0];
    const incomingHash = hashPassword(password);

    if (user.password !== incomingHash) {
      return NextResponse.json(
        { error: '아이디 또는 비밀번호가 잘못되었습니다.' },
        { status: 401 }
      );
    }

    // Create session payload
    const sessionPayload = {
      username: user.username,
      name: user.name,
      role: user.role,
      expiresAt: Date.now() + 60 * 60 * 2000, // 2 hours
    };

    const token = encryptSession(sessionPayload);
    const response = NextResponse.json({ success: true, message: '로그인 성공' });
    
    // Set cookie for session management
    response.cookies.set('dasan-admin-session', token, {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 2, // 2 hours
      sameSite: 'strict',
    });

    return response;
  } catch (err: any) {
    console.error('API Admin auth error:', err);
    return NextResponse.json(
      { error: '서버 인증 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: '로그아웃 성공' });
  response.cookies.delete('dasan-admin-session');
  return response;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('dasan-admin-session')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false });
    }

    const payload = decryptSession(token);
    if (!payload || !payload.expiresAt || Date.now() > payload.expiresAt) {
      // Expired or invalid token
      return NextResponse.json({ authenticated: false });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        username: payload.username,
        name: payload.name,
        role: payload.role,
      },
    });
  } catch (err) {
    console.error('Auth check error:', err);
    return NextResponse.json({ authenticated: false });
  }
}

