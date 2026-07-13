import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { navigationData } from '@/lib/navigation';
import SubmenuTabBar from '@/components/SubmenuTabBar';
import { CheckCircle, ShieldCheck, Truck, Layers, Award, FileSpreadsheet } from 'lucide-react';
import ProductSearch from '@/components/ProductSearch';
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
        activeTitle = sub.enName || sub.name;
        activeMajor = major.enName || major.name;
        activeMajorObj = major;
        break;
      }
    }
    if (!activeMajorObj && grandBiz.majors.length > 0) { // Replace grandBiz later
      activeMajorObj = grandBiz.majors[0];
    }
  }
    
  const renderContent = () => {
    switch (currentPath) {
      case '/business/finished/search':
        return (
          <ProductSearch />
        );

      case '/business/finished/news': {
        let tag = 'New Product Launch';
        let title = "Approval for Launch of Combination Hypertension IMD 'Fimasartan/Amlodipine'";
        let desc = 'Sales of a hypertension treatment that reduced the patient\'s dosage size using our own DDS patented sustained-release granule coating technology have begun.';

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
        let desc = 'Dasan Pharmaceutical is supplying high-value-added Active Pharmaceutical Ingredients (APIs) to leading domestic and international pharmaceutical companies through high purity and strict crystal form control technology.';
        let card1Title = 'Major API Pipeline';
        let card1Desc = 'We directly synthesize high-purity active ingredients such as Fimasartan, Dapagliflozin, Sitagliptin, and Metformin, and can supply tens of tons annually.';
        let card2Title = 'Intermediate Precision Organic Synthesis';
        let card2Desc = 'We provide cost reduction and mass supply stability by researching and contract manufacturing the precursor stages of raw materials through highly efficient reaction processes.';

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

      case '/business/cdmo/quality':
      case '/business/cdmo/advantages':
      case '/business/cdmo/logistics': {
        let platformTitle = 'Dasan CDMO Advantage Platform';
        let intro = 'Dasan Pharmaceutical goes beyond simple contract manufacturing (CMO) to provide a unified one-stop contract development and manufacturing (CDMO) service from drug formulation development to clinical batch production and New Drug Application (NDA) support.';
        let bullet1Title = 'Excellent Quality Control (QA/QC)';
        let bullet1Desc = 'Holds Korea MFDS KGMP certification and thoroughly operates cGMP standard analytical equipment and Data Integrity guidelines.';
        let bullet2Title = 'Specialized Granule Coating Technology';
        let bullet2Desc = 'Operates multiple fluid bed granulators and precision tablet tableting process equipment that control the dissolution rate of fine-particle APIs.';
        let bullet3Title = 'Global Cold Chain Logistics';
        let bullet3Desc = 'Securing a global air/sea logistics network through perfect storage temperature and humidity control of raw materials and intermediates that must preserve biological activity.';

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
            <div className="min-h-[550px] w-full max-w-5xl">
              {renderContent()}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
