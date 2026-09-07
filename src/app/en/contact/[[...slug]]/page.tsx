import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { navigationData } from '@/lib/navigation';
import SubmenuTabBar from '@/components/SubmenuTabBar';
import { query } from '@/lib/db';
import { UserCheck, HelpCircle, Briefcase, FileText, CheckCircle2, ChevronRight, ClipboardList, Stethoscope } from 'lucide-react';
import PressList from '@/components/PressList';
import JobList from '@/components/JobList';
import PhilosophyGraphic from '@/components/PhilosophyGraphic';
import TalentValuesInteractive from '@/components/TalentValuesInteractive';
import CareerProcessAlternating from '@/components/CareerProcessAlternating';
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
  const pageKey = `en/contact/${slug.join('/')}`;

  try {
    let results = await query('SELECT content FROM admin_contents WHERE page_key = ?', [`seo/${pageKey}`]);
    if (!results || results.length === 0 || !results[0].content) {
      results = await query('SELECT content FROM admin_contents WHERE page_key = ?', ['seo/en/contact']);
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
  const pageKey = `en/contact/${slug.join('/')}`;

  let dbContent: string | null = null;
  try {
    const results: any[] = []; // Disabled DB query for English page to use hardcoded translations
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
        activeTitle = sub.enName || sub.name;
        activeMajor = major.enName || major.name;
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
              Dasan Pharmaceutical's corporate achievements and major media press release feed.
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
              Dasan Pharmaceutical's various media and promotional materials feed.
            </p>
            
            {mediaNews.length > 0 ? (
              <PressList initialNews={mediaNews} />
            ) : (
              <div className="text-center py-16 text-gray-400 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                No promotional materials registered.
              </div>
            )}
          </div>
        );
      }

      case '/contact/careers/talent': {
        return (
          <div className="animate-fade-in-up py-4">
            <TalentValuesInteractive isEnglish={true} />
          </div>
        );
      }

      case '/contact/careers/process': {
        return (
          <CareerProcessAlternating isEnglish={true} dbContent={dbContent} />
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
            Detailed information is being prepared.
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
                  {grandContact?.enName || grandContact?.name}
                </h3>
              </div>
              <nav className="space-y-6">
                {grandContact?.majors.map(major => (
                  <div key={major.enName || major.name} className="space-y-2 mt-5 first:mt-0">
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
                              {sub.enName || sub.name}
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
