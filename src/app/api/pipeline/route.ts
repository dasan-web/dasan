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
    const pipelines = await query('SELECT * FROM pipeline ORDER BY id ASC');
    return NextResponse.json(pipelines);
  } catch (err: any) {
    console.error('API Pipeline fetch error:', err);
    return NextResponse.json(
      { error: '데이터를 가져오는데 실패했습니다.' },
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
    const { category, project_name, disease, phase, partner } = await request.json();

    if (!category || !project_name || !disease || !phase) {
      return NextResponse.json(
        { error: '구분, 프로젝트명, 질환군, 개발단계는 필수 입력 사항입니다.' },
        { status: 400 }
      );
    }

    const insertSql = `
      INSERT INTO pipeline (category, project_name, disease, phase, partner)
      VALUES (?, ?, ?, ?, ?)
    `;
    const result = await query(insertSql, [category, project_name, disease, phase, partner || '']);

    return NextResponse.json({
      message: '파이프라인이 성공적으로 등록되었습니다.',
      id: result.insertId,
    });
  } catch (err: any) {
    console.error('API Pipeline creation error:', err);
    return NextResponse.json(
      { error: '파이프라인 등록 중 오류가 발생했습니다.' },
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
    const { id, category, project_name, disease, phase, partner } = await request.json();

    if (!id || !category || !project_name || !disease || !phase) {
      return NextResponse.json(
        { error: 'ID 및 필수 입력 사항 누락' },
        { status: 400 }
      );
    }

    const updateSql = `
      UPDATE pipeline
      SET category = ?, project_name = ?, disease = ?, phase = ?, partner = ?
      WHERE id = ?
    `;
    await query(updateSql, [category, project_name, disease, phase, partner || '', id]);

    return NextResponse.json({ message: '파이프라인 정보가 성공적으로 수정되었습니다.' });
  } catch (err: any) {
    console.error('API Pipeline update error:', err);
    return NextResponse.json(
      { error: '파이프라인 정보 수정 중 오류가 발생했습니다.' },
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
        { error: '삭제할 파이프라인의 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    await query('DELETE FROM pipeline WHERE id = ?', [id]);
    return NextResponse.json({ message: '파이프라인이 성공적으로 삭제되었습니다.' });
  } catch (err: any) {
    console.error('API Pipeline delete error:', err);
    return NextResponse.json(
      { error: '파이프라인 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
