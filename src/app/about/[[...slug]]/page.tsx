import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { navigationData } from '@/lib/navigation';
import SubmenuTabBar from '@/components/SubmenuTabBar';
import { Building2, Award, Users, Landmark, MapPin, Calendar, Heart, ShieldAlert, LineChart, Target, Shield, Zap, TrendingUp, Sparkles, Quote, BookOpen, MessageSquare, Factory, Download } from 'lucide-react';
import KakaoMap from '@/components/KakaoMap';
import LocationMapSection from '@/components/LocationMapSection';
import PressList from '@/components/PressList';
import HistoryAccordion from '@/components/HistoryAccordion';
import DetailedFinancialTables from '@/components/DetailedFinancialTables';
import CIDownloadButton from '@/components/CIDownloadButton';
import PrimaryCIDownloadButton from '@/components/PrimaryCIDownloadButton';
import ScrollVideo from '@/components/ScrollVideo';
import SalesGrowthChart from '@/components/SalesGrowthChart';
import { query } from '@/lib/db';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const pageKey = `about/${slug.join('/')}`;

  try {
    // 1. Try page-specific SEO
    let results = await query('SELECT content FROM admin_contents WHERE page_key = ?', [`seo/${pageKey}`]);
    
    // If not found or empty, fall back to main About Us SEO
    if (!results || results.length === 0 || !results[0].content) {
      results = await query('SELECT content FROM admin_contents WHERE page_key = ?', ['seo/about']);
    }

    if (results && results.length > 0 && results[0].content) {
      const [title, keywords, description] = results[0].content.split('|');
      // If the admin page has configured a title, let's prepend '다산제약_About us' if it doesn't contain it, or enforce '다산제약_About us'
      let finalTitle = title;
      if (!finalTitle || finalTitle.includes('About Us') || finalTitle.includes('About us') || finalTitle === '회사소개' || finalTitle === '기업개요') {
        finalTitle = '다산제약_About us';
      }
      return {
        title: finalTitle,
        keywords: keywords || '다산제약 연혁, 류형선 대표, 아산 공장 시설, cGMP 인증 제약사',
        description: description || '다산제약의 기업개요, 연혁, 대표이사 메시지, 아산 공장 시설 및 연구소를 소개합니다. cGMP 인증을 획득한 신뢰받는 제약사입니다.',
      };
    }
  } catch (e) {
    console.error('Failed to load about page metadata:', e);
  }
  return {
    title: '다산제약_About us',
    description: '다산제약의 기업개요, 연혁, 대표이사 메시지, 아산 공장 시설 및 연구소를 소개합니다. cGMP 인증을 획득한 신뢰받는 제약사입니다.',
    keywords: '다산제약 연혁, 류형선 대표, 아산 공장 시설, cGMP 인증 제약사',
  };
}

interface Params {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function AboutCatchAllPage({ params }: Params) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  
  if (slug.length === 0) {
    redirect('/about/intro');
  }

  const currentPath = `/about/${slug.join('/')}`;
  const pageKey = `about/${slug.join('/')}`;

  let dbContent: string | null = null;
  let competenciesContent: string | null = null;
  let visionContent: string | null = null;
  let valuesContent: string | null = null;
  let philosophyContent: string | null = null;
  let cultureContent: string | null = null;

  try {
    const results = await query('SELECT page_key, content FROM admin_contents WHERE page_key = ? OR page_key LIKE ?', [pageKey, 'about/intro/%']);
    const introRow = results.find((r: any) => r.page_key === pageKey);
    if (introRow) dbContent = introRow.content;
    
    const compRow = results.find((r: any) => r.page_key === 'about/intro/competencies');
    if (compRow) competenciesContent = compRow.content;

    const visRow = results.find((r: any) => r.page_key === 'about/intro/vision');
    if (visRow) visionContent = visRow.content;

    const valRow = results.find((r: any) => r.page_key === 'about/intro/values');
    if (valRow) valuesContent = valRow.content;

    const philRow = results.find((r: any) => r.page_key === 'about/intro/philosophy');
    if (philRow) philosophyContent = philRow.content;

    const cultRow = results.find((r: any) => r.page_key === 'about/intro/culture');
    if (cultRow) cultureContent = cultRow.content;
  } catch (err) {
    console.error('Failed to load db content:', err);
  }

  // Find active menu item details
  let activeTitle = 'About us';
  let activeMajor = '회사소개';
  let activeMajorObj = null;
  
  const grandAbout = navigationData.find(g => g.name === 'Company');
  if (grandAbout) {
    for (const major of grandAbout.majors) {
      const sub = major.subMenus.find(s => s.link === currentPath);
      if (sub) {
        activeTitle = sub.name;
        activeMajor = major.name;
        activeMajorObj = major;
        break;
      }
    }
    if (!activeMajorObj && grandAbout.majors.length > 0) {
      activeMajorObj = grandAbout.majors[0];
    }
  }

  // Render content conditionally based on path
  const renderContent = async (
    dbContent: string | null,
    competenciesContent: string | null,
    visionContent: string | null,
    valuesContent: string | null,
    philosophyContent: string | null,
    cultureContent: string | null
  ) => {
    switch (currentPath) {
      case '/about/intro':
        // Parse competencies (그림1)
        let compList = [
          { title: '기술력 입증', desc: '30여 건 이상의 핵심 기술 특허와 국가 R&D 우수 과제 선정 레코드 보유' },
          { title: '글로벌 규격 생산', desc: 'c-GMP 급 준수 스마트 팩토리를 통한 엄격한 품질관리 체계 확립' },
          { title: '글로벌 파트너쉽', desc: '일본, 동남아, 남미 등 전세계 20여 개국 원료의약품 및 완제품 직수출' }
        ];
        if (competenciesContent) {
          const parsed = competenciesContent.split('\n').map(line => {
            const parts = line.split('|');
            return { title: parts[0] || '', desc: parts[1] || '' };
          }).filter(item => item.title || item.desc);
          if (parsed.length > 0) compList = parsed;
        }

        // Parse vision (그림2)
        let visMission = {
          missionTitle: '인류의 건강과 행복한 삶에 공헌',
          missionDesc: '차별화된 제제 기술과 고품질의 의약품을 연구·생산·공급하여, 전 인류가 보다 건강하고 가치 있는 삶을 영위할 수 있도록 기여합니다.',
          visionTitle: 'DDS 기술 혁신 기반의 글로벌 헬스케어 리더',
          visionDesc: '독보적인 약물전달시스템(DDS) 플랫폼 기술을 선도하며 완제 및 API 수출을 가속화하여, 글로벌 제약 바이오 시장에서 신뢰받는 최고의 파트너가 됩니다.'
        };
        if (visionContent) {
          const lines = visionContent.split('\n').filter(line => line.includes('|'));
          if (lines.length >= 2) {
            const mParts = lines[0].split('|');
            const vParts = lines[1].split('|');
            visMission = {
              missionTitle: mParts[0] || '',
              missionDesc: mParts[1] || '',
              visionTitle: vParts[0] || '',
              visionDesc: vParts[1] || ''
            };
          }
        }

        // Parse values (그림3)
        let valList = [
          { letter: 'D', name: 'Devotion', subtitle: '신뢰와 책임', desc: '생명을 살리는 사명감으로 고객과 환자의 두터운 신뢰에 정직과 품질로 보답합니다.' },
          { letter: 'A', name: 'Agility', subtitle: '변화와 실행', desc: '급변하는 글로벌 환경을 기민하게 포착하고, 망설임 없이 기회를 실행으로 바꿉니다.' },
          { letter: 'S', name: 'Synergy', subtitle: '상생과 협업', desc: '부서 간 벽을 허무는 소통과 글로벌 파트너사와의 상생을 통해 더 큰 가치를 창출합니다.' },
          { letter: 'A', name: 'Aspire', subtitle: '도전과 열정', desc: '새로운 기술과 글로벌 시장을 향해 멈추지 않는 도전정신으로 늘 한계에 맞섭니다.' },
          { letter: 'N', name: 'Novelty', subtitle: 'Novelty', desc: '창의와 혁신|고정관념을 넘어서는 독자적인 아이디어로 다산제약만의 차별화된 솔루션을 구축합니다.' }
        ];
        if (valuesContent) {
          const parsed = valuesContent.split('\n').map(line => {
            const parts = line.split('|');
            return {
              letter: (parts[0] || 'D').trim().charAt(0).toUpperCase(),
              name: parts[0] || '',
              subtitle: parts[1] || '',
              desc: parts[2] || ''
            };
          }).filter(item => item.name);
          if (parsed.length > 0) valList = parsed;
        }

        // Parse philosophy (그림4)
        let philData = {
          quote: '사람이 중심이 되는 기술, 정직으로 만드는 건강한 내일',
          pillars: [
            { id: '01', title: '정도경영 (Ethical Management)', desc: '눈앞의 이익보다 절대적인 신뢰와 고품질 기준을 지켜내며, 투명하고 정직한 운영을 통해 사회적 가치에 책임을 다합니다.' },
            { id: '02', title: 'R&D 중심 성장 (R&D-Driven Innovation)', desc: '매출액 대비 높은 비율을 신약 개발과 제제 기술 연구에 꾸준히 투자하여, 차별화된 특허 장벽과 고부가가치 DDS 플랫폼을 구축합니다.' },
            { id: '03', title: '인재 중심 가치창출 (People First)', desc: '구성원 개개인의 자율성과 전문성을 전폭 지원하며, 임직원의 동반 성장이 곧 글로벌 다산의 경쟁력임을 굳게 믿고 실천합니다.' }
          ]
        };
        if (philosophyContent) {
          const lines = philosophyContent.split('\n');
          if (lines.length > 0) {
            const mainQuote = lines[0].split('|')[0] || '';
            const pillarsParsed = lines.slice(1).map((line, idx) => {
              const parts = line.split('|');
              return {
                id: String(idx + 1).padStart(2, '0'),
                title: parts[0] || '',
                desc: parts[1] || ''
              };
            }).filter(p => p.title);
            philData = {
              quote: mainQuote,
              pillars: pillarsParsed.length > 0 ? pillarsParsed : philData.pillars
            };
          }
        }

        // Parse culture (그림5)
        let cultureData = {
          title: '다산인의 건강한 문화',
          sub: '일할 때는 뜨겁게 몰입하고, 서로를 신뢰하고 배려하는 일터',
          items: [
            { title: '유연하고 자율적인 몰입', desc: '시차출퇴근제 운영 및 자유로운 휴가 문화를 바탕으로 업무 효율성을 높이고 개개인의 소중한 라이프 스타일을 존중합니다.' },
            { title: '배움과 성장의 기회', desc: '임직원의 성장을 위해 직무 교육, 전문 도서 구매, 국내외 유수 학회 및 박람회 참가를 전폭적으로 보장하고 격려합니다.' },
            { title: '수평적 소통과 배려', desc: '직급과 부서를 초월하여 누구든 아이디어를 제안할 수 있는 타운홀 미팅과 상호 존중하는 피드백 문화를 지향합니다.' }
          ]
        };
        if (cultureContent) {
          const lines = cultureContent.split('\n');
          if (lines.length >= 5) {
            const mainTitleText = lines[0] || '다산인의 건강한 문화';
            const subText = lines[1] || '';
            const itemsParsed = lines.slice(2).map(line => {
              const parts = line.split('|');
              return { title: parts[0] || '', desc: parts[1] || '' };
            }).filter(item => item.title);
            cultureData = {
              title: mainTitleText,
              sub: subText,
              items: itemsParsed.length > 0 ? itemsParsed : cultureData.items
            };
          } else if (lines.length > 0) {
            const subText = lines[0] || '';
            const itemsParsed = lines.slice(1).map(line => {
              const parts = line.split('|');
              return { title: parts[0] || '', desc: parts[1] || '' };
            }).filter(item => item.title);
            cultureData = {
              title: '다산인의 건강한 문화',
              sub: subText,
              items: itemsParsed.length > 0 ? itemsParsed : cultureData.items
            };
          }
        }

        const competenciesColors = [
          'bg-brand-teal/10 text-brand-teal',
          'bg-brand-cyan/10 text-brand-cyan',
          'bg-brand-blue/10 text-brand-blue'
        ];
        const competenciesIcons = [
          <Award size={20} key="award" />,
          <Building2 size={20} key="building" />,
          <Users size={20} key="users" />
        ];

        let introTitle = '인류의 건강을 위한 혁신,다산제약';
        let introBody = '다산제약은 1996년 설립 이후 끊임없는 연구개발과 과감한 투자를 통해 고품질의 의약품을 제공함으로써 국민 보건 증진과 삶의 질 향상에 기여해 왔습니다. 차별화된 제제 기술력을 보유한 개량신약 전문 제약회사로서 글로벌 시장을 무대로 뻗어나가고 있습니다.\n\n현재 마이크로캡슐화 기술 등 특화된 제형 기술을 중심으로 원료의약품 합성에서 완제의약품 제조까지 수직계열화를 완성하였으며, 이를 기반으로 글로벌 CDMO 기업으로 성장하고 있습니다.';

        if (dbContent) {
          const parts = dbContent.split('|');
          if (parts.length >= 2) {
            introTitle = parts[0].trim();
            introBody = parts[1].trim();
          } else {
            introBody = dbContent;
          }
        }

        // 제목 앞의 '1. ', '2. ' 등 숫자 번호 포맷을 모두 제거합니다.
        introTitle = introTitle.replace(/^[1-9]\.\s?/, '').trim();

        // 관리자 에디터에서 CEO 메시지가 h3 이외의 태그(p, h4, strong 등)로 작성되었을 경우, 
        // 이를 '기업 이념 및 핵심가치'와 완벽히 동일한 h3(하단선 포함) 템플릿으로 강제 치환합니다.
        introBody = introBody.replace(
          /<([a-z0-9]+)[^>]*>[\s\n]*(?:<[^>]+>[\s\n]*)*(?:[0-9]\.\s*)?CEO\s*메시지\s*\(CEO\s*Message\)[\s\n]*(?:<\/[^>]+>[\s\n]*)*<\/\1>/gi,
          '<h3>CEO 메시지 (CEO Message)</h3>'
        );

        return (
          <>
            {/* 상단 인트로 슬로건 */}
            <div className="w-full text-center mb-8 animate-fade-in-up">
              <h2 className="text-xl md:text-2xl font-pretendard font-black text-gray-900 tracking-tight">
                인류의 행복을 창출하는 <span className="text-brand-green font-black">Global Healthcare 기업</span>
              </h2>
            </div>

            {/* 상단 영상 영역 (스크롤 애니메이션 적용). 상위 컨테이너의 애니메이션(transform) 제약을 벗어나 z-index가 정상 작동하게 분리합니다. */}
            <ScrollVideo />

            <div className="space-y-16 animate-fade-in-up mt-16">

            {/* 1. Intro Summary */}
            <div className="relative overflow-hidden bg-white rounded-3xl p-8 md:p-12 shadow-none">
              <span className="text-brand-teal text-xs font-bold tracking-widest uppercase block mb-3">Company Overview</span>
              
              <div className="space-y-4 text-gray-800 text-sm md:text-base leading-relaxed max-w-5xl">
                {introBody.includes('<p') || introBody.includes('<br') || introBody.includes('<h') ? (
                  <div 
                    className="
                      [&_p]:leading-[1.8] [&_p]:text-[15px] [&_p]:text-gray-600 [&_p]:mb-5 
                      [&_h3]:text-xl md:[&_h3]:text-2xl [&_h3]:font-black [&_h3]:text-gray-900 [&_h3]:border-b [&_h3]:border-gray-100 [&_h3]:pb-2 [&_h3]:mb-4 [&_h3:not(:first-child)]:mt-28
                      [&_h4]:text-lg md:[&_h4]:text-xl [&_h4]:font-bold [&_h4]:text-brand-blue [&_h4]:mt-8 [&_h4]:mb-3
                      [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-5 [&_ul]:space-y-3
                      [&_li]:text-gray-600 [&_li]:text-[15px] [&_li]:leading-[1.8] [&_li::marker]:text-brand-teal
                      [&_strong]:text-gray-900 [&_strong]:font-bold
                    "
                    dangerouslySetInnerHTML={{ __html: `<h3 class="text-xl md:text-2xl font-black text-gray-900 mb-4 pb-2 border-b border-gray-100 mt-12">${introTitle}</h3>` + introBody }} 
                  />
                ) : (
                  (introTitle + '\n' + introBody).split('\n').map((line, i) => {
                    const trimmed = line.trim();
                    if (!trimmed) return null;

                    // 1. 기업 이념 및 핵심가치, CEO 메시지 등 메인 타이틀
                    if (trimmed.match(/^[1-9]\.\s/) || trimmed.includes('CEO 메시지 (CEO Message)')) {
                      const titleText = trimmed.replace(/^[1-9]\.\s?/, '');
                      return <h3 key={i} className={`text-xl md:text-2xl font-black text-gray-900 mb-4 pb-2 border-b border-gray-100 ${i === 0 ? 'mt-12' : 'mt-24'}`}>{titleText}</h3>;
                    }
                    
                    // 서브 타이틀 (다산의 정신으로..., 신뢰와 혁신으로..., 4대 경영 철학)
                    if (
                      trimmed.startsWith('다산(茶山)의 정신으로') || 
                      trimmed.startsWith('신뢰와 혁신으로') ||
                      trimmed.includes('4대 경영 철학') ||
                      trimmed.includes('핵심 가치')
                    ) {
                      return <h4 key={i} className="text-lg md:text-xl font-bold text-brand-blue mt-8 mb-3">{trimmed}</h4>;
                    }

                    // 불릿 리스트
                    if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('·')) {
                      const content = trimmed.substring(1).trim();
                      const splitIdx = content.indexOf(':');
                      
                      if (splitIdx !== -1 && splitIdx < 15) {
                        const title = content.substring(0, splitIdx).trim();
                        const desc = content.substring(splitIdx + 1).trim();
                        return (
                          <div key={i} className="flex items-start mb-3 ml-2">
                            <span className="text-brand-teal mr-3 mt-1 text-lg leading-none">•</span>
                            <p className="text-gray-600 leading-[1.8] text-[15px]"><strong className="text-gray-900">{title}</strong> : {desc}</p>
                          </div>
                        );
                      } else {
                        return (
                          <div key={i} className="flex items-start mb-3 ml-2">
                            <span className="text-brand-teal mr-3 mt-1 text-lg leading-none">•</span>
                            <p className="text-gray-600 leading-[1.8] text-[15px]">{content}</p>
                          </div>
                        );
                      }
                    }

                    // 일반 단락
                    return <p key={i} className="mb-5 text-gray-600 leading-[1.8] text-[15px]">{trimmed}</p>;
                  })
                )}
                
                {/* CEO Signature */}
                <div className="flex justify-end items-end mt-16 gap-4">
                  <span className="text-gray-500 font-medium text-[15px] pb-1">다산제약 대표이사</span>
                  <span className="text-gray-800 font-black text-4xl tracking-widest font-serif">류형선</span>
                </div>
              </div>
            </div>




          </div>
          </>
        );

      case '/about/business-area':
        // Parse business-area data
        let bizData = {
          intro: '연구개발(R&D)부터 판매까지 의약품 전 주기의 Key Value Chain 인프라를 구축하여 고부가가치 사업 성장성을 확보하고 있습니다',
          items: [
            { title: '1) 자사 완제 의약품 사업', desc: '순환기, 호흡기, 비뇨기 중심의 우수한 제품 라인업 구축 및 생산·판매' },
            { title: '2) 수탁 완제 의약품 (CMO) 사업', desc: '독자적인 제제기술 및 공정 최적화를 통한 전문의약품 수탁 생산' },
            { title: '3) 의약품 핵심 원료 및 중간체 사업', desc: '의약품 핵심 원료 및 중간체 개발 및 특허 확보, 신규 합성 및 신규 수입 원료 DMF 등록·관리' }
          ]
        };
        if (dbContent) {
          const lines = dbContent.split('\n');
          if (lines.length > 0) {
            const introText = lines[0] || '';
            const itemsParsed = lines.slice(1).map(line => {
              const parts = line.split('|');
              return { title: parts[0] || '', desc: parts[1] || '' };
            }).filter(item => item.title);
            bizData = {
              intro: introText,
              items: itemsParsed.length > 0 ? itemsParsed : bizData.items
            };
          }
        }

        return (
          <div className="space-y-4 animate-fade-in-up bg-white p-8 md:p-12 rounded-3xl shadow-none">
            <h3 className="text-xl md:text-2xl font-black text-gray-900 mt-4 mb-4 pb-2 border-b border-gray-100">
              주요 사업 영역 (Core Business)
            </h3>
            <p className="mb-12 text-gray-600 leading-[1.8] text-[15px]">
              연구개발(R&D)부터 판매까지 의약품 전 주기의 <strong className="font-bold text-gray-900">Key Value Chain</strong> 인프라를 구축하여 고부가가치 사업 성장성을 확보하고 있습니다
            </p>
            
            <div className="space-y-12">
              {bizData.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  {item.title.includes(') ') ? (
                    <>
                      <div className="text-lg md:text-xl font-bold text-gray-900 shrink-0">
                        {item.title.split(') ')[0]})
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                          {item.title.substring(item.title.indexOf(') ') + 2)}
                        </h4>
                      {(typeof item.desc === 'string' && (item.desc.includes('<p') || item.desc.includes('<h'))) ? (
                        <div dangerouslySetInnerHTML={{ __html: item.desc }} className="[&_p]:text-gray-600 [&_p]:leading-[1.8] [&_p]:text-[15px] [&_h4]:font-bold [&_strong]:font-bold" />
                      ) : (
                        <p className="text-gray-600 leading-[1.8] text-[15px]">{item.desc}</p>
                      )}
                      </div>
                    </>
                  ) : (
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-4">{item.title}</h4>
                      {(typeof item.desc === 'string' && (item.desc.includes('<p') || item.desc.includes('<h'))) ? (
                        <div dangerouslySetInnerHTML={{ __html: item.desc }} className="[&_p]:text-gray-600 [&_p]:leading-[1.8] [&_p]:text-[15px] [&_h4]:font-bold [&_strong]:font-bold" />
                      ) : (
                        <p className="text-gray-600 leading-[1.8] text-[15px]">{item.desc}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case '/about/history':
        // Parse history timeline
        type TimelineEvent = {
          year: string;
          details: string[];
        };
        type TimelineEra = {
          eraTitle: string;
          eraSubtitle: string;
          events: TimelineEvent[];
        };
        let historyIntroTitle = '성장 연혁 (History)';
        let historyIntroBody = '원천기술 확보에서 글로벌 고성장·고수익 창출 기업으로 도약해 온 다산제약의 발자취입니다';
        let timelineData: TimelineEra[] = [];

        // Define default timeline
        const defaultTimelineData: TimelineEra[] = [
          {
            eraTitle: '1996 ~ 2011',
            eraSubtitle: '설립기 (원천기술 확보)',
            events: [
              { year: '1996', details: ['• 주식회사 다산메디켐 설립'] },
              { year: '2001', details: ['• 원료의약품 공장 준공 및 제조업 허가 취득 / 기업부설연구소 인가'] },
              { year: '2002', details: ['• BGMP 인증'] },
              { year: '2007', details: ['• 기술혁신형중소기업(INNO-BIZ) 인증 / 3D Clean 사업장 인증'] },
              { year: '2008', details: ['• 매출 100억 원 달성 / KGMP 인증'] },
              { year: '2009', details: ['• 300만불 수출탑 수상'] },
              { year: '2011', details: ['• \'KIBO 성공기업\' 선정'] }
            ]
          },
          {
            eraTitle: '2013 ~ 2021',
            eraSubtitle: '성장기 (R&D 고도화 및 생산 인프라 확장)',
            events: [
              { year: '2013', details: ['• 완제의약품 물류센터 완공 / 벤처기업 중소기업청장상 표창 / 합성연구소 확장 이전'] },
              { year: '2016', details: ['• 중앙연구소 확장 이전'] },
              { year: '2017', details: ['• 사명 변경 ("주식회사 다산제약")'] },
              { year: '2018', details: ['• 중앙연구소 통합 개소'] },
              { year: '2019', details: ['• 매출 500억 원 달성 / 아산 제2공장 완공 / 심양연구소(중국 랴오닝성) 확장'] },
              { year: '2020', details: ['• 충청남도 유망 중소기업 선정'] },
              { year: '2021', details: ['• 충청남도 우수기업인상 수상 / 좋은 일자리 기업 선정 / 글로벌 강소기업 선정'] }
            ]
          },
          {
            eraTitle: '2022 ~ Present',
            eraSubtitle: '도약기 (고성장/고수익 창출)',
            events: [
              { year: '2022', details: ['• 무역의날 산자부 장관표창 및 700만불 수출탑 수상 / 혁신성장 유공중소기업 장관상 수상 / 의약품수출분야 보건복지부 장관상 수상 / 4년 연속 청년친화 강소기업 선정'] },
              { year: '2023', details: ['• 부패방지경영시스템(ISO 37001) 인증 획득'] },
              { year: '2024', details: ['• 중소벤처기업부 글로벌강소기업 1000+ 프로젝트 선정 / 식약처 공급망 안정화 선도 사업자 선정 / 안전보건경영시스템(ISO 45001) 인증 획득 / 중국 \'안휘허이다산의약유한회사\' 합작법인 설립'] },
              { year: '2025', details: ['• 환경부 한국환경공단 스마트생태공장 구축 사업 선정'] }
            ]
          }
        ];

        /* if (dbContent) {
          const lines = dbContent.split('\n');
          if (lines.length > 0) {
            const introLine = lines[0];
            const parts = introLine.split('|');
            if (parts.length >= 2) {
              historyIntroTitle = parts[0];
              historyIntroBody = parts[1];
            } else {
              historyIntroBody = introLine;
            }

            let currentEra: TimelineEra | null = null;
            for (let i = 1; i < lines.length; i++) {
              const line = lines[i].trim();
              if (!line) continue;
              if (line.startsWith('ERA:')) {
                const eraStr = line.substring(4);
                const [eraTitle, eraSubtitle] = eraStr.split('|');
                currentEra = {
                  eraTitle: eraTitle || '',
                  eraSubtitle: eraSubtitle || '',
                  events: []
                };
                timelineData.push(currentEra);
              } else if (line.startsWith('YEAR:') && currentEra) {
                const yearStr = line.substring(5);
                const [yearLabel, detailsStr] = yearStr.split('|');
                const details = detailsStr ? detailsStr.split('<br />').map(s => s.trim()) : [];
                currentEra.events.push({
                  year: yearLabel || '',
                  details: details
                });
              }
            }
          }
        } */
        
                if (timelineData.length === 0) {
          timelineData = defaultTimelineData;
        }

        return (
          <div className="space-y-12 animate-fade-in-up bg-white p-6 md:p-16 rounded-3xl relative overflow-hidden">
            {/* 동적으로 구현된 프리미엄 럭셔리 매출 성장 그래프 애니메이션 컴포넌트 */}
            <SalesGrowthChart />

            {/* Header */}
            <div className="text-left mb-16 relative z-10 max-w-4xl mx-auto pl-[30px] md:pl-[120px]">
              
              {/* 사용자 요청 텍스트 (그림 부분) */}
              <div className="mb-12 animate-fade-in-up">
                <h2 className="text-xl md:text-2xl font-pretendard font-black text-gray-800 leading-tight tracking-tight">
                  신뢰와 혁신으로<br />
                  미래를 향한 <span className="text-[#3a8b54]">DASAN</span>
                </h2>
              </div>

              <span className="text-brand-green font-bold tracking-widest uppercase text-sm mb-2 block animate-fade-in-up" style={{animationDelay: '100ms'}}>Our History</span>
              <h3 className="text-xl md:text-2xl font-pretendard font-black text-gray-900 tracking-tight animate-fade-in-up" style={{animationDelay: '200ms'}}>
                {historyIntroTitle || '성장 연혁 (History)'}
              </h3>
              {(typeof historyIntroBody === 'string' && (historyIntroBody.includes('<p') || historyIntroBody.includes('<h'))) ? (
                <div dangerouslySetInnerHTML={{ __html: historyIntroBody }} className="mt-4 animate-fade-in-up max-w-2xl [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:text-sm [&_p]:md:text-base [&_strong]:font-bold" style={{animationDelay: '300ms'}} />
              ) : (
                <p className="text-gray-600 mt-4 text-sm md:text-base leading-relaxed animate-fade-in-up max-w-2xl" style={{animationDelay: '300ms'}}>
                  {historyIntroBody}
                </p>
              )}
            </div>

            {/* Timeline Container */}
            <HistoryAccordion timelineData={timelineData} />
          </div>
        );

      case '/about/ci':
        // Data variables for CI page (준비된 데이터 변수 - 순서대로 데이터가 들어갈 수 있도록 구성)
        let ciTitle = 'CI 소개';
        let ciSubtitle = 'Corporate Identity';
        let ciIntro = '육각형 심볼은 분자 구조와 함께 안정성과 신뢰를 상징하며, 대각선으로 절제된 워드마크는 혁신성과 기술적 진보를 표현합니다. 내부의 흐름형 그래픽(그라데이션-잎)은 생명과 기술의 연결을 의미하고, 그린 컬러는 생명·친환경·신뢰의 가치를 담고 있습니다.';
        
        let primaryLogoTitle = 'Primary Logo';
        let primaryLogoDesc = '다산제약 브랜드 아이덴티티를 대표하는 메인 로고입니다, 대내외 다양한 커뮤니케이션에 최우선으로 사용합니다.\n다산제약의 메인 로고는 각 형태에 따라 비례를 조정한 것이므로, 글자와 도형의 형태, 굵기, 비례 등을 임의로 변경할 수 없습니다.';
        let primaryLogoPrint = '인쇄용: 가로기준 권장: 30mm이상, 최소: 25mm';
        let primaryLogoDigital = '디지털: 가로기준 권장: 130px이상, 최소 120px';
        let primaryLogoFooter = '로고 활용 시 규정된 최소 사이즈 미만의 사용을 금합니다. 모바일 애플리케이션 등 작게 적용될 수 밖에 없는 매체에서는\n주어진 공간에서 최대한 크게 보일 수 있게 적용합니다.';
        
        let secondaryLogoTitle = 'Secondary Logo';
        let secondaryLogoDesc = '시그니처 조합형(가로 , 세로, 워드마크)';
        let secondaryLogoPrint1 = '인쇄용: 가로기준 권장: 70mm이상, 최소: 66mm';
        let secondaryLogoDigital1 = '디지털: 가로기준 권장: 240px이상, 최소 220px';
        let secondaryLogoPrint2 = '인쇄용: 가로기준 권장: 30mm이상, 최소: 25mm';
        let secondaryLogoDigital2 = '디지털: 가로기준 권장: 130px이상, 최소 120px';
        let secondaryLogoPrint3 = '인쇄용: 가로기준 권장: 30mm이상, 최소: 25mm';
        let secondaryLogoDigital3 = '디지털: 가로기준 권장: 100px이상, 최소 80px';

        let primaryColorTitle = 'Primary Color';
        let primaryColorDesc = '색상은 브랜드 아이덴티티를 전달하는 핵심적인 요소로 일관성 있는 이미지 구축을 위하여 지정된 색상 값을 참고하여 사용하는 것을 권장합니다.';
        
        let colors = [
          { name: 'DASAN GREEN', desc: '생명력, 인류의 건강, 지속가능한 경영 가치 상징', cmyk: '90,30,90,0', rgb: '0, 137, 83', pantone: '3425 C', hex: '#008953' },
          { name: 'Dasan Light Green', desc: '생동감과 확장성을 담은 컬러로, 브랜드에 유연한 흐름과 밝은 에너지를 더해주는 보조 컬러', cmyk: '50,0,100,0', rgb: '132, 189, 0', pantone: '376 C', hex: '#84BD00' },
          { name: 'DASAN CHARCOAL', desc: '기술적인 전문성, 정직한 기업 경영과 신뢰성 상징', cmyk: '0,0,0,70', rgb: '99, 102, 106', pantone: 'Cool Gray 10 C', hex: '#63666A' }
        ];

        let logoColorUsageTitle = 'Logo Color Usage Guideline';
        let logoColorUsageDesc = '필수 사용 (3컬러)';
        let logoColorFooter = '배경 명도에 따라 가독성을 우선 고려합니다. 기본은 오리지널 컬러를 사용하며, 필요 시 White 또는 Soft Black 로고로 대체합니다.\n색상 변경은 사전 승인 후 적용합니다.';

        let clearSpaceTitle = 'Clear Space';
        let clearSpaceDesc = '로고 최상의 시각적 효과 가독성 및 식별을 보장하기 위해\n단독 적용 시 최소 사용 여백을 유지해야 합니다.';
        let clearSpaceTipTitle = '외부 사용자 Tip';
        let clearSpaceTip1 = '1. 심볼(육각형) 높이를 잽니다.';
        let clearSpaceTip2 = '2. 그 절반 위치에 가상의 수평선을 긋습니다.';
        let clearSpaceTip3 = '3. 그 선부터 DASAN 상단까지 거리 = X';

        let incorrectUsageTitle = 'Incorrect Logo Usage';
        let incorrectUsageDesc = '다산제약 로고를 임의로 변형하거나 왜곡하는 것을 금지하며, 표준 형태와 색상을 준수해야 합니다.';
        let incorrectShapes = [
          '로고의 형태를 변경하는 경우',
          '심볼과 로고타입 조합의 비례를\n임의로 변경한 경우',
          '로고의 서체를 다르게 적용하는 경우',
          '로고 비율 규정\n기존 비율 2048px, 776px [2.64:1(2.6:1)]'
        ];
        let incorrectColors = [
          '지정색 이외의 색상을 적용하는 경우',
          '로고의 테두리에 색 또는 효과를\n적용하는 경우',
          '로고에 그라데이션을 적용하는 경우',
          ''
        ];
        let incorrectBgs = [
          '복잡한 패턴 위에 로고를 적용하는 경우',
          '채도가 유사한 배경색에 로고를\n적용하는 경우',
          '복잡한 이미지 위에 로고를 적용하는 경우',
          '로고에 그림자를 적용하는경우'
        ];

        // DB Data Overrides
        let ciSymbol = '';
        if (dbContent) {
          const lines = dbContent.split('\n');
          if (lines[0]) ciIntro = lines[0];
          if (lines[1]) ciSymbol = lines[1];
          /* if (lines[2]) colors[0].name = lines[2];
          if (lines[3] && lines[3].includes('|')) { colors[0].rgb = lines[3].split('|')[0]?.replace('RGB:', '').trim() || ''; colors[0].hex = lines[3].split('|')[1]?.replace('HEX:', '').trim() || ''; }
          if (lines[4]) colors[0].hex = lines[4];
          if (lines[5]) colors[0].desc = lines[5];
          
          if (lines[6]) colors[2].name = lines[6];
          if (lines[7] && lines[7].includes('|')) { colors[2].rgb = lines[7].split('|')[0]?.replace('RGB:', '').trim() || ''; colors[2].hex = lines[7].split('|')[1]?.replace('HEX:', '').trim() || ''; }
          if (lines[8]) colors[2].hex = lines[8];
          if (lines[9]) colors[2].desc = lines[9];

          if (lines[14]) colors[1].name = lines[14];
          if (lines[15] && lines[15].includes('|')) { colors[1].rgb = lines[15].split('|')[0]?.replace('RGB:', '').trim() || ''; colors[1].hex = lines[15].split('|')[1]?.replace('HEX:', '').trim() || ''; }
          if (lines[16]) colors[1].hex = lines[16];
          if (lines[17]) colors[1].desc = lines[17]; */
          
          if (lines[11]) primaryLogoDesc = lines[11];
          if (lines[12]) secondaryLogoDesc = lines[12];
          if (lines[13]) clearSpaceDesc = lines[13];
        }

        return (
          <div className="space-y-16 animate-fade-in-up bg-white p-8 md:p-12 rounded-3xl">
            {/* Section 1: Corporate Identity & Primary Logo */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{ciTitle}</h2>
              
              <div className="pt-8">
                <h3 className="text-2xl font-bold text-[#2A5C43] mb-4">{ciSubtitle}</h3>
                {(typeof ciIntro === 'string' && (ciIntro.includes('<p') || ciIntro.includes('<h'))) ? (
                  <div dangerouslySetInnerHTML={{ __html: ciIntro }} className="[&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:break-keep [&_p]:whitespace-pre-line [&_p]:text-[15px] [&_h4]:font-bold [&_strong]:font-bold" />
                ) : (
                  <p className="text-gray-600 leading-relaxed break-keep whitespace-pre-line text-[15px]">{ciIntro}</p>
                )}
                
                {ciSymbol && (
                  <div className="mt-8 bg-gray-50 p-6 rounded-2xl">
                    <h4 className="text-lg font-bold text-[#2A5C43] mb-3">심볼마크의 의미</h4>
                    {(typeof ciSymbol === 'string' && (ciSymbol.includes('<p') || ciSymbol.includes('<h'))) ? (
                      <div dangerouslySetInnerHTML={{ __html: ciSymbol }} className="[&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:break-keep [&_p]:whitespace-pre-line [&_p]:text-[14px] [&_h4]:font-bold [&_strong]:font-bold" />
                    ) : (
                      <p className="text-gray-600 leading-relaxed break-keep whitespace-pre-line text-[14px]">{ciSymbol}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-12">
                <h3 className="text-2xl font-bold text-[#2A5C43] mb-4">{primaryLogoTitle}</h3>
                {(typeof primaryLogoDesc === 'string' && (primaryLogoDesc.includes('<p') || primaryLogoDesc.includes('<h'))) ? (
                  <div dangerouslySetInnerHTML={{ __html: primaryLogoDesc }} className="[&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:break-keep [&_p]:whitespace-pre-line [&_p]:mb-8 [&_p]:text-[15px] [&_h4]:font-bold [&_strong]:font-bold" />
                ) : (
                  <p className="text-gray-600 leading-relaxed break-keep whitespace-pre-line mb-8 text-[15px]">{primaryLogoDesc}</p>
                )}
                
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                  <div className="p-10 lg:p-12 flex flex-col items-center">
                     {/* Logo Display Area */}
                     <div className="w-full max-w-5xl h-80 md:h-[500px] bg-white flex items-center justify-center rounded-[2rem] relative group mb-10">
                        <Image
                          src="/clear_space_grid.png"
                          alt="Dasan Primary Logo"
                          fill
                          className="object-contain p-4 md:p-8 drop-shadow-sm transition-transform duration-700 group-hover:scale-[1.03]"
                          priority
                        />
                     </div>
                     
                     {/* Specifications & Download Action */}
                     <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 border-t border-gray-100 pt-8 px-2 md:px-6">
                        <div className="flex flex-col gap-3 w-full md:w-auto">
                           <div className="flex items-center space-x-3 text-[13px] bg-white px-4 py-2.5 rounded-2xl">
                              <span className="font-bold text-white bg-[#2A5C43] px-3 py-1 rounded-full shadow-sm text-[11px] tracking-wider">인쇄용</span>
                              <span className="text-gray-700 font-medium tracking-tight">{primaryLogoPrint.replace('인쇄용: ', '')}</span>
                           </div>
                           <div className="flex items-center space-x-3 text-[13px] bg-white px-4 py-2.5 rounded-2xl">
                              <span className="font-bold text-white bg-[#50A5D6] px-3 py-1 rounded-full shadow-sm text-[11px] tracking-wider">디지털</span>
                              <span className="text-gray-700 font-medium tracking-tight">{primaryLogoDigital.replace('디지털: ', '')}</span>
                           </div>
                        </div>
                        
                        <PrimaryCIDownloadButton />
                     </div>
                  </div>
                </div>
                {(typeof primaryLogoFooter === 'string' && (primaryLogoFooter.includes('<p') || primaryLogoFooter.includes('<h'))) ? (
                  <div dangerouslySetInnerHTML={{ __html: primaryLogoFooter }} className="[&_p]:text-gray-500 [&_p]:mt-6 [&_p]:text-sm [&_p]:whitespace-pre-line [&_p]:leading-relaxed [&_h4]:font-bold [&_strong]:font-bold" />
                ) : (
                  <p className="text-gray-500 mt-6 text-sm whitespace-pre-line leading-relaxed">{primaryLogoFooter}</p>
                )}
              </div>
            </div>


            {/* Section: Clear Space */}
            <div className="pt-16 border-t border-gray-100">
              <h3 className="text-3xl font-bold text-[#2A5C43] mb-6">Clear Space</h3>
              <p className="text-gray-600 leading-relaxed break-keep mb-4 text-[15px]">
                로고 최상의 시각적 효과 가독성 및 식별을 보장하기 위해 단독 적용 시 최소 사용 여백을 유지해야 합니다. 표시된 심볼 주변 공간은 최소 여백을 나타내며 이 공간에는 다른 요소가 나타나지 않도록 적용하여야 합니다.<br/>
                <strong>(서브 로고형도 동일하게 적용합니다.)</strong>
              </p>
              <p className="text-gray-600 leading-relaxed break-keep mb-8 text-[15px]">
                최소 공간 규정의 기준 단위(X)는 심볼(육각형)의 절반 높이를 기준으로 설정한 가상선과 워드마크(DASAN) 상단 간의 거리에서 도출하였습니다. 이는 심볼과 워드마크간의 구조적 비례 관계를 반영한 값으로, 로고의 일체감과 시각적 균형을 유지하기 위한 기준입니다.
              </p>
              
              <div className="bg-[#2A5C43] text-white inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4">외부 사용자 Tip</div>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 text-[15px] font-medium mb-4">
                <li>심볼(육각형) 높이를 잽니다.</li>
                <li>그 절반 위치에 가상의 수평선을 긋습니다.</li>
                <li>그 선부터 DASAN 상단까지 거리 = X</li>
              </ol>
            </div>

            {/* Section 3: Primary Color & Logo Color Usage Guideline */}
            <div className="pt-16 border-t border-gray-100">
              <h3 className="text-2xl font-bold text-[#2A5C43] mb-4">{primaryColorTitle}</h3>
              {(typeof primaryColorDesc === 'string' && (primaryColorDesc.includes('<p') || primaryColorDesc.includes('<h'))) ? (
                <div dangerouslySetInnerHTML={{ __html: primaryColorDesc }} className="[&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:break-keep [&_p]:mb-10 [&_p]:text-[15px] [&_p]:whitespace-pre-line [&_h4]:font-bold [&_strong]:font-bold" />
              ) : (
                <p className="text-gray-600 leading-relaxed break-keep mb-10 text-[15px] whitespace-pre-line">{primaryColorDesc}</p>
              )}
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
                {colors.map((c, i) => {
                  let finalHex = c.hex;
                  if (c.name === 'DASAN GREEN') finalHex = '#008953';
                  if (c.name === 'Dasan Light Green') finalHex = '#84BD00';
                  if (c.name === 'DASAN CHARCOAL') finalHex = '#63666A';
                  
                  return (
                  <div key={i} className="rounded-3xl p-8 text-white flex flex-col justify-between shadow-md" style={{backgroundColor: finalHex}}>
                    <div>
                      <h4 className="text-2xl font-bold mb-4">{c.name}</h4>
                      {(typeof c.desc === 'string' && (c.desc.includes('<p') || c.desc.includes('<h'))) ? (
                        <div dangerouslySetInnerHTML={{ __html: c.desc }} className={`[&_p]:text-[12px] xl:[&_p]:text-[13px] [&_p]:opacity-90 [&_p]:leading-relaxed [&_p]:mb-8 ${c.name === 'Dasan Light Green' ? '[&_p]:break-keep' : '[&_p]:whitespace-nowrap'} [&_p]:tracking-tight [&_p]:font-medium [&_h4]:font-bold [&_strong]:font-bold`} />
                      ) : (
                        <p className={`text-[12px] xl:text-[13px] opacity-90 leading-relaxed mb-8 ${c.name === 'Dasan Light Green' ? 'break-keep' : 'whitespace-nowrap'} tracking-tight font-medium`}>{c.desc}</p>
                      )}
                    </div>
                    <div className="flex justify-between text-xs font-mono bg-black/10 p-4 rounded-2xl gap-2">
                      <div className="flex-1 min-w-0">
                         <span className="inline-block border border-white/40 rounded-full px-2 py-1 text-[10px] mb-3 text-center w-full bg-white/5 whitespace-nowrap">인쇄 기준용</span>
                         <p className="mb-1 text-[9.5px] whitespace-nowrap tracking-tighter">CMYK: {c.cmyk}</p>
                         <p className="text-[9.5px] whitespace-nowrap tracking-tighter">Pantone: {c.pantone}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                         <span className="inline-block border border-white/40 rounded-full px-2 py-1 text-[10px] mb-3 text-center w-full bg-white/5 whitespace-nowrap">디지털 화면용</span>
                         <p className="mb-1 text-[9.5px] whitespace-nowrap tracking-tighter">RGB: {c.rgb}</p>
                         <p className="text-[9.5px] whitespace-nowrap tracking-tighter">HEX: {c.hex}</p>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>

              {/* Premium CI Brand Guideline Download Button */}
              <CIDownloadButton />

            </div>



          </div>
        );





      case '/about/facilities':
        // Default static texts
        let facIntro = '연구개발에서 생산, 글로벌 시장 진출까지 유기적으로 연결된 다산제약의 핵심 거점입니다.';

        // Use Rich Text Editor content if available, otherwise use beautifully designed static layout
        if (dbContent && (dbContent.includes('<p') || dbContent.includes('<h'))) {
          return (
             <div className="space-y-10 animate-fade-in-up">
              <div dangerouslySetInnerHTML={{ __html: dbContent }} className="[&_p]:text-gray-650 [&_p]:text-sm [&_p]:leading-relaxed [&_h4]:font-bold [&_strong]:font-bold" />
            </div>
          );
        }

        const MapIconSVG = (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        );

        const cardClass = "bg-white rounded-3xl p-6 md:p-8 border border-gray-200 hover:border-brand-green/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden flex flex-col group";
        const iconContainerClass = "p-3 bg-gray-50 group-hover:bg-brand-green/10 rounded-2xl transition-colors duration-300 text-gray-400 group-hover:text-brand-green";
        const buttonClass = "inline-flex flex-1 items-center justify-center text-[12px] font-bold text-gray-500 group-hover:text-brand-green bg-gray-50 group-hover:bg-brand-green/5 px-4 py-2.5 rounded-xl transition-all duration-300 border border-gray-200 group-hover:border-brand-green/30 hover:!bg-brand-green hover:!text-white";

        return (
          <div className="space-y-10 animate-fade-in-up">
            {/* 공장 전경 이미지 (그림1) */}
            <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-lg relative mb-12">
              {/* 이미지 경로: 임의로 press_factory.png를 지정하였으나, 추후 실제 파일명으로 수정 가능합니다. */}
              <Image 
                src="/press_factory.png" 
                alt="다산제약 글로벌 생산 기지 전경" 
                fill
                unoptimized={true}
                className="object-cover"
              />
            </div>
            
            <div className="text-left mb-10">
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-4">
                글로벌 인프라 현황 (Global Infrastructure)
              </h3>
              <p className="text-gray-500 text-[15px] leading-relaxed max-w-3xl font-medium">
                {facIntro}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              
              {/* 본사 (HQ) */}
              <div className={cardClass}>
                <div className="flex items-center space-x-4 relative z-10 mb-6">
                  <div className={iconContainerClass}>
                    <Building2 size={28} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest block mb-0.5">Headquarters</span>
                    <h4 className="font-black text-gray-900 text-xl group-hover:text-brand-green transition-colors">본사</h4>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-6 space-y-4 flex-grow relative z-10">
                  <div>
                    <span className="text-sm text-brand-green font-bold block mb-2">서울 영등포구 선유로 70</span>
                    <p className="text-[13.5px] text-gray-600 font-medium leading-relaxed">경영, 영업, 구매, 사업개발 등 지속 가능한 미래 성장 전략 수립</p>
                  </div>
                </div>
                </div>

              {/* R&D 네트워크 */}
              <div className={cardClass}>
                <div className="flex items-center space-x-4 relative z-10 mb-6">
                  <div className={iconContainerClass}>
                    <Zap size={28} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest block mb-0.5">R&D Network</span>
                    <h4 className="font-black text-gray-900 text-xl group-hover:text-brand-green transition-colors">R&D 네트워크</h4>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-6 space-y-6 relative z-10 flex-grow">
                  <div>
                    <span className="text-sm font-bold text-gray-900 block mb-2 flex items-center justify-between">
                      다산 중앙연구소 
                      <span className="text-[11px] text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full font-bold">경기 수원시</span>
                    </span>
                    <p className="text-[13.5px] text-gray-600 font-medium leading-relaxed mb-4">제제 및 합성 관련 연구시설을 갖추고 연구개발 총괄</p>
                  </div>
                  <div className="pt-6 border-t border-dashed border-gray-200">
                    <span className="text-sm font-bold text-gray-900 block mb-2 flex items-center justify-between">
                      중국 심양연구소
                      <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full font-bold">중국 심양시</span>
                    </span>
                    <p className="text-[13.5px] text-gray-600 font-medium leading-relaxed">중국 내 연구, 허가, 사업개발을 담당하는 글로벌 영토 확장의 전초기지</p>
                  </div>
                </div>
              </div>

              {/* 글로벌 생산 기지 */}
              <div className={cardClass}>
                <div className="flex items-center space-x-4 relative z-10 mb-6">
                  <div className={iconContainerClass}>
                    <Factory size={28} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest block mb-0.5">Production Base</span>
                    <h4 className="font-black text-gray-900 text-xl group-hover:text-brand-green transition-colors">글로벌 생산 기지</h4>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-6 space-y-6 relative z-10 flex-grow">
                  <div>
                    <span className="text-sm font-bold text-gray-900 block mb-2 flex items-center justify-between">
                      아산 제1공장 / 제2공장
                      <span className="text-[11px] text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full font-bold">충남 아산시</span>
                    </span>
                    <p className="text-[13.5px] text-gray-600 font-medium leading-relaxed mb-3">
                      원료 및 완제의약품, 내용고형제 대량 생산 체계 구축
                      <span className="inline-block text-brand-blue font-bold text-[11px] ml-2 bg-brand-blue/5 px-2.5 py-1 rounded">MHLW, GMP 인증 완료</span>
                    </p>
                  </div>
                  <div className="pt-6 border-t border-dashed border-gray-200">
                    <span className="text-sm font-bold text-gray-900 block mb-2 flex items-center justify-between">
                      Anhui Heryi Dasan
                      <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full font-bold">중국 안휘성</span>
                    </span>
                    <p className="text-[13.5px] text-gray-600 font-medium leading-relaxed">연간 약 40억 정의 생산 능력을 갖춘 중국 현지 전진 생산 기지</p>
                  </div>
                </div>
              </div>

            </div>
            {/* 찾아오시는 길 & 지도 */}
            <div className="mt-20 pt-16 border-t border-gray-150 w-full">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-8">찾아오시는 길</h3>
              <LocationMapSection hideBackButton={true} />
            </div>
          </div>
        );

      case '/about/location':
        return (
          <LocationMapSection dbContent={dbContent} />
        );

                  case '/about/esg/ethics':
        return (
          <div className="space-y-6 animate-fade-in-up bg-white p-6 md:p-12 rounded-3xl shadow-none">
            {dbContent ? (
              (() => {
                const parts = dbContent.split('|');
                const title = parts[0] || '지속 가능한 비즈니스를 위한 ESG 선언';
                const body = parts.slice(1).join('|') || '';
                return (
                  <>
                    <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-6 pb-2 border-b border-gray-100">
                      {title}
                    </h3>
                    {String(body).includes('<p') || String(body).includes('<h') ? (
                      <div dangerouslySetInnerHTML={{__html: body}} className="[&_p]:text-[15px] [&_p]:text-gray-600 [&_p]:leading-[1.8] [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold [&_ul]:list-disc [&_ul]:pl-4 [&_h4]:text-lg [&_h4]:text-brand-blue [&_h4]:mb-4 [&_h3]:mt-20 [&_h3]:mb-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-900" />
                    ) : (
                      <p className="text-gray-600 text-[15px] leading-[1.8] whitespace-pre-wrap">{body}</p>
                    )}
                  </>
                );
              })()
            ) : (
              <div className="text-center text-gray-500 py-12">
                (입력된 문구가 여기에 표시됩니다)
              </div>
            )}
          </div>
        );
      case '/about/esg/environment':
      case '/about/esg/safety':
        return (
          <div className="space-y-6 animate-fade-in-up bg-white p-6 rounded-xl shadow-none">
            {dbContent ? (
              (() => {
                const parts = dbContent.split('|');
                if (parts.length >= 2) {
                  return (
                    <>
                      <div className="flex items-center space-x-3 text-emerald-600 mb-2">
                        <Heart size={24} />
                        <h4 className="text-lg font-bold">{parts[0]}</h4>
                      </div>
                      {String(parts[1]).includes('<') ? <div dangerouslySetInnerHTML={{__html: parts[1]}} className="[&_p]:text-sm [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold [&_ul]:list-disc [&_ul]:pl-4" /> : <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{parts[1]}</p>}
                    </>
                  );
                }
                return (
                  <>
                    <div className="flex items-center space-x-3 text-emerald-600 mb-2">
                      <Heart size={24} />
                      <h4 className="text-lg font-bold">지속 가능한 비즈니스를 위한 ESG 선언</h4>
                    </div>
                    {String(dbContent).includes('<') ? <div dangerouslySetInnerHTML={{__html: dbContent}} className="[&_p]:text-sm [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold [&_ul]:list-disc [&_ul]:pl-4" /> : <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{dbContent}</p>}
                  </>
                );
              })()
            ) : (
              <>
                <div className="flex items-center space-x-3 text-emerald-600 mb-2">
                  <Heart size={24} />
                  <h4 className="text-lg font-bold">지속 가능한 비즈니스를 위한 ESG 선언</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  다산제약은 신약 개발을 통한 보건 기여뿐만 아니라 미래 세대를 위한 친환경 공정 도입, 철저한 안전 보건 관리, 투명하고 정의로운 윤리경영 실현을 약속합니다.
                </p>
                <div className="p-4 bg-emerald-50/50 rounded-lg text-xs space-y-2">
                  <p><strong>E (Environment)</strong>: 친환경 고효율 정화 시스템 가동 및 에너지 사용 절감 목표 수립</p>
                  <p><strong>S (Social)</strong>: 임직원 안전을 위한 ISO45001(안전보건경영) 시스템 정밀 준수 및 정기 검진</p>
                  <p><strong>G (Governance)</strong>: 부패 방지 가이드라인 실천과 임직원 자율적 공정거래 자율준수 프로그램(CP) 교육 의무화</p>
                </div>
              </>
            )}
          </div>
        );

      // IR pages
      case '/about/ir/announcement':
      case '/about/ir/financial': {
        // Parse dynamic content from dbContent
        let title = '주주 중심 경영과 공정한 기업 가치 평가';
        let desc = '다산제약의 경영 실적 및 투자 공시 자료는 관련 법령에 의거하여 명확하고 성실하게 공개되고 있습니다. 주주 및 투자자 여러분의 이해를 돕기 위해 실시간 재무 핵심 지표를 제공합니다.';
        let dartUrl = 'https://dart.fss.or.kr/html/search/SearchCompanyIR3_M.html?textCrpNM=%EB%8B%A4%EC%82%B0%EC%A0%9C%EC%95%BD';
        
        let financialHeaders = ['2023년 (개별)', '2024년 (개별)', '2025년 (연결)'];
        let salesRow = ['매출액', '79,300', '93,800', '106,900'];
        let profitRow = ['영업이익', '2,400', '6,200', '1,400'];
        let rdRow = ['R&D 투자액', '9,500', '12,000', '13,500'];

        // Detailed tables mock data
        let consolidatedBS = [
          ['유동자산', '46,300', '52,524', '61,500'],
          ['비유동자산', '108,300', '130,015', '140,300'],
          ['자산총계', '154,600', '182,539', '201,800'],
          ['유동부채', '78,200', '92,400', '101,400'],
          ['비유동부채', '45,300', '53,800', '57,800'],
          ['부채총계', '123,500', '146,200', '159,200'],
          ['자본금', '10,000', '10,000', '10,000'],
          ['자본잉여금', '8,200', '8,200', '8,200'],
          ['기타자본', '-500', '-500', '-500'],
          ['이익잉여금', '13,100', '18,339', '24,600'],
          ['비지배지분', '300', '300', '300'],
          ['자본총계', '31,100', '36,339', '42,600']
        ];

        let separateBS = [
          ['유동자산', '44,500', '50,200', '59,200'],
          ['비유동자산', '106,700', '128,200', '139,300'],
          ['자산총계', '151,200', '178,400', '198,500'],
          ['유동부채', '76,800', '89,500', '99,400'],
          ['비유동부채', '43,600', '52,860', '56,800'],
          ['부채총계', '120,400', '142,360', '156,200'],
          ['자본금', '10,000', '10,000', '10,000'],
          ['자본잉여금', '8,200', '8,200', '8,200'],
          ['기타자본', '-500', '-500', '-500'],
          ['이익잉여금', '13,100', '18,340', '24,600'],
          ['자본총계', '30,800', '36,040', '42,300']
        ];

        let consolidatedIS = [
          ['매출액', '79,300', '93,800', '106,900'],
          ['영업이익', '2,400', '6,200', '1,400'],
          ['법인세차감전순이익', '2,800', '8,600', '1,300'],
          ['당기순이익', '2,300', '7,900', '1,100']
        ];

        let separateIS = [
          ['매출액', '78,500', '92,700', '105,200'],
          ['영업이익', '2,300', '6,100', '1,300'],
          ['법인세차감전순이익', '2,700', '8,400', '1,200'],
          ['당기순이익', '2,200', '7,700', '1,000']
        ];

        if (currentPath === '/about/ir/announcement' && dbContent) {
          const parts = dbContent.split('|');
          title = parts[0] || title;
          desc = parts[1] || desc;
          dartUrl = parts[2] || dartUrl;
        } else if (currentPath === '/about/ir/financial' && dbContent) {
          const lines = dbContent.split('\n');
          title = lines[0] || title;
          desc = lines[1] || desc;
          if (lines[2]) financialHeaders = lines[2].split('|').map(s => s.trim());
          if (lines[3]) salesRow = lines[3].split('|').map(s => s.trim());
          if (lines[4]) profitRow = lines[4].split('|').map(s => s.trim());
          if (lines[5]) rdRow = lines[5].split('|').map(s => s.trim());

          // Parse 연결 재무상태표 (12 rows: lines[6] to lines[17])
          for (let i = 0; i < 12; i++) {
            if (lines[6 + i]) {
              consolidatedBS[i] = lines[6 + i].split('|').map(s => s.trim());
            }
          }
          // Parse 별도 재무상태표 (11 rows: lines[18] to lines[28])
          for (let i = 0; i < 11; i++) {
            if (lines[18 + i]) {
              separateBS[i] = lines[18 + i].split('|').map(s => s.trim());
            }
          }
          // Parse 연결 손익계산서 (4 rows: lines[29] to lines[32])
          for (let i = 0; i < 4; i++) {
            if (lines[29 + i]) {
              consolidatedIS[i] = lines[29 + i].split('|').map(s => s.trim());
            }
          }
          // Parse 별도 손익계산서 (4 rows: lines[33] to lines[36])
          for (let i = 0; i < 4; i++) {
            if (lines[33 + i]) {
              separateIS[i] = lines[33 + i].split('|').map(s => s.trim());
            }
          }
        }

        return (
          <div className="space-y-6 animate-fade-in-up bg-white p-6 rounded-xl shadow-none">
            <div className="flex items-center justify-between flex-wrap gap-4 pb-2 border-b border-gray-100">
              <div className="flex items-center space-x-3 text-brand-green">
                <LineChart size={24} />
                <h4 className="text-lg font-bold">{title}</h4>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-gray-600 text-[13.5px] tracking-tight leading-relaxed whitespace-nowrap">{desc}</p>
            </div>
            
            {currentPath === '/about/ir/announcement' ? (
              <div className="flex flex-col items-center justify-center w-full py-4 bg-white">
                <div className="w-full max-w-[715px] h-[745px] border border-gray-150 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  <iframe
                    src={dartUrl}
                    name="IR"
                    scrolling="no"
                    frameBorder="0"
                    className="w-full h-full"
                    style={{ overflow: 'hidden' }}
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="overflow-x-auto border border-gray-400 rounded-lg shadow-none">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-brand-green text-white uppercase">
                      <tr>
                        <th className="p-3 border-b border-r border-gray-400 font-bold">재무 항목 (단위: 백만원)</th>
                        {financialHeaders.map((header, idx) => {
                          const isLastCol = idx === financialHeaders.length - 1;
                          return (
                            <th key={idx} className={`p-3 border-b ${isLastCol ? '' : 'border-r'} border-gray-400 font-bold text-center`}>{header}</th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 bg-white">
                      <tr className="hover:bg-brand-green-light/20">
                        <td className="p-3 border-b border-r border-gray-400 font-bold text-brand-green-dark">{salesRow[0] || '매출액'}</td>
                        {financialHeaders.map((_, colIdx) => {
                          const isLastCol = colIdx === financialHeaders.length - 1;
                          return (
                            <td key={colIdx} className={`p-3 border-b ${isLastCol ? '' : 'border-r'} border-gray-400 text-center font-medium`}>{salesRow[colIdx + 1] || ''}</td>
                          );
                        })}
                      </tr>
                      <tr className="hover:bg-brand-green-light/20">
                        <td className="p-3 border-r border-gray-400 font-bold text-brand-green-dark">{profitRow[0] || '영업이익'}</td>
                        {financialHeaders.map((_, colIdx) => {
                          const isLastCol = colIdx === financialHeaders.length - 1;
                          return (
                            <td key={colIdx} className={`p-3 ${isLastCol ? '' : 'border-r'} border-gray-400 text-center font-medium`}>{profitRow[colIdx + 1] || ''}</td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>

                <DetailedFinancialTables
                  consolidatedBS={consolidatedBS}
                  separateBS={separateBS}
                  consolidatedIS={consolidatedIS}
                  separateIS={separateIS}
                  years={financialHeaders}
                />
              </div>
            )}
          </div>
        );
      }


      case '/about/ir/news': {
        let irNewsList: any[] = [];
        try {
          irNewsList = await query("SELECT * FROM news WHERE category = 'ir' ORDER BY created_at DESC");
        } catch (e) {
          console.error("Failed to query IR News, fallback", e);
          irNewsList = [
            {
              id: 11,
              category: 'ir',
              title: '2026년 제1분기 재무 성과 요약 및 IR 공시 안내',
              content: '1분기 매출 증가율 및 연구개발 R&D 투자 비율 등 핵심 재무 실적이 공시 정보에 공식적으로 반영되었습니다.',
              views: 56,
              created_at: new Date().toISOString(),
            },
            {
              id: 12,
              category: 'ir',
              title: '2026년도 정기 주주총회 소집 공고',
              content: '정기 주주총회 소집 장소 및 의결 사항 등 상세 정보 안내문입니다.',
              views: 74,
              created_at: new Date().toISOString(),
            }
          ];
        }

        return (
          <div className="space-y-6 animate-fade-in-up bg-white p-6 rounded-xl shadow-none">
            <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
              <p className="text-gray-500 text-sm">다산제약의 기업 성과 및 주요 IR 공시 보도 소식입니다.</p>
            </div>
            
            <PressList initialNews={irNewsList} />
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
      <div className="relative w-full px-6 md:px-16 lg:px-24 mt-8">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Left Sidebar Submenu (PC) - Hidden by user request to remove left frame */}
          <aside className="lg:col-span-1 pr-6 border-r border-gray-100 hidden space-y-8">
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-black text-brand-green tracking-tight pb-2 border-b-2 border-brand-green inline-block">
                  {grandAbout?.name}
                </h3>
              </div>
              <nav className="space-y-6">
                {grandAbout?.majors.map(major => (
                  <div key={major.name} className="space-y-2 mt-5 first:mt-0">
                    {grandAbout.majors.length > 1 && (
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
                <span>{grandAbout?.name}</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-400">{activeMajor}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight text-center mb-6">{activeTitle}</h2>

              {/* Premium Glassmorphic Tab Bar with Sliding Animation */}
              <SubmenuTabBar 
                subMenus={(activeMajorObj?.subMenus || []).filter(sub => sub.link !== '/about/location')} 
                currentPath={currentPath === '/about/location' ? '/about/facilities' : currentPath} 
              />
            </div>

            {/* Dynamic Content - Width centered and bounded for clean layout */}
            <div className="min-h-[550px] w-full max-w-5xl">
              {renderContent(dbContent, competenciesContent, visionContent, valuesContent, philosophyContent, cultureContent)}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
