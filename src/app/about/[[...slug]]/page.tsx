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
import DetailedFinancialTables from '@/components/DetailedFinancialTables';
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
  
  const grandAbout = navigationData.find(g => g.name === 'Company');
  if (grandAbout) {
    for (const major of grandAbout.majors) {
      const sub = major.subMenus.find(s => s.link === currentPath);
      if (sub) {
        activeTitle = sub.name;
        activeMajor = major.name;
        break;
      }
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
            introTitle = parts[0];
            introBody = parts[1];
          } else {
            introBody = dbContent;
          }
        }

        return (
          <div className="space-y-16 animate-fade-in-up">
            {/* 1. Intro Summary */}
            <div className="relative overflow-hidden bg-white rounded-3xl p-8 md:p-12 shadow-none">
              <span className="text-brand-teal text-xs font-bold tracking-widest uppercase block mb-3">Company Overview</span>
              <h4 className="text-2xl md:text-3xl font-black text-brand-blue mb-6 leading-tight whitespace-pre-wrap">
                {introTitle.replace(/\\n/g, '\n')}
              </h4>
              <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed max-w-4xl">
                <p className="whitespace-pre-wrap">{introBody}</p>
              </div>
            </div>

            {/* Key Competencies Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {compList.map((item, idx) => (
                <div key={idx} className="bg-white p-8 md:p-12 rounded-3xl text-left shadow-none flex flex-col items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${competenciesColors[idx % competenciesColors.length]}`}>
                    {competenciesIcons[idx % competenciesIcons.length]}
                  </div>
                  <h5 className="font-bold text-brand-blue mb-3 text-lg">{item.title}</h5>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* 2. Vision & Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {/* Mission Card */}
              <div className="bg-white rounded-3xl pl-8 md:pl-12 pr-6 md:pr-10 py-8 md:py-10 flex flex-col justify-between relative overflow-hidden shadow-none">
                <div>
                  <div className="inline-flex items-center space-x-2 text-brand-blue text-xs font-bold tracking-widest uppercase mb-6 bg-brand-blue/5 px-3 py-1.5 rounded-full border border-brand-blue/10">
                    <Target size={12} />
                    <span>Our Mission</span>
                  </div>
                  <h5 className="text-2xl font-black text-brand-blue mb-4 leading-snug">
                    {visMission.missionTitle}
                  </h5>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {visMission.missionDesc}
                  </p>
                </div>
                <div className="mt-8 border-t border-brand-blue/10 pt-4 text-xs text-brand-blue/60 font-semibold">
                  Contribution to Human Health
                </div>
              </div>

              {/* Vision Card */}
              <div className="bg-white rounded-3xl pl-8 md:pl-12 pr-6 md:pr-10 py-8 md:py-10 flex flex-col justify-between relative overflow-hidden shadow-none">
                <div>
                  <div className="inline-flex items-center space-x-2 text-brand-blue text-xs font-bold tracking-widest uppercase mb-6 bg-brand-blue/5 px-3 py-1.5 rounded-full border border-brand-blue/5">
                    <Sparkles size={12} />
                    <span>Our Vision</span>
                  </div>
                  <h5 className="text-2xl font-black text-brand-blue mb-4 leading-snug">
                    {visMission.visionTitle}
                  </h5>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {visMission.visionDesc}
                  </p>
                </div>
                <div className="mt-8 border-t border-brand-blue/10 pt-4 text-xs text-brand-cyan font-bold">
                  Global Healthcare Leader
                </div>
              </div>
            </div>

            {/* 3. Core Values */}
            <div className="space-y-8 pt-4">
              <div className="text-center md:text-left pl-8 md:pl-12 pr-6">
                <span className="text-brand-teal text-xs font-bold tracking-widest uppercase block mb-2">Core Values</span>
                <h4 className="text-2xl md:text-3xl font-black text-brand-blue">다산의 5대 핵심 가치</h4>
                <p className="text-gray-500 text-sm mt-2">우리가 일하는 방식이자 지켜나가는 원칙입니다.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {valList.map((val, idx) => {
                  const colors = [
                    'bg-brand-blue/5 text-brand-blue hover:bg-brand-blue',
                    'bg-brand-teal/10 text-brand-teal hover:bg-brand-teal',
                    'bg-brand-cyan/10 text-brand-cyan hover:bg-brand-cyan',
                    'bg-brand-blue/5 text-brand-blue hover:bg-brand-blue',
                    'bg-brand-teal/10 text-brand-teal hover:bg-brand-teal'
                  ];
                  return (
                    <div key={idx} className="bg-white pl-8 md:pl-12 pr-6 py-8 rounded-3xl shadow-none flex flex-col justify-between group">
                      <div>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 font-black text-lg group-hover:text-white transition-colors ${colors[idx % colors.length]}`}>
                          {val.letter}
                        </div>
                        <h5 className="font-bold text-brand-blue text-sm mb-1">{val.name}</h5>
                        <p className="text-[10px] text-brand-teal font-semibold mb-2">{val.subtitle}</p>
                        <p className="text-[11px] text-gray-500 leading-relaxed">
                          {val.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. CEO Philosophy */}
            <div className="bg-white text-brand-blue rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-none">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                {/* Left col: Philosophy Quote */}
                <div className="lg:col-span-1 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-150 pb-6 lg:pb-0 lg:pr-8">
                  <div>
                    <span className="text-brand-cyan text-xs font-bold tracking-widest uppercase block mb-3">CEO Philosophy</span>
                    <h4 className="text-2xl font-black text-brand-blue mb-6">CEO 경영 철학</h4>
                  </div>
                  <div className="space-y-4">
                    <Quote size={40} className="text-brand-cyan/40" />
                    <p className="text-lg md:text-xl font-bold leading-snug text-brand-blue">
                      &quot;{philData.quote}&quot;
                    </p>
                  </div>
                </div>

                {/* Right col: 3 Pillars */}
                <div className="lg:col-span-2 space-y-6 lg:pl-4">
                  {philData.pillars.map((p, idx) => {
                    const bgs = ['bg-brand-cyan/10', 'bg-brand-teal/15', 'bg-brand-cyan/10'];
                    return (
                      <div key={idx} className="flex items-start space-x-4">
                        <span className={`flex-shrink-0 w-8 h-8 rounded-full text-brand-blue flex items-center justify-center font-extrabold text-xs mt-1 ${bgs[idx % bgs.length]}`}>
                          {p.id}
                        </span>
                        <div>
                          <h5 className="font-bold text-base text-brand-blue mb-1">{p.title}</h5>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {p.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 5. Corporate Culture */}
            <div className="space-y-8 pt-4">
              <div className="text-center md:text-left pl-8 md:pl-12 pr-6">
                <span className="text-brand-cyan text-xs font-bold tracking-widest uppercase block mb-2">Corporate Culture</span>
                <h4 className="text-2xl md:text-3xl font-black text-brand-blue">{cultureData.title}</h4>
                <p className="text-gray-500 text-sm mt-2">{cultureData.sub}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cultureData.items.map((item, idx) => {
                  const icons = [
                    <Heart size={20} key="heart" />,
                    <BookOpen size={20} key="book" />,
                    <MessageSquare size={20} key="msg" />
                  ];
                  const bgs = [
                    'bg-brand-teal/10 text-brand-teal',
                    'bg-brand-cyan/10 text-brand-cyan',
                    'bg-brand-blue/10 text-brand-blue'
                  ];
                  return (
                    <div key={idx} className="bg-white rounded-3xl pl-8 md:pl-12 pr-6 py-8 shadow-none group">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${bgs[idx % bgs.length]}`}>
                        {icons[idx % icons.length]}
                      </div>
                      <h5 className="font-bold text-brand-blue text-sm mb-2">{item.title}</h5>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case '/about/business-area':
        // Parse business-area data
        let bizData = {
          intro: '완제의약품 R&D 및 마케팅, 글로벌 원료의약품(API) 공급, 그리고 약물방출조절(DDS) 기반 고품격 위탁생산개발(CDMO) 서비스를 바탕으로 세계인의 삶의 질을 높입니다.',
          items: [
            { title: '1. 원료의약품(API) 개발 및 공급', desc: '고난도 유기합성 기술을 기반으로 자체 원료 합성 연구소를 구축하여 고품질의 API를 전 세계 시장에 직접 유통하며 중간체 정밀 화학 사업도 전개합니다.' },
            { title: '2. 완제의약품 생산 및 판매', desc: '순환기계(혈압, 고지혈증), 대사계(당뇨), 소화기계 및 일반의약품(OTC)에 이르는 폭넓은 스펙트럼의 고부가가치 완제의약품 파이프라인을 공급합니다.' },
            { title: '3. CDMO (위탁 개발 및 생산)', desc: '마이크로캡슐화, 서방성 제형 특화 플랫폼 등 자사 고유의 DDS(약물전달시스템) 기술을 결합하여 복합제 개발 및 차별화 완제의약품의 수탁 개발/생산 서비스를 제공합니다.' }
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
          <div className="space-y-8 animate-fade-in-up">
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{bizData.intro}</p>
            <div className="grid grid-cols-1 gap-6">
              {bizData.items.map((item, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-white shadow-none">
                  <h4 className="font-bold text-brand-blue text-base mb-2">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-normal">{item.desc}</p>
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
        let historyIntroTitle = '도전과 신뢰의 역사, 인류의 건강을 위해 걸어온 길';
        let historyIntroBody = '다산제약은 1996년 설립 이후 독자적인 DDS 기술 확보와 글로벌 신약 개발을 향해 쉼 없이 달려왔습니다.';
        let timelineData: TimelineEra[] = [];

        // Define default timeline
        const defaultTimelineData: TimelineEra[] = [
          {
            eraTitle: '2020 ~ Present',
            eraSubtitle: '글로벌 도약과 기술 혁신',
            events: [
              { year: '2025년', details: ['• 130억 원 규모 프리IPO(상장 전 지분투자) 유치 성공 및 코스닥 상장 채비 완료'] },
              { year: '2022년', details: ['• 제59회 무역의 날 700만불 수출의 탑 수상', '• 혁신성장 유공 중소벤처기업부 장관 표창 수상', '• 고용노동부 주관 \'청년친화강소기업\' 선정'] },
              { year: '2021년', details: ['• 충청남도 \'우수기업인상\' 수상', '• 충남경제진흥원 \'글로벌 강소기업\' 선정'] },
              { year: '2020년', details: ['• 고용노동부 \'청년친화 강소기업\' 선정', '• 충청남도 \'유망중소기업\' 선정'] }
            ]
          },
          {
            eraTitle: '2010 ~ 2019',
            eraSubtitle: '사업 다각화 및 R&D 성장기',
            events: [
              { year: '2019년', details: ['• 아산 제2공장 준공 (최첨단 스마트 패키징 및 대량 생산 라인)', '• 대한상공회의소 \'일하기 좋은 중소기업\' 선정'] },
              { year: '2018년', details: ['• 수원 중앙연구소 이노플렉스 통합 이전 및 R&D 플랫폼 고도화', '• 보건복지부장관 표창 수상'] },
              { year: '2017년', details: ['• 사명 변경: (주)다산메디켐 ➔ (주)다산제약 (제약 전문 브랜드 도약)', '• KOTRA 수출혁신 기업상 수상'] },
              { year: '2016년', details: ['• 중앙연구소 확장 이전'] },
              { year: '2014년', details: ['• 중국 심양 연구소 설립 및 한중 공동 연구 인프라 확보'] },
              { year: '2011년', details: ['• 벤처활성화 유공포상 중소기업청장상 수상', '• 기술보증기금(KIBO) 성공기업 선정', '• 아산공장 내 완제의약품 물류센터 완공'] },
              { year: '2010년', details: ['• 한국을 빛낸 이달의 무역인상 수상'] }
            ]
          },
          {
            eraTitle: '1996 ~ 2009',
            eraSubtitle: '창업 및 성장 기반 확립',
            events: [
              { year: '2007년', details: ['• \'INNO-BIZ\' 기술혁신형 중소기업 인증 획득', '• 아산 제1공장 KGMP 인증 획득 및 상용화 생산 가동', '• 의약품 수출의 날 수출유공자 표창 수상'] },
              { year: '2001년', details: ['• 아산 원료의약품 공장 준공 및 제조업 허가 취득', '• 기업부설 중앙연구소 설립 인가'] },
              { year: '1996년', details: ['• 12월: (주)다산메디켐 설립'] }
            ]
          }
        ];

        if (dbContent) {
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
        }
        
        if (timelineData.length === 0) {
          timelineData = defaultTimelineData;
        }

        return (
          <div className="space-y-12 animate-fade-in-up">
            {/* Intro banner */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-none border border-gray-100">
              <span className="text-brand-green text-xs font-bold tracking-widest uppercase block mb-2">History</span>
              <h4 className="text-xl md:text-2xl font-black text-brand-blue leading-snug whitespace-pre-wrap">
                {historyIntroTitle.replace(/\\n/g, '\n')}
              </h4>
              <p className="text-gray-500 text-xs md:text-sm mt-2 leading-relaxed whitespace-pre-wrap">
                {historyIntroBody}
              </p>
            </div>

            {/* Timeline Wrapper */}
            <div className="relative border-l border-gray-200 ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
              
              {timelineData.map((era, eraIdx) => (
                <div key={eraIdx} className="relative">
                  {/* Era indicator pin */}
                  <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-brand-green border-[3px] border-white shadow-sm" />
                  <h4 className="text-lg md:text-xl font-extrabold text-brand-green mb-6">
                    {era.eraTitle} {era.eraSubtitle && <span className="text-gray-400 text-xs font-semibold ml-2">{era.eraSubtitle}</span>}
                  </h4>
                  
                  <div className="space-y-6">
                    {era.events.map((evt, evtIdx) => (
                      <div key={evtIdx} className="flex flex-col md:flex-row md:items-start gap-1 md:gap-8">
                        <div className="text-base font-black text-brand-green min-w-[70px]">{evt.year}</div>
                        <div className="text-gray-600 text-xs md:text-sm leading-relaxed">
                          {evt.details.map((detail, dIdx) => (
                            <React.Fragment key={dIdx}>
                              {detail}
                              {dIdx < evt.details.length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            </div>
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
          { name: 'Dasan Green', desc: '정밀성과 신뢰를 기반으로 한 다산제약의 핵심\n컬러로, 안정감 있는 그린 톤을 통해 친환경적\n가치와 브랜드 아이덴티티를 상징하는\n시그니처 컬러', cmyk: '90,30,90,0', rgb: '0, 137, 83', pantone: '3425 C', hex: '#008953' },
          { name: 'Dasan Light Green', desc: '생동감과 확장성을 담은 컬러로,\n브랜드에 유연한 흐름과 밝은 에너지를\n더해주는 보조 컬러', cmyk: '50,0,100,0', rgb: '141, 198, 63', pantone: '376 C', hex: '#8dc63f' },
          { name: 'Dasan Gray', desc: '전체적인 균형과 질서를 유지하는 컬러로,\n정보 전달의 명확성을 높이고 시각 요소를\n정돈하는 보조 컬러', cmyk: '0,0,0,70', rgb: '109, 110, 113', pantone: 'Cool Gray 10 C', hex: '#6d6e71' }
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

        // DB Data Overrides (추후 DB 연동 시 아래 주석 해제 및 적용 가능)
        /*
        if (dbContent) {
           // Parse structured db content here
        }
        */

        return (
          <div className="space-y-16 animate-fade-in-up bg-white p-8 md:p-12 rounded-3xl">
            {/* Section 1: Corporate Identity & Primary Logo */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{ciTitle}</h2>
              
              <div className="pt-8">
                <h3 className="text-2xl font-bold text-[#2A5C43] mb-4">{ciSubtitle}</h3>
                <p className="text-gray-600 leading-relaxed break-keep whitespace-pre-line text-[15px]">{ciIntro}</p>
              </div>

              <div className="pt-12">
                <h3 className="text-2xl font-bold text-[#2A5C43] mb-4">{primaryLogoTitle}</h3>
                <p className="text-gray-600 leading-relaxed break-keep whitespace-pre-line mb-8 text-[15px]">{primaryLogoDesc}</p>
                
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                  <div className="p-10 lg:p-12 flex flex-col items-center">
                     {/* Logo Display Area */}
                     <div className="w-full max-w-4xl h-56 md:h-72 bg-gradient-to-b from-gray-50/50 to-white flex items-center justify-center rounded-[2rem] relative group mb-10">
                        <div className="absolute inset-0 border border-gray-100 rounded-[2rem] transition-colors duration-500 group-hover:border-green-100/60"></div>
                        <Image
                          src="/dasan_logo_new_1.png"
                          alt="Dasan Primary Logo"
                          fill
                          className="object-contain p-8 md:p-12 drop-shadow-sm transition-transform duration-700 group-hover:scale-[1.03]"
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
                        
                        <a href="/dasan_logo_new_1.png" download="dasan_logo.png" className="group w-full md:w-auto relative inline-flex items-center justify-center px-8 py-5 font-bold text-white transition-all duration-300 bg-[#2A5C43] rounded-2xl hover:bg-[#1f4532] hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2A5C43] overflow-hidden">

                           <span className="relative flex items-center space-x-3 tracking-wide text-[15px]">
                              <span>CI 다운로드</span>
                              <div className="bg-white/20 rounded-full p-1.5 group-hover:bg-white/30 transition-colors duration-300">
                                 <Download size={18} strokeWidth={2.5} />
                              </div>
                           </span>
                        </a>
                     </div>
                  </div>
                </div>
                <p className="text-gray-500 mt-6 text-sm whitespace-pre-line leading-relaxed">{primaryLogoFooter}</p>
              </div>
            </div>


            {/* Section 3: Primary Color & Logo Color Usage Guideline */}
            <div className="pt-16 border-t border-gray-100">
              <h3 className="text-2xl font-bold text-[#2A5C43] mb-4">{primaryColorTitle}</h3>
              <p className="text-gray-600 leading-relaxed break-keep mb-10 text-[15px] whitespace-pre-line">{primaryColorDesc}</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
                {colors.map((c, i) => (
                  <div key={i} className="rounded-3xl p-8 text-white flex flex-col justify-between shadow-md" style={{backgroundColor: c.hex}}>
                    <div>
                      <h4 className="text-2xl font-bold mb-4">{c.name}</h4>
                      <p className="text-[13px] opacity-90 leading-relaxed mb-8 break-keep whitespace-pre-line font-medium">{c.desc}</p>
                    </div>
                    <div className="flex justify-between text-xs font-mono bg-black/10 p-4 rounded-2xl gap-2">
                      <div className="flex-1">
                         <span className="inline-block border border-white/40 rounded-full px-3 py-1 text-[10px] mb-3 text-center w-full bg-white/5">인쇄 기준용</span>
                         <p className="mb-1 text-[11px]">CMYK: {c.cmyk}</p>
                         <p className="text-[11px]">Pantone: {c.pantone}</p>
                      </div>
                      <div className="flex-1">
                         <span className="inline-block border border-white/40 rounded-full px-3 py-1 text-[10px] mb-3 text-center w-full bg-white/5">디지털 화면용</span>
                         <p className="mb-1 text-[11px]">RGB: {c.rgb}</p>
                         <p className="text-[11px]">HEX: {c.hex}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Premium CI Brand Guideline Download Button */}
              <div className="mt-16 mb-12 w-full">
                <a 
                  href="/다산제약 CI 브랜드 가이드 라인.pdf" 
                  download="다산제약 CI 브랜드 가이드 라인.pdf"
                  className="group relative flex items-center w-full p-1 bg-[#2A5C43] rounded-3xl hover:shadow-[0_20px_40px_-15px_rgba(42,92,67,0.5)] hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                >
                  <div className="relative w-full flex flex-col sm:flex-row items-center justify-center bg-white px-10 py-7 sm:py-6 rounded-[22px] transition-colors duration-500 group-hover:bg-[#f8fcf9] gap-4 sm:gap-6">
                    
                    <div className="flex flex-col text-center sm:text-left z-10">
                      <span className="text-[13px] font-extrabold text-[#777] tracking-[0.2em] mb-1">BRAND IDENTITY</span>
                      <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-4">
                        <span className="text-[22px] sm:text-[24px] font-extrabold text-gray-900 tracking-tight group-hover:text-[#2A5C43] transition-colors duration-300">다산제약 CI 가이드라인 파일 받기</span>
                        <div className="flex-shrink-0 w-14 h-14 bg-[#f0f5f2] group-hover:bg-[#2A5C43] rounded-2xl flex items-center justify-center transition-colors duration-500 shadow-inner">
                          <Download className="text-[#2A5C43] group-hover:text-white transition-colors duration-500" size={26} strokeWidth={2.5} />
                        </div>
                      </div>
                    </div>

                    <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-[#4294D0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-r-[22px] pointer-events-none"></div>
                  </div>
                </a>
              </div>

            </div>



          </div>
        );


      case '/about/facilities':
        // Default static texts
        let facIntro = '다산제약은 고난도 제형 연구를 선도하는 수원 R&D 중앙연구소와 선진 GMP(KGMP) 규격에 부합하는 아산 제1, 2공장을 가동하여 연구개발에서 생산에 이르는 완성도 높은 제약 솔루션을 제공합니다.';
        let resName = '수원 중앙연구소';
        let resLoc = '경기 수원시 영통구 신원로 304(원천동) 이노플렉스 3동 306호';
        let resField = '약물전달시스템(DDS) 플랫폼 설계, 복합 개량신약 제제 연구, 원료의약품(API) 고효율 합성 공정 개발';
        let resInfra = '고해상도 분광광도계, 초고성능 액체크로마토그래피(UPLC), 나노 입자 입도분석기 등 최첨단 제제 분석 설비 보유';

        let f1Name = '아산 제1공장';
        let f1Loc = '충청남도 아산시 도고면 덕암산로 342';
        let f1Item = '완제의약품 (정제, 캡슐제, 유동층 과립제품 등)';
        let f1Facility = '독일 Glatt社 최첨단 유동층 코팅기 (GPCG-300, GPCG-120), 초고속 이중정 타정기, 중앙 자동화 컨트롤 모니터링 시스템';
        let f1Capacity = '연간 최대 9억 정 규모 고형제 생산 라인';

        let f2Name = '아산 제2공장';
        let f2Loc = '충청남도 아산시 도고면 덕암산로 381';
        let f2Function = '의약품 포장 공정 자동화 및 스마트 물류창고';
        let f2Facility = '독일 및 이탈리아산 고속 블리스터(Alu-Alu, PVC/PVDC) 포장기, 카토너 카운터 일원화 라인, 실시간 온습도 조절 항온물류창고';
        let f2Green = '정제 선별 고해상도 인쇄 선별 장치, 고성능 스마트 집진 시스템';

        if (dbContent) {
          const lines = dbContent.split('\n');
          if (lines[0]) facIntro = lines[0];
          if (lines[1]) resName = lines[1];
          if (lines[2]) resLoc = lines[2];
          if (lines[3]) resField = lines[3];
          if (lines[4]) resInfra = lines[4];
          if (lines[5]) f1Name = lines[5];
          if (lines[6]) f1Loc = lines[6];
          if (lines[7]) f1Item = lines[7];
          if (lines[8]) f1Facility = lines[8];
          if (lines[9]) f1Capacity = lines[9];
          if (lines[10]) f2Name = lines[10];
          if (lines[11]) f2Loc = lines[11];
          if (lines[12]) f2Function = lines[12];
          if (lines[13]) f2Facility = lines[13];
          if (lines[14]) f2Green = lines[14];
        }

        return (
          <div className="space-y-10 animate-fade-in-up">
            <p className="text-gray-650 text-sm leading-relaxed">
              {facIntro}
            </p>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* 수원 R&D 중앙연구소 */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-150 shadow-[0_10px_30px_rgba(0,0,0,0.015)] space-y-5">
                <div className="flex items-center space-x-3 text-brand-blue">
                  <div className="p-2.5 bg-brand-blue/5 rounded-2xl">
                    <Building2 size={26} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">Research Center</span>
                    <h4 className="font-black text-brand-blue text-lg">{resName}</h4>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4 space-y-3.5 text-xs text-gray-600 font-medium">
                  <div>
                    <span className="text-gray-400 block mb-0.5">소재지</span>
                    <p className="text-brand-blue font-bold">{resLoc}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">주요 연구 분야</span>
                    <p className="text-brand-blue font-bold">{resField}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">연구 인프라</span>
                    <p className="text-brand-blue font-bold">{resInfra}</p>
                  </div>
                </div>
              </div>

              {/* 아산 제1공장 */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-150 shadow-[0_10px_30px_rgba(0,0,0,0.015)] space-y-5">
                <div className="flex items-center space-x-3 text-brand-green">
                  <div className="p-2.5 bg-brand-green/10 rounded-2xl">
                    <Factory size={26} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">Production Base 01</span>
                    <h4 className="font-black text-brand-blue text-lg">{f1Name}</h4>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4 space-y-3.5 text-xs text-gray-600 font-medium">
                  <div>
                    <span className="text-gray-400 block mb-0.5">소재지</span>
                    <p className="text-brand-blue font-bold">{f1Loc}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">주요 생산 품목</span>
                    <p className="text-brand-blue font-bold">{f1Item}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">핵심 생산 설비</span>
                    <p className="text-brand-blue font-bold">{f1Facility}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">연간 생산 능력</span>
                    <p className="text-brand-blue font-bold">{f1Capacity}</p>
                  </div>
                </div>
              </div>

              {/* 아산 제2공장 */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-150 shadow-[0_10px_30px_rgba(0,0,0,0.015)] space-y-5">
                <div className="flex items-center space-x-3 text-brand-cyan">
                  <div className="p-2.5 bg-brand-cyan/10 rounded-2xl">
                    <Factory size={26} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">Production Base 02</span>
                    <h4 className="font-black text-brand-blue text-lg">{f2Name}</h4>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4 space-y-3.5 text-xs text-gray-600 font-medium">
                  <div>
                    <span className="text-gray-400 block mb-0.5">소재지</span>
                    <p className="text-brand-blue font-bold">{f2Loc}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">주요 생산 기능</span>
                    <p className="text-brand-blue font-bold">{f2Function}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">핵심 생산 설비</span>
                    <p className="text-brand-blue font-bold">{f2Facility}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">친환경 스마트 설비</span>
                    <p className="text-brand-blue font-bold">{f2Green}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case '/about/location':
        return (
          <LocationMapSection dbContent={dbContent} />
        );

      case '/about/esg/ethics':
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
                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{parts[1]}</p>
                    </>
                  );
                }
                return (
                  <>
                    <div className="flex items-center space-x-3 text-emerald-600 mb-2">
                      <Heart size={24} />
                      <h4 className="text-lg font-bold">지속 가능한 비즈니스를 위한 ESG 선언</h4>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{dbContent}</p>
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
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{desc}</p>
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
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 mt-8">

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
            <div className="pb-8 border-b border-gray-100 w-full text-center flex flex-col items-center">
              <div className="flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-green mb-3">
                <span>{grandAbout?.name}</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-400">{activeMajor}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-brand-blue tracking-tight text-center mb-6">{activeTitle}</h2>

              {/* Premium Glassmorphic Tab Bar with Sliding Animation */}
              <SubmenuTabBar subMenus={grandAbout?.majors.flatMap(m => m.subMenus) || []} currentPath={currentPath} />
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
