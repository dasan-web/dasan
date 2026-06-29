import React from 'react';
import Link from 'next/link';
import CoreTechnology from '@/components/CoreTechnology';
import PressReleaseSlider from '@/components/PressReleaseSlider';
import ScrollIndicator from '@/components/ScrollIndicator';
import ScrollReveal from '@/components/ScrollReveal';
import HeroBackground from '@/components/HeroBackground';
import ScrollNav from '@/components/ScrollNav';
import { query } from '@/lib/db';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const results = await query('SELECT content FROM admin_contents WHERE page_key = ?', ['seo/main']);
    if (results && results.length > 0) {
      const [title, keywords, description] = results[0].content.split('|');
      return {
        title: title || '다산제약 | 의약품 CDMO 기업',
        keywords: keywords || '다산제약, 의약품 CDMO 기업, Dasan Pharmaceutical, dspharm',
        description: description || '다산제약은 지속적인 연구개발과 고품질의 의약품 생산을 통해 건강한 삶을 만들어가는 글로벌 제약회사입니다.',
      };
    }
  } catch (e) {
    console.error('Failed to load main page metadata:', e);
  }
  return {
    title: '다산제약 | 의약품 CDMO 기업',
    keywords: '다산제약, 의약품 CDMO 기업, Dasan Pharmaceutical, dspharm',
    description: '다산제약은 지속적인 연구개발과 고품질의 의약품 생산을 통해 건강한 삶을 만들어가는 글로벌 제약회사입니다.',
  };
}

export default async function Home() {
  let pressNews = [];
  try {
    pressNews = await query(
      "SELECT * FROM news WHERE category = 'press' AND file_url IS NOT NULL AND file_url != '' ORDER BY created_at DESC LIMIT 3"
    );
  } catch (err) {
    console.error('Failed to fetch press news for main page:', err);
  }

  return (
    <div className="w-full bg-white flex flex-col">
      {/* 1. Hero Banner Section */}
      <section id="hero" className="relative w-full h-[90vh] md:h-[calc(100vh-80px)] overflow-hidden flex items-center bg-white">
        {/* Background DNA Helix Image - Spring Mouse Parallax & Ken Burns Zoom */}
        <HeroBackground />

        {/* Content Container */}
        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24">
          <div className="w-full text-left space-y-6 md:space-y-8">
            {/* Main Headline */}
            <div className="space-y-2 md:space-y-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-green tracking-tight leading-tight lg:whitespace-nowrap">
                <span className="font-paperlogy font-[800]">Global CDMO company</span><br className="md:hidden" />
                <span className="font-paperlogy font-[900]"> through DDS.</span>
              </h1>
            </div>

            {/* Slogan */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-pretendard font-semibold text-brand-green tracking-tight leading-tight">
              Happy people make the healthy world.
            </h2>

            {/* Korean Paragraph Description */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#343434] leading-relaxed max-w-5xl font-paperlogy font-[500] pt-2 md:pt-4">
              다산제약은 한국 최고의 실학자이자 과학자였던 정약용 선생의 愛民정신을 창업이념으로 삼아<br />인류의 건강과 행복한 삶을 위해 필요한 제제기술 및 합성기술 연구와 우수한 의약품 생산을 위해<br />끊임없이 노력하고 있습니다.
            </p>

            {/* Learn More Button */}
            <div className="pt-4 md:pt-6">
              <Link
                href="/about/intro"
                className="inline-flex items-center gap-2.5 bg-white text-brand-green border-2 border-brand-green hover:bg-brand-green hover:text-white font-pretendard font-semibold px-9 py-4 lg:px-11 lg:py-4.5 rounded-full transition-all duration-300 text-sm lg:text-base hover:shadow-green-glow hover:-translate-y-0.5 group cursor-pointer"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4.5 h-4.5 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Mouse indicator at bottom center */}
        <ScrollIndicator />
      </section>

      {/* 2. Core Technology Section */}
      <CoreTechnology />

      {/* 3. Press Release Section */}
      <div id="press-release">
        <PressReleaseSlider initialNews={pressNews} />
      </div>

      {/* Floating dot page navigator */}
      <ScrollNav />

      {/* 4. Inquiry Bottom Banner */}
      <ScrollReveal>
        <div className="w-full bg-gradient-to-r from-brand-green to-brand-green-dark py-8 md:py-10 px-6 md:px-16 lg:px-24 z-10">
          <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
            {/* Left Column: Title & Sub */}
            <div className="text-left space-y-1.5 font-pretendard">
              <h3 className="text-white font-semibold text-xl md:text-2xl tracking-tight leading-tight">
                문의하기
              </h3>
              <p className="text-white/90 text-xs md:text-sm font-semibold">
                다산제약에 대해 궁금한 점이 있으시면 언제든지 문의해 주세요.
              </p>
            </div>

            {/* Right Column: Operating Hours & Button */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-8">
              <div className="text-left sm:text-right text-white/80 font-medium text-[11px] md:text-xs leading-relaxed">
                <p>평일 AM 09:00 - PM 06:00</p>
                <p>점심 PM 12:30 - PM 01:30</p>
              </div>
              <div>
                <Link
                  href="/contact/inquiry"
                  className="inline-block bg-white hover:bg-gray-50 text-brand-green font-pretendard font-semibold px-8 py-2.5 md:px-10 md:py-3 rounded-full transition-all duration-200 text-xs md:text-sm shadow-sm hover:shadow-md cursor-pointer"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
