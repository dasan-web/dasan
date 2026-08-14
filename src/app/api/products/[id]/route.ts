import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: '유효하지 않은 제품 ID입니다.' }, { status: 400 });
    }

    const products = await query('SELECT * FROM products WHERE id = ?', [id]);
    
    if (!products || products.length === 0) {
      return NextResponse.json({ error: '제품을 찾을 수 없습니다.' }, { status: 404 });
    }

    const p = products[0];
    const formatted = {
      id: p.id,
      name: p.name,
      englishName: p.english_name || '',
      type: p.type,
      consonant: p.consonant,
      efficacy: p.efficacy,
      file_url: p.file_url,
      // New fields from migration
      category: p.category || '',
      ingredient: p.ingredient || '',
      content: p.content || '',
      reference_drug: p.reference_drug || '',
      efficacy_detail: p.efficacy_detail || '',
      appearance: p.appearance || '',
      ingredient_detail: p.ingredient_detail || '',
      usage_capacity: p.usage_capacity || '',
      storage_method: p.storage_method || '',
      packaging_unit: p.packaging_unit || '',
      insurance_code: p.insurance_code || '',
      insurance_price: p.insurance_price || null,
      precautions: p.precautions || '',
      created_at: p.created_at,
    };

    return NextResponse.json(formatted, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
