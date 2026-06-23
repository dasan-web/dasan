import React from 'react';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { navigationData } from '@/lib/navigation';
import SubmenuTabBar from '@/components/SubmenuTabBar';
import { query } from '@/lib/db';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  try {
    let results = await query('SELECT content FROM admin_contents WHERE page_key = ?', ['seo/contact/inquiry/sales']);
    if (!results || results.length === 0 || !results[0].content) {
      results = await query('SELECT content FROM admin_contents WHERE page_key = ?', ['seo/contact']);
    }

    if (results && results.length > 0 && results[0].content) {
      const [title, keywords, description] = results[0].content.split('|');
      return {
        title: title || '영업 문의 | 다산제약',
        keywords: keywords || '다산제약 영업 문의, 구매 제휴, 비즈니스 협력',
        description: description || '다산제약의 영업 및 비즈니스 관련 문의를 남겨주시면 담당 부서에서 신속히 연락 드리겠습니다.',
      };
    }
  } catch (e) {
    console.error('Failed to load contact sales inquiry page metadata:', e);
  }
  return {
    title: '영업 문의 | 다산제약',
    description: '다산제약의 영업 및 비즈니스 관련 문의를 남겨주시면 담당 부서에서 신속히 연락 드리겠습니다.',
    keywords: '다산제약 영업 문의, 구매 제휴, 비즈니스 협력',
  };
}

export default function ContactSalesInquiryPage() {
  const currentPath = '/contact/inquiry/sales';
  const activeTitle = '영업 문의';
  const activeMajor = '고객센터';
  
  const grandContact = navigationData.find(g => g.name === 'Connect');

  return (
    <div className="relative bg-white py-16 md:py-24 min-h-screen">
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 mt-8">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Left Sidebar Submenu (PC) - Hidden by user request to remove left frame */}
          <aside className="lg:col-span-1 pr-6 border-r border-gray-150 hidden space-y-8">
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-black text-brand-green tracking-tight pb-2 border-b-2 border-brand-green inline-block">
                  {grandContact?.name}
                </h3>
              </div>
              <nav className="space-y-6">
                {grandContact?.majors.map(major => (
                  <div key={major.name} className="space-y-2 mt-5 first:mt-0">
                    {grandContact.majors.length > 1 && (
                      <h4 className="text-[12px] font-bold tracking-wider text-gray-400 uppercase">
                        {major.name}
                      </h4>
                    )}
                    <ul className="space-y-1.5">
                      {major.subMenus.map(sub => {
                        const isActive = currentPath === sub.link;
                        return (
                          <li key={sub.name}>
                            <Link
                              href={sub.link}
                              className={`group flex items-center py-2 text-[15px] transition-all duration-200 ${
                                isActive
                                  ? 'text-brand-green font-black'
                                  : 'text-gray-500 hover:text-brand-green font-semibold hover:translate-x-0.5'
                              }`}
                            >
                              <span className={`mr-2 h-1.5 rounded-full bg-brand-green transition-all duration-300 ${
                                isActive ? 'w-1.5 opacity-100' : 'w-0 opacity-0 group-hover:w-1 group-hover:opacity-50'
                              }`} />
                              {sub.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Right Main Content - Expanded to full width (col-span-5) to remove sidebar frame space */}
          <div className="lg:col-span-5 space-y-8 flex flex-col items-center w-full">
            {/* Header - Centered for symmetry */}
            <div className="pb-8 border-b border-gray-100 w-full text-center flex flex-col items-center">
              <div className="flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-green mb-3">
                <span>{grandContact?.name}</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-400">{activeMajor}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-brand-blue tracking-tight text-center mb-6">{activeTitle}</h2>

              {/* Premium Glassmorphic Tab Bar with Sliding Animation */}
              <SubmenuTabBar subMenus={grandContact?.majors.flatMap(m => m.subMenus) || []} currentPath={currentPath} />
            </div>

            {/* Dynamic Content - Width centered and bounded for clean layout */}
            <div className="min-h-[550px] w-full max-w-5xl">
              <ContactForm inquiryType="sales" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
