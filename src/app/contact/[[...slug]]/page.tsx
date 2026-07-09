import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { navigationData } from '@/lib/navigation';
import SubmenuTabBar from '@/components/SubmenuTabBar';
import { query } from '@/lib/db';
import { UserCheck, HelpCircle, Briefcase, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import PressList from '@/components/PressList';
import JobList from '@/components/JobList';
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
            <div className="border-b border-gray-100 pb-5 text-center md:text-left">
              <h4 className="text-xl md:text-2xl font-black text-brand-blue mb-3 whitespace-pre-wrap">{mainTitle}</h4>
              {(typeof intro === 'string' && (intro.includes('<p') || intro.includes('<h'))) ? (
                <div dangerouslySetInnerHTML={{ __html: intro }} className="[&_p]:text-sm md:[&_p]:text-base [&_p]:text-gray-500 [&_p]:max-w-2xl [&_p]:leading-relaxed [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold mx-auto" />
              ) : (
                <p className="text-sm md:text-base text-gray-500 max-w-2xl leading-relaxed whitespace-pre-wrap mx-auto">
                  {intro}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {/* 전문적 도전 */}
              <div className="p-8 bg-white rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
                <div className="w-14 h-14 bg-brand-teal/10 rounded-full flex items-center justify-center text-brand-teal mx-auto">
                  <UserCheck size={28} />
                </div>
                <h5 className="font-extrabold text-brand-blue text-base md:text-lg whitespace-pre-wrap">{card1Title}</h5>
                {(typeof card1Desc === 'string' && (card1Desc.includes('<p') || card1Desc.includes('<h'))) ? (
                  <div dangerouslySetInnerHTML={{ __html: card1Desc }} className="[&_p]:text-xs md:[&_p]:text-sm [&_p]:text-gray-500 [&_p]:leading-relaxed [&_p]:font-semibold [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold" />
                ) : (
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-semibold whitespace-pre-wrap">
                    {card1Desc}
                  </p>
                )}
              </div>

              {/* 혁신 지향 */}
              <div className="p-8 bg-white rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
                <div className="w-14 h-14 bg-brand-cyan/10 rounded-full flex items-center justify-center text-brand-cyan mx-auto">
                  <Briefcase size={28} />
                </div>
                <h5 className="font-extrabold text-brand-blue text-base md:text-lg whitespace-pre-wrap">{card2Title}</h5>
                {(typeof card2Desc === 'string' && (card2Desc.includes('<p') || card2Desc.includes('<h'))) ? (
                  <div dangerouslySetInnerHTML={{ __html: card2Desc }} className="[&_p]:text-xs md:[&_p]:text-sm [&_p]:text-gray-500 [&_p]:leading-relaxed [&_p]:font-semibold [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold" />
                ) : (
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-semibold whitespace-pre-wrap">
                    {card2Desc}
                  </p>
                )}
              </div>

              {/* 신뢰와 협동 */}
              <div className="p-8 bg-white rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
                <div className="w-14 h-14 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue mx-auto">
                  <CheckCircle2 size={28} />
                </div>
                <h5 className="font-extrabold text-brand-blue text-base md:text-lg whitespace-pre-wrap">{card3Title}</h5>
                {(typeof card3Desc === 'string' && (card3Desc.includes('<p') || card3Desc.includes('<h'))) ? (
                  <div dangerouslySetInnerHTML={{ __html: card3Desc }} className="[&_p]:text-xs md:[&_p]:text-sm [&_p]:text-gray-500 [&_p]:leading-relaxed [&_p]:font-semibold [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold" />
                ) : (
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-semibold whitespace-pre-wrap">
                    {card3Desc}
                  </p>
                )}
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
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-center">
              {/* STEP 1 */}
              <div className="flex-grow p-6 md:p-8 bg-white rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300">
                <span className="font-black text-brand-teal text-base md:text-lg block mb-2">STEP 1</span>
                <p className="font-extrabold text-brand-blue text-base md:text-lg whitespace-pre-wrap">{step1Title}</p>
                {(typeof step1Desc === 'string' && (step1Desc.includes('<p') || step1Desc.includes('<h'))) ? (
                  <div dangerouslySetInnerHTML={{ __html: step1Desc }} className="[&_p]:text-xs md:[&_p]:text-sm [&_p]:text-gray-400 [&_p]:mt-2 [&_p]:font-medium [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold" />
                ) : (
                  <p className="text-xs md:text-sm text-gray-400 mt-2 font-medium whitespace-pre-wrap">{step1Desc}</p>
                )}
              </div>
              
              {/* Arrow 1 */}
              <div className="flex justify-center items-center text-gray-300 flex-shrink-0">
                <ChevronRight className="hidden md:block" size={28} />
                <ChevronRight className="block md:hidden rotate-90" size={28} />
              </div>

              {/* STEP 2 */}
              <div className="flex-grow p-6 md:p-8 bg-white rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300">
                <span className="font-black text-brand-cyan text-base md:text-lg block mb-2">STEP 2</span>
                <p className="font-extrabold text-brand-blue text-base md:text-lg whitespace-pre-wrap">{step2Title}</p>
                {(typeof step2Desc === 'string' && (step2Desc.includes('<p') || step2Desc.includes('<h'))) ? (
                  <div dangerouslySetInnerHTML={{ __html: step2Desc }} className="[&_p]:text-xs md:[&_p]:text-sm [&_p]:text-gray-400 [&_p]:mt-2 [&_p]:font-medium [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold" />
                ) : (
                  <p className="text-xs md:text-sm text-gray-400 mt-2 font-medium whitespace-pre-wrap">{step2Desc}</p>
                )}
              </div>

              {/* Arrow 2 */}
              <div className="flex justify-center items-center text-gray-300 flex-shrink-0">
                <ChevronRight className="hidden md:block" size={28} />
                <ChevronRight className="block md:hidden rotate-90" size={28} />
              </div>

              {/* STEP 3 */}
              <div className="flex-grow p-6 md:p-8 bg-white rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300">
                <span className="font-black text-brand-blue text-base md:text-lg block mb-2">STEP 3</span>
                <p className="font-extrabold text-brand-blue text-base md:text-lg whitespace-pre-wrap">{step3Title}</p>
                {(typeof step3Desc === 'string' && (step3Desc.includes('<p') || step3Desc.includes('<h'))) ? (
                  <div dangerouslySetInnerHTML={{ __html: step3Desc }} className="[&_p]:text-xs md:[&_p]:text-sm [&_p]:text-gray-400 [&_p]:mt-2 [&_p]:font-medium [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold" />
                ) : (
                  <p className="text-xs md:text-sm text-gray-400 mt-2 font-medium whitespace-pre-wrap">{step3Desc}</p>
                )}
              </div>

              {/* Arrow 3 */}
              <div className="flex justify-center items-center text-gray-300 flex-shrink-0">
                <ChevronRight className="hidden md:block" size={28} />
                <ChevronRight className="block md:hidden rotate-90" size={28} />
              </div>

              {/* STEP 4 */}
              <div className="flex-grow p-6 md:p-8 bg-white rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300">
                <span className="font-black text-emerald-600 text-base md:text-lg block mb-2">STEP 4</span>
                <p className="font-extrabold text-emerald-800 text-base md:text-lg whitespace-pre-wrap">{step4Title}</p>
                {(typeof step4Desc === 'string' && (step4Desc.includes('<p') || step4Desc.includes('<h'))) ? (
                  <div dangerouslySetInnerHTML={{ __html: step4Desc }} className="[&_p]:text-xs md:[&_p]:text-sm [&_p]:text-emerald-700 [&_p]:mt-2 [&_p]:font-medium [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold" />
                ) : (
                  <p className="text-xs md:text-sm text-emerald-700 mt-2 font-medium whitespace-pre-wrap">{step4Desc}</p>
                )}
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
