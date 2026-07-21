import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { navigationData } from '@/lib/navigation';
import SubmenuTabBar from '@/components/SubmenuTabBar';
import { query } from '@/lib/db';
import { UserCheck, HelpCircle, Briefcase, FileText, CheckCircle2, ChevronRight, ClipboardList } from 'lucide-react';
import PressList from '@/components/PressList';
import JobList from '@/components/JobList';
import PhilosophyGraphic from '@/components/PhilosophyGraphic';
import type { Metadata } from 'next';

interface Params {
  params: Promise<{
    slug?: string[];
  }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const pageKey = `contact/${slug.join('/')}`;

  try {
    let results = await query('SELECT content FROM admin_contents WHERE page_key = ?', [`seo/${pageKey}`]);
    if (!results || results.length === 0 || !results[0].content) {
      results = await query('SELECT content FROM admin_contents WHERE page_key = ?', ['seo/contact']);
    }

    if (results && results.length > 0 && results[0].content) {
      const [title, keywords, description] = results[0].content.split('|');
      let finalTitle = title;
      if (!finalTitle || finalTitle.includes('Contact') || finalTitle === '보도자료' || finalTitle === '홍보자료실' || finalTitle.includes('채용') || finalTitle.includes('인재') || finalTitle.includes('문의')) {
        finalTitle = '다산제약_Contact';
      }
      return {
        title: finalTitle,
        keywords: keywords || '다산제약 뉴스룸, 보도자료, 미디어, 인재채용, 채용프로세스',
        description: description || '다산제약의 뉴스룸, 언론 보도, 미디어 자료 및 인재 채용 정보를 확인하실 수 있습니다.',
      };
    }
  } catch (e) {
    console.error('Failed to load contact page metadata:', e);
  }
  return {
    title: '다산제약_Contact',
    description: '다산제약의 뉴스룸, 언론 보도, 미디어 자료 및 인재 채용 정보를 확인하실 수 있습니다.',
    keywords: '다산제약 뉴스룸, 보도자료, 미디어, 인재채용, 채용프로세스',
  };
}

interface NewsItem {
  id: number;
  category: string;
  title: string;
  content: string;
  views: number;
  created_at: string;
}

export default async function ContactCatchAllPage({ params }: Params) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];

  if (slug.length === 0) {
    redirect('/contact/newsroom/press');
  }

  const currentPath = `/contact/${slug.join('/')}`;
  const pageKey = `contact/${slug.join('/')}`;

  let dbContent: string | null = null;
  try {
    const results = await query('SELECT content FROM admin_contents WHERE page_key = ?', [pageKey]);
    if (results && results.length > 0) {
      dbContent = results[0].content;
    }
  } catch (err) {
    console.error('Failed to load db content:', err);
  }

  let activeTitle = 'Contact';
  let activeMajor = '뉴스룸';
  let activeMajorObj = null;
  
  const grandContact = navigationData.find(g => g.name === 'Connect');
  if (grandContact) {
    for (const major of grandContact.majors) {
      const sub = major.subMenus.find(s => s.link === currentPath);
      if (sub) {
        activeTitle = sub.name;
        activeMajor = major.name;
        activeMajorObj = major;
        break;
      }
    }
  }

  // Handle Dynamic DB querying for Newsroom categories
  const getPressNews = async (category: string = 'press'): Promise<NewsItem[]> => {
    try {
      const dbNews = await query("SELECT * FROM news WHERE category = ? ORDER BY created_at DESC", [category]);
      return dbNews;
    } catch (err) {
      console.error(`Failed to query ${category} news, using fallback`, err);
      if (category === 'media') {
        return [];
      }
      return [
        {
          id: 1,
          category: 'press',
          title: '다산제약, 신규 R&D 연구센터 개소로 혁신 신약 파이프라인 가속화',
          content: '다산제약이 최첨단 신약 연구센터를 공식 오픈하고 차세대 의약품 파이프라인 개발에 속도를 냅니다. 제제 기술 고도화 부문 집중 투자 예정.',
          views: 124,
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          category: 'press',
          title: '다산제약, 글로벌 제약사와 CDMO 협력 양해각서(MOU) 체결',
          content: '본 협약을 통해 고난도 고형제 및 개량신약 위탁개발생산(CDMO) 사업 영역을 글로벌 시장으로 본격 확장할 예정입니다.',
          views: 98,
          created_at: new Date().toISOString(),
        }
      ];
    }
  };

  const renderContent = async () => {
    switch (currentPath) {
      case '/contact/newsroom/press': {
        const pressNews = await getPressNews('press');
        return (
          <div className="space-y-6 animate-fade-in-up">
            <p className="text-gray-600 text-sm leading-relaxed">
              다산제약의 기업 성과 및 주요 미디어 보도자료 피드입니다.
            </p>
            
            <PressList initialNews={pressNews} />
          </div>
        );
      }
      case '/contact/newsroom/media': {
        const mediaNews = await getPressNews('media');
        return (
          <div className="space-y-6 animate-fade-in-up">
            <p className="text-gray-600 text-sm leading-relaxed">
              다산제약의 다양한 미디어 및 홍보 자료 피드입니다.
            </p>
            
            {mediaNews.length > 0 ? (
              <PressList initialNews={mediaNews} />
            ) : (
              <div className="text-center py-16 text-gray-400 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                등록된 홍보자료가 없습니다.
              </div>
            )}
          </div>
        );
      }

      case '/contact/careers/talent': {
        const lines = dbContent ? dbContent.split(/\r?\n/) : [];
        const mainTitle = lines[0] || '도전, 혁신, 소통으로 미래를 여는 인재';
        const intro = lines[1] || '다산제약은 최고의 전문성을 지향하며, 변화에 도전하고 상호 신뢰와 소통을 바탕으로 새로운 성장과 발전을 주도해 나가는 성실한 주역을 기다립니다.';
        const card1Title = lines[2] || '전문적 도전';
        const card1Desc = lines[3] || '자기 분야 최고의 전문 지식을 고도화하며 타협하지 않는 열정으로 문제 해결에 도전.';
        const card2Title = lines[4] || '혁신 지향';
        const card2Desc = lines[5] || '기존 관행을 뛰어넘는 창의적인 사고로 신기술 및 프로세스 효율화 혁신 구현.';
        const card3Title = lines[6] || '신뢰와 협동';
        const card3Desc = lines[7] || '정직과 도덕적 의무를 철저히 지키며 동료 및 파트너와의 수평적 소통을 지향.';

        return (
          <div className="space-y-12 animate-fade-in-up">


            <div className="mt-12 mb-8 text-center animate-fade-in-up">
              <h3 className="text-2xl md:text-3xl font-black text-brand-blue break-keep">
                인재상(정도 경영, 도전과 창의, 소통과 협력, 사회적 공헌)
              </h3>
            </div>

            <div className="w-full mb-16">
              <PhilosophyGraphic />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {/* Card 1: 정도 경영 */}
              <div className="p-6 bg-white rounded-2xl border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
                <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green mx-auto">
                  <UserCheck size={24} />
                </div>
                <h5 className="font-extrabold text-brand-blue text-base md:text-lg">정도 경영</h5>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-semibold break-keep">
                  투명하고 올바른 기준을 준수하며 시장과 고객의 신뢰를 구축합니다
                </p>
              </div>

              {/* Card 2: 도전과 창의 */}
              <div className="p-6 bg-white rounded-2xl border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
                <div className="w-12 h-12 bg-brand-cyan/10 rounded-full flex items-center justify-center text-brand-cyan mx-auto">
                  <Briefcase size={24} />
                </div>
                <h5 className="font-extrabold text-brand-blue text-base md:text-lg">도전과 창의</h5>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-semibold break-keep">
                  끊임없는 R&D 혁신과 차별화된 제제기술로 새로운 가능성을 개척합니다
                </p>
              </div>

              {/* Card 3: 소통과 협력 */}
              <div className="p-6 bg-white rounded-2xl border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
                <div className="w-12 h-12 bg-brand-teal/10 rounded-full flex items-center justify-center text-brand-teal mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <h5 className="font-extrabold text-brand-blue text-base md:text-lg">소통과 협력</h5>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-semibold break-keep">
                  구성원 간의 유기적인 협업과 파트너사와의 상생을 추구합니다
                </p>
              </div>

              {/* Card 4: 사회적 공헌 */}
              <div className="p-6 bg-white rounded-2xl border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
                <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue mx-auto">
                  <HelpCircle size={24} />
                </div>
                <h5 className="font-extrabold text-brand-blue text-base md:text-lg">사회적 공헌</h5>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-semibold break-keep">
                  생명 존중의 가치를 바탕으로 건강하고 행복한 사회를 만드는 데 기여합니다
                </p>
              </div>
            </div>
          </div>
        );
      }

      case '/contact/careers/process': {
        const lines = dbContent ? dbContent.split(/\r?\n/) : [];
        const mainTitle = lines[0] || '채용 프로세스 안내';
        const intro = lines[1] || '다산제약은 지원자 한 분 한 분의 소중한 서류와 인성을 세밀히 검토하고 있습니다.';
        const step1Title = lines[2] || '서류 전형';
        const step1Desc = lines[3] || '기본 요건 검토';
        const step2Title = lines[4] || '1차 실무 면접';
        const step2Desc = lines[5] || '직무 적합성 및 역량';
        const step3Title = lines[6] || '2차 임원 면접';
        const step3Desc = lines[7] || '인성 및 미래 가치 평가';
        const step4Title = lines[8] || '최종 합격';
        const step4Desc = lines[9] || '입사 계약 조율';

        return (
          <div className="space-y-10 animate-fade-in-up">
            <div className="border-b border-gray-100 pb-5">
              <h4 className="font-black text-brand-blue text-xl md:text-2xl mb-2 whitespace-pre-wrap">{mainTitle}</h4>
              {(typeof intro === 'string' && (intro.includes('<p') || intro.includes('<h'))) ? (
                <div dangerouslySetInnerHTML={{ __html: intro }} className="[&_p]:text-gray-500 [&_p]:text-sm md:[&_p]:text-base [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold" />
              ) : (
                <p className="text-gray-500 text-sm md:text-base whitespace-pre-wrap">{intro}</p>
              )}
            </div>
            
            <div className="relative flex flex-col md:flex-row justify-between gap-4 md:gap-6 text-center mt-12 w-full">
              {/* Connecting Background Line for Desktop */}
              <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-[2px] bg-gray-200 -z-10" />

              {/* STEP 1 */}
              <div className="relative z-10 w-full flex-1 flex flex-col items-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white border-[4px] lg:border-[6px] border-gray-50 shadow-md flex items-center justify-center text-brand-teal mb-4 lg:mb-6 mx-auto transition-transform duration-300 hover:scale-105">
                  <FileText size={28} className="text-brand-teal" />
                </div>
                <div className="bg-white p-4 lg:p-6 rounded-2xl border border-gray-200 shadow-sm w-full hover:shadow-md transition-shadow duration-300 flex-grow">
                  <span className="inline-block px-3 py-1 bg-brand-teal/10 text-brand-teal text-xs font-black rounded-full mb-3">STEP 1</span>
                  <p className="font-extrabold text-brand-blue text-sm lg:text-base mb-2 whitespace-pre-wrap">{step1Title}</p>
                  {(typeof step1Desc === 'string' && (step1Desc.includes('<p') || step1Desc.includes('<h'))) ? (
                    <div dangerouslySetInnerHTML={{ __html: step1Desc }} className="[&_p]:text-xs [&_p]:text-gray-500 [&_p]:font-medium [&_p]:whitespace-pre-wrap" />
                  ) : (
                    <p className="text-[11px] lg:text-xs text-gray-500 font-medium whitespace-pre-wrap break-keep">{step1Desc}</p>
                  )}
                </div>
                <div className="block md:hidden text-gray-300 my-4">
                  <ChevronRight size={24} className="rotate-90 mx-auto" />
                </div>
              </div>

              {/* STEP 2 (New) */}
              <div className="relative z-10 w-full flex-1 flex flex-col items-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white border-[4px] lg:border-[6px] border-gray-50 shadow-md flex items-center justify-center text-brand-cyan mb-4 lg:mb-6 mx-auto transition-transform duration-300 hover:scale-105">
                  <ClipboardList size={28} className="text-brand-cyan" />
                </div>
                <div className="bg-white p-4 lg:p-6 rounded-2xl border border-gray-200 shadow-sm w-full hover:shadow-md transition-shadow duration-300 flex-grow">
                  <span className="inline-block px-3 py-1 bg-brand-cyan/10 text-brand-cyan text-xs font-black rounded-full mb-3">STEP 2</span>
                  <p className="font-extrabold text-brand-blue text-sm lg:text-base mb-2 whitespace-pre-wrap">인적성검사</p>
                  <p className="text-[11px] lg:text-xs text-gray-500 font-medium whitespace-pre-wrap break-keep">종합 인적성 평가</p>
                </div>
                <div className="block md:hidden text-gray-300 my-4">
                  <ChevronRight size={24} className="rotate-90 mx-auto" />
                </div>
              </div>

              {/* STEP 3 (Formerly 2) */}
              <div className="relative z-10 w-full flex-1 flex flex-col items-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white border-[4px] lg:border-[6px] border-gray-50 shadow-md flex items-center justify-center text-blue-500 mb-4 lg:mb-6 mx-auto transition-transform duration-300 hover:scale-105">
                  <Briefcase size={28} className="text-blue-500" />
                </div>
                <div className="bg-white p-4 lg:p-6 rounded-2xl border border-gray-200 shadow-sm w-full hover:shadow-md transition-shadow duration-300 flex-grow">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-black rounded-full mb-3">STEP 3</span>
                  <p className="font-extrabold text-brand-blue text-sm lg:text-base mb-2 whitespace-pre-wrap">{step2Title}</p>
                  {(typeof step2Desc === 'string' && (step2Desc.includes('<p') || step2Desc.includes('<h'))) ? (
                    <div dangerouslySetInnerHTML={{ __html: step2Desc }} className="[&_p]:text-xs [&_p]:text-gray-500 [&_p]:font-medium [&_p]:whitespace-pre-wrap" />
                  ) : (
                    <p className="text-[11px] lg:text-xs text-gray-500 font-medium whitespace-pre-wrap break-keep">{step2Desc}</p>
                  )}
                </div>
                <div className="block md:hidden text-gray-300 my-4">
                  <ChevronRight size={24} className="rotate-90 mx-auto" />
                </div>
              </div>

              {/* STEP 4 (Formerly 3) */}
              <div className="relative z-10 w-full flex-1 flex flex-col items-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white border-[4px] lg:border-[6px] border-gray-50 shadow-md flex items-center justify-center text-brand-blue mb-4 lg:mb-6 mx-auto transition-transform duration-300 hover:scale-105">
                  <UserCheck size={28} className="text-brand-blue" />
                </div>
                <div className="bg-white p-4 lg:p-6 rounded-2xl border border-gray-200 shadow-sm w-full hover:shadow-md transition-shadow duration-300 flex-grow">
                  <span className="inline-block px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-black rounded-full mb-3">STEP 4</span>
                  <p className="font-extrabold text-brand-blue text-sm lg:text-base mb-2 whitespace-pre-wrap">{step3Title}</p>
                  {(typeof step3Desc === 'string' && (step3Desc.includes('<p') || step3Desc.includes('<h'))) ? (
                    <div dangerouslySetInnerHTML={{ __html: step3Desc }} className="[&_p]:text-xs [&_p]:text-gray-500 [&_p]:font-medium [&_p]:whitespace-pre-wrap" />
                  ) : (
                    <p className="text-[11px] lg:text-xs text-gray-500 font-medium whitespace-pre-wrap break-keep">{step3Desc}</p>
                  )}
                </div>
                <div className="block md:hidden text-gray-300 my-4">
                  <ChevronRight size={24} className="rotate-90 mx-auto" />
                </div>
              </div>

              {/* STEP 5 (Formerly 4) */}
              <div className="relative z-10 w-full flex-1 flex flex-col items-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white border-[4px] lg:border-[6px] border-emerald-50 shadow-md flex items-center justify-center text-emerald-500 mb-4 lg:mb-6 mx-auto transition-transform duration-300 hover:scale-105">
                  <CheckCircle2 size={28} className="text-emerald-500" />
                </div>
                <div className="bg-emerald-50/50 p-4 lg:p-6 rounded-2xl border border-emerald-200 shadow-sm w-full hover:shadow-md transition-shadow duration-300 flex-grow">
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-black rounded-full mb-3">STEP 5</span>
                  <p className="font-extrabold text-emerald-800 text-sm lg:text-base mb-2 whitespace-pre-wrap">{step4Title}</p>
                  {(typeof step4Desc === 'string' && (step4Desc.includes('<p') || step4Desc.includes('<h'))) ? (
                    <div dangerouslySetInnerHTML={{ __html: step4Desc }} className="[&_p]:text-xs [&_p]:text-emerald-700 [&_p]:font-medium [&_p]:whitespace-pre-wrap" />
                  ) : (
                    <p className="text-[11px] lg:text-xs text-emerald-700 font-medium whitespace-pre-wrap break-keep">{step4Desc}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }

      case '/contact/careers/jobs': {
        const jobs = await query("SELECT * FROM news WHERE category = ? ORDER BY created_at DESC", ['jobs']);
        return (
          <div className="space-y-6 animate-fade-in-up">
            <JobList initialJobs={jobs} />
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
            <div className="pb-8 w-full text-center flex flex-col items-center">
              <div className="flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-green mb-3">
                <span>{grandContact?.name}</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-400">{activeMajor}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-brand-blue tracking-tight text-center mb-6">{activeTitle}</h2>

              {/* Premium Glassmorphic Tab Bar with Sliding Animation */}
              <SubmenuTabBar subMenus={activeMajorObj?.subMenus || []} currentPath={currentPath} />
            </div>

            {/* Dynamic Content - Width centered and bounded for clean layout */}
            <div className="min-h-[550px] w-full max-w-5xl">
              {await renderContent()}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
