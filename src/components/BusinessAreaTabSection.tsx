'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface BusinessAreaTabSectionProps {
  isEnglish?: boolean;
}

export default function BusinessAreaTabSection({ isEnglish = false }: BusinessAreaTabSectionProps) {
  const [activeTab, setActiveTab] = useState(0);

  const basePath = isEnglish ? '/en' : '';

  const tabItems = [
    {
      id: 'finished',
      tabLabel: isEnglish ? 'Proprietary Finished Drugs' : '자사 완제 의약품 사업',
      tag: isEnglish ? 'Core Business' : '주요 사업영역',
      title: isEnglish ? 'Proprietary Finished Drug Business' : '자사 완제 의약품 사업',
      desc: isEnglish ? (
        <div className="flex flex-col space-y-2">
          <p className="leading-relaxed">
            We establish a robust portfolio of high-efficacy prescription (ETC) and OTC pharmaceuticals centered on key therapeutic areas including cardiovascular, respiratory, gastrointestinal, and urological systems.
          </p>
          <p className="leading-relaxed">
            Through c-GMP-compliant advanced manufacturing facilities and rigorous quality control, we reliably produce and supply safe, high-quality medicines to healthcare institutions nationwide.
          </p>
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          <p className="leading-relaxed">
            순환기, 호흡기, 소화기, 비뇨기 등 주요 만성질환 및 치료 영역을 중심으로 우수한 효능의 전문의약품(ETC)과 일반의약품(OTC) 제품 라인업을 구축하고 있습니다.
          </p>
          <p className="leading-relaxed">
            c-GMP 수준의 첨단 제조 시설과 엄격한 품질관리를 통해 안전하고 신뢰할 수 있는 고품질 의약품을 전국 의료기관 및 약국에 안정적으로 생산·공급합니다.
          </p>
        </div>
      ),
      image: '/core_business_finished.png',
      href: `${basePath}/business/finished/search`,
    },
    {
      id: 'cmo',
      tabLabel: isEnglish ? 'Contract Finished Drugs (CMO)' : '수탁 완제 의약품 (CMO) 사업',
      tag: isEnglish ? 'Core Business' : '주요 사업영역',
      title: isEnglish ? 'Contract Finished Drug (CMO) Business' : '수탁 완제 의약품 (CMO) 사업',
      desc: isEnglish ? (
        <div className="flex flex-col space-y-2">
          <p className="leading-relaxed">
            Based on proprietary formulation platforms including Multi-Stra® and process optimization capabilities, we provide comprehensive one-stop CDMO solutions spanning formulation development, clinical batch manufacturing, and commercial mass production.
          </p>
          <p className="leading-relaxed">
            Equipped with German Glatt fluid-bed coaters and state-of-the-art automated packaging lines, we manufacture high-precision finished pharmaceuticals customized to our global and domestic partners' demands.
          </p>
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          <p className="leading-relaxed">
            Multi-Stra® 등 다산제약만의 독자적인 특수 제형 제제기술과 공정 최적화 역량을 기반으로, 개량신약 및 제네릭 완제의약품의 개발부터 상업화 대량 생산까지 전 주기 원스톱 솔루션을 제공합니다.
          </p>
          <p className="leading-relaxed">
            독일 Glatt 유동층 코팅 설비와 최첨단 자동화 스마트 패키징 라인을 통해 국내외 파트너사의 다양한 요구에 부합하는 최고 품질의 의약품을 위탁 제조합니다.
          </p>
        </div>
      ),
      image: '/core_business_cmo.jpg',
      href: `${basePath}/business/cdmo`,
    },
    {
      id: 'api',
      tabLabel: isEnglish ? 'API & Intermediates' : '의약품 핵심 원료 및 중간체 사업',
      tag: isEnglish ? 'Core Business' : '주요 사업영역',
      title: isEnglish ? 'API & Intermediate Business' : '의약품 핵심 원료 및 중간체 사업',
      desc: isEnglish ? (
        <div className="flex flex-col space-y-2">
          <p className="leading-relaxed">
            We drive the research, development, and patent acquisition of high-value APIs and synthetic intermediates including prodrugs, managing global-standard DMF registrations with systematic regulatory precision.
          </p>
          <p className="leading-relaxed">
            Supported by high-precision analytical testing, rigorous QA systems, and a competitive global sourcing network, we deliver trusted, optimized API solutions to pharmaceutical manufacturers worldwide.
          </p>
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          <p className="leading-relaxed">
            Prodrug를 비롯한 고부가가치 의약품 핵심 원료 및 합성 중간체의 연구개발과 독자적 특허 확보를 주도하며, 글로벌 규격의 신규 합성·수입 원료 DMF 등록을 체계적으로 관리합니다.
          </p>
          <p className="leading-relaxed">
            고정밀 분석 시험과 엄격한 품질보증 시스템, 경쟁력 있는 글로벌 소싱 네트워크를 바탕으로 국내외 완제의약품 제조사에 신뢰성 높은 최적의 API 솔루션을 공급합니다.
          </p>
        </div>
      ),
      image: '/core_business_api.jpg',
      href: `${basePath}/business/api/raw`,
    },
  ];

  const currentItem = tabItems[activeTab];

  return (
    <div className="w-full space-y-8 mt-6">
      {/* Sub-menu Tab Bar */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pb-2">
        {tabItems.map((item, index) => {
          const isActive = activeTab === index;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(index)}
              className={`px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base lg:text-[17px] font-bold transition-all duration-300 cursor-pointer focus:outline-none ${
                isActive
                  ? 'bg-brand-green text-white shadow-md scale-[1.02]'
                  : 'bg-gray-100/90 text-gray-600 hover:bg-gray-200/90 hover:text-gray-900'
              }`}
            >
              {item.tabLabel}
            </button>
          );
        })}
      </div>

      {/* Active Tab Content Card with Smooth Fade Animation */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center py-4 sm:py-6"
          >
            {/* Left Column: Photo */}
            <div className="lg:col-span-6 overflow-hidden rounded-2xl sm:rounded-3xl aspect-[16/10] bg-gray-100 shadow-xs group">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Right Column: Text Information & Link Button */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-4 sm:space-y-5">
              <span className="text-sm md:text-base font-bold text-[#1F4E78] tracking-wider">
                {currentItem.tag}
              </span>
              <h4 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-extrabold text-gray-900 tracking-tight leading-tight">
                {currentItem.title}
              </h4>
              <div className="text-base sm:text-lg lg:text-[16px] xl:text-[17.5px] text-gray-600 font-normal leading-relaxed break-keep pt-1">
                {currentItem.desc}
              </div>

              {/* View Details Link */}
              <div className="pt-3">
                <Link
                  href={currentItem.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-white font-semibold text-sm sm:text-base hover:bg-brand-green transition-colors duration-300 shadow-sm"
                >
                  <span>{isEnglish ? 'View Business Details' : '사업 상세 바로가기'}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
