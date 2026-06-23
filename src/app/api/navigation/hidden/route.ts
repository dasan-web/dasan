import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const results = await query('SELECT page_key FROM admin_contents WHERE is_hidden = 1');
    
    // Extract key relative paths from the db keys (e.g. 'seo/about/intro' -> 'about/intro')
    const hiddenKeys = results.map((row: any) => {
      let key = row.page_key;
      if (key.startsWith('seo/')) {
        key = key.substring(4);
      }
      return key;
    });

    return NextResponse.json({ hiddenKeys });
  } catch (err: any) {
    console.error('API Hidden navigation fetch error:', err);
    return NextResponse.json({ hiddenKeys: [] });
  }
}
