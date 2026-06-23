import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { navigationData } from '@/lib/navigation';
import SubmenuTabBar from '@/components/SubmenuTabBar';
import PipelineChart from '@/components/PipelineChart';
import { Beaker, Shield, Zap, Search, HelpCircle, Layers } from 'lucide-react';
import type { Metadata } from 'next';

import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const pageKey = `rd/${slug.join('/')}`;

  try {
    // 1. Try page-specific SEO
    let results = await query('SELECT content FROM admin_contents WHERE page_key = ?', [`seo/${pageKey}`]);
    
    // If not found or empty, fall back to main R&D SEO
    if (!results || results.length === 0 || !results[0].content) {
      results = await query('SELECT content FROM admin_contents WHERE page_key = ?', ['seo/rd']);
    }

    if (results && results.length > 0 && results[0].content) {
      const [title, keywords, description] = results[0].content.split('|');
      let finalTitle = title;
      if (!finalTitle || finalTitle.includes('R&D') || finalTitle === '연구소 소개' || finalTitle === '연구 활동' || finalTitle === '파이프라인') {
        finalTitle = '다산제약_R&D';
      }
      return {
        title: finalTitle,
        keywords: keywords || 'DDS 플랫폼 기술, 유동층 코팅 기술, 제품센터',
        description: description || '다산제약의 약물전달시스템(DDS) 플랫폼 기술, 유동층 코팅 기술 등 독보적인 제제 기술 연구개발 역량을 소개합니다.',
      };
    }
  } catch (e) {
    console.error('Failed to load rd page metadata:', e);
  }
  return {
    title: '다산제약_R&D',
    description: '다산제약의 약물전달시스템(DDS) 플랫폼 기술, 유동층 코팅 기술 등 독보적인 제제 기술 연구개발 역량을 소개합니다.',
    keywords: 'DDS 플랫폼 기술, 유동층 코팅 기술, 제품센터',
  };
}

interface Params {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function RdCatchAllPage({ params }: Params) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];

  if (slug.length === 0) {
    redirect('/rd/intro');
  }

  const currentPath = `/rd/${slug.join('/')}`;
  const pageKey = `rd/${slug.join('/')}`;

  let dbContent: string | null = null;
  try {
    const results = await query('SELECT content FROM admin_contents WHERE page_key = ?', [pageKey]);
    if (results && results.length > 0) {
      dbContent = results[0].content;
    }
  } catch (err) {
    console.error('Failed to load db content:', err);
  }

  let activeTitle = 'R&D';
  let activeMajor = 'R&D';
  
  const grandRd = navigationData.find(g => g.name === 'Innovation');
  if (grandRd) {
    for (const major of grandRd.majors) {
      const sub = major.subMenus.find(s => s.link === currentPath);
      if (sub) {
        activeTitle = sub.name;
        activeMajor = major.name;
        break;
      }
    }
  }

  const renderContent = () => {
    switch (currentPath) {
      case '/rd/intro': {
        let title = '수원 중앙연구소 - 혁신 신약의 메카';
        let desc = '다산제약의 중앙연구소는 석·박사급 우수 연구인력과 고해상도 분광계, 정밀 HPLC 크로마토그래피 등 글로벌 탑티어 연구 인프라를 바탕으로 유기합성 원료 신기술 확보 및 DDS 복합 제제 개발을 이끌어내고 있습니다.';
        let part1Name = '합성 연구 파트';
        let part1Desc = '신약 합성 루트 설계, 특허 회피성 신규 고순도 원료의약품(API) 공정 개발';
        let part2Name = '제제 연구 파트';
        let part2Desc = '약물방출조절(DDS), 복합제 설계, 용해도 개선 및 제형 차별화 연구';

        if (dbContent) {
          const lines = dbContent.split('\n');
          title = lines[0] || title;
          desc = lines[1] || desc;
          part1Name = lines[2] || part1Name;
          part1Desc = lines[3] || part1Desc;
          part2Name = lines[4] || part2Name;
          part2Desc = lines[5] || part2Desc;
        }

        return (
          <div className="space-y-8 animate-fade-in-up">
            <div className="bg-white p-6 rounded-xl shadow-none">
              <h4 className="text-base font-bold text-brand-blue mb-2">{title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed whitespace-pre-wrap">{desc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-white space-y-2 shadow-none">
                <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center text-brand-teal"><Search size={18} /></div>
                <h5 className="font-bold text-brand-blue text-sm">{part1Name}</h5>
                <p className="text-xs text-gray-400 whitespace-pre-wrap">{part1Desc}</p>
              </div>
              <div className="p-5 rounded-xl bg-white space-y-2 shadow-none">
                <div className="w-10 h-10 bg-brand-cyan/10 rounded-lg flex items-center justify-center text-brand-cyan"><Layers size={18} /></div>
                <h5 className="font-bold text-brand-blue text-sm">{part2Name}</h5>
                <p className="text-xs text-gray-400 whitespace-pre-wrap">{part2Desc}</p>
              </div>
            </div>
          </div>
        );
      }

      case '/rd/activities': {
        let desc = '다산제약의 핵심 연구 성과는 고유한 DDS(약물전달시스템) 설계 능력에 기인합니다. 복용 편의성을 개선하고 부작용을 최소화하는 혁신적인 formulation 플랫폼을 확보하고 있습니다.';
        let tech1Name = 'DDS(약물전달시스템) 플랫폼 기술';
        let tech1Desc = '체내에서 약물이 서서히 방출되도록 설계하는 서방성 복합제 플랫폼을 보유하여 복용 횟수를 1일 3회에서 1일 1회로 개선하는 기술력 확보.';
        let tech2Name = '마이크로캡슐화 기술';
        let tech2Desc = '약물 분자를 머리카락 굵기의 미세 캡슐로 보호하여 위장 장애를 최소화하고 표적 부위에서 효율적으로 흡수되도록 유도.';

        if (dbContent) {
          const lines = dbContent.split('\n');
          desc = lines[0] || desc;
          tech1Name = lines[1] || tech1Name;
          tech1Desc = lines[2] || tech1Desc;
          tech2Name = lines[3] || tech2Name;
          tech2Desc = lines[4] || tech2Desc;
        }

        return (
          <div className="space-y-8 animate-fade-in-up">
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{desc}</p>
            
            <div className="space-y-4">
              <div className="p-5 bg-white rounded-xl flex items-start space-x-4 shadow-none">
                <span className="p-2 bg-brand-teal/10 rounded text-brand-teal"><Zap size={16} /></span>
                <div>
                  <h5 className="font-bold text-brand-blue text-sm">{tech1Name}</h5>
                  <p className="text-xs text-gray-500 mt-1 whitespace-pre-wrap">{tech1Desc}</p>
                </div>
              </div>
              <div className="p-5 bg-white rounded-xl flex items-start space-x-4 shadow-none">
                <span className="p-2 bg-brand-cyan/10 rounded text-brand-cyan"><Beaker size={16} /></span>
                <div>
                  <h5 className="font-bold text-brand-blue text-sm">{tech2Name}</h5>
                  <p className="text-xs text-gray-500 mt-1 whitespace-pre-wrap">{tech2Desc}</p>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case '/rd/pipeline':
        return (
          <div className="animate-fade-in-up">
            <PipelineChart />
          </div>
        );

      default:
        return (
          <div className="text-center py-12 text-gray-500 text-sm">
            상세 정보를 준비 중입니다.
          </div>
        );
    }
  };

  return (
    <div className="relative bg-white py-16 md:py-24 min-h-screen">
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 mt-8">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Left Sidebar Submenu (PC) - Hidden by user request to remove left frame */}
          <aside className="lg:col-span-1 pr-6 border-r border-gray-100 hidden space-y-8">
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-black text-brand-green tracking-tight pb-2 border-b-2 border-brand-green inline-block">
                  {grandRd?.name}
                </h3>
              </div>
              <nav className="space-y-6">
                {grandRd?.majors.map(major => (
                  <div key={major.name} className="space-y-2 mt-5 first:mt-0">
                    {grandRd.majors.length > 1 && (
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
                <span>{grandRd?.name}</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-400">{activeMajor}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-brand-blue tracking-tight text-center mb-6">{activeTitle}</h2>

              {/* Premium Glassmorphic Tab Bar with Sliding Animation */}
              <SubmenuTabBar subMenus={grandRd?.majors.flatMap(m => m.subMenus) || []} currentPath={currentPath} />
            </div>

            {/* Dynamic Content - Width centered and bounded for clean layout */}
            <div className="min-h-[550px] w-full max-w-5xl">
              {renderContent()}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
