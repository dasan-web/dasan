import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { navigationData } from '@/lib/navigation';
import SubmenuTabBar from '@/components/SubmenuTabBar';
import PipelineChart from '@/components/PipelineChart';
import { Beaker, Shield, Zap, Search, HelpCircle, Layers } from 'lucide-react';
import type { Metadata } from 'next';

import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const pageKey = `rd/${slug.join('/')}`;

  try {
    // 1. Try page-specific SEO
    let results = await query('SELECT content FROM admin_contents WHERE page_key = ?', [`seo/${pageKey}`]);
    
    // If not found or empty, fall back to main R&D SEO
    if (!results || results.length === 0 || !results[0].content) {
      results = await query('SELECT content FROM admin_contents WHERE page_key = ?', ['seo/rd']);
    }

    if (results && results.length > 0 && results[0].content) {
      const [title, keywords, description] = results[0].content.split('|');
      let finalTitle = title;
      if (!finalTitle || finalTitle.includes('R&D') || finalTitle === 'R&D Center Intro' || finalTitle === 'R&D Activities' || finalTitle === 'Pipeline') {
        finalTitle = 'Dasan Pharmaceutical_R&D';
      }
      return {
        title: finalTitle,
        keywords: keywords || 'DDS Platform Technology, Fluid Bed Coating Technology, Product Center',
        description: description || 'We introduce Dasan Pharmaceutical\'s unique formulation technology R&D capabilities such as Drug Delivery System (DDS) platform technology and fluid bed coating technology.',
      };
    }
  } catch (e) {
    console.error('Failed to load rd page metadata:', e);
  }
  return {
    title: 'Dasan Pharmaceutical_R&D',
    description: 'We introduce Dasan Pharmaceutical\'s unique formulation technology R&D capabilities such as Drug Delivery System (DDS) platform technology and fluid bed coating technology.',
    keywords: 'DDS Platform Technology, Fluid Bed Coating Technology, Product Center',
  };
}

interface Params {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function RdCatchAllPage({ params }: Params) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];

  if (slug.length === 0) {
    redirect('/rd/intro');
  }

  const currentPath = `/rd/${slug.join('/')}`;
  const pageKey = `rd/${slug.join('/')}`;

  let dbContent: string | null = null;
  try {
    const results = await query('SELECT content FROM admin_contents WHERE page_key = ?', [pageKey]);
    if (results && results.length > 0) {
      dbContent = results[0].content;
    }
  } catch (err) {
    console.error('Failed to load db content:', err);
  }

  let activeTitle = 'R&D';
  let activeMajor = 'R&D';
  let activeMajorObj = null;
  
  const grandRd = navigationData.find(g => g.name === 'Innovation');
  if (grandRd) {
    for (const major of grandRd.majors) {
      const sub = major.subMenus.find(s => s.link === currentPath);
      if (sub) {
        activeTitle = sub.enName || sub.name;
        activeMajor = major.enName || major.name;
        activeMajorObj = major;
        break;
      }
    }
    if (!activeMajorObj && grandRd.majors.length > 0) { // Replace grandRd later
      activeMajorObj = grandRd.majors[0];
    }
  }
    
  const renderContent = () => {
    switch (currentPath) {
      case '/rd/intro': {
        let title = 'Suwon Central R&D Center - Mecca of Innovative New Drugs';
        let desc = 'Dasan Pharmaceutical\'s Central R&D Center is leading the securing of new organic synthesis material technologies and the development of DDS complex formulations based on global top-tier research infrastructure such as high-resolution spectrometers and precision HPLC chromatography along with excellent researchers with master\'s and doctoral degrees.';
        let part1Name = 'Synthesis Research Part';
        let part1Desc = 'Design of new drug synthesis routes, process development of novel high-purity Active Pharmaceutical Ingredients (APIs) capable of avoiding patents';
        let part2Name = 'Formulation Research Part';
        let part2Desc = 'Drug release control (DDS), complex design, solubility improvement, and formulation differentiation research';

        if (dbContent) {
          const lines = dbContent.split('\n');
          title = lines[0] || title;
          desc = lines[1] || desc;
          part1Name = lines[2] || part1Name;
          part1Desc = lines[3] || part1Desc;
          part2Name = lines[4] || part2Name;
          part2Desc = lines[5] || part2Desc;
        }

        return (
          <div className="space-y-8 animate-fade-in-up">
            <div className="bg-white p-6 rounded-xl shadow-none">
              <h4 className="text-base font-bold text-brand-blue mb-2">{title}</h4>
              {(typeof desc === 'string' && (desc.includes('<p') || desc.includes('<h'))) ? (
                <div dangerouslySetInnerHTML={{ __html: desc }} className="[&_p]:text-xs [&_p]:text-gray-500 [&_p]:leading-relaxed [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold" />
              ) : (
                <p className="text-xs text-gray-500 leading-relaxed whitespace-pre-wrap">{desc}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-white space-y-2 shadow-none">
                <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center text-brand-teal"><Search size={18} /></div>
                <h5 className="font-bold text-brand-blue text-sm">{part1Name}</h5>
                {(typeof part1Desc === 'string' && (part1Desc.includes('<p') || part1Desc.includes('<h'))) ? (
                  <div dangerouslySetInnerHTML={{ __html: part1Desc }} className="[&_p]:text-xs [&_p]:text-gray-400 [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold" />
                ) : (
                  <p className="text-xs text-gray-400 whitespace-pre-wrap">{part1Desc}</p>
                )}
              </div>
              <div className="p-5 rounded-xl bg-white space-y-2 shadow-none">
                <div className="w-10 h-10 bg-brand-cyan/10 rounded-lg flex items-center justify-center text-brand-cyan"><Layers size={18} /></div>
                <h5 className="font-bold text-brand-blue text-sm">{part2Name}</h5>
                {(typeof part2Desc === 'string' && (part2Desc.includes('<p') || part2Desc.includes('<h'))) ? (
                  <div dangerouslySetInnerHTML={{ __html: part2Desc }} className="[&_p]:text-xs [&_p]:text-gray-400 [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold" />
                ) : (
                  <p className="text-xs text-gray-400 whitespace-pre-wrap">{part2Desc}</p>
                )}
              </div>
            </div>
          </div>
        );
      }

      case '/rd/activities': {
        let desc = 'Dasan Pharmaceutical\'s core research achievements originate from its unique DDS (Drug Delivery System) design capabilities. We secure innovative formulation platforms that improve medication convenience and minimize side effects.';
        let tech1Name = 'DDS (Drug Delivery System) Platform Technology';
        let tech1Desc = 'Secured technology to improve the number of medications from 3 times a day to once a day by possessing a sustained-release complex platform designed to release drugs slowly in the body.';
        let tech2Name = 'Microencapsulation Technology';
        let tech2Desc = 'Minimize gastrointestinal disorders by protecting drug molecules with microcapsules the thickness of a hair and induce efficient absorption at the target site.';

        if (dbContent) {
          const lines = dbContent.split('\n');
          desc = lines[0] || desc;
          tech1Name = lines[1] || tech1Name;
          tech1Desc = lines[2] || tech1Desc;
          tech2Name = lines[3] || tech2Name;
          tech2Desc = lines[4] || tech2Desc;
        }

        return (
          <div className="space-y-8 animate-fade-in-up">
            {(typeof desc === 'string' && (desc.includes('<p') || desc.includes('<h'))) ? (
              <div dangerouslySetInnerHTML={{ __html: desc }} className="[&_p]:text-gray-600 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold" />
            ) : (
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{desc}</p>
            )}
            
            <div className="space-y-4">
              <div className="p-5 bg-white rounded-xl flex items-start space-x-4 shadow-none">
                <span className="p-2 bg-brand-teal/10 rounded text-brand-teal"><Zap size={16} /></span>
                <div>
                  <h5 className="font-bold text-brand-blue text-sm">{tech1Name}</h5>
                  {(typeof tech1Desc === 'string' && (tech1Desc.includes('<p') || tech1Desc.includes('<h'))) ? (
                    <div dangerouslySetInnerHTML={{ __html: tech1Desc }} className="[&_p]:text-xs [&_p]:text-gray-500 [&_p]:mt-1 [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold" />
                  ) : (
                    <p className="text-xs text-gray-500 mt-1 whitespace-pre-wrap">{tech1Desc}</p>
                  )}
                </div>
              </div>
              <div className="p-5 bg-white rounded-xl flex items-start space-x-4 shadow-none">
                <span className="p-2 bg-brand-cyan/10 rounded text-brand-cyan"><Beaker size={16} /></span>
                <div>
                  <h5 className="font-bold text-brand-blue text-sm">{tech2Name}</h5>
                  {(typeof tech2Desc === 'string' && (tech2Desc.includes('<p') || tech2Desc.includes('<h'))) ? (
                    <div dangerouslySetInnerHTML={{ __html: tech2Desc }} className="[&_p]:text-xs [&_p]:text-gray-500 [&_p]:mt-1 [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold" />
                  ) : (
                    <p className="text-xs text-gray-500 mt-1 whitespace-pre-wrap">{tech2Desc}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }

      case '/rd/pipeline':
        return (
          <div className="animate-fade-in-up">
            <PipelineChart />
          </div>
        );

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
                  {grandRd?.name}
                </h3>
              </div>
              <nav className="space-y-6">
                {grandRd?.majors.map(major => (
                  <div key={major.name} className="space-y-2 mt-5 first:mt-0">
                    {grandRd.majors.length > 1 && (
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
                <span>{grandRd?.name}</span>
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
