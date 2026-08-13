import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '@/lib/db';
import { decryptSession } from '@/lib/auth';

const DEFAULT_CATEGORIES = '바이오신약|합성신약|제네릭';

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
    const results: any = await query('SELECT content FROM admin_contents WHERE page_key = ?', ['pipeline/categories']);
    if (results && results.length > 0 && results[0].content) {
      const raw = results[0].content;
      if (raw.startsWith('{')) {
        try {
          const parsed = JSON.parse(raw);
          return NextResponse.json({ 
            categories: parsed.categories || DEFAULT_CATEGORIES.split('|')
          });
        } catch (e) {
          // fallback to pipe split
        }
      }
      return NextResponse.json({ 
        categories: raw.split('|').filter(Boolean)
      });
    }
    
    // Return default if not set
    return NextResponse.json({ categories: DEFAULT_CATEGORIES.split('|') });
  } catch (err: any) {
    console.error('API Pipeline categories fetch error:', err);
    return NextResponse.json({ error: '데이터를 가져오는데 실패했습니다.', categories: DEFAULT_CATEGORIES.split('|') }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await checkAuth(['super_admin', 'editor']);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { categories } = await request.json();

    if (!categories || !Array.isArray(categories)) {
      return NextResponse.json({ error: '유효한 분류 목록이 제공되지 않았습니다.' }, { status: 400 });
    }

    const payload = JSON.stringify({ categories });

    // UPSERT logic using page_key
    const updateSql = `
      INSERT INTO admin_contents (page_key, page_title, content)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE content = VALUES(content)
    `;
    await query(updateSql, ['pipeline/categories', '파이프라인 분류 설정', payload]);

    return NextResponse.json({ message: '설정이 성공적으로 저장되었습니다.', categories });
  } catch (err: any) {
    console.error('API Pipeline categories update error:', err);
    return NextResponse.json({ error: '데이터를 저장하는데 실패했습니다.' }, { status: 500 });
  }
}
