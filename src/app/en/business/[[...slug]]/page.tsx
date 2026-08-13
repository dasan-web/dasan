import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { navigationData } from '@/lib/navigation';
import SubmenuTabBar from '@/components/SubmenuTabBar';
import { CheckCircle, ShieldCheck, Truck, Layers, Award, FileSpreadsheet } from 'lucide-react';
import ProductSearch from '@/components/ProductSearch';
import ProductDetail from '@/components/ProductDetail';
import ProductNewsBoard from '@/components/ProductNewsBoard';
import type { Metadata } from 'next';

import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const pageKey = `en/business/${slug.join('/')}`;

  try {
    // 1. Try page-specific SEO
    let results = await query('SELECT content FROM admin_contents WHERE page_key = ?', [`seo/${pageKey}`]);
    
    // If not found or empty, fall back to main Business SEO
    if (!results || results.length === 0 || !results[0].content) {
      results = await query('SELECT content FROM admin_contents WHERE page_key = ?', ['seo/en/business']);
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
  const pageKey = `en/business/${slug.join('/')}`;

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
      if (currentPath === `/business/${major.name.toLowerCase()}` || (major.enName && currentPath === `/business/${major.enName.toLowerCase()}`)) {
        activeTitle = major.subMenus[0]?.enName || major.subMenus[0]?.name || major.enName || major.name;
        activeMajor = major.enName || major.name;
        activeMajorObj = major;
        break;
      }
      const sub = major.subMenus.find(s => s.link === currentPath);
      if (sub) {
        activeTitle = sub.enName || sub.name;
        activeMajor = major.enName || major.name;
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
      return <ProductDetail productId={slug[2]} isEnglish={true} />;
    }

    switch (currentPath) {
      case '/business/finished/search':
        return (
          <ProductSearch />
        );

      case '/business/finished/news': {
        return <ProductNewsBoard isEnglish={true} />;
      }

      case '/business/api':
      case '/business/api/raw':
      case '/business/api/intermediates': {
        const sections = [
          {
            num: '01',
            title: 'Innovative API Development',
            subTitle: 'Innovative API Development',
            intro: 'Differentiated raw materials create new value for pharmaceuticals.',
            body: 'We promote the development of differentiated APIs applying the latest pharmaceutical technology, including Prodrugs and high-value-added raw materials.\nBy connecting Dasan’s formulation & R&D capabilities with raw material development experience, we enhance customer product competitiveness and support global market expansion.',
            keywords: ['Prodrug', 'High-value API', 'Process Development', 'Innovative Technology']
          },
          {
            num: '02',
            title: 'Quality First',
            subTitle: 'Quality First',
            intro: 'Quality is not a choice, but the standard of trust.',
            body: 'We apply strict quality standards starting from the raw material, which is the starting point of pharmaceuticals.\nBased on a systematic quality management system from raw material selection, manufacturing, testing, to supply, we ensure safety and consistency to become a trusted API partner.',
            keywords: ['Quality Assurance', 'Reliable API', 'Traceability', 'Consistent Quality']
          },
          {
            num: '03',
            title: 'Sustainable API',
            subTitle: 'Sustainable API for the Future',
            intro: 'Pharmaceutical development considering the environment is the beginning of future competitiveness.',
            body: 'We pursue an API business that reduces environmental burden by continuously reviewing and introducing efficient manufacturing processes, eco-friendly raw materials, and production technologies.\nThrough API development that considers sustainability as well as quality and productivity, we shape a better future for the pharmaceutical industry.',
            keywords: ['Sustainable Chemistry', 'Eco-friendly Process', 'Green Manufacturing', 'ESG']
          },
          {
            num: '04',
            title: 'Partnership for Success',
            subTitle: 'Partnership for Success',
            intro: 'Partner designing success together, not just a supplier.',
            body: 'Dasan Pharmaceutical API Business Division pursues long-term partnerships beyond simple raw material supply by understanding customers’ development stages and business strategies.\nFrom early-stage raw material evaluation to stable post-commercialization supply, we co-create optimal solutions for your projects.',
            keywords: ['Strategic Partnership', 'Customer-oriented', 'Development Support', 'Long-term Collaboration']
          },
          {
            num: '05',
            title: 'Global Supply Network',
            subTitle: 'Global Supply Network',
            intro: 'Global Network. Reliable Supply.',
            body: 'Based on our China Business Division, we hold a long-established global network with various manufacturers and partners in major pharmaceutical markets including China, Japan, and India.\nThrough cooperation with verified overseas partners and supply chain diversification, we support stable procurement and continuous supply, building a global API supply system resilient to market shifts.',
            keywords: ['China', 'Japan', 'India', 'Global Sourcing', 'Supply Chain', 'Stable Supply']
          }
        ];

        return (
          <div className="space-y-10 animate-fade-in-up py-2">
            {/* Header Section */}
            <div className="space-y-3 pb-8 border-b border-gray-100">
              <span className="text-xs font-black text-brand-teal tracking-wider uppercase block">API / Active Pharmaceutical Ingredients</span>
              <h3 className="text-2xl md:text-3xl font-black text-brand-blue tracking-tight">Innovation Beyond Ingredients</h3>
              <p className="text-base md:text-lg font-bold text-gray-800 pt-1">
                Beyond ingredients, creating new possibilities for pharmaceuticals.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed pt-2 whitespace-pre-line">
                Dasan Pharmaceutical develops and supplies high-quality Active Pharmaceutical Ingredients (APIs) based on accumulated pharmaceutical development experience and differentiated technological capabilities.{'\n'}
                From the development of high-value-added raw materials including Prodrugs to stable global sourcing, quality control, and supply chain establishment, we provide comprehensive API solutions for customer pharmaceutical development and commercialization.
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

            {/* Summary Section */}
            <div className="pt-8 space-y-3 border-t-2 border-brand-teal/20">
              <span className="text-xs font-black text-brand-teal uppercase tracking-widest block">From API to Value</span>
              <h4 className="text-xl md:text-2xl font-black text-brand-blue">
                Good medicine starts with good raw materials.
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Based on Innovation, Quality, Sustainability, Partnership, and Global Network, Dasan Pharmaceutical provides reliable API solutions so that customer ideas can be completed into competitive pharmaceuticals.
              </p>
              <p className="text-sm font-bold text-brand-teal pt-2">
                Your Reliable Partner for Pharmaceutical Ingredients.
              </p>
            </div>
          </div>
        );
      }

      case '/business/cdmo':
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
