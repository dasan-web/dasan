import React from 'react';
import { query } from '@/lib/db';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  try {
    let results = await query('SELECT content FROM admin_contents WHERE page_key = ?', ['seo/en/contact/inquiry/check']);
    if (!results || results.length === 0 || !results[0].content) {
      results = await query('SELECT content FROM admin_contents WHERE page_key = ?', ['seo/en/contact']);
    }

    if (results && results.length > 0 && results[0].content) {
      const [title, keywords, description] = results[0].content.split('|');
      return {
        title: title || 'Check Inquiry | DASAN Pharmaceutical',
        keywords: keywords || 'DASAN Pharmaceutical, Check Inquiry, Inquiry Status, Customer Service',
        description: description || 'Check your submitted inquiry status and responses securely through email verification.',
      };
    }
  } catch (e) {
    console.error('Failed to load contact inquiry check page metadata:', e);
  }
  return {
    title: 'Check Inquiry | DASAN Pharmaceutical',
    description: 'Check your submitted inquiry status and responses securely through email verification.',
    keywords: 'DASAN Pharmaceutical, Check Inquiry, Inquiry Status, Customer Service',
  };
}

export default function InquiryCheckLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
