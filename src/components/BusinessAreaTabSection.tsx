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
      desc: isEnglish
        ? 'Establishing, producing, and supplying an excellent portfolio of ethical and OTC drugs centered on cardiovascular, respiratory, and urological systems.'
        : '순환기, 호흡기, 비뇨기 중심의 우수한 제품 라인업 구축 및 생산 판매',
      image: '/core_business_finished.png',
      href: `${basePath}/business/finished/search`,
    },
    {
      id: 'cmo',
      tabLabel: isEnglish ? 'Contract Finished Drugs (CMO)' : '수탁 완제 의약품 (CMO) 사업',
      tag: isEnglish ? 'Core Business' : '주요 사업영역',
      title: isEnglish ? 'Contract Finished Drug (CMO) Business' : '수탁 완제 의약품 (CMO) 사업',
      desc: isEnglish
        ? 'Contract manufacturing of prescription drugs through proprietary formulation technology, smart packaging automation, and process optimization.'
        : '독자적인 제제기술 및 공정 최적화를 통한 전문의약품 수탁 생산',
      image: '/core_business_cmo.jpg',
      href: `${basePath}/business/cdmo`,
    },
    {
      id: 'api',
      tabLabel: isEnglish ? 'API & Intermediates' : '의약품 핵심 원료 및 중간체 사업',
      tag: isEnglish ? 'Core Business' : '주요 사업영역',
      title: isEnglish ? 'API & Intermediate Business' : '의약품 핵심 원료 및 중간체 사업',
      desc: isEnglish
        ? 'Development and patent securing of key APIs and intermediates, with high-precision analytical quality control and global DMF registration management.'
        : '의약품 핵심 원료 및 중간체 개발 및 특허 확보, 신규 합성 및 신규 수입 원료 DMF등록 관리',
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
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 font-normal leading-relaxed break-keep pt-1">
                {currentItem.desc}
              </p>

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
