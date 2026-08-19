import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { navigationData } from '@/lib/navigation';
import SubmenuTabBar from '@/components/SubmenuTabBar';
import { CheckCircle, ShieldCheck, Truck, Layers, Award, FileSpreadsheet, FlaskConical, ClipboardCheck, FileCheck, Factory, ChevronRight, Globe2, Users, BookOpenCheck, Settings2, RefreshCw } from 'lucide-react';
import ProductSearch from '@/components/ProductSearch';
import ProductDetail from '@/components/ProductDetail';
import FindPharmacy from '@/components/FindPharmacy';
import ProductNewsBoard from '@/components/ProductNewsBoard';
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
        const sections = [
          {
            num: '01',
            title: 'Innovative API Development',
            subTitle: '혁신적인 원료의약품 개발',
            intro: '차별화된 원료가 의약품의 새로운 가치를 만듭니다.',
            body: 'Prodrug 및 고부가가치 원료의약품을 비롯하여 최신 제약 기술을 적용한 차별화된 API 개발을 추진합니다.\n다산제약이 보유한 제제·연구개발 역량과 원료 개발 경험을 연결하여 고객의 제품 경쟁력을 높이고 글로벌 시장 진출을 지원합니다.',
            keywords: ['Prodrug', 'High-value API', 'Process Development', 'Innovative Technology']
          },
          {
            num: '02',
            title: 'Quality First',
            subTitle: '품질을 최우선으로',
            intro: '품질은 선택이 아니라 신뢰의 기준입니다.',
            body: '의약품의 출발점인 원료부터 엄격한 품질 기준을 적용합니다.\n원료 선정, 제조, 시험 및 공급 단계에 이르기까지 체계적인 품질관리 시스템을 기반으로 안전성과 일관성을 확보하고, 고객이 신뢰할 수 있는 원료 파트너가 되겠습니다.',
            keywords: ['Quality Assurance', 'Reliable API', 'Traceability', 'Consistent Quality']
          },
          {
            num: '03',
            title: 'Sustainable API',
            subTitle: '지속가능한 미래를 위한 원료',
            intro: '환경을 고려한 의약품 개발은 미래 경쟁력의 시작입니다.',
            body: '효율적인 제조공정과 친환경적인 원료 및 생산기술을 지속적으로 검토하고 도입하여 환경 부담을 줄이는 원료의약품 사업을 추구합니다.\n품질과 생산성뿐만 아니라 지속가능성까지 고려한 API 개발을 통해 더 나은 제약 산업의 미래를 만들어갑니다.',
            keywords: ['Sustainable Chemistry', 'Eco-friendly Process', 'Green Manufacturing', 'ESG']
          },
          {
            num: '04',
            title: 'Partnership for Success',
            subTitle: '고객과 함께 성장하는 파트너',
            intro: 'Supplier가 아닌, 성공을 함께 설계하는 Partner.',
            body: '다산제약 원료사업부는 단순한 원료 공급을 넘어 고객의 개발 단계와 사업 전략을 이해하는 장기적인 파트너십을 추구합니다.\n개발 초기의 원료 검토부터 상업화 이후의 안정적인 공급까지 고객의 프로젝트에 필요한 최적의 솔루션을 함께 만들어갑니다.',
            keywords: ['Strategic Partnership', 'Customer-oriented', 'Development Support', 'Long-term Collaboration']
          },
          {
            num: '05',
            title: 'Global Supply Network',
            subTitle: '안정적인 글로벌 공급 네트워크',
            intro: 'Global Network. Reliable Supply.',
            body: '중국사업본부를 기반으로 중국을 비롯하여 일본, 인도 등 주요 제약 시장의 다양한 제조사 및 파트너와 장기간 구축해온 글로벌 네트워크를 보유하고 있습니다.\n검증된 해외 파트너와의 협력과 공급망 다변화를 통해 원료의 안정적인 조달과 지속적인 공급을 지원하며, 국내외 시장 환경 변화에 유연하게 대응할 수 있는 글로벌 API 공급 체계를 구축하고 있습니다.',
            keywords: ['China', 'Japan', 'India', 'Global Sourcing', 'Supply Chain', 'Stable Supply']
          }
        ];

        return (
          <div className="space-y-8 animate-fade-in-up py-2">
            {/* Video Banner (API.mp4) */}
            <div className="w-[100vw] aspect-[21/9] animate-fade-in-up bg-black overflow-hidden relative left-1/2 -translate-x-1/2 mt-10 md:mt-14 mb-24 md:mb-32 shadow-sm" style={{ aspectRatio: '21 / 9' }}>
              <video 
                className="w-full h-full object-cover"
                src="/API.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>

            {/* Header Section (Image 1 top) */}
            <div className="space-y-3 pb-8 pt-6 md:pt-10 border-b border-gray-100">
              <span className="text-xs font-black text-brand-teal tracking-wider uppercase block">API / Active Pharmaceutical Ingredients</span>
              <h3 className="text-2xl md:text-3xl font-black text-brand-blue tracking-tight">Innovation Beyond Ingredients</h3>
              <p className="text-base md:text-lg font-bold text-gray-800 pt-1">
                원료를 넘어, 의약품의 새로운 가능성을 만듭니다.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed pt-2 whitespace-pre-line">
                다산제약은 축적된 의약품 개발 경험과 차별화된 기술력을 기반으로 고품질 원료의약품(API)을 개발하고 공급합니다.{'\n'}
                Prodrug를 비롯한 고부가가치 원료 개발부터 안정적인 글로벌 소싱, 품질관리 및 공급망 구축까지 고객의 의약품 개발과 사업화를 위한 통합적인 API 솔루션을 제공합니다.
              </p>
            </div>

            {/* 5 Core Feature Sections (Flowing layout with subtle dividers) */}
            <div className="space-y-10">
              {sections.map((sec) => (
                <div key={sec.num} className="space-y-4 pb-8 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl md:text-3xl font-black text-brand-teal font-mono">{sec.num}.</span>
                      <h4 className="text-lg md:text-xl font-black text-brand-blue">{sec.title}</h4>
                    </div>
                    <span className="text-sm font-bold text-brand-teal">{sec.subTitle}</span>
                  </div>

                  <p className="text-sm font-bold text-gray-800">
                    {sec.intro}
                  </p>

                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                    {sec.body}
                  </p>

                  <div className="pt-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">KEYWORDS</span>
                    <p className="text-xs text-gray-500 font-medium">
                      {sec.keywords.join(' · ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section (From API to Value) */}
            <div className="pt-8 space-y-3 border-t-2 border-brand-teal/20">
              <span className="text-xs font-black text-brand-teal uppercase tracking-widest block">From API to Value</span>
              <h4 className="text-xl md:text-2xl font-black text-brand-blue">
                좋은 의약품은 좋은 원료에서 시작됩니다.
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                다산제약은 Innovation, Quality, Sustainability, Partnership, Global Network를 바탕으로 고객의 아이디어가 경쟁력 있는 의약품으로 완성될 수 있도록 신뢰할 수 있는 API 솔루션을 제공합니다.
              </p>
              <p className="text-sm font-bold text-brand-teal pt-2">
                Your Reliable Partner for Pharmaceutical Ingredients.
              </p>
            </div>
          </div>
        );
      }

      case '/business/cdmo':
      case '/business/cdmo/quality': {
        return (
          <>
            <div className="w-[100vw] aspect-[21/9] animate-fade-in-up bg-black overflow-hidden relative left-1/2 -translate-x-1/2 mb-4 mt-4 shadow-sm" style={{ aspectRatio: '21 / 9' }}>
              <video 
                className="w-full h-full object-cover"
                src="/CDMO_219.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            
            <div className="mt-24 w-full max-w-5xl mx-auto animate-fade-in-up px-4 md:px-0 pb-20">
              {/* Header Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 mb-24 items-start">
                <h2 className="text-[32px] md:text-[40px] font-black text-[#111] leading-[1.3] tracking-tight">
                  One-stop CDMO Solution
                </h2>
                <div className="text-gray-500 leading-[1.8] text-[15px] md:text-[15px] md:pt-2 space-y-4">
                  <p className="break-keep font-medium text-[#666]">
                    다산제약은 의약품 연구개발 역량과 GMP 기반 생산 인프라를 바탕으로 제네릭 및 개량신약의 개발부터 생산까지 맞춤형 CDMO 서비스를 제공합니다.
                  </p>
                  <p className="break-keep font-medium text-[#666]">
                    Multi-Stra®를 기반으로 차별화된 제형 설계 및 약물 방출 기술을 제공합니다.
                  </p>
                </div>
              </div>

              {/* Quality Title */}
              <div className="mb-14">
                <h3 className="text-[26px] font-black text-gray-900 tracking-tight">신뢰할 수 있는 서비스 품질</h3>
              </div>

              {/* Process Flow (5 Steps: 개발, 임상, 기술이전, 품질, 생산) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
                {/* Step 1: 개발 */}
                <div className="bg-white border border-gray-200/70 hover:border-[#64ad55] rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-sm group">
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

                {/* Step 2: 임상 */}
                <div className="bg-white border border-gray-200/70 hover:border-[#64ad55] rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-sm group">
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

                {/* Step 3: 기술이전 */}
                <div className="bg-white border border-gray-200/70 hover:border-[#64ad55] rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-sm group">
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

                {/* Step 4: 품질 */}
                <div className="bg-white border border-gray-200/70 hover:border-[#64ad55] rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-sm group">
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

                {/* Step 5: 생산 */}
                <div className="bg-white border border-gray-200/70 hover:border-[#64ad55] rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-sm group">
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

              {/* What We Develop Section */}
              <div className="mt-20 mb-12">
                <h3 className="text-[28px] md:text-[34px] font-black text-gray-900 tracking-tight mb-3">
                  What We Develop
                </h3>
                <p className="text-[15px] md:text-[16px] text-gray-600 leading-[1.8] font-medium break-keep mb-10">
                  다양한 의약품 개발 및 생산 경험을 바탕으로 고객의 제품 특성에 맞는 CDMO 솔루션을 제공합니다.
                </p>

                {/* 4 Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 01 */}
                  <div className="bg-white border border-gray-200/70 hover:border-[#64ad55] rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between">
                    <div>
                      <span className="text-[26px] font-black text-[#64ad55] block mb-1">01</span>
                      <h4 className="text-[17px] font-bold text-[#64ad55] mb-3 border-b-2 border-[#64ad55] pb-2 tracking-tight">
                        1st Generic 품목
                      </h4>
                      <ul className="space-y-2.5 text-[14px] text-gray-700 font-medium pt-1">
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#64ad55] font-bold">•</span>
                          <span>핵심공정 ODM 품목</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#64ad55] font-bold">•</span>
                          <span>전공정 ODM 품목</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Card 02 */}
                  <div className="bg-white border border-gray-200/70 hover:border-[#64ad55] rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between">
                    <div>
                      <span className="text-[26px] font-black text-[#64ad55] block mb-1">02</span>
                      <h4 className="text-[17px] font-bold text-[#64ad55] mb-3 border-b-2 border-[#64ad55] pb-2 tracking-tight">
                        개량신약(염 변경)
                      </h4>
                      <ul className="space-y-2.5 text-[14px] text-gray-700 font-medium pt-1">
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#64ad55] font-bold">•</span>
                          <span>핵심공정 ODM 품목</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#64ad55] font-bold">•</span>
                          <span>전공정 ODM 품목</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Card 03 */}
                  <div className="bg-white border border-gray-200/70 hover:border-[#64ad55] rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between">
                    <div>
                      <span className="text-[26px] font-black text-[#64ad55] block mb-1">03</span>
                      <h4 className="text-[17px] font-bold text-[#64ad55] mb-3 border-b-2 border-[#64ad55] pb-2 tracking-tight">
                        개량신약(약물방출)
                      </h4>
                      <ul className="space-y-2.5 text-[14px] text-gray-700 font-medium pt-1">
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#64ad55] font-bold">•</span>
                          <span>약물방출 조절 개량신약</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#64ad55] font-bold">•</span>
                          <span>고함량 개량신약</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Card 04 */}
                  <div className="bg-white border border-gray-200/70 hover:border-[#64ad55] rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between">
                    <div>
                      <span className="text-[26px] font-black text-[#64ad55] block mb-1">04</span>
                      <h4 className="text-[17px] font-bold text-[#64ad55] mb-3 border-b-2 border-[#64ad55] pb-2 tracking-tight">
                        개량신약(복합제 &amp; 기타)
                      </h4>
                      <ul className="space-y-2.5 text-[14px] text-gray-700 font-medium pt-1">
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#64ad55] font-bold">•</span>
                          <span>복합제제 개량신약</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#64ad55] font-bold">•</span>
                          <span>제형변경(기타)</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                </div>
              </div>

              {/* WHY DASAN Section */}
              <div className="mt-24 mb-12">
                <h3 className="text-[28px] md:text-[34px] font-black text-gray-900 tracking-tight mb-3">
                  WHY DASAN
                </h3>
                <p className="text-[15px] md:text-[16px] text-gray-600 leading-[1.8] font-medium break-keep mb-10">
                  개발부터 생산까지, 의약품의 가치를 완성하는 파트너
                </p>

                {/* 4 Crisp & Vibrant Brand Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 1: TECHNOLOGY */}
                  <div className="bg-white border-2 border-gray-100 hover:border-[#64ad55] rounded-2xl p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(100,173,85,0.18)] transition-all duration-300 hover:-translate-y-1.5 group">
                    <div className="bg-gradient-to-r from-[#64ad55] to-[#519943] text-white py-3.5 px-4 rounded-xl text-center mb-6 font-black text-[13px] tracking-wider uppercase shadow-sm">
                      TECHNOLOGY
                    </div>
                    <p className="text-[15px] font-bold text-gray-900 tracking-tight leading-relaxed text-center group-hover:text-[#64ad55] transition-colors">
                      Multi-Stra® 기반 제형 및 MUPS 기술
                    </p>
                  </div>

                  {/* Card 2: MANUFACTURING & QUALITY */}
                  <div className="bg-white border-2 border-gray-100 hover:border-[#64ad55] rounded-2xl p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(100,173,85,0.18)] transition-all duration-300 hover:-translate-y-1.5 group">
                    <div className="bg-gradient-to-r from-[#64ad55] to-[#519943] text-white py-3.5 px-4 rounded-xl text-center mb-6 font-black text-[13px] tracking-wider uppercase shadow-sm">
                      MANUFACTURING &amp; QUALITY
                    </div>
                    <p className="text-[15px] font-bold text-gray-900 tracking-tight leading-relaxed text-center group-hover:text-[#64ad55] transition-colors">
                      GMP 기반 생산 인프라
                    </p>
                  </div>

                  {/* Card 3: ONE-STOP */}
                  <div className="bg-white border-2 border-gray-100 hover:border-[#64ad55] rounded-2xl p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(100,173,85,0.18)] transition-all duration-300 hover:-translate-y-1.5 group">
                    <div className="bg-gradient-to-r from-[#64ad55] to-[#519943] text-white py-3.5 px-4 rounded-xl text-center mb-6 font-black text-[13px] tracking-wider uppercase shadow-sm">
                      ONE-STOP
                    </div>
                    <p className="text-[15px] font-bold text-gray-900 tracking-tight leading-relaxed text-center group-hover:text-[#64ad55] transition-colors">
                      체계적인 품질관리
                    </p>
                  </div>

                  {/* Card 4: MANUFACTURING & QUALITY */}
                  <div className="bg-white border-2 border-gray-100 hover:border-[#64ad55] rounded-2xl p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(100,173,85,0.18)] transition-all duration-300 hover:-translate-y-1.5 group">
                    <div className="bg-gradient-to-r from-[#64ad55] to-[#519943] text-white py-3.5 px-4 rounded-xl text-center mb-6 font-black text-[13px] tracking-wider uppercase shadow-sm">
                      MANUFACTURING &amp; QUALITY
                    </div>
                    <p className="text-[15px] font-bold text-gray-900 tracking-tight leading-relaxed text-center group-hover:text-[#64ad55] transition-colors">
                      개발부터 생산까지 연계
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* New section: Top Full-bleed title and gray bg icons */}
            <div className="w-[100vw] relative left-1/2 -translate-x-1/2 mt-16 animate-fade-in-up">
              {/* Title Section */}
              <div className="w-full max-w-5xl mx-auto px-4 md:px-0 mb-16">
                <h3 className="text-[28px] md:text-[32px] font-black text-gray-900 tracking-tight leading-[1.4] break-keep">
                  제형 개발부터 완제품 생산까지 글로벌 스탠다드 의약품 생산시설에서 맞춤형<br />위탁생산 서비스를 제공합니다
                </h3>
              </div>

              {/* Light Gray full-width block with 4 icons */}
              <div className="bg-[#f8f9fa] w-full py-16 border-y border-gray-100">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4 md:px-0">
                  <div className="flex flex-col items-center text-center">
                    <Globe2 size={44} strokeWidth={1} className="text-[#333] mb-6" />
                    <span className="text-[14px] font-bold text-gray-800 leading-[1.5]">글로벌 스탠다드<br />생산시설</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Users size={44} strokeWidth={1} className="text-[#333] mb-6" />
                    <span className="text-[14px] font-bold text-gray-800 leading-[1.5]">전문인력</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <BookOpenCheck size={44} strokeWidth={1} className="text-[#333] mb-6" />
                    <span className="text-[14px] font-bold text-gray-800 leading-[1.5]">제조기술 노하우</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Settings2 size={44} strokeWidth={1} className="text-[#333] mb-6" />
                    <span className="text-[14px] font-bold text-gray-800 leading-[1.5]">공정표준화 시스템</span>
                  </div>
                </div>
              </div>

              {/* White section with 3 rows of text */}
              <div className="w-full max-w-5xl mx-auto px-4 md:px-0 pt-24 pb-12 space-y-20">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-16 border-b border-gray-100 pb-20">
                  <h4 className="text-[18px] md:text-[20px] font-bold text-gray-900 leading-[1.5]">
                    제제 연구부터<br className="hidden md:block" /> 생산까지
                  </h4>
                  <p className="text-[14.5px] text-gray-600 leading-[1.9] break-keep font-medium md:pt-1">
                    셀트리온제약은 케미컬의약품 제제·공정 개발에서 생산에 이르는 전 과정을 고객과 함께 합니다. 대규모 첨단 설비와 기술력을 바탕으로 위탁생산 시장에서의 경쟁력 확보를 위해 끊임없이 노력하고 있습니다.
                  </p>
                </div>
                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-16 border-b border-gray-100 pb-20">
                  <h4 className="text-[18px] md:text-[20px] font-bold text-gray-900 leading-[1.5]">
                    엄격한<br className="hidden md:block" /> 품질 보증
                  </h4>
                  <div className="md:pt-1">
                    <p className="text-[14.5px] text-gray-600 leading-[1.9] break-keep font-medium mb-12">
                      셀트리온제약 청주공장은 미국 FDA와 유럽 EMA로부터 국내에서는 처음으로 내용고형제 우수 의약품 제조 및 품질관리 시스템 인증을 받았습니다. 셀트리온제약은 제품 개발 단계부터 입고, 제조, 검수, 출하에 이르는 모든 과정에 QMS(Quality Management System, 품질경영시스템), QRM(Quality Risk Management, 품질위험관리) 등 표준화된 시스템을 적용하고 있습니다. 이와 함께 전사동 빌딩관리시스템(BMS)을 통해 온도·습도·차압 등을 24시간 제어함으로써 품질 균일성을 확보하고 있습니다.
                    </p>
                    {/* Placeholder for Logos */}
                    <div className="flex flex-wrap items-center gap-14 opacity-90">
                      <span className="text-[38px] font-black tracking-tighter text-[#1f4293]" style={{ fontFamily: 'Arial, sans-serif' }}>FDA</span>
                      <div className="flex items-center space-x-2.5">
                        <div className="grid grid-cols-4 gap-[2px]">
                          {[...Array(16)].map((_, i) => <div key={i} className={`w-[3px] h-[3px] rounded-full ${i % 3 === 0 ? 'bg-red-500' : 'bg-[#1f4293]'}`} />)}
                        </div>
                        <span className="text-[28px] font-black tracking-tight text-[#1f4293]">MHRA</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full border-[5px] border-red-500 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[18px] h-[18px] rounded-full border-[4px] border-[#1f4293] translate-x-1" />
                          </div>
                        </div>
                        <span className="text-[13px] font-bold leading-[1.2] text-gray-800">Ministry of Food and<br/>Drug Safety</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-16 pb-10">
                  <h4 className="text-[18px] md:text-[20px] font-bold text-gray-900 leading-[1.5]">
                    지속 가능한<br className="hidden md:block" /> 비즈니스 모델
                  </h4>
                  <p className="text-[14.5px] text-gray-600 leading-[1.9] break-keep font-medium md:pt-1">
                    셀트리온제약은 미국·유럽 등 선진국 규제기관으로부터 인정받은 우수의약품 제조 기술을 바탕으로 고객에게 맞춤형 서비스를 제공합니다. 세계 최고 수준의 시설에서 믿을 수 있는 전문 인력이 고품질 의약품을 제조해 지속 가능한 비즈니스 모델을 만들어 갑니다.
                  </p>
                </div>
              </div>
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
    <div className="relative bg-white py-16 md:py-24 min-h-screen">
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 mt-8">

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
            <div className={`min-h-[550px] w-full ${currentPath === '/business/cdmo/quality' ? 'max-w-full' : 'max-w-5xl'}`}>
              {renderContent()}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
