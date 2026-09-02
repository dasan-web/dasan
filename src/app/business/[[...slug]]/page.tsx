import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { navigationData } from '@/lib/navigation';
import SubmenuTabBar from '@/components/SubmenuTabBar';
import { CheckCircle, ShieldCheck, Truck, Layers, Award, FileSpreadsheet, FlaskConical, ClipboardCheck, FileCheck, Factory, ChevronRight, Globe2, Users, BookOpenCheck, Settings2, RefreshCw, ArrowRight, ArrowDown } from 'lucide-react';
import ProductSearch from '@/components/ProductSearch';
import ProductDetail from '@/components/ProductDetail';
import FindPharmacy from '@/components/FindPharmacy';
import ProductNewsBoard from '@/components/ProductNewsBoard';
import CDMOTabSection from '@/components/CDMOTabSection';
import ApiRawContent from '@/components/ApiRawContent';
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
  
  const grandBiz = navigationData.find(g => g.name === 'Business');
  if (grandBiz) {
    for (const major of grandBiz.majors) {
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
    if (!activeMajorObj && grandBiz.majors.length > 0) {
      activeMajorObj = grandBiz.majors[0];
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
      case '/business/cdmo/quality': {
        return (
          <>
            <div className="w-[100vw] aspect-[21/9] animate-fade-in-up bg-black overflow-hidden relative left-1/2 -translate-x-1/2 mb-4 mt-4 shadow-sm" style={{ aspectRatio: '21 / 9' }}>
              <video 
                className="w-full h-full object-cover"
                src="/CDMO_219.mp4"
                poster="/poster_cdmo.jpg"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            </div>
            
            <div className="mt-24 w-full max-w-5xl mx-auto animate-fade-in-up px-4 md:px-0 pb-20">
              {/* Header Section */}
              <div className="flex flex-col space-y-6 mb-24 sm:mb-28">
                <h2 className="text-[32px] md:text-[40px] font-black text-[#111] leading-[1.3] tracking-tight">
                  One-stop CDMO Solution
                </h2>
                <div className="text-gray-500 leading-[1.8] text-[15px] md:text-[16px] space-y-3 w-full">
                  <p className="break-keep lg:whitespace-nowrap font-medium text-[#666]">
                    다산제약은 의약품 연구개발 역량과 GMP 기반 생산 인프라를 바탕으로 제네릭 및 개량신약의 개발부터 생산까지 맞춤형 CDMO 서비스를 제공합니다.
                  </p>
                  <p className="break-keep font-medium text-[#666]">
                    <strong className="font-bold text-gray-900">Multi-Stra®</strong>를 기반으로 차별화된 제형 설계 및 약물 방출 기술을 제공합니다.
                  </p>
                </div>
              </div>

              {/* Quality Title */}
              <div className="mb-6">
                <h3 className="text-[26px] font-black text-gray-900 tracking-tight">CDMO PROCESS</h3>
              </div>

              {/* Process Flow (5 Steps: 개발, 임상, 기술이전, 품질, 생산) with Arrow Connectors */}
              <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-2.5 pt-2">
                {/* Step 1: 개발 */}
                <div className="flex-1 w-full bg-white border border-gray-200/70 hover:border-[#64ad55] rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
                  <div>
                    <div className="flex items-center justify-between w-full mb-4">
                      <span className="text-[11px] font-black text-[#64ad55] uppercase tracking-wider bg-[#64ad55]/10 px-2.5 py-0.5 rounded-md">STEP 01</span>
                      <FlaskConical size={22} strokeWidth={1.5} className="text-[#64ad55] transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h4 className="text-[16px] font-bold text-gray-900 mb-2 tracking-tight">개발</h4>
                    <p className="text-[12.5px] text-gray-600 leading-[1.65] break-keep font-normal">
                      개량신약, 제네릭 의약품의 제제 및 공정 개발 능력
                    </p>
                  </div>
                </div>

                {/* Arrow 1 -> 2 */}
                <div className="flex items-center justify-center py-1 lg:py-0 px-0.5 text-[#64ad55]">
                  <div className="w-8 h-8 rounded-full bg-[#64ad55]/10 border border-[#64ad55]/30 flex items-center justify-center shadow-2xs transition-transform hover:scale-110">
                    <ArrowRight size={16} strokeWidth={2.5} className="hidden lg:block text-[#64ad55]" />
                    <ArrowDown size={16} strokeWidth={2.5} className="block lg:hidden text-[#64ad55]" />
                  </div>
                </div>

                {/* Step 2: 임상 */}
                <div className="flex-1 w-full bg-white border border-gray-200/70 hover:border-[#64ad55] rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
                  <div>
                    <div className="flex items-center justify-between w-full mb-4">
                      <span className="text-[11px] font-black text-[#64ad55] uppercase tracking-wider bg-[#64ad55]/10 px-2.5 py-0.5 rounded-md">STEP 02</span>
                      <ClipboardCheck size={22} strokeWidth={1.5} className="text-[#64ad55] transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h4 className="text-[16px] font-bold text-gray-900 mb-2 tracking-tight">임상</h4>
                    <p className="text-[12.5px] text-gray-600 leading-[1.65] break-keep font-normal">
                      소규모부터 대규모 글로벌 임상까지 다양한 규모의 임상 경험
                    </p>
                  </div>
                </div>

                {/* Arrow 2 -> 3 */}
                <div className="flex items-center justify-center py-1 lg:py-0 px-0.5 text-[#64ad55]">
                  <div className="w-8 h-8 rounded-full bg-[#64ad55]/10 border border-[#64ad55]/30 flex items-center justify-center shadow-2xs transition-transform hover:scale-110">
                    <ArrowRight size={16} strokeWidth={2.5} className="hidden lg:block text-[#64ad55]" />
                    <ArrowDown size={16} strokeWidth={2.5} className="block lg:hidden text-[#64ad55]" />
                  </div>
                </div>

                {/* Step 3: 기술이전 */}
                <div className="flex-1 w-full bg-white border border-gray-200/70 hover:border-[#64ad55] rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
                  <div>
                    <div className="flex items-center justify-between w-full mb-4">
                      <span className="text-[11px] font-black text-[#64ad55] uppercase tracking-wider bg-[#64ad55]/10 px-2.5 py-0.5 rounded-md">STEP 03</span>
                      <RefreshCw size={22} strokeWidth={1.5} className="text-[#64ad55] transition-transform duration-300 group-hover:rotate-45" />
                    </div>
                    <h4 className="text-[16px] font-bold text-gray-900 mb-2 tracking-tight">기술이전</h4>
                    <p className="text-[12.5px] text-gray-600 leading-[1.65] break-keep font-normal">
                      연구개발된 제제 및 공정의 Scale-up을 통해 안정적인 생산으로 연결
                    </p>
                  </div>
                </div>

                {/* Arrow 3 -> 4 */}
                <div className="flex items-center justify-center py-1 lg:py-0 px-0.5 text-[#64ad55]">
                  <div className="w-8 h-8 rounded-full bg-[#64ad55]/10 border border-[#64ad55]/30 flex items-center justify-center shadow-2xs transition-transform hover:scale-110">
                    <ArrowRight size={16} strokeWidth={2.5} className="hidden lg:block text-[#64ad55]" />
                    <ArrowDown size={16} strokeWidth={2.5} className="block lg:hidden text-[#64ad55]" />
                  </div>
                </div>

                {/* Step 4: 품질 */}
                <div className="flex-1 w-full bg-white border border-gray-200/70 hover:border-[#64ad55] rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
                  <div>
                    <div className="flex items-center justify-between w-full mb-4">
                      <span className="text-[11px] font-black text-[#64ad55] uppercase tracking-wider bg-[#64ad55]/10 px-2.5 py-0.5 rounded-md">STEP 04</span>
                      <ShieldCheck size={22} strokeWidth={1.5} className="text-[#64ad55] transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h4 className="text-[16px] font-bold text-gray-900 mb-2 tracking-tight">품질(QA/QC)</h4>
                    <p className="text-[12.5px] text-gray-600 leading-[1.65] break-keep font-normal">
                      QA·QC 체계를 기반으로 원료부터 완제품까지 전 과정의 품질 관리
                    </p>
                  </div>
                </div>

                {/* Arrow 4 -> 5 */}
                <div className="flex items-center justify-center py-1 lg:py-0 px-0.5 text-[#64ad55]">
                  <div className="w-8 h-8 rounded-full bg-[#64ad55]/10 border border-[#64ad55]/30 flex items-center justify-center shadow-2xs transition-transform hover:scale-110">
                    <ArrowRight size={16} strokeWidth={2.5} className="hidden lg:block text-[#64ad55]" />
                    <ArrowDown size={16} strokeWidth={2.5} className="block lg:hidden text-[#64ad55]" />
                  </div>
                </div>

                {/* Step 5: 생산 */}
                <div className="flex-1 w-full bg-white border border-gray-200/70 hover:border-[#64ad55] rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
                  <div>
                    <div className="flex items-center justify-between w-full mb-4">
                      <span className="text-[11px] font-black text-[#64ad55] uppercase tracking-wider bg-[#64ad55]/10 px-2.5 py-0.5 rounded-md">STEP 05</span>
                      <Factory size={22} strokeWidth={1.5} className="text-[#64ad55] transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h4 className="text-[16px] font-bold text-gray-900 mb-2 tracking-tight">생산</h4>
                    <p className="text-[12.5px] text-gray-600 leading-[1.65] break-keep font-normal">
                      비임상물질부터 상업 생산까지 다양한 생산 규모에 대응할 수 있는 생산 시설
                    </p>
                  </div>
                </div>
              </div>



              {/* Interactive WHY DASAN & Detailed Tab Section */}
              <CDMOTabSection />
            </div>
          </>
        );
      }

      case '/business/cdmo/advantages':
      case '/business/cdmo/logistics': {
        let platformTitle = 'Dasan CDMO Advantage Platform';
        let intro = '다산제약은 단순 위탁 생산(CMO)의 단계를 넘어 약물의 제제 개발부터 임상 배치 생산, 시판 승인 신청(NDA) 지원까지 일원화된 위탁 개발 생산(CDMO) 원스톱 서비스를 지원합니다.';
        let bullet1Title = '우수한 품질관리(QA/QC)';
        let bullet1Desc = '한국 식약처 KGMP 인증 보유 및 cGMP 기준 분석 장비와 데이터 무결성(Data Integrity) 지침 철저 운영.';
        let bullet2Title = '특화된 과립 코팅 기술';
        let bullet2Desc = '입자가 미세한 API의 용출 속도를 제어하는 유동층 과립기 및 정밀 정제 타정 공정 장치 다수 운영.';
        let bullet3Title = '글로벌 콜드체인 물류';
        let bullet3Desc = '생물학적 활성을 보존해야 하는 원료 및 중간체의 완벽한 보관 온습도 관리를 통한 글로벌 항공/해상 물류망 확보.';

        if (dbContent) {
          const lines = dbContent.split('\n');
          platformTitle = lines[0] || platformTitle;
          intro = lines[1] || intro;
          bullet1Title = lines[2] || bullet1Title;
          bullet1Desc = lines[3] || bullet1Desc;
          bullet2Title = lines[4] || bullet2Title;
          bullet2Desc = lines[5] || bullet2Desc;
          bullet3Title = lines[6] || bullet3Title;
          bullet3Desc = lines[7] || bullet3Desc;
        }

        return (
          <div className="space-y-6 animate-fade-in-up bg-white p-6 rounded-xl shadow-none">
            <h4 className="text-lg font-bold text-brand-blue mb-2 flex items-center space-x-2">
              <ShieldCheck size={22} className="text-brand-teal" />
              <span>{platformTitle}</span>
            </h4>
            {(typeof intro === 'string' && (intro.includes('<p') || intro.includes('<h'))) ? (
              <div dangerouslySetInnerHTML={{ __html: intro }} className="[&_p]:text-gray-650 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold" />
            ) : (
              <p className="text-gray-650 text-sm leading-relaxed whitespace-pre-wrap">
                {intro}
              </p>
            )}
            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3 text-xs text-gray-500">
                <CheckCircle size={16} className="text-brand-cyan flex-shrink-0 mt-0.5" />
                <p><strong className="text-brand-blue">{bullet1Title}</strong>: {bullet1Desc}</p>
              </div>
              <div className="flex items-start space-x-3 text-xs text-gray-500">
                <Layers size={16} className="text-brand-cyan flex-shrink-0 mt-0.5" />
                <p><strong className="text-brand-blue">{bullet2Title}</strong>: {bullet2Desc}</p>
              </div>
              <div className="flex items-start space-x-3 text-xs text-gray-500">
                <Truck size={16} className="text-brand-cyan flex-shrink-0 mt-0.5" />
                <p><strong className="text-brand-blue">{bullet3Title}</strong>: {bullet3Desc}</p>
              </div>
            </div>
          </div>
        );
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
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 mt-4">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Left Sidebar Submenu (PC) - Hidden by user request to remove left frame */}
          <aside className="lg:col-span-1 pr-6 border-r border-gray-100 hidden space-y-8">
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-black text-brand-green tracking-tight pb-2 border-b-2 border-brand-green inline-block">
                  {grandBiz?.name}
                </h3>
              </div>
              <nav className="space-y-6">
                {grandBiz?.majors.map(major => (
                  <div key={major.name} className="space-y-2 mt-5 first:mt-0">
                    {grandBiz.majors.length > 1 && (
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
              <div className="flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-green mb-3">
                <span>{grandBiz?.name}</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-400">{activeMajor}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-brand-blue tracking-tight text-center mb-6">{activeTitle}</h2>

              {/* Premium Glassmorphic Tab Bar with Sliding Animation */}
              <SubmenuTabBar subMenus={activeMajorObj?.subMenus || []} currentPath={currentPath} />
            </div>

            {/* Dynamic Content - Width centered and bounded for clean layout */}
            <div className={`w-full ${currentPath === '/business/cdmo/quality' ? 'max-w-full' : 'max-w-5xl'}`}>
              {renderContent()}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
