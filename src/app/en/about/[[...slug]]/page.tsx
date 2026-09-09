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
import PhilosophyGraphic from '@/components/PhilosophyGraphic';
import BusinessAreaTabSection from '@/components/BusinessAreaTabSection';
import ESGEthicsSection from '@/components/ESGEthicsSection';
import ScrollPromiseImage from '@/components/ScrollPromiseImage';
import ScrollEnvironmentImage from '@/components/ScrollEnvironmentImage';
import ScrollSafetyImage from '@/components/ScrollSafetyImage';
import ScrollAntiCorruptionImage from '@/components/ScrollAntiCorruptionImage';
import ScrollEthicsImage from '@/components/ScrollEthicsImage';
import ScrollGreetingImage from '@/components/ScrollGreetingImage';
import { query } from '@/lib/db';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const pageKey = `en/about/${slug.join('/')}`;

  try {
    // 1. Try page-specific SEO
    let results = await query('SELECT content FROM admin_contents WHERE page_key = ?', [`seo/${pageKey}`]);
    
    // If not found or empty, fall back to main About Us SEO
    if (!results || results.length === 0 || !results[0].content) {
      results = await query('SELECT content FROM admin_contents WHERE page_key = ?', ['seo/en/about']);
    }

    if (results && results.length > 0 && results[0].content) {
      const [title, keywords, description] = results[0].content.split('|');
      // If the admin page has configured a title, let's prepend 'Dasan_About Us' if it doesn't contain it, or enforce 'Dasan_About Us'
      let finalTitle = title;
      if (!finalTitle || finalTitle.includes('About Us') || finalTitle.includes('About us') || finalTitle === 'Company Overview' || finalTitle === 'Company Overview') {
        finalTitle = 'Dasan_About Us';
      }
      return {
        title: finalTitle,
        keywords: keywords || 'Dasan Pharmaceutical history, CEO Ryu Hyung-sun, Asan plant facility, cGMP certified pharmaceutical company',
        description: description || 'Introducing Asan plant facilities and R&D center. A trusted pharmaceutical company with cGMP certification.',
      };
    }
  } catch (e) {
    console.error('Failed to load about page metadata:', e);
  }
  return {
    title: 'Dasan_About Us',
    description: 'Introducing Asan plant facilities and R&D center. A trusted pharmaceutical company with cGMP certification.',
    keywords: 'Dasan Pharmaceutical history, CEO Ryu Hyung-sun, Asan plant facility, cGMP certified pharmaceutical company',
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
    redirect('/about/greeting');
  }

  const currentPath = `/about/${slug.join('/')}`;
  const pageKey = `en/about/${slug.join('/')}`;

  let dbContent: string | null = null;
  let competenciesContent: string | null = null;
  let visionContent: string | null = null;
  let valuesContent: string | null = null;
  let philosophyContent: string | null = null;
  let cultureContent: string | null = null;

  try {
    const results: any[] = []; // Disabled DB query for English page to use hardcoded translations
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
  let activeMajor = 'Company Overview';
  let activeMajorObj = null;
  
  const grandAbout = navigationData.find(g => g.name === 'Company');
  if (grandAbout) {
    for (const major of grandAbout.majors) {
      const sub = major.subMenus.find(s => s.link === currentPath);
      if (sub) {
        activeTitle = sub.enName || sub.name;
        activeMajor = major.enName || major.name;
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
          { title: 'Proven Technology', desc: 'Holds over 30 core technology patents and selected for national R&D excellent projects' },
          { title: 'Global Standard Production', desc: 'Established strict quality control system through c-GMP compliant smart factory' },
          { title: 'Global Partnership', desc: 'Direct export of API and finished products to over 20 countries worldwide' }
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
          missionTitle: 'Contributing to the health and happy life of mankind',
          missionDesc: 'We research, produce, and supply high-quality medicines with differentiated formulation technology to help mankind lead a healthier and more valuable life.',
          visionTitle: 'Global Healthcare Leader based on DDS Technology Innovation',
          visionDesc: 'Leading the unique Drug Delivery System (DDS) platform technology, we accelerate finished product and API exports to become the most trusted partner in the global pharmaceutical bio market.'
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
          { letter: 'D', name: 'Devotion', subtitle: 'Trust and Responsibility', desc: 'We reward the deep trust of customers and patients with honesty and quality, driven by a mission to save lives.' },
          { letter: 'A', name: 'Agility', subtitle: 'Change and Execution', desc: 'We keenly capture the rapidly changing global environment and turn opportunities into execution without hesitation.' },
          { letter: 'S', name: 'Synergy', subtitle: 'Coexistence and Collaboration', desc: 'We create greater value through communication that breaks down barriers between departments and coexistence with global partners.' },
          { letter: 'A', name: 'Aspire', subtitle: 'Challenge and Passion', desc: 'We always face limits with an unstoppable challenging spirit towards new technologies and global markets.' },
          { letter: 'N', name: 'Novelty', subtitle: 'Novelty', desc: "Creativity and Innovation|We build Dasan Pharmaceutical's unique solutions with independent ideas beyond stereotypes." }
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
          quote: 'People-centered technology, a healthy tomorrow made with honesty',
          pillars: [
            { id: '01', title: 'Ethical Management', desc: 'We fulfill our responsibilities for social values through transparent and honest operations, maintaining absolute trust and high-quality standards over immediate profits.' },
            { id: '02', title: 'R&D-Driven Innovation', desc: 'We consistently invest a high percentage of our sales in new drug development and formulation technology research to build a differentiated patent barrier and high-value-added DDS platform.' },
            { id: '03', title: 'People First', desc: 'We fully support the autonomy and expertise of each member, firmly believing and practicing that the mutual growth of our employees is the competitiveness of Global Dasan.' }
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
          title: 'Healthy Culture of Dasan',
          sub: 'A workplace where we work passionately, trust and care for each other',
          items: [
            { title: 'Flexible and Autonomous Immersion', desc: "We increase work efficiency and respect each individual's precious lifestyle based on flexible working hours and a free vacation culture." },
            { title: 'Opportunities for Learning and Growth', desc: 'We fully guarantee and encourage job training, professional book purchases, and participation in leading domestic and international conferences and exhibitions for the growth of our employees.' },
            { title: 'Horizontal Communication and Consideration', desc: 'We aim for a town hall meeting where anyone can propose ideas regardless of rank or department, and a feedback culture of mutual respect.' }
          ]
        };
        if (cultureContent) {
          const lines = cultureContent.split('\n');
          if (lines.length >= 5) {
            const mainTitleText = lines[0] || 'Healthy Culture of Dasan';
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
              title: 'Healthy Culture of Dasan',
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

        let introTitle = 'Innovation for Human Health, Dasan Pharmaceutical';
        let introBody = 'Since its establishment in 1996, Dasan Pharmaceutical has contributed to promoting national health and improving the quality of life by providing high-quality pharmaceuticals through continuous R&D and bold investments. As a pharmaceutical company specializing in IMD with differentiated formulation technology, we are expanding into the global market.\n\nCurrently, we have completed vertical integration from API synthesis to finished product manufacturing, focusing on specialized formulation technologies such as microencapsulation technology, and based on this, we are growing into a global CDMO company.\n\n1. Dasan Pharmaceutical, opening a healthy tomorrow for mankind with the spirit of Dasan\nWith the spirit of Dasan\nDasan Pharmaceutical makes ceaseless efforts in the research and production of excellent medicines necessary for the health and happy life of mankind, with the founding philosophy based on the \'Aemin (Love for the People)\' spirit of Dasan Jeong Yak-yong, the greatest Silhak scholar and scientist of the Joseon Dynasty.\n\n4 Major Management Philosophies\n• Righteous Management : We comply with transparent and correct standards and build the trust of the market and customers.\n• Challenge and Creativity : We pioneer new possibilities with continuous R&D innovation and differentiated formulation technology.\n• Communication and Cooperation : We pursue organic collaboration among members and coexistence with partners.\n• Social Contribution : We contribute to creating a healthy and happy society based on the value of respect for life.\n\n2. CEO Message\nWith trust and innovation, we open a healthier future\nWe sincerely welcome customers, shareholders, and partners who have visited the Dasan Pharmaceutical website.\nDasan Pharmaceutical, which took its first step in 1996, has grown alongside the Korean pharmaceutical industry based on the firm belief of \'differentiated pharmaceutical R&D\'. It is all thanks to your unwavering support that we have been able to build deep trust in the domestic and international markets based on our excellent manufacturing technology and strict quality control.\nWe are producing pharmaceuticals that meet global standards by introducing state-of-the-art manufacturing processes and building advanced infrastructure based on the \'Seeking Truth from Facts\' spirit of Dasan Jeong Yak-yong, and we are establishing a faster and more flexible management system to keep pace with the rapidly changing pharmaceutical bio environment.\nFurthermore, based on an organizational culture where all employees can creatively demonstrate their capabilities, we will share the value created in the field with customers and shareholders and contribute to making a healthy society.\nDasan Pharmaceutical promises not to settle for the present, but to constantly leap forward as a \'Global Healthcare Leader\' that gives hope to those suffering from diseases and contributes to the healthy and happy life of mankind.\nPlease continue to watch with a warm gaze the grand future and challenges that Dasan Pharmaceutical will unfold in this newly renovated space.\nThank you.';

        if (dbContent) {
          const parts = dbContent.split('|');
          if (parts.length >= 2) {
            introTitle = parts[0];
            introBody = parts[1];
          } else {
            introBody = dbContent;
          }
        }

        // 제목 앞의 '1. ', '2. ' 등 숫자 번호 포맷을 모두 제거합니다.
        introTitle = introTitle.replace(/^[1-9]\.\s?/, '').trim();

        // 기업개요 페이지에서 CEO 메시지 특화 문구 및 단락 제거
        introBody = introBody
          .replace(/CEO\s*Message/gi, '')
          .replace(/With trust and innovation, we open a healthier future/gi, '')
          .replace(/We sincerely welcome customers, shareholders, and partners who have visited the Dasan Pharmaceutical website\./gi, '')
          .replace(/Dasan Pharmaceutical, which took its first step in 1996, has grown alongside the Korean pharmaceutical industry based on the firm belief of 'differentiated pharmaceutical R&D'\. It is all thanks to your unwavering support that we have been able to build deep trust in the domestic and international markets based on our excellent manufacturing technology and strict quality control\./gi, '')
          .replace(/We are producing pharmaceuticals that meet global standards by introducing state-of-the-art manufacturing processes and building advanced infrastructure based on the 'Seeking Truth from Facts' spirit of Dasan Jeong Yak-yong, and we are establishing a faster and more flexible management system to keep pace with the rapidly changing pharmaceutical bio environment\./gi, '')
          .replace(/Furthermore, based on an organizational culture where all employees can creatively demonstrate their capabilities, we will share the value created in the field with customers and shareholders and contribute to making a healthy society\./gi, '')
          .replace(/Dasan Pharmaceutical promises not to settle for the present, but to constantly leap forward as a 'Global Healthcare Leader' that gives hope to those suffering from diseases and contributes to the healthy and happy life of mankind\./gi, '')
          .replace(/Please continue to watch with a warm gaze the grand future and challenges that Dasan Pharmaceutical will unfold in this newly renovated space\./gi, '')
          .replace(/Thank you\./gi, '');

        return (
          <>
            {/* Top Slogan */}
            <div className="w-full text-center mb-8 animate-fade-in-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-pretendard font-medium text-gray-900 tracking-tight">
                Innovation for Human Health, <span className="text-brand-green font-black">Global Healthcare Enterprise</span>
              </h2>
            </div>

            {/* Top Video Section */}
            <ScrollVideo />

            <div className="space-y-16 animate-fade-in-up mt-0">

            {/* 1. Intro Summary */}
            <div className="relative w-full pt-8 sm:pt-12 pb-16 sm:pb-20 mt-0 mb-0">
              {/* Content Container */}
              <div className="relative z-10 max-w-5xl mx-auto">
                <div className="space-y-4 text-gray-800 text-sm md:text-base leading-relaxed">
                {introBody.includes('<p') || introBody.includes('<br') || introBody.includes('<h') ? (
                  (() => {
                    let beforeHtml = introBody;
                    let afterHtml = '';
                    let hasPhilosophy = false;
                    const philIndex = introBody.toLowerCase().indexOf('4 major management philosophies') !== -1 
                      ? introBody.toLowerCase().indexOf('4 major management philosophies')
                      : introBody.indexOf('4대 경영 철학');
                    
                    if (philIndex !== -1) {
                      hasPhilosophy = true;
                      const philEnd = philIndex + (introBody.toLowerCase().includes('4 major management philosophies') ? '4 major management philosophies'.length : '4대 경영 철학'.length);
                      const nextP = introBody.indexOf('</p>', philEnd);
                      const nextBr = introBody.indexOf('<br', philEnd);
                      
                      let cutIndex = philEnd;
                      if (nextP !== -1 && nextBr !== -1) {
                        cutIndex = Math.min(nextP + 4, nextBr + (introBody.substring(nextBr, nextBr+6).includes('/') ? 5 : 4));
                      } else if (nextP !== -1) {
                        cutIndex = nextP + 4;
                      } else if (nextBr !== -1) {
                        cutIndex = nextBr + (introBody.substring(nextBr, nextBr+6).includes('/') ? 5 : 4);
                      }
                      
                      if (cutIndex - philEnd > 50) cutIndex = philEnd;

                      beforeHtml = introBody.substring(0, cutIndex);
                      afterHtml = introBody.substring(cutIndex);
                    } else {
                      beforeHtml = introBody;
                    }

                    const processHtmlTitles = (html: string) => {
                      let processed = html;
                      
                      processed = processed.replace(
                        /(?:<strong[^>]*>|<b>|<span[^>]*>)?\s*(4 Major Management Philosophies|4대 경영 철학)\s*(?:<\/strong>|<\/b>|<\/span>)?/gi,
                        '<span class="block text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-5 w-full">$1</span>'
                      );
                      
                      processed = processed.replace(
                        /(?:<strong[^>]*>|<b>|<span[^>]*>)?\s*(Dasan Pharmaceutical, opening a healthy tomorrow.*?spirit of Dasan)\s*(?:<\/strong>|<\/b>|<\/span>)?/gi,
                        '<span class="block text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-4 w-full">Dasan Pharmaceutical, opening a healthy tomorrow for mankind with the spirit of Dasan</span>'
                      );
                      
                      return processed;
                    };

                    beforeHtml = processHtmlTitles(beforeHtml);
                    afterHtml = processHtmlTitles(afterHtml);

                    return (
                      <>
                        {/* Top Text Area */}
                        <div className="w-full">
                          <span className="text-brand-green text-xs sm:text-sm font-bold tracking-wider uppercase block mb-3">
                            Company Overview
                          </span>
                          <div 
                            className="
                              text-[15px] sm:text-[16px] text-gray-600 leading-[1.8] font-normal
                              [&_p]:leading-[1.8] [&_p]:text-[15px] sm:[&_p]:text-[16px] [&_p]:text-gray-600 [&_p]:font-normal [&_p]:mb-5 
                              [&_h3]:text-2xl sm:[&_h3]:text-3xl md:[&_h3]:text-4xl [&_h3]:font-black [&_h3]:text-gray-900 [&_h3]:border-b [&_h3]:border-gray-200 [&_h3]:pb-4 [&_h3]:mb-6
                              [&_h4]:text-lg sm:[&_h4]:text-xl md:[&_h4]:text-2xl [&_h4]:font-bold [&_h4]:text-gray-900 [&_h4]:mt-8 [&_h4]:mb-4
                              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:space-y-3
                              [&_li]:text-gray-600 [&_li]:font-normal [&_li]:text-[15px] sm:[&_li]:text-[16px] [&_li]:leading-[1.8] [&_li::marker]:text-brand-green
                              [&_strong]:text-gray-900 [&_strong]:font-bold
                            "
                            dangerouslySetInnerHTML={{ __html: `<h3 class="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-6 pb-4 border-b border-gray-200">${introTitle}</h3>` + beforeHtml }} 
                          />
                        </div>

                        {/* Central Philosophy Graphic */}
                        <div className="w-full my-6 sm:my-10">
                          <PhilosophyGraphic />
                        </div>

                        {/* Bottom Detail Area */}
                        {hasPhilosophy && afterHtml && (
                          <div className="w-full mt-8 sm:mt-12">
                            <div 
                              className="
                                text-[15px] sm:text-[16px] text-gray-600 leading-[1.8] font-normal
                                [&_p]:leading-[1.8] [&_p]:text-[15px] sm:[&_p]:text-[16px] [&_p]:text-gray-600 [&_p]:font-normal [&_p]:mb-4 
                                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-3
                                [&_li]:text-gray-600 [&_li]:font-normal [&_li]:text-[15px] sm:[&_li]:text-[16px] [&_li]:leading-[1.8] [&_li::marker]:text-brand-green
                                [&_strong]:text-gray-900 [&_strong]:font-bold
                              "
                              dangerouslySetInnerHTML={{ __html: afterHtml }} 
                            />
                          </div>
                        )}
                      </>
                    );
                  })()
                ) : (
                  (() => {
                    const lines = (introTitle + '\n' + introBody).split('\n').map(l => l.trim()).filter(Boolean);
                    const philIdx = lines.findIndex(l => l.includes('4 Major Management Philosophies') || l.includes('4대 경영 철학'));
                    
                    const topLines = philIdx !== -1 ? lines.slice(0, philIdx + 1) : lines;
                    const bottomLines = philIdx !== -1 ? lines.slice(philIdx + 1) : [];

                    return (
                      <>
                        <div className="w-full">
                          <span className="text-brand-green text-xs sm:text-sm font-bold tracking-wider uppercase block mb-3">
                            Company Overview
                          </span>
                          {topLines.map((line, i) => {
                            if (line.match(/^[1-9]\.\s/) || i === 0) {
                              const titleText = line.replace(/^[1-9]\.\s?/, '');
                              return <h3 key={i} className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-6 pb-4 border-b border-gray-200">{titleText}</h3>;
                            }
                            if (line.includes('4 Major Management Philosophies') || line.includes('4대 경영 철학')) {
                              return <h4 key={i} className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mt-8 mb-4">{line}</h4>;
                            }
                            if (
                              line.startsWith('With the spirit of Dasan') || 
                              line.startsWith('With trust and innovation') ||
                              line.includes('Core Values')
                            ) {
                              return <h4 key={i} className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-4">{line}</h4>;
                            }
                            return <p key={i} className="mb-5 text-gray-600 leading-[1.8] text-[15px] sm:text-[16px] font-normal">{line}</p>;
                          })}
                        </div>

                        <div className="w-full my-6 sm:my-10">
                          <PhilosophyGraphic />
                        </div>

                        {bottomLines.length > 0 && (
                          <div className="w-full mt-8 sm:mt-12">
                            <div className="space-y-4">
                              {bottomLines.map((line, i) => {
                                const content = (line.startsWith('•') || line.startsWith('-') || line.startsWith('·')) ? line.substring(1).trim() : line;
                                const splitIdx = content.indexOf(':');
                                if (splitIdx !== -1 && splitIdx < 25) {
                                  const title = content.substring(0, splitIdx).trim();
                                  const desc = content.substring(splitIdx + 1).trim();
                                  return (
                                    <div key={i} className="flex items-start">
                                      <span className="text-brand-green font-bold mr-3 mt-0.5 text-lg leading-none">•</span>
                                      <p className="text-gray-600 leading-[1.8] text-[15px] sm:text-[16px] font-normal">
                                        <strong className="text-gray-900 font-bold">{title}</strong> : {desc}
                                      </p>
                                    </div>
                                  );
                                }
                                return (
                                  <div key={i} className="flex items-start">
                                    <span className="text-brand-green font-bold mr-3 mt-0.5 text-lg leading-none">•</span>
                                    <p className="text-gray-600 leading-[1.8] text-[15px] sm:text-[16px] font-normal">{content}</p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()
                )}
              </div>
            </div>
          </div>

          </div>
          </>
        );

      case '/about/greeting':
        return (
          <div className="animate-fade-in-up mt-4 sm:mt-6 bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl shadow-none w-full">
            {/* Header Title */}
            <div className="mb-8 sm:mb-12 pb-4 border-b border-gray-100">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                CEO Greeting
              </h3>
            </div>

            {/* 2-Column Responsive Layout: Photo Card (Left) & Fully Expanded Greeting Body (Right) */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-14 items-start w-full">
              {/* Left Column: Prominent Large CEO Photo Card */}
              <div className="w-full lg:w-[380px] xl:w-[440px] 2xl:w-[480px] shrink-0 lg:sticky lg:top-24">
                <div className="bg-slate-50/80 border border-slate-200/80 rounded-[32px] p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow">
                  {/* Large Photo Frame */}
                  <div className="relative aspect-[3/4.2] w-full rounded-2xl overflow-hidden shadow-md bg-slate-900 group">
                    <img 
                      src="/images/ceo_greeting.webp" 
                      alt="CEO Ryu Hyoung-sun" 
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Greeting Text - Fully expanded wide container */}
              <div className="flex-1 w-full min-w-0 flex flex-col justify-between pt-1">
                <div>
                  {/* Slogan Banner */}
                  <div className="border-l-4 border-brand-green pl-4 sm:pl-5 py-1 mb-8">
                    <h4 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 tracking-tight leading-snug">
                      Opening a Healthier Future with Trust and Innovation
                    </h4>
                  </div>

                  {/* Paragraphs */}
                  <div className="space-y-6 text-gray-700 text-[15px] sm:text-base md:text-[16.5px] leading-[1.95] tracking-normal font-normal">
                    <p className="font-semibold text-gray-900 text-base sm:text-lg leading-relaxed">
                      We extend our deepest gratitude to all our customers, shareholders, and partners visiting Dasan Pharmaceutical.
                    </p>
                    <p>
                      Since taking our first step in 1996, Dasan Pharmaceutical has grown continuously through rigorous research, development, and bold investments under the philosophy of &quot;New Technology Development and Quality First.&quot; Based on strict quality control, we practice respect for human life by supplying high-quality pharmaceuticals across domestic and global markets.
                    </p>
                    <p>
                      Inheriting the spirit of Silsa-gusi (seeking truth from facts) of Dasan Jeong Yak-yong, we take the lead in building a healthy society with honesty and cutting-edge technology. In response to the rapidly changing bio-pharmaceutical landscape, we are establishing a swift, flexible management system and further advancing our state-of-the-art manufacturing infrastructure.
                    </p>
                    <p>
                      Furthermore, through an organizational culture where all employees can creatively demonstrate their capabilities, we will share the value created on-site with customers and shareholders, contributing to a healthier society.
                    </p>
                    <p>
                      Dasan Pharmaceutical will never settle for the present. We promise to continuously leap forward as a &apos;Global Healthcare Leader&apos; that delivers hope and vitality to humanity.
                    </p>
                    <p className="text-gray-600 pt-2">
                      Please continue to watch our grand journey and future challenges with warm interest. Thank you.
                    </p>
                  </div>
                </div>

                {/* CEO Signature Block */}
                <div className="mt-14 pt-8 border-t border-gray-100 flex justify-end items-end">
                  <div className="flex items-end gap-3">
                    <span className="text-gray-500 font-medium text-sm pb-1.5">CEO</span>
                    <span className="text-gray-900 font-bold text-3xl md:text-4xl tracking-[0.15em] font-serif">
                      Ryu Hyoung-sun
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case '/about/business-area':
        // Parse business-area data
        let bizData = {
          intro: 'We have secured high value-added business growth by establishing a Key Value Chain infrastructure for the entire pharmaceutical lifecycle from R&D to sales.',
          items: [
            { title: '1) Own Finished Product Business', desc: 'Establishing an excellent product lineup centered on cardiovascular, respiratory, and urology, and production/sales' },
            { title: '2) Consignment Finished Product (CMO) Business', desc: 'Consignment production of ethical drugs through proprietary formulation technology and process optimization' },
            { title: '3) API and Intermediates Business', desc: 'Development and patent securing of key APIs and intermediates, DMF registration and management for new synthetic and imported materials' }
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
          <div className="space-y-10 animate-fade-in-up">
            {/* Business Area Hero Visual (21:9 wide screen - Top-left text overlay) */}
            <div 
              style={{
                width: '100vw',
                marginLeft: 'calc(50% - 50vw)',
              }}
              className="relative w-screen aspect-[21/9] min-h-[380px] max-h-[680px] overflow-hidden bg-slate-900 shadow-md mb-12 md:mb-16"
            >
              <Image 
                src="/images/business_hero.jpg" 
                alt="Dasan Pharmaceutical Business Area Visual" 
                fill
                priority
                unoptimized={true}
                className="object-cover object-center"
              />

              {/* Soft Gradient Overlay for Left-side Typography Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent pointer-events-none" />

              {/* Blue Box Area (Top-Left Text Overlay) */}
              <div className="absolute inset-0 flex items-start justify-start p-6 sm:p-10 md:p-14 lg:p-16">
                <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl text-left animate-fade-in-up">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-pretendard font-extrabold text-gray-900 leading-snug tracking-tight break-keep drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] space-y-2 sm:space-y-3 md:space-y-4">
                    <span className="block">Dasan Pharmaceutical</span>
                    <span className="block">Has secured high value-added business growth</span>
                    <span className="block">
                      by establishing a <span className="text-[#2f7847] font-black">Key Value Chain</span> infrastructure
                    </span>
                    <span className="block">for the entire pharmaceutical lifecycle from R&D to sales.</span>
                  </h2>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-12 rounded-3xl shadow-none">
              <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-10 pb-2 border-b border-gray-100">
                Core Business
              </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:-mx-4 xl:-mx-8 mt-12">
              {/* Card 1 */}
              <div className="relative w-full aspect-square rounded-[40px] overflow-hidden shadow-md group cursor-pointer">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 brightness-[1.08]"
                  style={{ backgroundImage: "url('/images/business_hero1.jpg')" }}
                />
                {/* Light static top gradient for title contrast (No darkening on hover) */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent" />
                <div 
                  className="absolute inset-0 p-5 sm:p-7 flex flex-col text-white transition-all duration-500 ease-out" 
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}
                >
                  <h4 className="text-base sm:text-lg lg:text-[15px] xl:text-lg 2xl:text-xl font-black whitespace-nowrap leading-tight mb-2.5 tracking-tight">
                    01. Finished Pharmaceutical Products
                  </h4>
                  {/* 호버 시 표시: 상세 설명 (카드 어두워짐 없이 부드럽게 표시) */}
                  <p className="text-xs sm:text-sm font-semibold break-keep leading-relaxed tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none">
                    Establishing, producing, and selling excellent product lineups focusing on cardiovascular, respiratory, and urological systems
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative w-full aspect-square rounded-[40px] overflow-hidden shadow-md group cursor-pointer">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 brightness-[1.08]"
                  style={{ backgroundImage: "url('/images/business_hero2.jpg')" }}
                />
                {/* Light static top gradient for title contrast (No darkening on hover) */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent" />
                <div 
                  className="absolute inset-0 p-5 sm:p-7 flex flex-col text-white transition-all duration-500 ease-out" 
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}
                >
                  <h4 className="text-base sm:text-lg lg:text-[15px] xl:text-lg 2xl:text-xl font-black whitespace-nowrap leading-tight mb-2.5 tracking-tight">
                    02. Contract Manufacturing (CMO)
                  </h4>
                  {/* 호버 시 표시: 상세 설명 (카드 어두워짐 없이 부드럽게 표시) */}
                  <p className="text-xs sm:text-sm font-semibold break-keep leading-relaxed tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none">
                    Contract manufacturing of prescription drugs through proprietary formulation technology and process optimization
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative w-full aspect-square rounded-[40px] overflow-hidden shadow-md group cursor-pointer">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 brightness-[1.08]"
                  style={{ backgroundImage: "url('/images/business_hero3.jpg')" }}
                />
                {/* Light static top gradient for title contrast (No darkening on hover) */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent" />
                <div 
                  className="absolute inset-0 p-5 sm:p-7 flex flex-col text-white transition-all duration-500 ease-out" 
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}
                >
                  <h4 className="text-base sm:text-lg lg:text-[15px] xl:text-lg 2xl:text-xl font-black whitespace-nowrap leading-tight mb-2.5 tracking-tight">
                    03. API & Intermediates
                  </h4>
                  {/* 호버 시 표시: 상세 설명 (카드 어두워짐 없이 부드럽게 표시) */}
                  <p className="text-xs sm:text-sm font-semibold break-keep leading-relaxed tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none">
                    Development and patent securing of key APIs and intermediates, and DMF registration/management for new synthetic and imported materials
                  </p>
                </div>
              </div>
            </div>
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
        let historyIntroTitle = 'A History of Challenge and Trust, The Path Walked for Human Health';
        let historyIntroBody = 'Since its establishment in 1996, Dasan Pharmaceutical has run tirelessly towards securing independent DDS technology and developing global new drugs.';
        let timelineData: TimelineEra[] = [];

        // Define default timeline
        const defaultTimelineData: TimelineEra[] = [
          {
            eraTitle: '2022 ~ Present',
            eraSubtitle: 'Leap Phase (High Growth / High Profit Creation)',
            events: [
              { year: '2025', details: ['• Selected for Smart Eco-Plant Construction Project'] },
              { year: '2024', details: ['• Selected for Global Hidden Champion 1000+ Project', '• Selected as Leading Supply Chain Stabilizer by MFDS', '• ISO 45001 Certified', '• Established Anhui Heyi-Dasan Pharma JV in China'] },
              { year: '2023', details: ['• ISO 37001 Anti-Bribery Management System Certified'] },
              { year: '2022', details: ['• $7M Export Tower Award', '• Minister Award for Innovative SME', '• Minister Award for Drug Export', '• Youth-Friendly Hidden Champion (4 Yrs)'] }
            ]
          },
          {
            eraTitle: '2013 ~ 2021',
            eraSubtitle: 'Growth Phase (R&D Advancement & Infrastructure Expansion)',
            events: [
              { year: '2021', details: ['• Chungnam Excellent Entrepreneur Award', '• Good Workplace Company', '• Global Hidden Champion'] },
              { year: '2020', details: ['• Selected as Promising SME by Chungnam'] },
              { year: '2019', details: ['• Achieved 50B KRW Revenue', '• Asan Plant 2 Completed', '• Shenyang R&D Center (China) Expanded'] },
              { year: '2018', details: ['• Central R&D Center Integrated & Opened'] },
              { year: '2017', details: ['• Company Name Changed to Dasan Pharmaceutical Co., Ltd.'] },
              { year: '2016', details: ['• Central R&D Center Relocated'] },
              { year: '2013', details: ['• Finished Product Logistics Center Completed', '• SME Administrator Award', '• Synthetic R&D Center Relocated'] }
            ]
          },
          {
            eraTitle: '1996 ~ 2011',
            eraSubtitle: 'Establishment Phase (Securing Core Tech)',
            events: [
              { year: '2011', details: ['• Selected as KIBO Success Company'] },
              { year: '2009', details: ['• $3M Export Tower Award'] },
              { year: '2008', details: ['• Achieved 10B KRW Revenue', '• KGMP Certified'] },
              { year: '2007', details: ['• INNO-BIZ Certified', '• 3D Clean Workplace Certified'] },
              { year: '2002', details: ['• BGMP Certified'] },
              { year: '2001', details: ['• API Plant Completed & Manufacturing License Acquired', '• Corporate R&D Center Approved'] },
              { year: '1996', details: ['• Dasan Medichem Co., Ltd. Established'] }
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
          <div className="space-y-10 animate-fade-in-up">
            {/* History Hero Visual (21:9 wide screen - Global Infrastructure size) */}
            <div 
              style={{
                width: '100vw',
                marginLeft: 'calc(50% - 50vw)',
              }}
              className="relative w-screen aspect-[21/9] min-h-[380px] max-h-[680px] overflow-hidden bg-slate-900 shadow-md mb-12 md:mb-16"
            >
              <Image 
                src="/history_hero_spiral.png" 
                alt="Dasan Pharmaceutical Growth History Visual" 
                fill
                priority
                unoptimized={true}
                className="object-cover object-center"
              />

              {/* Soft Gradient Overlay for Typography Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/40 to-transparent pointer-events-none" />

              {/* Top-Left Text Overlay */}
              <div className="absolute inset-0 flex items-start justify-start p-6 sm:p-10 md:p-14 lg:p-16">
                <div className="max-w-xl lg:max-w-2xl text-left animate-fade-in-up">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-pretendard font-medium text-gray-900 leading-tight tracking-tight drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
                    With Trust &amp; Innovation,<br />
                    <span className="text-[#3a8b54] font-black">DASAN</span> Towards the Future
                  </h2>
                </div>
              </div>
            </div>

            <div className="space-y-12 bg-white p-6 md:p-16 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 relative overflow-hidden">
              {/* Header */}
              <div className="text-left mb-10 relative z-10 max-w-4xl mx-auto pl-[30px] md:pl-[120px]">
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight animate-fade-in-up" style={{animationDelay: '200ms'}}>
                  {historyIntroTitle || 'Growth History'}
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
          </div>
        );

      case '/about/ci':
        // Data variables for CI page (Prepared data variables - configured to enter data in order)
        let ciTitle = 'CI Introduction';
        let ciSubtitle = 'Corporate Identity';
        let ciIntro = 'The hexagonal symbol represents stability and trust along with molecular structure, while the diagonal wordmark expresses innovation and technological progress. The internal flowing graphic (gradation-leaf) means the connection between life and technology, and the green color contains the values of life, eco-friendliness, and trust.';
        
        let primaryLogoTitle = 'Primary Logo';
        let primaryLogoDesc = 'This is the main logo representing the brand identity of Dasan Pharmaceutical, used with top priority for various internal and external communications.\nThe main logo has its proportions adjusted according to its shape, so the shape, thickness, and proportion of letters and figures cannot be arbitrarily changed.';
        let primaryLogoPrint = 'For Print: Recommended width 30mm+, Min 25mm';
        let primaryLogoDigital = 'For Digital: Recommended width 130px+, Min 120px';
        let primaryLogoFooter = 'When using the logo, it is prohibited to use it below the specified minimum size. In media where it must be applied small, such as mobile apps, apply it as large as possible within the given space.';
        
        let secondaryLogoTitle = 'Secondary Logo';
        let secondaryLogoDesc = 'Signature Combination (Horizontal, Vertical, Wordmark)';
        let secondaryLogoPrint1 = 'For Print: Recommended width 70mm+, Min 66mm';
        let secondaryLogoDigital1 = 'For Digital: Recommended width 240px+, Min 220px';
        let secondaryLogoPrint2 = 'For Print: Recommended width 30mm+, Min 25mm';
        let secondaryLogoDigital2 = 'For Digital: Recommended width 130px+, Min 120px';
        let secondaryLogoPrint3 = 'For Print: Recommended width 30mm+, Min 25mm';
        let secondaryLogoDigital3 = 'For Digital: Recommended width 100px+, Min 80px';

        let primaryColorTitle = 'Primary Color';
        let primaryColorDesc = 'Color is a core element conveying brand identity, and we recommend using specified color values for consistent image building.';
        
        let colors = [
          { name: 'Dasan Green', desc: 'As Dasan Pharmaceutical\'s core color based on precision and trust, it is a signature color that symbolizes eco-friendly values and brand identity through a stable green tone.', cmyk: '90,30,90,0', rgb: '0, 137, 83', pantone: '3425 C', hex: '#008953' },
          { name: 'Dasan Light Green', desc: 'A color containing vitality and expandability, it is an auxiliary color that adds flexible flow and bright energy to the brand.', cmyk: '50,0,100,0', rgb: '141, 198, 63', pantone: '376 C', hex: '#8dc63f' },
          { name: 'Dasan Gray', desc: 'A color that maintains overall balance and order, it is an auxiliary color that increases the clarity of information delivery and organizes visual elements.', cmyk: '0,0,0,70', rgb: '109, 110, 113', pantone: 'Cool Gray 10 C', hex: '#6d6e71' }
        ];

        let logoColorUsageTitle = 'Logo Color Usage Guideline';
        let logoColorUsageDesc = 'Mandatory Use (3 Colors)';
        let logoColorFooter = 'Readability is prioritized according to background brightness. The original color is used by default, replaced with White or Soft Black logo if necessary.\nColor changes are applied after prior approval.';

        let clearSpaceTitle = 'Clear Space';
        let clearSpaceDesc = 'To ensure the best visual effect, readability and identification of the logo,\nMin margins must be maintained when applied alone.';
        let clearSpaceTipTitle = 'External User Tip';
        let clearSpaceTip1 = '1. Measure the height of the symbol (hexagon).';
        let clearSpaceTip2 = '2. Draw a virtual horizontal line at its half position.';
        let clearSpaceTip3 = '3. The distance from that line to the top of DASAN = X';

        let incorrectUsageTitle = 'Incorrect Logo Usage';
        let incorrectUsageDesc = 'Arbitrarily modifying or distorting the Dasan Pharmaceutical logo is prohibited, and standard shapes and colors must be observed.';
        let incorrectShapes = [
          'When changing the shape of the logo',
          'When arbitrarily changing the proportion\nof symbol and logotype combination',
          'When applying a different font to the logo',
          'Logo proportion rule\nOriginal proportion 2048px, 776px [2.64:1(2.6:1)]'
        ];
        let incorrectColors = [
          'When applying colors other than the designated colors',
          'When applying colors or effects\nto the border of the logo',
          'When applying gradation to the logo',
          ''
        ];
        let incorrectBgs = [
          'When applying a logo on a complex pattern',
          'When applying a logo to a background color with similar saturation',
          'When applying a logo over a complex image',
          'When applying a shadow to a logo'
        ];

        // DB Data Overrides
        let ciSymbol = '';
        if (dbContent) {
          const lines = dbContent.split('\n');
          if (lines[0]) ciIntro = lines[0];
          if (lines[1]) ciSymbol = lines[1];
          if (lines[2]) colors[0].name = lines[2];
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
          if (lines[17]) colors[1].desc = lines[17];
          
          if (lines[11]) primaryLogoDesc = lines[11];
          if (lines[12]) secondaryLogoDesc = lines[12];
          if (lines[13]) clearSpaceDesc = lines[13];
        }

        return (
          <div className="space-y-10 animate-fade-in-up">
            <div className="space-y-16 bg-white p-8 md:p-12 rounded-3xl">
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
                    <h4 className="text-lg font-bold text-[#2A5C43] mb-3">Meaning of Symbol Mark</h4>
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
                              <span className="font-bold text-white bg-[#2A5C43] px-3 py-1 rounded-full shadow-sm text-[11px] tracking-wider">Print</span>
                              <span className="text-gray-700 font-medium tracking-tight">{primaryLogoPrint.replace('For Print: ', '')}</span>
                           </div>
                           <div className="flex items-center space-x-3 text-[13px] bg-white px-4 py-2.5 rounded-2xl">
                              <span className="font-bold text-white bg-[#50A5D6] px-3 py-1 rounded-full shadow-sm text-[11px] tracking-wider">Digital</span>
                              <span className="text-gray-700 font-medium tracking-tight">{primaryLogoDigital.replace('Digital: ', '')}</span>
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
                To ensure the best visual effect, readability and identification of the logo, Min margins must be maintained when applied alone. The space around the displayed symbol represents the Min margin, and no other elements should appear in this space.<br/>
                <strong>(서브 로고형도 동일하게 적용합니다.)</strong>
              </p>
              <p className="text-gray-600 leading-relaxed break-keep mb-8 text-[15px]">
                The standard unit (X) of the Min space regulation was derived from the distance between the imaginary line set based on half the height of the symbol (hexagon) and the top of the wordmark (DASAN). This is a value reflecting the structural proportional relationship between the symbol and the wordmark, and is a standard for maintaining the unity and visual balance of the logo.
              </p>
              
              <div className="bg-[#2A5C43] text-white inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4">External User Tip</div>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 text-[15px] font-medium mb-4">
                <li>Measure the height of the symbol (hexagon).</li>
                <li>Draw a virtual horizontal line at its half position.</li>
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
                {colors.map((c, i) => (
                  <div key={i} className="rounded-3xl p-8 text-white flex flex-col justify-between shadow-md" style={{backgroundColor: c.hex}}>
                    <div>
                      <h4 className="text-2xl font-bold mb-4">{c.name}</h4>
                      {(typeof c.desc === 'string' && (c.desc.includes('<p') || c.desc.includes('<h'))) ? (
                        <div dangerouslySetInnerHTML={{ __html: c.desc }} className="[&_p]:text-[13px] [&_p]:opacity-90 [&_p]:leading-relaxed [&_p]:mb-8 [&_p]:break-keep [&_p]:whitespace-pre-line [&_p]:font-medium [&_h4]:font-bold [&_strong]:font-bold" />
                      ) : (
                        <p className="text-[13px] opacity-90 leading-relaxed mb-8 break-keep whitespace-pre-line font-medium">{c.desc}</p>
                      )}
                    </div>
                    <div className="flex justify-between text-xs font-mono bg-black/10 p-4 rounded-2xl gap-2">
                      <div className="flex-1">
                         <span className="inline-block border border-white/40 rounded-full px-3 py-1 text-[10px] mb-3 text-center w-full bg-white/5">For Print Standard</span>
                         <p className="mb-1 text-[11px]">CMYK: {c.cmyk}</p>
                         <p className="text-[11px]">Pantone: {c.pantone}</p>
                      </div>
                      <div className="flex-1">
                         <span className="inline-block border border-white/40 rounded-full px-3 py-1 text-[10px] mb-3 text-center w-full bg-white/5">For Digital Screen</span>
                         <p className="mb-1 text-[11px]">RGB: {c.rgb}</p>
                         <p className="text-[11px]">HEX: {c.hex}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Premium CI Brand Guideline Download Button */}
              <CIDownloadButton />

            </div>



            </div>
          </div>
        );





      case '/about/facilities':
        // Default static texts
        let facIntro = 'It is the core base of Dasan Pharmaceutical organically connected from R&D to production and entering the global market.';

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
            {/* Factory Overview Image */}
            <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-lg relative mb-24">
              <Image 
                src="/press_factory.png" 
                alt="Dasan Pharmaceutical Global Production Base" 
                fill
                unoptimized={true}
                className="object-cover"
              />
            </div>
            
            <div className="text-left mb-10">
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-4">
                Global Infrastructure
              </h3>
              <p className="text-gray-500 text-[15px] leading-relaxed max-w-3xl font-medium">
                {facIntro}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              
              {/* HQ (HQ) */}
              <div className={cardClass}>
                <div className="flex items-center space-x-4 relative z-10 mb-6">
                  <div className={iconContainerClass}>
                    <Building2 size={28} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest block mb-0.5">Seoul Office</span>
                    <h4 className="font-black text-gray-900 text-xl group-hover:text-brand-green transition-colors">Seoul Office</h4>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-6 space-y-4 flex-grow relative z-10">
                  <div>
                    <span className="text-sm text-brand-green font-bold block mb-2">70 Seonyu-ro, Yeongdeungpo-gu, Seoul</span>
                    <p className="text-[13.5px] text-gray-600 font-medium leading-relaxed">Establishment of management, sales, purchasing, business development, and sustainable future growth strategies</p>
                  </div>
                </div>
                </div>

              {/* R&D Network */}
              <div className={cardClass}>
                <div className="flex items-center space-x-4 relative z-10 mb-6">
                  <div className={iconContainerClass}>
                    <Zap size={28} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest block mb-0.5">R&D Network</span>
                    <h4 className="font-black text-gray-900 text-xl group-hover:text-brand-green transition-colors">R&D Network</h4>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-6 space-y-6 relative z-10 flex-grow">
                  <div>
                    <span className="text-sm text-brand-green font-bold block mb-2">Dasan Central R&D Center (Suwon, Korea)</span>
                    <p className="text-[13.5px] text-gray-600 font-medium leading-relaxed">Equipped with formulation and synthesis-related research facilities to oversee R&D</p>
                  </div>
                  <div className="pt-6 border-t border-dashed border-gray-200">
                    <span className="text-sm text-brand-green font-bold block mb-2">Shenyang R&D Center (Shenyang, China)</span>
                    <p className="text-[13.5px] text-gray-600 font-medium leading-relaxed">A dedicated facility for expanding global territory in charge of research, approval, and business development in China</p>
                  </div>
                </div>
              </div>

              {/* Global Production Facilities */}
              <div className={cardClass}>
                <div className="flex items-center space-x-4 relative z-10 mb-6">
                  <div className={iconContainerClass}>
                    <Factory size={28} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest block mb-0.5">Production Facilities</span>
                    <h4 className="font-black text-gray-900 text-xl group-hover:text-brand-green transition-colors">Global Production Facilities</h4>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-6 space-y-6 relative z-10 flex-grow">
                  {/* Domestic Production Facilities */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-[11px] font-extrabold tracking-wider uppercase">
                        Domestic
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <span className="text-sm text-brand-green font-bold block mb-1.5">Asan Plant 1 (Asan, Korea)</span>
                        <p className="text-[13.5px] text-gray-600 font-medium leading-relaxed mb-2">
                          Finished pharmaceutical production headquarters, cGMP-level high-quality pharmaceutical production
                        </p>
                        <div className="flex items-center">
                          <span className="inline-block text-brand-blue font-bold text-[11px] bg-brand-blue/5 px-2.5 py-1 rounded">MHLW, GMP Certification Completed</span>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-dashed border-gray-200">
                        <span className="text-sm text-brand-green font-bold block mb-1.5">Asan Plant 2 (Asan, Korea)</span>
                        <p className="text-[13.5px] text-gray-600 font-medium leading-relaxed">
                          Mass production system for solid dosage forms & state-of-the-art smart automated packaging line
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Overseas Production Facilities */}
                  <div className="pt-5 border-t border-gray-200 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200/70 text-blue-800 text-[11px] font-extrabold tracking-wider uppercase">
                        Overseas
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-brand-green font-bold block mb-1.5">Anhui Heryi Dasan (Anhui, China)</span>
                      <p className="text-[13.5px] text-gray-600 font-medium leading-relaxed">Local advanced production facility in China with an annual production capacity of about 4 billion tablets</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            {/* Directions & Map */}
            <div className="mt-20 pt-16 border-t border-gray-200 w-full">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-8">Location</h3>
              <LocationMapSection hideBackButton={true} />
            </div>
          </div>
        );

      case '/about/location':
        return (
          <div className="space-y-10 animate-fade-in-up">
            {/* Location Hero Visual (21:9 Wide Screen - Same format as Global Infra / History / CI) */}
            <div 
              style={{
                width: '100vw',
                marginLeft: 'calc(50% - 50vw)',
              }}
              className="relative w-screen aspect-[21/9] min-h-[380px] max-h-[680px] overflow-hidden bg-slate-900 shadow-md mb-12 md:mb-16"
            >
              <Image 
                src="/location_hero.jpg" 
                alt="DASAN Directions and Location Visual" 
                fill
                priority
                unoptimized={true}
                className="object-cover object-center"
              />
            </div>

            <LocationMapSection dbContent={dbContent} />
          </div>
        );

      case '/about/esg/ethics':
        return (
          <>
            {/* 기업 개요와 동일한 크기 및 스크롤 확장 효과를 제공하는 Promise.png 이미지 */}
            <ScrollPromiseImage lang="en" />

            <div className="space-y-16 animate-fade-in-up mt-16">
              <ESGEthicsSection lang="en" />
            </div>
          </>
        );
      case '/about/esg/environment':
        return (
          <>
            <ScrollEnvironmentImage lang="en" />

            <div className="space-y-16 animate-fade-in-up mt-16">
              <div className="space-y-6 animate-fade-in-up bg-white p-6 sm:p-10 md:p-14 rounded-3xl font-pretendard">
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
                          <h4 className="text-lg font-bold">Environmental Management Policy</h4>
                        </div>
                        {String(dbContent).includes('<') ? <div dangerouslySetInnerHTML={{__html: dbContent}} className="[&_p]:text-sm [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold [&_ul]:list-disc [&_ul]:pl-4" /> : <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{dbContent}</p>}
                      </>
                    );
                  })()
                ) : (
                  <>
                    <div className="flex items-center space-x-3 text-emerald-600 mb-2">
                      <Heart size={24} />
                      <h4 className="text-lg font-bold">Environmental Management Policy</h4>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      Dasan Pharmaceutical promises not only to contribute to healthcare through new drug development, but also to introduce eco-friendly processes for future generations, strictly manage health and safety, and realize transparent and upright ethical management.
                    </p>
                    <div className="p-4 bg-emerald-50/50 rounded-lg text-xs sm:text-sm space-y-2">
                      <p><strong>E (Environment)</strong>: Operating eco-friendly high-efficiency purification systems and establishing energy reduction goals</p>
                      <p><strong>S (Social)</strong>: Strict compliance with ISO45001 (Health & Safety Management) system and regular check-ups for employee safety</p>
                      <p><strong>G (Governance)</strong>: Practicing anti-corruption guidelines and making autonomous fair trade compliance programs (CP) training mandatory for employees</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        );

      case '/about/esg/safety':
        return (
          <>
            <ScrollSafetyImage lang="en" />

            <div className="space-y-16 animate-fade-in-up mt-16">
              <div className="space-y-6 animate-fade-in-up bg-white p-6 sm:p-10 md:p-14 rounded-3xl font-pretendard">
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
                          <h4 className="text-lg font-bold">Health & Safety Management Policy</h4>
                        </div>
                        {String(dbContent).includes('<') ? <div dangerouslySetInnerHTML={{__html: dbContent}} className="[&_p]:text-sm [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold [&_ul]:list-disc [&_ul]:pl-4" /> : <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{dbContent}</p>}
                      </>
                    );
                  })()
                ) : (
                  <>
                    <div className="flex items-center space-x-3 text-emerald-600 mb-2">
                      <Heart size={24} />
                      <h4 className="text-lg font-bold">Health & Safety Management Policy</h4>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      Dasan Pharmaceutical places the health and safety of all workers as the highest priority, strictly complies with ISO45001 standards, and realizes transparent, safe, and healthy corporate management.
                    </p>
                    <div className="p-4 bg-emerald-50/50 rounded-lg text-xs sm:text-sm space-y-2">
                      <p><strong>Safety Priority</strong>: Prioritizing occupational health and safety across all company activities</p>
                      <p><strong>Health System</strong>: Implementing disease prevention programs and emergency health response frameworks</p>
                      <p><strong>Compliance & Participation</strong>: Strictly adhering to safety regulations and fostering active employee participation</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        );

      case '/about/esg/anti-corruption':
        return (
          <>
            <ScrollAntiCorruptionImage lang="en" />

            <div className="space-y-16 animate-fade-in-up mt-16">
              <div className="space-y-6 animate-fade-in-up bg-white p-6 sm:p-10 md:p-14 rounded-3xl font-pretendard">
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
                          <h4 className="text-lg font-bold">Anti-Corruption & Bribery Prevention Policy</h4>
                        </div>
                        {String(dbContent).includes('<') ? <div dangerouslySetInnerHTML={{__html: dbContent}} className="[&_p]:text-sm [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold [&_ul]:list-disc [&_ul]:pl-4" /> : <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{dbContent}</p>}
                      </>
                    );
                  })()
                ) : (
                  <>
                    <div className="flex items-center space-x-3 text-emerald-600 mb-2">
                      <Heart size={24} />
                      <h4 className="text-lg font-bold">Anti-Corruption & Bribery Prevention Policy</h4>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      Dasan Pharmaceutical establishes a transparent and upright corporate culture, strictly prohibiting all forms of corruption, improper solicitations, and bribery across all global business practices.
                    </p>
                    <div className="p-4 bg-emerald-50/50 rounded-lg text-xs sm:text-sm space-y-2">
                      <p><strong>Zero Tolerance</strong>: Absolute prohibition against improper solicitations, kickbacks, and financial favors</p>
                      <p><strong>Strict Compliance</strong>: Full adherence to anti-corruption laws, internal codes, and international standards</p>
                      <p><strong>Whistleblower Protection</strong>: Guaranteed confidentiality and non-retaliation for reporting violations</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        );

      case '/about/esg/code-of-ethics': {
        const defaultIntroParas = [
          'Dasan Pharmaceutical holds a noble mission to promote human health and well-being. In carrying out this important mission, we firmly believe that the highest global standards of ethical consciousness and transparent management are essential.',
          'Through this commitment, we pledge to uphold integrity, fairness, and responsibility as our top priorities across all business endeavors.',
          'By strictly complying with all domestic and global laws, regulations, and international standards, we will earn public trust and build a sustainable future together.'
        ];

        const defaultSections = [
          {
            title: 'Pledging Transparent Management Free of Corruption and Kickbacks',
            items: [
              'We never demand or accept any inappropriate financial gains, hospitality, or conveniences in connection with our official duties.',
              'We strictly prohibit offering illegal kickbacks or unfair economic benefits to healthcare professionals. All engagements remain fully transparent pursuant to relevant laws and ethical codes.',
              'We establish an upright corporate culture and resolutely eliminate any corrupt practices.'
            ]
          },
          {
            title: 'Prioritizing Customer Health and Safety Above All',
            items: [
              'Valuing human life and health as our highest principles, we research, develop, manufacture, and supply pharmaceuticals with the highest quality and proven safety.',
              'All clinical trials and research activities strictly comply with scientific and ethical standards, placing utmost care on protecting patient information.'
            ]
          },
          {
            title: 'Promising Fair, Honest, and Transparent Relationships',
            items: [
              'We provide customers with the highest quality products and services while safeguarding customer data confidentiality.',
              'We deal fairly with partners based on mutual trust and respect, never abusing dominant positions, and pursuing shared growth.',
              'We faithfully provide timely and accurate information to shareholders to protect their right to know and continuously maximize enterprise value.',
              'We strictly observe regulations in close cooperation with government agencies and regulatory authorities to support sound pharmaceutical advancement.'
            ]
          },
          {
            title: 'Respecting and Fostering Employee Growth',
            items: [
              'All employees are treated fairly with fundamental dignity. Discrimination based on academic ties, regional backgrounds, kinship, gender, religion, or disability is strictly prohibited.',
              'We provide a safe, healthy working environment and eradicate harassment and discrimination, nurturing a culture of mutual respect.',
              'We actively support capability development so that every employee can flourish in a rewarding environment.'
            ]
          },
          {
            title: 'Contributing to Social Responsibility and Environmental Protection',
            items: [
              'As a responsible corporate citizen, we actively contribute to social causes and local community development.',
              'Recognizing the critical importance of sustainability throughout pharmaceutical development and manufacturing, we spearhead eco-friendly practices.'
            ]
          }
        ];

        return (
          <>
            {/* Code of Ethics Banner */}
            <ScrollEthicsImage lang="en" />

            <div className="space-y-16 animate-fade-in-up mt-16">
              <div className="animate-fade-in-up bg-white p-6 sm:p-10 md:p-14 rounded-3xl font-pretendard">
                {/* Header & Core Intro */}
                <div className="text-left max-w-4xl mx-auto space-y-5">
                  {/* Intro Statement */}
                  <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-[1.75] font-normal break-keep tracking-[-0.015em]">
                    {defaultIntroParas.map((para, pIdx) => (
                      <p key={pIdx}>
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* 5 Core Principles */}
                <div className="max-w-4xl mx-auto mt-8 sm:mt-10 divide-y divide-gray-100 border-t border-b border-gray-100">
                  {defaultSections.map((sec, idx) => (
                    <div key={idx} className="py-6 sm:py-7 space-y-3">
                      <div className="flex items-start space-x-3.5">
                        <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center mt-0.5 shadow-2xs">
                          {idx + 1}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-snug pt-0.5 break-keep tracking-[-0.015em]">
                          {sec.title}
                        </h4>
                      </div>
                      <ul className="pl-10 sm:pl-11 space-y-2 text-sm sm:text-base text-gray-600 leading-[1.7] break-keep tracking-[-0.015em]">
                        {sec.items.map((item, iIdx) => (
                          <li key={iIdx} className="flex items-start">
                            <span className="mr-2 text-gray-400 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Formal Footer Sign-off Block */}
                <div className="max-w-4xl mx-auto mt-8 sm:mt-10 pt-8 sm:pt-10 text-center space-y-4">
                  <p className="text-sm sm:text-base font-semibold text-gray-400 tracking-wider">
                    January 1, 2025
                  </p>
                  
                  <div className="space-y-1.5">
                    <p className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
                      CEO & President, Dasan Pharmaceutical Co., Ltd.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }

      // IR pages
      case '/about/ir/announcement':
      case '/about/ir/financial': {
        // Parse dynamic content from dbContent
        let title = 'Shareholder-centered management and fair corporate valuation';
        let desc = 'Dasan Pharmaceutical\'s business performance and investment disclosure data are clearly and faithfully disclosed in accordance with relevant laws and regulations. We provide real-time key financial indicators to help shareholders and investors understand.';
        let dartUrl = 'https://dart.fss.or.kr/html/search/SearchCompanyIR3_M.html?textCrpNM=%EB%8B%A4%EC%82%B0%EC%A0%9C%EC%95%BD';
        
        let financialHeaders = ['2023 (Separate)', '2024 (Separate)', '2025 (Consolidated)'];
        let salesRow = ['Sales', '79,275', '92,734', '110,191'];
        let profitRow = ['Operating Profit', '2,389', '6,068', '338'];
        let rdRow = ['R&D Investment', '9,500', '12,000', '13,500'];

        // Detailed tables mock data
        let consolidatedBS = [
          ['Current Assets', '42,060', '49,466', '67,118'],
          ['Non-current Assets', '31,197', '38,595', '43,297'],
          ['Total Assets', '73,257', '88,061', '110,415'],
          ['Current Liabilities', '39,071', '42,281', '61,928'],
          ['Non-current Liabilities', '11,223', '14,582', '12,099'],
          ['Total Liabilities', '50,294', '56,863', '74,028'],
          ['Capital Stock', '1,120', '1,120', '1,120'],
          ['Capital Surplus', '3,583', '3,583', '3,583'],
          ['Other Capital', '-7,762', '-7,771', '-7,776'],
          ['Retained Earnings', '26,152', '34,248', '39,645'],
          ['Non-controlling Interests', '-131', '17', '-185'],
          ['Total Equity', '22,962', '31,198', '36,388']
        ];

        let separateBS = [
          ['Current Assets', '41,899', '49,031', '65,212'],
          ['Non-current Assets', '31,032', '38,621', '45,426'],
          ['Total Assets', '72,931', '87,652', '110,637'],
          ['Current Liabilities', '38,309', '41,738', '61,197'],
          ['Non-current Liabilities', '11,223', '14,582', '11,887'],
          ['Total Liabilities', '49,531', '56,320', '73,084'],
          ['Capital Stock', '1,120', '1,120', '1,120'],
          ['Capital Surplus', '3,583', '3,583', '3,583'],
          ['Other Capital', '-7,766', '-7,766', '-7,766'],
          ['Retained Earnings', '26,462', '34,395', '40,616'],
          ['Total Equity', '23,400', '31,333', '37,554']
        ];

        let consolidatedIS = [
          ['Sales', '80,027', '93,817', '110,191'],
          ['Operating Profit', '1,867', '6,161', '338'],
          ['Income before Tax', '46', '8,247', '3,238'],
          ['Net Income', '1,815', '8,035', '3,690']
        ];

        let separateIS = [
          ['Sales', '79,275', '92,734', '106,877'],
          ['Operating Profit', '2,389', '6,068', '1,399'],
          ['Income before Tax', '547', '8,150', '4,547'],
          ['Net Income', '2,316', '7,929', '4,937']
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
              <div className="flex items-center space-x-2 sm:space-x-3 text-brand-green">
                <LineChart size={22} className="flex-shrink-0" />
                <h4 className="text-xs sm:text-base md:text-lg font-bold whitespace-nowrap tracking-tight leading-tight">{title}</h4>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-gray-600 text-xs sm:text-sm tracking-tight leading-relaxed break-keep">{desc}</p>
            </div>
            
            {currentPath === '/about/ir/announcement' ? (
              <div className="w-full py-4 bg-white">
                <div className="w-full overflow-x-auto [scrollbar-width:thin] pb-3">
                  <div className="min-w-[650px] max-w-[715px] h-[745px] mx-auto border border-gray-150 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                    <iframe
                      src={dartUrl}
                      name="IR"
                      scrolling="yes"
                      frameBorder="0"
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="overflow-x-auto border border-gray-400 rounded-lg shadow-none">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-brand-green text-white uppercase">
                      <tr>
                        <th className="p-3 border-b border-r border-gray-400 font-bold">Financial Items (Unit: Million KRW)</th>
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
                        <td className="p-3 border-b border-r border-gray-400 font-bold text-brand-green-dark">{salesRow[0] || 'Sales'}</td>
                        {financialHeaders.map((_, colIdx) => {
                          const isLastCol = colIdx === financialHeaders.length - 1;
                          return (
                            <td key={colIdx} className={`p-3 border-b ${isLastCol ? '' : 'border-r'} border-gray-400 text-center font-medium`}>{salesRow[colIdx + 1] || ''}</td>
                          );
                        })}
                      </tr>
                      <tr className="hover:bg-brand-green-light/20">
                        <td className="p-3 border-r border-gray-400 font-bold text-brand-green-dark">{profitRow[0] || 'Operating Profit'}</td>
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
                  isEnglish={true}
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
              title: 'Notice of Convocation of the 2026 Annual General Meeting of Shareholders',
              content: 'This is a detailed information guide including the location of the regular general meeting of shareholders and items to be resolved.',
              views: 74,
              created_at: new Date().toISOString(),
            }
          ];
        }

        return (
          <div className="space-y-6 animate-fade-in-up bg-white p-6 rounded-xl shadow-none">
            <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
              <p className="text-gray-500 text-sm">This is news on Dasan Pharmaceutical's corporate performance and major IR disclosures.</p>
            </div>
            
            <PressList initialNews={irNewsList} />
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
    <div className={`relative bg-white pt-16 md:pt-24 ${currentPath === '/about/intro' ? 'pb-0' : 'pb-16 md:pb-24'} min-h-screen`}>
      <div className={`relative z-10 w-full ${currentPath === '/about/greeting' ? 'px-2 sm:px-4 md:px-6 lg:px-8 max-w-[1800px] mx-auto' : 'px-6 md:px-16 lg:px-24'} mt-8`}>

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
                subMenus={activeMajorObj?.subMenus || []} 
                currentPath={currentPath} 
              />
            </div>

            {/* Dynamic Content - Width centered and bounded for clean layout */}
            <div className={`min-h-[550px] w-full ${currentPath === '/about/greeting' ? 'max-w-[1760px]' : currentPath === '/about/esg/ethics' ? 'max-w-7xl' : 'max-w-5xl'}`}>
              {renderContent(dbContent, competenciesContent, visionContent, valuesContent, philosophyContent, cultureContent)}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
