'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Leaf, 
  Users, 
  Scale, 
  ShieldCheck, 
  ShieldAlert, 
  Award, 
  CheckCircle2, 
  Globe2,
  ChevronRight
} from 'lucide-react';
import { EsgEthicsOverviewData, DEFAULT_ESG_ETHICS_OVERVIEW_DATA } from '@/lib/esg';

interface Props {
  lang?: 'ko' | 'en';
  data?: EsgEthicsOverviewData;
}

export default function ESGEthicsSection({ lang = 'ko', data }: Props) {
  const isEn = lang === 'en';
  const d = data || DEFAULT_ESG_ETHICS_OVERVIEW_DATA;
  const pillarE = d.pillars?.[0] || DEFAULT_ESG_ETHICS_OVERVIEW_DATA.pillars[0];
  const pillarS = d.pillars?.[1] || DEFAULT_ESG_ETHICS_OVERVIEW_DATA.pillars[1];
  const pillarG = d.pillars?.[2] || DEFAULT_ESG_ETHICS_OVERVIEW_DATA.pillars[2];
  const cert0 = d.certs?.[0] || DEFAULT_ESG_ETHICS_OVERVIEW_DATA.certs[0];
  const cert1 = d.certs?.[1] || DEFAULT_ESG_ETHICS_OVERVIEW_DATA.certs[1];
  const cert2 = d.certs?.[2] || DEFAULT_ESG_ETHICS_OVERVIEW_DATA.certs[2];
  const cert3 = d.certs?.[3] || DEFAULT_ESG_ETHICS_OVERVIEW_DATA.certs[3];

  return (
    <div className="w-full bg-white font-pretendard text-slate-800 animate-fade-in-up">
      
      {/* 2. 핵심 영역별 추진 성과 (대형 사진 중심 비주얼 쇼케이스) */}
      <section className="mb-20 sm:mb-28">
        <div className="flex flex-col mb-10 sm:mb-12">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            {isEn ? 'Action Tasks by ESG Pillars' : d.pillarSectionTitle}
          </h3>
          <p className="text-sm sm:text-base text-slate-500 mt-2.5 font-normal max-w-none break-keep">
            {isEn 
              ? 'We implement transparent and responsible sustainability management across Environment, Social, and Governance with large-scale high-tech infrastructure.'
              : d.pillarSectionDesc}
          </p>
        </div>

        {/* 3 Grand Alternating Photo Showcase Cards */}
        <div className="space-y-12 sm:space-y-16">

          {/* Pillar E: Environmental (Photo Left) */}
          <div className="group rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-2xl hover:border-emerald-300 transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Grand Photo Showcase */}
              <div className="relative lg:col-span-5 xl:col-span-5 h-80 sm:h-96 md:h-[440px] lg:h-auto min-h-[360px] lg:min-h-[480px] overflow-hidden bg-slate-100">
                <Image
                  src={pillarE.imageUrl || "/esg_environment_leaf.png"}
                  alt={isEn ? "Dasan Pharmaceutical Eco-friendly Environmental Management" : "다산제약 친환경 생태 경영"}
                  fill
                  className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Content Area */}
              <div className="lg:col-span-7 xl:col-span-7 p-7 sm:p-9 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                        <Leaf className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          {isEn ? 'Eco-friendly Management (E)' : pillarE.title}
                        </h4>
                      </div>
                    </div>

                    <Link 
                      href="/about/esg/environment" 
                      className="inline-flex items-center gap-1.5 self-start sm:self-center px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-900 text-slate-700 hover:text-white border border-slate-200 text-xs sm:text-[13px] font-semibold transition-all duration-200 shadow-2xs"
                    >
                      <span>{isEn ? 'Environment Policy' : '환경경영방침 바로가기'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Core Statement Quote */}
                  <div className="bg-slate-50 border-l-4 border-emerald-600 p-4 sm:p-5 rounded-r-2xl mb-6">
                    <p className="text-[14.5px] sm:text-[15.5px] text-slate-700 font-medium leading-relaxed break-keep">
                      {isEn 
                        ? 'Protecting human health begins with creating a healthy planet. Dasan Pharmaceutical is building an eco-friendly manufacturing ecosystem that minimizes environmental impact.'
                        : pillarE.quote}
                    </p>
                  </div>

                  {/* Action Bullets */}
                  <div className="space-y-3.5">
                    {isEn ? (
                      <>
                        <div className="flex items-start gap-3 text-sm sm:text-[14.5px] text-slate-600 leading-relaxed">
                          <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/80 flex items-center justify-center flex-shrink-0 mt-0.5 text-emerald-700">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <div className="break-keep">
                            <strong className="font-bold text-slate-900">ISO 14001 Certification</strong> : Systematically operating an environmental management system meeting global standards.
                          </div>
                        </div>
                        <div className="flex items-start gap-3 text-sm sm:text-[14.5px] text-slate-600 leading-relaxed">
                          <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/80 flex items-center justify-center flex-shrink-0 mt-0.5 text-emerald-700">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <div className="break-keep">
                            <strong className="font-bold text-slate-900">Smart Eco-Factory Construction</strong> : Selected for the Ministry of Environment support project, reducing pollutants and enhancing energy efficiency.
                          </div>
                        </div>
                      </>
                    ) : (
                      (pillarE.bullets || []).map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-3 text-sm sm:text-[14.5px] text-slate-600 leading-relaxed">
                          <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/80 flex items-center justify-center flex-shrink-0 mt-0.5 text-emerald-700">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <div className="break-keep">
                            <strong className="font-bold text-slate-900">{b.bold}</strong> : {b.text}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Pillar S: Social (Photo Right - Alternating Rhythm) */}
          <div className="group rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-2xl hover:border-sky-300 transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Content Area (Left on Desktop) */}
              <div className="lg:col-span-7 xl:col-span-7 order-2 lg:order-1 p-7 sm:p-9 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          {isEn ? 'Social Responsibility & Safety (S)' : pillarS.title}
                        </h4>
                      </div>
                    </div>

                    <Link 
                      href="/about/esg/safety" 
                      className="inline-flex items-center gap-1.5 self-start sm:self-center px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-900 text-slate-700 hover:text-white border border-slate-200 text-xs sm:text-[13px] font-semibold transition-all duration-200 shadow-2xs"
                    >
                      <span>{isEn ? 'Safety Policy' : '안전보건경영방침 바로가기'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Core Statement Quote */}
                  <div className="bg-slate-50 border-l-4 border-sky-600 p-4 sm:p-5 rounded-r-2xl mb-6">
                    <p className="text-[14.5px] sm:text-[15.5px] text-slate-700 font-medium leading-relaxed break-keep">
                      {isEn 
                        ? 'Employee safety is the foundation of quality, and employee growth is corporate competitiveness. Dasan Pharmaceutical realizes shared value where everyone is safe and happy.'
                        : pillarS.quote}
                    </p>
                  </div>

                  {/* Action Bullets */}
                  <div className="space-y-3.5">
                    {isEn ? (
                      <>
                        <div className="flex items-start gap-3 text-sm sm:text-[14.5px] text-slate-600 leading-relaxed">
                          <div className="w-5 h-5 rounded-full bg-sky-50 border border-sky-200/80 flex items-center justify-center flex-shrink-0 mt-0.5 text-sky-700">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <div className="break-keep">
                            <strong className="font-bold text-slate-900">ISO 45001 Certification</strong> : Proactively identifying hazards to maintain a &quot;Zero Severe Accidents&quot; workplace.
                          </div>
                        </div>
                        <div className="flex items-start gap-3 text-sm sm:text-[14.5px] text-slate-600 leading-relaxed">
                          <div className="w-5 h-5 rounded-full bg-sky-50 border border-sky-200/80 flex items-center justify-center flex-shrink-0 mt-0.5 text-sky-700">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <div className="break-keep">
                            <strong className="font-bold text-slate-900">Great Workplace Culture</strong> : Selected as Youth-Friendly Hidden Champion, promoting work-life balance and healthy organizational culture.
                          </div>
                        </div>
                      </>
                    ) : (
                      (pillarS.bullets || []).map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-3 text-sm sm:text-[14.5px] text-slate-600 leading-relaxed">
                          <div className="w-5 h-5 rounded-full bg-sky-50 border border-sky-200/80 flex items-center justify-center flex-shrink-0 mt-0.5 text-sky-700">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <div className="break-keep">
                            <strong className="font-bold text-slate-900">{b.bold}</strong> : {b.text}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

              {/* Grand Photo Showcase (Right on Desktop) */}
              <div className="relative lg:col-span-5 xl:col-span-5 order-1 lg:order-2 h-80 sm:h-96 md:h-[440px] lg:h-auto min-h-[360px] lg:min-h-[480px] overflow-hidden bg-slate-100">
                <Image
                  src={pillarS.imageUrl || "/esg_social_hands.png"}
                  alt={isEn ? "Dasan Pharmaceutical Social Responsibility and Shared Value" : "다산제약 사회적 책임 및 상생 가치"}
                  fill
                  className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

            </div>
          </div>

          {/* Pillar G: Governance (Photo Left) */}
          <div className="group rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-2xl hover:border-indigo-300 transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Grand Photo Showcase */}
              <div className="relative lg:col-span-5 xl:col-span-5 h-80 sm:h-96 md:h-[440px] lg:h-auto min-h-[360px] lg:min-h-[480px] overflow-hidden bg-slate-100">
                <Image
                  src={pillarG.imageUrl || "/esg_governance_lab.png"}
                  alt={isEn ? "Dasan Pharmaceutical Advanced Quality & Governance Production" : "다산제약 정도경영 및 첨단 제조·품질 관리 인프라"}
                  fill
                  className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Content Area */}
              <div className="lg:col-span-7 xl:col-span-7 p-7 sm:p-9 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                        <Scale className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          {isEn ? 'Transparent Governance (G)' : pillarG.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <Link 
                        href="/about/esg/anti-corruption" 
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-900 text-slate-700 hover:text-white border border-slate-200 text-xs sm:text-[13px] font-semibold transition-all duration-200 shadow-2xs"
                      >
                        <span>{isEn ? 'Anti-Corruption' : '부패방지방침'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link 
                        href="/about/esg/code-of-ethics" 
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-900 text-slate-700 hover:text-white border border-slate-200 text-xs sm:text-[13px] font-semibold transition-all duration-200 shadow-2xs"
                      >
                        <span>{isEn ? 'Code of Ethics' : '윤리강령 바로가기'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Core Statement Quote */}
                  <div className="bg-slate-50 border-l-4 border-indigo-600 p-4 sm:p-5 rounded-r-2xl mb-6">
                    <p className="text-[14.5px] sm:text-[15.5px] text-slate-700 font-medium leading-relaxed break-keep">
                      {isEn 
                        ? 'Inheriting the spirit of "Seeking Truth from Facts" from scholar Jeong Yak-yong (Dasan), we prove market trust not through empty slogans, but through transparent and upright governance processes.'
                        : pillarG.quote}
                    </p>
                  </div>

                  {/* Action Bullets */}
                  <div className="space-y-3.5">
                    {isEn ? (
                      <>
                        <div className="flex items-start gap-3 text-sm sm:text-[14.5px] text-slate-600 leading-relaxed">
                          <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200/80 flex items-center justify-center flex-shrink-0 mt-0.5 text-indigo-700">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <div className="break-keep">
                            <strong className="font-bold text-slate-900">ISO 37001 Certification</strong> : Establishing an anti-corruption and ethical management system to rigorously control risks.
                          </div>
                        </div>
                        <div className="flex items-start gap-3 text-sm sm:text-[14.5px] text-slate-600 leading-relaxed">
                          <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200/80 flex items-center justify-center flex-shrink-0 mt-0.5 text-indigo-700">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <div className="break-keep">
                            <strong className="font-bold text-slate-900">Meeting K-ESG Indicators</strong> : Securing governance standards meeting the Korean ESG guidelines to maximize shareholder value.
                          </div>
                        </div>
                      </>
                    ) : (
                      (pillarG.bullets || []).map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-3 text-sm sm:text-[14.5px] text-slate-600 leading-relaxed">
                          <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200/80 flex items-center justify-center flex-shrink-0 mt-0.5 text-indigo-700">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <div className="break-keep">
                            <strong className="font-bold text-slate-900">{b.bold}</strong> : {b.text}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. ESG 인증 현황 (공인 표준 인증 아이콘 카드) */}
      <section className="pt-10 border-t border-slate-200/80">
        <div className="flex flex-col mb-10">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isEn ? 'Certified Sustainable Management Standards' : d.certSectionTitle}
          </h3>
          <p className="text-sm sm:text-base text-slate-500 mt-2 font-normal">
            {isEn 
              ? 'Dasan Pharmaceutical has acquired authoritative certifications by strictly complying with international ISO standards and government guidelines.'
              : d.certSectionDesc}
          </p>
        </div>

        {/* 4 Premium Insignia Cards with Dedicated Domain Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 01: ISO 14001 */}
          <div className="group relative bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#367e47]" />
            <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors duration-500 blur-2xl pointer-events-none" />
            <div>
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-emerald-700 mb-5 shadow-2xs">
                <Globe2 className="w-7 h-7" />
              </div>
              <h5 className="text-2xl font-black text-slate-900 tracking-tight mb-1.5">
                {cert0.code}
              </h5>
              <div className="text-sm font-bold text-emerald-950 mb-2.5">
                {isEn ? 'Environmental Management' : cert0.subTitle}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isEn 
                  ? 'Eco-friendly manufacturing processes and systematic energy/waste management.' 
                  : cert0.desc}
              </p>
            </div>
          </div>

          {/* Card 02: ISO 45001 */}
          <div className="group relative bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-700" />
            <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-sky-500/5 group-hover:bg-sky-500/10 transition-colors duration-500 blur-2xl pointer-events-none" />
            <div>
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-sky-700 mb-5 shadow-2xs">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h5 className="text-2xl font-black text-slate-900 tracking-tight mb-1.5">
                {cert1.code}
              </h5>
              <div className="text-sm font-bold text-sky-950 mb-2.5">
                {isEn ? 'Occupational Health & Safety' : cert1.subTitle}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isEn 
                  ? 'Proactive hazard prevention and maintaining zero severe industrial accidents.' 
                  : cert1.desc}
              </p>
            </div>
          </div>

          {/* Card 03: ISO 37001 */}
          <div className="group relative bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-500" />
            <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors duration-500 blur-2xl pointer-events-none" />
            <div>
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-amber-700 mb-5 shadow-2xs">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h5 className="text-2xl font-black text-slate-900 tracking-tight mb-1.5">
                {cert2.code}
              </h5>
              <div className="text-sm font-bold text-amber-950 mb-2.5">
                {isEn ? 'Anti-Bribery Management' : cert2.subTitle}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isEn 
                  ? 'Strict anti-corruption policy and transparent corporate ethics framework.' 
                  : cert2.desc}
              </p>
            </div>
          </div>

          {/* Card 04: K-ESG */}
          <div className="group relative bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-300" />
            <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors duration-500 blur-2xl pointer-events-none" />
            <div>
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-indigo-700 mb-5 shadow-2xs">
                <Award className="w-7 h-7" />
              </div>
              <h5 className="text-2xl font-black text-slate-900 tracking-tight mb-1.5">
                {cert3.code}
              </h5>
              <div className="text-sm font-bold text-indigo-950 mb-2.5">
                {isEn ? 'Korean ESG Guidelines' : cert3.subTitle}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isEn 
                  ? 'Official compliance with government K-ESG indicators and transparent disclosures.' 
                  : cert3.desc}
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
