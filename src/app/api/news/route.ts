import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '@/lib/db';
import { decryptSession } from '@/lib/auth';

// Helper function to verify user role
async function checkAuth(allowedRoles: string[]) {
  const cookieStore = await cookies();
  const token = cookieStore.get('dasan-admin-session')?.value;
  const session = token ? decryptSession(token) : null;

  if (!session || !session.expiresAt || Date.now() > session.expiresAt) {
    return { error: '인증 세션이 만료되었습니다. 다시 로그인해주세요.', status: 401 };
  }

  if (!allowedRoles.includes(session.role)) {
    return { error: `이 작업을 수행할 권한이 없습니다. (허용 권한: ${allowedRoles.map(r => r === 'super_admin' ? '최고관리자' : '콘텐츠관리자').join(', ')})`, status: 403 };
  }

  return { session };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let selectSql = 'SELECT * FROM news';
    let params: any[] = [];

    if (category) {
      selectSql += ' WHERE category = ?';
      params.push(category);
    }

    selectSql += ' ORDER BY created_at DESC LIMIT 50';

    const newsItems = await query(selectSql, params);
    return NextResponse.json(newsItems);
  } catch (err: any) {
    console.error('API News fetch error:', err);
    return NextResponse.json(
      { error: '뉴스 기사를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const auth = await checkAuth(['super_admin', 'editor']);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { category, title, content, file_url, file_name } = await request.json();

    if (!category || !title || !content) {
      return NextResponse.json(
        { error: '카테고리, 제목, 내용은 필수 입력 사항입니다.' },
        { status: 400 }
      );
    }

    const insertSql = `
      INSERT INTO news (category, title, content, views, file_url, file_name)
      VALUES (?, ?, ?, 0, ?, ?)
    `;
    const result = await query(insertSql, [
      category,
      title,
      content,
      file_url || null,
      file_name || null
    ]);

    return NextResponse.json({
      message: '뉴스/공시글이 성공적으로 등록되었습니다.',
      id: result.insertId,
    });
  } catch (err: any) {
    console.error('API News creation error:', err);
    return NextResponse.json(
      { error: '글 등록 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const auth = await checkAuth(['super_admin', 'editor']);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { id, category, title, content, views, file_url, file_name } = await request.json();

    if (!id || !category || !title || !content) {
      return NextResponse.json(
        { error: 'ID 및 필수 입력 사항 누락' },
        { status: 400 }
      );
    }

    const updateSql = `
      UPDATE news
      SET category = ?, title = ?, content = ?, views = ?, file_url = ?, file_name = ?
      WHERE id = ?
    `;
    await query(updateSql, [
      category,
      title,
      content,
      views || 0,
      file_url || null,
      file_name || null,
      id
    ]);

    return NextResponse.json({ message: '글이 성공적으로 수정되었습니다.' });
  } catch (err: any) {
    console.error('API News update error:', err);
    return NextResponse.json(
      { error: '글 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const auth = await checkAuth(['super_admin']);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: '삭제할 글의 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    await query('DELETE FROM news WHERE id = ?', [id]);
    return NextResponse.json({ message: '글이 성공적으로 삭제되었습니다.' });
  } catch (err: any) {
    console.error('API News delete error:', err);
    return NextResponse.json(
      { error: '글 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
