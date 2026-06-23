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

    const { searchParams } = new URL(request.url);
    const pageKey = searchParams.get('page_key');

    if (pageKey) {
      const results = await query('SELECT * FROM admin_contents WHERE page_key = ?', [pageKey]);
      if (results.length > 0) {
        return NextResponse.json(results[0]);
      }
      return NextResponse.json({ error: '해당 페이지 콘텐츠가 없습니다.' }, { status: 404 });
    }

    // Return all contents if no specific pageKey is requested
    const allContents = await query('SELECT * FROM admin_contents ORDER BY page_key ASC');
    return NextResponse.json(allContents);
  } catch (err: any) {
    console.error('API Contents fetch error:', err);
    return NextResponse.json(
      { error: '콘텐츠를 가져오는데 실패했습니다.' },
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

    // Check permissions: Only super_admin and editor are allowed to modify contents
    if (session.role !== 'super_admin' && session.role !== 'editor') {
      return NextResponse.json(
        { error: '해당 권한이 없습니다. 콘텐츠를 수정할 수 없습니다.' },
        { status: 403 }
      );
    }

    const { page_key, content, is_hidden } = await request.json();

    if (!page_key) {
      return NextResponse.json(
        { error: 'page_key는 필수 항목입니다.' },
        { status: 400 }
      );
    }

    const contentVal = content !== undefined && content !== null ? content : '';
    const hasIsHidden = typeof is_hidden !== 'undefined';
    const isHiddenVal = (is_hidden === true || is_hidden === 1 || is_hidden === '1') ? 1 : 0;

    let upsertSql = '';
    let params: any[] = [];

    if (hasIsHidden) {
      upsertSql = `
        INSERT INTO admin_contents (page_key, page_title, content, is_hidden)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE content = ?, is_hidden = ?
      `;
      params = [page_key, page_key, contentVal, isHiddenVal, contentVal, isHiddenVal];
    } else {
      upsertSql = `
        INSERT INTO admin_contents (page_key, page_title, content)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE content = ?
      `;
      params = [page_key, page_key, contentVal, contentVal];
    }

    await query(upsertSql, params);

    return NextResponse.json({ message: '콘텐츠가 성공적으로 수정되었습니다.' });
  } catch (err: any) {
    console.error('API Contents update error:', err);
    return NextResponse.json(
      { error: '콘텐츠 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

