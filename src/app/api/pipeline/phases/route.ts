import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '@/lib/db';
import { decryptSession } from '@/lib/auth';

const DEFAULT_PHASES = '기초연구|전임상|임상 1상|임상 2상|임상 3상|허가';

// Helper function to verify user role
async function checkAuth(allowedRoles: string[]) {
  const cookieStore = await cookies();
  const token = cookieStore.get('dasan-admin-session')?.value;
  const session = token ? decryptSession(token) : null;

  if (!session || !session.expiresAt || Date.now() > session.expiresAt) {
    return { error: '인증 세션이 만료되었습니다. 다시 로그인해주세요.', status: 401 };
  }

  if (!allowedRoles.includes(session.role)) {
    return { error: `이 작업을 수행할 권한이 없습니다.`, status: 403 };
  }

  return { session };
}

export async function GET() {
  try {
    const results: any = await query('SELECT content FROM admin_contents WHERE page_key = ?', ['pipeline/phases']);
    if (results && results.length > 0 && results[0].content) {
      const raw = results[0].content;
      if (raw.startsWith('{')) {
        try {
          const parsed = JSON.parse(raw);
          return NextResponse.json({ 
            phases: parsed.phases || DEFAULT_PHASES.split('|'),
            hideProjectName: !!parsed.hideProjectName 
          });
        } catch (e) {
          // fallback to pipe split if JSON parse fails
        }
      }
      return NextResponse.json({ 
        phases: raw.split('|').filter(Boolean),
        hideProjectName: false
      });
    }
    
    // Return default if not set
    return NextResponse.json({ phases: DEFAULT_PHASES.split('|'), hideProjectName: false });
  } catch (err: any) {
    console.error('API Pipeline phases fetch error:', err);
    return NextResponse.json({ error: '데이터를 가져오는데 실패했습니다.', phases: DEFAULT_PHASES.split('|'), hideProjectName: false }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await checkAuth(['super_admin', 'editor']);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { phases, hideProjectName } = await request.json();

    if (!phases || !Array.isArray(phases)) {
      return NextResponse.json({ error: '유효한 단계 목록이 제공되지 않았습니다.' }, { status: 400 });
    }

    const payload = JSON.stringify({
      phases,
      hideProjectName: !!hideProjectName
    });

    // UPSERT logic using page_key
    const updateSql = `
      INSERT INTO admin_contents (page_key, page_title, content)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE content = VALUES(content)
    `;
    await query(updateSql, ['pipeline/phases', '파이프라인 단계 및 설정', payload]);

    return NextResponse.json({ message: '설정이 성공적으로 저장되었습니다.', phases, hideProjectName: !!hideProjectName });
  } catch (err: any) {
    console.error('API Pipeline phases update error:', err);
    return NextResponse.json({ error: '데이터를 저장하는데 실패했습니다.' }, { status: 500 });
  }
}
