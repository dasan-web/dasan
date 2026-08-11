import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { navigationData } from '@/lib/navigation';
import SubmenuTabBar from '@/components/SubmenuTabBar';
import { CheckCircle, ShieldCheck, Truck, Layers, Award, FileSpreadsheet, FlaskConical, ClipboardCheck, FileCheck, Factory, ChevronRight, Globe2, Users, BookOpenCheck, Settings2 } from 'lucide-react';
import ProductSearch from '@/components/ProductSearch';
import ProductDetail from '@/components/ProductDetail';
import FindPharmacy from '@/components/FindPharmacy';
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
      const sub = major.subMenus.find(s => s.link === currentPath);
      if (sub) {
        activeTitle = sub.name;
        activeMajor = major.name;
        activeMajorObj = major;
        break;
      }
    }
    if (!activeMajorObj && grandBiz.majors.length > 0) { // Replace grandBiz later
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
        let tag = '신제품 출시';
        let title = "복합 고혈압 개량신약 '피마사탄/암로디핀' 출시 승인";
        let desc = '자체 DDS 특허 서방성 과립 코팅 기술을 사용해 환자의 복용 크기를 축소시킨 고혈압 치료제 판매가 시작되었습니다.';

        if (dbContent) {
          const parts = dbContent.split('|');
          tag = parts[0] || tag;
          title = parts[1] || title;
          desc = parts[2] || desc;
        }

        return (
          <div className="space-y-6 animate-fade-in-up">
            <div className="p-6 rounded-xl bg-white space-y-2 shadow-none">
              <span className="text-[10px] bg-brand-teal/10 text-brand-teal px-2 py-0.5 rounded font-bold uppercase">{tag}</span>
              <h4 className="font-bold text-brand-blue text-sm">{title}</h4>
              {(typeof desc === 'string' && (desc.includes('<p') || desc.includes('<h'))) ? (
                <div dangerouslySetInnerHTML={{ __html: desc }} className="[&_p]:text-xs [&_p]:text-gray-400 [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold" />
              ) : (
                <p className="text-xs text-gray-400 whitespace-pre-wrap">{desc}</p>
              )}
            </div>
          </div>
        );
      }

      case '/business/api/raw':
      case '/business/api/intermediates': {
        let desc = '다산제약은 높은 순도와 엄격한 결정 형태 조절 기술을 통해 국내외 유수 제약사들에 고부가가치 원료의약품(API)을 공급하고 있습니다.';
        let card1Title = '주요 API 파이프라인';
        let card1Desc = 'Fimasartan, Dapagliflozin, Sitagliptin, Metformin 고순도 활성 성분을 직접 합성하여 연간 수십 톤 규모로 납품 가능합니다.';
        let card2Title = '중간체 정밀 유기합성';
        let card2Desc = '원료의 전구체 단계를 고효율 반응 공정으로 연구 및 위탁 생산하여 원가 절감과 대량 수급 안정성을 제공합니다.';

        if (dbContent) {
          const lines = dbContent.split('\n');
          desc = lines[0] || desc;
          card1Title = lines[1] || card1Title;
          card1Desc = lines[2] || card1Desc;
          card2Title = lines[3] || card2Title;
          card2Desc = lines[4] || card2Desc;
        }

        return (
          <div className="space-y-6 animate-fade-in-up">
            {(typeof desc === 'string' && (desc.includes('<p') || desc.includes('<h'))) ? (
              <div dangerouslySetInnerHTML={{ __html: desc }} className="[&_p]:text-gray-600 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold" />
            ) : (
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                {desc}
              </p>
            )}
            <div className="grid grid-cols-1 gap-6 text-xs">
              <div className="p-5 rounded-xl bg-white space-y-2 shadow-none">
                <h5 className="font-bold text-brand-blue text-sm">{card1Title}</h5>
                {(typeof card1Desc === 'string' && (card1Desc.includes('<p') || card1Desc.includes('<h'))) ? (
                  <div dangerouslySetInnerHTML={{ __html: card1Desc }} className="[&_p]:text-gray-455 [&_p]:leading-normal [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold" />
                ) : (
                  <p className="text-gray-455 leading-normal whitespace-pre-wrap">{card1Desc}</p>
                )}
              </div>
              <div className="p-5 rounded-xl bg-white space-y-2 shadow-none">
                <h5 className="font-bold text-brand-blue text-sm">{card2Title}</h5>
                {(typeof card2Desc === 'string' && (card2Desc.includes('<p') || card2Desc.includes('<h'))) ? (
                  <div dangerouslySetInnerHTML={{ __html: card2Desc }} className="[&_p]:text-gray-455 [&_p]:leading-normal [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold" />
                ) : (
                  <p className="text-gray-455 leading-normal whitespace-pre-wrap">{card2Desc}</p>
                )}
              </div>
            </div>
          </div>
        );
      }

      case '/business/cdmo/quality': {
        return (
          <>
            <div className="w-[100vw] h-[40vh] md:h-[50vh] lg:h-[550px] animate-fade-in-up bg-black overflow-hidden relative left-1/2 -translate-x-1/2 mb-4 mt-4 shadow-sm">
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
                  위탁개발부터 생산까지,<br />
                  One-stop Process
                </h2>
                <div className="text-gray-500 leading-[1.8] text-[15px] md:text-[15px] md:pt-2">
                  <p className="break-keep font-medium text-[#666]">
                    셀트리온은 미국 FDA의 cGMP 인증을 받은 세계 최고 수준의 생산시설 및 품질관리 시스템을 바탕으로 초기물질 개발부터 임상, 허가, 생산까지 바이오의약품 사업 전 과정에 대한 One-stop 서비스를 제공합니다.
                  </p>
                </div>
              </div>

              {/* Quality Title */}
              <div className="mb-14">
                <h3 className="text-[26px] font-black text-gray-900 tracking-tight">신뢰할 수 있는 서비스 품질</h3>
              </div>

              {/* Process Flow */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative pt-6">
                {/* Horizontal dotted line behind icons */}
                <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-[1px] border-t border-dashed border-gray-200 -z-10" />
                
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center relative">
                  <div className="bg-white w-[90px] h-[90px] rounded-full border border-gray-100 mb-8 flex items-center justify-center shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform">
                    <FlaskConical size={32} strokeWidth={1} className="text-gray-700" />
                  </div>
                  <ChevronRight size={14} strokeWidth={1.5} className="hidden md:block text-gray-300 absolute -right-[7px] top-[38px] bg-white px-0.5" />
                  <h4 className="text-[18px] font-bold text-[#64ad55] mb-5 tracking-tight">개발</h4>
                  <p className="text-[13px] text-gray-500 leading-[2.1] break-keep font-normal">
                    항체 바이오시밀러 및<br />
                    바이오 신약 개발로 축적한<br />
                    바이오의약품 연구개발 능력
                  </p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center relative">
                  <div className="bg-white w-[90px] h-[90px] rounded-full border border-gray-100 mb-8 flex items-center justify-center shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform">
                    <ClipboardCheck size={32} strokeWidth={1} className="text-gray-700" />
                  </div>
                  <ChevronRight size={14} strokeWidth={1.5} className="hidden md:block text-gray-300 absolute -right-[7px] top-[38px] bg-white px-0.5" />
                  <h4 className="text-[18px] font-bold text-[#64ad55] mb-5 tracking-tight">임상</h4>
                  <p className="text-[13px] text-gray-500 leading-[2.1] break-keep font-normal">
                    소규모부터<br />
                    대규모 글로벌 임상까지<br />
                    다양한 규모의 임상 경험
                  </p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center relative">
                  <div className="bg-white w-[90px] h-[90px] rounded-full border border-gray-100 mb-8 flex items-center justify-center shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform">
                    <FileCheck size={32} strokeWidth={1} className="text-gray-700" />
                  </div>
                  <ChevronRight size={14} strokeWidth={1.5} className="hidden md:block text-gray-300 absolute -right-[7px] top-[38px] bg-white px-0.5" />
                  <h4 className="text-[18px] font-bold text-[#64ad55] mb-5 tracking-tight">허가</h4>
                  <p className="text-[13px] text-gray-500 leading-[2.1] break-keep font-normal">
                    FDA 및 EMA 등 글로벌 규제기관<br />
                    으로부터 다수의 바이오의약품에<br />
                    대한 판매허가 획득
                  </p>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center text-center relative">
                  <div className="bg-white w-[90px] h-[90px] rounded-full border border-gray-100 mb-8 flex items-center justify-center shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform">
                    <Factory size={32} strokeWidth={1} className="text-gray-700" />
                  </div>
                  <h4 className="text-[18px] font-bold text-[#64ad55] mb-5 tracking-tight">생산</h4>
                  <p className="text-[13px] text-gray-500 leading-[2.1] break-keep font-normal">
                    비임상물질부터 상업 생산까지<br />
                    다양한 생산 규모에 대응할 수<br />
                    있는 생산 시설
                  </p>
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
