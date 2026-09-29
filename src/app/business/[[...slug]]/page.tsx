import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { navigationData } from '@/lib/navigation';
import SubmenuTabBar from '@/components/SubmenuTabBar';
import { ChevronRight } from 'lucide-react';
import ProductSearch from '@/components/ProductSearch';
import ProductDetail from '@/components/ProductDetail';
import FindPharmacy from '@/components/FindPharmacy';
import ProductNewsBoard from '@/components/ProductNewsBoard';
import ApiRawContent from '@/components/ApiRawContent';
import CdmoContent from '@/components/CdmoContent';
import type { Metadata } from 'next';

import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const pageKey = `business/${slug.join('/')}`;

  try {
    // 1. Try page-specific SEO
    let results = await query('SELECT content FROM admin_contents WHERE page_key = ?', [`seo/${pageKey}`]);
    
    // If not found or empty, fall back to main Business SEO
    if (!results || results.length === 0 || !results[0].content) {
      results = await query('SELECT content FROM admin_contents WHERE page_key = ?', ['seo/business']);
    }

    if (results && results.length > 0 && results[0].content) {
      const [title, keywords, description] = results[0].content.split('|');
      let finalTitle = title;
      if (!finalTitle || finalTitle.includes('Business') || finalTitle === '제품검색' || finalTitle === '제품소식' || finalTitle === '원료의약품(API)' || finalTitle === '원료의약품 중간체' || finalTitle.includes('CDMO')) {
        finalTitle = '다산제약_Business';
      }
      return {
        title: finalTitle,
        keywords: keywords || '의약품 CDMO, 완제의약품 위탁생산, Pharmaceutical CDMO, CMO',
        description: description || '다산제약의 완제의약품, API 원료의약품 공급 및 의약품 위탁개발생산(CDMO) 사업 영역을 소개합니다.',
      };
    }
  } catch (e) {
    console.error('Failed to load business page metadata:', e);
  }
  return {
    title: '다산제약_Business',
    description: '다산제약의 완제의약품, API 원료의약품 공급 및 의약품 위탁개발생산(CDMO) 사업 영역을 소개합니다.',
    keywords: '의약품 CDMO, 완제의약품 위탁생산, Pharmaceutical CDMO, CMO',
  };
}

interface Params {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function BusinessCatchAllPage({ params }: Params) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];

  if (slug.length === 0) {
    redirect('/business/finished/search');
  }

  const currentPath = `/business/${slug.join('/')}`;
  const pageKey = `business/${slug.join('/')}`;

  let dbContent: string | null = null;
  try {
    const results = await query('SELECT content FROM admin_contents WHERE page_key = ?', [pageKey]);
    if (results && results.length > 0) {
      dbContent = results[0].content;
    }
  } catch (err) {
    console.error('Failed to load db content:', err);
  }

  let activeTitle = 'Business';
  let activeMajor = '완제의약품';
  let activeMajorObj = null;
  
  const isCdmo = currentPath.startsWith('/business/cdmo');
  const targetGrand = isCdmo
    ? navigationData.find(g => g.name === 'CDMO')
    : navigationData.find(g => g.name === 'Business');

  if (targetGrand) {
    for (const major of targetGrand.majors) {
      if (major.link === currentPath || currentPath === `/business/${major.name.toLowerCase()}` || (major.enName && currentPath === `/business/${major.enName.toLowerCase()}`)) {
        activeTitle = major.name;
        activeMajor = major.name;
        activeMajorObj = major;
        break;
      }
      const sub = major.subMenus.find(s => s.link === currentPath);
      if (sub) {
        activeTitle = sub.name;
        activeMajor = major.name;
        activeMajorObj = major;
        break;
      }
    }
    if (!activeMajorObj && targetGrand.majors.length > 0) {
      activeMajorObj = targetGrand.majors[0];
      if (isCdmo) {
        activeTitle = 'CDMO';
        activeMajor = 'CDMO';
      }
    }
  }
    
  const renderContent = () => {
    // Dynamic Product Detail Route
    if (slug.length === 3 && slug[0] === 'finished' && slug[1] === 'search') {
      return <ProductDetail productId={slug[2]} isEnglish={false} />;
    }

    switch (currentPath) {
      case '/business/finished/search':
        return (
          <ProductSearch />
        );

      case '/business/finished/pharmacy':
        return (
          <FindPharmacy />
        );

      case '/business/finished/news': {
        return <ProductNewsBoard isEnglish={false} />;
      }

      case '/business/api':
      case '/business/api/raw':
      case '/business/api/intermediates': {
        return <ApiRawContent dbContent={dbContent} />;
      }

      case '/business/cdmo':
      case '/business/cdmo/quality':
      case '/business/cdmo/advantages':
      case '/business/cdmo/logistics': {
        return <CdmoContent dbContent={dbContent} />;
      }

      default:
        return (
          <div className="text-center py-12 text-gray-500 text-sm">
            상세 정보를 준비 중입니다.
          </div>
        );
    }
  };

  return (
    <div className="relative bg-white pt-10 md:pt-14 pb-10 min-h-screen">
      <div className={`relative z-10 w-full ${currentPath.startsWith('/business/cdmo') || currentPath.startsWith('/business/api') ? 'px-2 sm:px-4 md:px-6 lg:px-8 max-w-[1800px] mx-auto' : 'px-6 md:px-16 lg:px-24'} mt-4`}>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Left Sidebar Submenu (PC) - Hidden by user request to remove left frame */}
          <aside className="lg:col-span-1 pr-6 border-r border-gray-100 hidden space-y-8">
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-black text-brand-green tracking-tight pb-2 border-b-2 border-brand-green inline-block">
                  {targetGrand?.name}
                </h3>
              </div>
              <nav className="space-y-6">
                {targetGrand?.majors.map(major => (
                  <div key={major.name} className="space-y-2 mt-5 first:mt-0">
                    {targetGrand.majors.length > 1 && (
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
            <div className="pb-8 w-full text-center flex flex-col items-center">
              {!isCdmo && (
                <div className="flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-green mb-3">
                  <span>{targetGrand?.name}</span>
                  {activeMajor && activeMajor.toLowerCase() !== targetGrand?.name?.toLowerCase() && (
                    <>
                      <span className="text-gray-300">/</span>
                      <span className="text-gray-400">{activeMajor}</span>
                    </>
                  )}
                </div>
              )}
              
              <h2 className="text-3xl md:text-4xl font-black text-brand-blue tracking-tight text-center mb-6">{activeTitle}</h2>

              {/* Premium Glassmorphic Tab Bar with Sliding Animation */}
              <SubmenuTabBar subMenus={activeMajorObj?.subMenus || []} currentPath={currentPath} />
            </div>

            {/* Dynamic Content - Width centered and bounded for clean layout */}
            <div className={`w-full ${currentPath.startsWith('/business/api') || currentPath.startsWith('/business/cdmo') ? 'max-w-full' : 'max-w-5xl'}`}>
              {renderContent()}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
