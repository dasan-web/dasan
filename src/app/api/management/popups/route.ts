import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '@/lib/db';
import { decryptSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
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

    const popups = await query('SELECT * FROM popups ORDER BY created_at DESC');
    return NextResponse.json(popups);
  } catch (err: any) {
    console.error('API Popups fetch error:', err);
    return NextResponse.json(
      { error: '팝업 목록을 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

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

    if (session.role !== 'super_admin' && session.role !== 'editor') {
      return NextResponse.json(
        { error: '해당 권한이 없습니다.' },
        { status: 403 }
      );
    }

    const { title, content, link_url, start_date, end_date, is_active, width, height, top_pos, left_pos } = await request.json();

    if (!title) {
      return NextResponse.json({ error: '제목은 필수입니다.' }, { status: 400 });
    }

    const sql = `
      INSERT INTO popups (title, content, link_url, start_date, end_date, is_active, width, height, top_pos, left_pos)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      title,
      content || '',
      link_url || null,
      start_date || null,
      end_date || null,
      is_active === undefined ? 1 : is_active,
      width || 400,
      height || 400,
      top_pos || 100,
      left_pos || 100
    ];

    await query(sql, params);

    return NextResponse.json({ message: '팝업이 성공적으로 등록되었습니다.' });
  } catch (err: any) {
    console.error('API Popups create error:', err);
    return NextResponse.json(
      { error: '팝업 등록 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
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

    if (session.role !== 'super_admin' && session.role !== 'editor') {
      return NextResponse.json(
        { error: '해당 권한이 없습니다.' },
        { status: 403 }
      );
    }

    const { id, title, content, link_url, start_date, end_date, is_active, width, height, top_pos, left_pos } = await request.json();

    if (!id || !title) {
      return NextResponse.json({ error: 'ID와 제목은 필수입니다.' }, { status: 400 });
    }

    const sql = `
      UPDATE popups
      SET title = ?, content = ?, link_url = ?, start_date = ?, end_date = ?, is_active = ?, width = ?, height = ?, top_pos = ?, left_pos = ?
      WHERE id = ?
    `;
    const params = [
      title,
      content || '',
      link_url || null,
      start_date || null,
      end_date || null,
      is_active === undefined ? 1 : is_active,
      width || 400,
      height || 400,
      top_pos || 100,
      left_pos || 100,
      id
    ];

    await query(sql, params);

    return NextResponse.json({ message: '팝업이 성공적으로 수정되었습니다.' });
  } catch (err: any) {
    console.error('API Popups update error:', err);
    return NextResponse.json(
      { error: '팝업 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
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

    if (session.role !== 'super_admin' && session.role !== 'editor') {
      return NextResponse.json(
        { error: '해당 권한이 없습니다.' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID는 필수입니다.' }, { status: 400 });
    }

    await query('DELETE FROM popups WHERE id = ?', [id]);

    return NextResponse.json({ message: '팝업이 성공적으로 삭제되었습니다.' });
  } catch (err: any) {
    console.error('API Popups delete error:', err);
    return NextResponse.json(
      { error: '팝업 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
