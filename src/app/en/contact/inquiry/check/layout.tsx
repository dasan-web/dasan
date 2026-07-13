import React from 'react';
import { query } from '@/lib/db';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  try {
    let results = await query('SELECT content FROM admin_contents WHERE page_key = ?', ['seo/contact/inquiry/check']);
    if (!results || results.length === 0 || !results[0].content) {
      results = await query('SELECT content FROM admin_contents WHERE page_key = ?', ['seo/contact']);
    }

    if (results && results.length > 0 && results[0].content) {
      const [title, keywords, description] = results[0].content.split('|');
      return {
        title: title || '문의 내역 확인 | 다산제약',
        keywords: keywords || '다산제약 문의 조회, 문의 내역 확인, 고객센터',
        description: description || '다산제약에 접수해주신 고객 문의 내역과 답변을 안전하게 이메일 인증을 통해 확인할 수 있습니다.',
      };
    }
  } catch (e) {
    console.error('Failed to load contact inquiry check page metadata:', e);
  }
  return {
    title: '문의 내역 확인 | 다산제약',
    description: '다산제약에 접수해주신 고객 문의 내역과 답변을 안전하게 이메일 인증을 통해 확인할 수 있습니다.',
    keywords: '다산제약 문의 조회, 문의 내역 확인, 고객센터',
  };
}

export default function InquiryCheckLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
