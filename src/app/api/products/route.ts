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

export async function GET() {
  try {
    const products = await query('SELECT * FROM products ORDER BY id ASC');
    const formatted = products.map((p: any) => ({
      id: p.id,
      name: p.name,
      englishName: p.english_name || '',
      type: p.type,
      efficacy: p.efficacy,
      consonant: p.consonant,
      file_url: p.file_url || null,
      file_name: p.file_name || null
    }));
    return NextResponse.json(formatted);
  } catch (err: any) {
    console.error('API Products fetch error:', err);
    return NextResponse.json(
      { error: '제품 목록을 가져오는데 실패했습니다.' },
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
    const { name, englishName, type, efficacy, consonant, file_url, file_name } = await request.json();

    if (!name || !type || !efficacy || !consonant) {
      return NextResponse.json(
        { error: '이름, 타입(전문/일반), 효능, 초성은 필수 항목입니다.' },
        { status: 400 }
      );
    }

    const insertSql = `
      INSERT INTO products (name, english_name, type, efficacy, consonant, file_url, file_name)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await query(insertSql, [
      name,
      englishName || '',
      type,
      efficacy,
      consonant,
      file_url || null,
      file_name || null
    ]);

    return NextResponse.json({
      message: '제품이 성공적으로 등록되었습니다.',
      id: result.insertId,
    });
  } catch (err: any) {
    console.error('API Product creation error:', err);
    return NextResponse.json(
      { error: '제품 등록 중 오류가 발생했습니다.' },
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
    const { id, name, englishName, type, efficacy, consonant, file_url, file_name } = await request.json();

    if (!id || !name || !type || !efficacy || !consonant) {
      return NextResponse.json(
        { error: 'ID 및 필수 입력 항목 누락' },
        { status: 400 }
      );
    }

    const updateSql = `
      UPDATE products
      SET name = ?, english_name = ?, type = ?, efficacy = ?, consonant = ?, file_url = ?, file_name = ?
      WHERE id = ?
    `;
    await query(updateSql, [
      name,
      englishName || '',
      type,
      efficacy,
      consonant,
      file_url || null,
      file_name || null,
      id
    ]);

    return NextResponse.json({ message: '제품 정보가 성공적으로 수정되었습니다.' });
  } catch (err: any) {
    console.error('API Product update error:', err);
    return NextResponse.json(
      { error: '제품 정보 수정 중 오류가 발생했습니다.' },
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
        { error: '삭제할 제품의 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    await query('DELETE FROM products WHERE id = ?', [id]);
    return NextResponse.json({ message: '제품이 성공적으로 삭제되었습니다.' });
  } catch (err: any) {
    console.error('API Product delete error:', err);
    return NextResponse.json(
      { error: '제품 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
