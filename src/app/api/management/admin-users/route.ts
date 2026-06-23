import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '@/lib/db';
import { decryptSession, hashPassword } from '@/lib/auth';

// Helper to check if the requester is a super_admin
async function checkSuperAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('dasan-admin-session')?.value;
  const session = token ? decryptSession(token) : null;

  if (!session || !session.expiresAt || Date.now() > session.expiresAt) {
    return { error: '인증 세션이 만료되었습니다.', status: 401 };
  }

  if (session.role !== 'super_admin') {
    return { error: '이 작업을 수행할 권한이 없습니다. (최고관리자 전용)', status: 403 };
  }

  return { session };
}

export async function GET() {
  const auth = await checkSuperAdmin();
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const users = await query('SELECT id, username, name, role, created_at FROM admin_users ORDER BY id ASC');
    return NextResponse.json(users);
  } catch (err: any) {
    console.error('API admin-users GET error:', err);
    return NextResponse.json({ error: '관리자 목록을 불러오지 못했습니다.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await checkSuperAdmin();
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { username, password, name, role } = await request.json();

    if (!username || !password || !name || !role) {
      return NextResponse.json({ error: '모든 필수 항목을 입력해주세요.' }, { status: 400 });
    }

    // Check if username already exists
    const existing = await query('SELECT id FROM admin_users WHERE username = ?', [username]);
    if (existing.length > 0) {
      return NextResponse.json({ error: '이미 존재하는 로그인 ID입니다.' }, { status: 409 });
    }

    const passwordHash = hashPassword(password);
    await query(
      'INSERT INTO admin_users (username, password, name, role) VALUES (?, ?, ?, ?)',
      [username, passwordHash, name, role]
    );

    return NextResponse.json({ message: '관리자 계정이 성공적으로 등록되었습니다.' });
  } catch (err: any) {
    console.error('API admin-users POST error:', err);
    return NextResponse.json({ error: '계정 등록 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const auth = await checkSuperAdmin();
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: '삭제할 계정 ID가 누락되었습니다.' }, { status: 400 });
    }

    // Prevent deleting the primary admin account or the current user
    const targetUser = await query('SELECT username FROM admin_users WHERE id = ?', [id]);
    if (targetUser.length === 0) {
      return NextResponse.json({ error: '존재하지 않는 계정입니다.' }, { status: 404 });
    }

    if (targetUser[0].username === 'admin') {
      return NextResponse.json({ error: '기본 최고관리자(admin) 계정은 삭제할 수 없습니다.' }, { status: 400 });
    }

    if (targetUser[0].username === auth.session?.username) {
      return NextResponse.json({ error: '자기 자신은 삭제할 수 없습니다.' }, { status: 400 });
    }

    await query('DELETE FROM admin_users WHERE id = ?', [id]);
    return NextResponse.json({ message: '계정이 성공적으로 삭제되었습니다.' });
  } catch (err: any) {
    console.error('API admin-users DELETE error:', err);
    return NextResponse.json({ error: '계정 삭제 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const auth = await checkSuperAdmin();
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { id, username, password, name, role } = await request.json();

    if (!id || !username || !name || !role) {
      return NextResponse.json({ error: 'ID 및 필수 항목을 확인해주세요.' }, { status: 400 });
    }

    // Check if the username belongs to another existing user
    const existing = await query('SELECT id FROM admin_users WHERE username = ? AND id != ?', [username, id]);
    if (existing.length > 0) {
      return NextResponse.json({ error: '이미 존재하는 로그인 ID입니다.' }, { status: 409 });
    }

    // Prevent changing the role of primary 'admin' user from super_admin
    const targetUser = await query('SELECT username FROM admin_users WHERE id = ?', [id]);
    if (targetUser.length > 0 && targetUser[0].username === 'admin' && role !== 'super_admin') {
      return NextResponse.json({ error: '기본 최고관리자(admin)의 등급은 수정할 수 없습니다.' }, { status: 400 });
    }

    if (password && password.trim() !== '') {
      const passwordHash = hashPassword(password);
      await query(
        'UPDATE admin_users SET username = ?, password = ?, name = ?, role = ? WHERE id = ?',
        [username, passwordHash, name, role, id]
      );
    } else {
      await query(
        'UPDATE admin_users SET username = ?, name = ?, role = ? WHERE id = ?',
        [username, name, role, id]
      );
    }

    return NextResponse.json({ message: '관리자 정보가 수정되었습니다.' });
  } catch (err: any) {
    console.error('API admin-users PUT error:', err);
    return NextResponse.json({ error: '계정 수정 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

