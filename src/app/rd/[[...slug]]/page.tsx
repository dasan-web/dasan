import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { navigationData } from '@/lib/navigation';
import SubmenuTabBar from '@/components/SubmenuTabBar';
import PipelineChart from '@/components/PipelineChart';
import RdIntroContent from '@/components/RdIntroContent';
import RdActivitiesContent from '@/components/RdActivitiesContent';
import { Beaker, Shield, Zap, Search, HelpCircle, Layers } from 'lucide-react';
import type { Metadata } from 'next';

import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const pageKey = `rd/${slug.join('/')}`;

  try {
    let results = await query('SELECT content FROM admin_contents WHERE page_key = ?', [`seo/${pageKey}`]);
    
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

  if (slug.length === 0 || slug.join('/') === 'activities') {
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
  let activeMajorObj = null;
  
  const grandRd = navigationData.find(g => g.name === 'Innovation');
  if (grandRd) {
    for (const major of grandRd.majors) {
      const sub = major.subMenus.find(s => s.link === currentPath);
      if (sub) {
        activeTitle = sub.name;
        activeMajor = major.name;
        activeMajorObj = major;
        break;
      }
    }
    if (!activeMajorObj && grandRd.majors.length > 0) {
      activeMajorObj = grandRd.majors[0];
    }
  }

  const renderContent = () => {
    switch (currentPath) {
      case '/rd/intro': {
        return <RdIntroContent dbContent={dbContent} />;
      }

      case '/rd/activities': {
        return <RdActivitiesContent dbContent={dbContent} />;
      }

      case '/rd/pipeline':
        return (
          <div className="animate-fade-in-up">
            <PipelineChart />
          </div>
        );

      default:
        return (
          <div className="text-center py-12 text-slate-400 text-sm">
            상세 정보를 준비 중입니다.
          </div>
        );
    }
  };

  return (
    <div className="relative bg-white py-12 md:py-20 min-h-screen">
      <div className="relative z-10 w-full px-4 md:px-12 lg:px-20 mt-4">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
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

          <div className="lg:col-span-5 space-y-8 flex flex-col items-center w-full">
            <div className="pb-6 w-full text-center flex flex-col items-center">
              <div className="flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">
                <span>{grandRd?.name}</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-400">{activeMajor}</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight text-center mb-6">{activeTitle}</h2>

              <SubmenuTabBar subMenus={activeMajorObj?.subMenus || []} currentPath={currentPath} />
            </div>

            <div className="min-h-[550px] w-full max-w-6xl">
              {renderContent()}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
