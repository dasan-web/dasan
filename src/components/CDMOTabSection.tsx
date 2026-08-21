'use client';

import React, { useState } from 'react';
import { FlaskConical, Factory, ShieldCheck, Layers } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TabItem {
  id: string;
  num: string;
  badge: string;
  cardTitle: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  sectionTitle: string;
  groups: {
    subtitle: string;
    items: string[];
    note?: string;
  }[];
}

const tabData: TabItem[] = [
  {
    id: 'technology',
    num: '01',
    badge: 'TECHNOLOGY',
    cardTitle: 'Multi-Stra® 기반 제형 및 MUPS 기술',
    icon: FlaskConical,
    sectionTitle: '1st Generic 품목',
    groups: [
      {
        subtitle: '핵심공정 ODM품목',
        items: [
          'Glimepiride, Tacrolimus, Itraconazole, Roxatidine SR, Tolterodine SR, Ramipril, Donepezil ODT, Montelukast Sachet, Duloxetine EC, Telmisartan/Rosuvastatin, Tolvaptan'
        ]
      },
      {
        subtitle: '전공정 ODM품목',
        items: [
          'Adefovir, Telmisartan, Entecavir, Olmesartan/HCTZ, Telmisartan/HCTZ, Olmesartan/Amlodipine, Valsartan/Amlodipine, Amlodipine, Glimepiride/Metformin, Sitagliptin/Metformin, Sitagliptin, Telmisartan/Amlodipine, Tamsulosin 0.4mg, Atorvastatin/Ezetimibe, Donepezil, Rosuvastatin'
        ]
      }
    ]
  },
  {
    id: 'manufacturing',
    num: '02',
    badge: 'MANUFACTURING',
    cardTitle: 'GMP 기반 생산 인프라',
    icon: Factory,
    sectionTitle: '개량신약(염 변경)',
    groups: [
      {
        subtitle: '개량신약(염변경)',
        items: ['Amlodipine maleate*'],
        note: '*공동개발 품목이며 다산에서 핵심기술 진행 (약물의 안정성 확보)'
      },
      {
        subtitle: '전공정 ODM품목',
        items: ['Dabigatran etexilate']
      }
    ]
  },
  {
    id: 'quality',
    num: '03',
    badge: 'QUALITY CONTROL',
    cardTitle: '체계적인 품질관리',
    icon: ShieldCheck,
    sectionTitle: '개량신약(약물방출)',
    groups: [
      {
        subtitle: '약물방출 조절 개량신약',
        items: ['Carvedilol SR*', 'Aspirin/Clopidogrel*'],
        note: '*공동개발 품목이며 다산에서 핵심 약물방출 조절 진행'
      },
      {
        subtitle: '고함량 개량신약',
        items: ['imatinib mesylate 고함량제제']
      }
    ]
  },
  {
    id: 'one-stop',
    num: '04',
    badge: 'ONE-STOP',
    cardTitle: '개발부터 생산까지 연계',
    icon: Layers,
    sectionTitle: '개량신약(복합제)&기타',
    groups: [
      {
        subtitle: '복합제제 개량신약',
        items: ['Telmisartan/S-amlodipine*'],
        note: '*공동개발 품목이며 다산에서 핵심 약물방출 조절 진행'
      },
      {
        subtitle: '제형 변경(기타)',
        items: ['Choline alfoscerate 정제', 'Esomeprazole Mg ODT']
      }
    ]
  }
];

export default function CDMOTabSection() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);

  const currentTab = tabData[activeTab];

  return (
    <div className="w-full pt-2 pb-0 mt-16 sm:mt-20 md:mt-24 mb-0">
      <div className="max-w-5xl mx-auto px-4 md:px-0">
        {/* What We Develop Section Header */}
        <div className="mb-8 text-left">
          <h3 className="text-[28px] md:text-[34px] font-black text-gray-900 tracking-tight mb-2">
            What We Develop
          </h3>
          <p className="text-[15px] md:text-[16px] text-gray-600 font-medium break-keep">
            다양한 의약품 개발 및 생산 경험을 바탕으로 고객의 제품 특성에 맞는 CDMO 솔루션을 제공합니다.
          </p>
        </div>

        {/* Combined Section: Hexagon Diagram on Left & Detail Panel on Right */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs border border-gray-200/80 mb-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* Left Column: Hexagon Diagram (6 cols) */}
            <div className="lg:col-span-6 flex justify-center items-center relative py-2 w-full">
              <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[540px] flex items-center justify-center my-2">
                {/* Central Hexagon */}
                <motion.div 
                  className="absolute left-[18%] top-[22.17%] w-[64%] h-[55.67%] z-10 overflow-hidden"
                  style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
                  initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
                  whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                  <div className="w-full h-full relative">
                    <Image
                      src="/clear_white_pills_mixed_shapes_sharp.png"
                      alt="Dasan Core Technology"
                      fill
                      sizes="(max-width: 768px) 240px, 400px"
                      className="object-cover"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Quadrant 01: Top-Left */}
                {/* Title Box (Above line at y=45) */}
                <motion.div
                  onClick={() => setActiveTab(0)}
                  onMouseEnter={() => setHoveredTab(0)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`absolute top-0 left-[2%] w-[24%] h-[7.5%] flex flex-col justify-end pb-1 transition-all duration-300 select-none cursor-pointer z-30 ${
                    activeTab === 0 || hoveredTab === 0 ? 'scale-105 font-bold' : 'opacity-85'
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs md:text-sm font-extrabold text-[#64ad55]">01</span>
                    <span className={`inline-flex items-center gap-0.5 text-[7px] sm:text-[8px] md:text-[9px] font-black px-1.5 py-0.5 rounded-full transition-all duration-300 ${
                      activeTab === 0 ? 'bg-[#64ad55] text-white shadow-xs' : 'bg-[#64ad55]/15 text-[#64ad55] hover:bg-[#64ad55] hover:text-white'
                    }`}>
                      VIEW MORE +
                    </span>
                  </div>
                  <h4 className="font-black text-[9.5px] sm:text-[11px] md:text-[12.5px] lg:text-[13.5px] leading-tight text-[#64ad55] whitespace-nowrap mt-0.5">
                    1st Generic품목
                  </h4>
                </motion.div>
                {/* Content Box (Below line at y=45) */}
                <motion.div
                  onClick={() => setActiveTab(0)}
                  onMouseEnter={() => setHoveredTab(0)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`absolute top-[7.5%] left-[2%] w-[24%] pt-1.5 transition-all duration-300 select-none cursor-pointer z-30 ${
                    activeTab === 0 || hoveredTab === 0 ? 'scale-105' : 'opacity-85'
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }}
                >
                  <p className="text-[8.5px] sm:text-[9.5px] md:text-[10.5px] text-gray-500 leading-relaxed font-semibold">
                    · 핵심공정 ODM품목<br />
                    · 전공정 ODM품목
                  </p>
                </motion.div>

                {/* Quadrant 02: Top-Right */}
                {/* Title Box (Above line at y=45) */}
                <motion.div
                  onClick={() => setActiveTab(1)}
                  onMouseEnter={() => setHoveredTab(1)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`absolute top-0 right-[2%] w-[24%] h-[7.5%] flex flex-col justify-end pb-1 text-right transition-all duration-300 select-none cursor-pointer z-30 ${
                    activeTab === 1 || hoveredTab === 1 ? 'scale-105 font-bold' : 'opacity-85'
                  }`}
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
                >
                  <div className="flex items-center justify-between flex-row-reverse">
                    <span className="text-[10px] sm:text-xs md:text-sm font-extrabold text-[#64ad55]">02</span>
                    <span className={`inline-flex items-center gap-0.5 text-[7px] sm:text-[8px] md:text-[9px] font-black px-1.5 py-0.5 rounded-full transition-all duration-300 ${
                      activeTab === 1 ? 'bg-[#64ad55] text-white shadow-xs' : 'bg-[#64ad55]/15 text-[#64ad55] hover:bg-[#64ad55] hover:text-white'
                    }`}>
                      VIEW MORE +
                    </span>
                  </div>
                  <h4 className="font-black text-[9.5px] sm:text-[11px] md:text-[12.5px] lg:text-[13.5px] leading-tight text-[#64ad55] whitespace-nowrap mt-0.5">
                    개량신약(염 변경)
                  </h4>
                </motion.div>
                {/* Content Box (Below line at y=45) */}
                <motion.div
                  onClick={() => setActiveTab(1)}
                  onMouseEnter={() => setHoveredTab(1)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`absolute top-[7.5%] right-[2%] w-[24%] pt-1.5 text-right transition-all duration-300 select-none cursor-pointer z-30 ${
                    activeTab === 1 || hoveredTab === 1 ? 'scale-105' : 'opacity-85'
                  }`}
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }}
                >
                  <p className="text-[8.5px] sm:text-[9.5px] md:text-[10.5px] text-gray-500 leading-relaxed font-semibold">
                    · 핵심공정 ODM품목<br />
                    · 전공정 ODM품목
                  </p>
                </motion.div>

                {/* Quadrant 03: Bottom-Left */}
                {/* Title Box (Above line at y=555) */}
                <motion.div
                  onClick={() => setActiveTab(2)}
                  onMouseEnter={() => setHoveredTab(2)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`absolute top-[77.5%] left-[2%] w-[24%] h-[15%] flex flex-col justify-end pb-1.5 transition-all duration-300 select-none cursor-pointer z-30 ${
                    activeTab === 2 || hoveredTab === 2 ? 'scale-105 font-bold' : 'opacity-85'
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 1.6 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs md:text-sm font-extrabold text-[#64ad55]">03</span>
                    <span className={`inline-flex items-center gap-0.5 text-[7px] sm:text-[8px] md:text-[9px] font-black px-1.5 py-0.5 rounded-full transition-all duration-300 ${
                      activeTab === 2 ? 'bg-[#64ad55] text-white shadow-xs' : 'bg-[#64ad55]/15 text-[#64ad55] hover:bg-[#64ad55] hover:text-white'
                    }`}>
                      VIEW MORE +
                    </span>
                  </div>
                  <h4 className="font-black text-[9.5px] sm:text-[11px] md:text-[12.5px] lg:text-[13.5px] leading-tight text-[#64ad55] whitespace-nowrap mt-0.5">
                    개량신약(약물방출)
                  </h4>
                </motion.div>
                {/* Content Box (Below line at y=555) */}
                <motion.div
                  onClick={() => setActiveTab(2)}
                  onMouseEnter={() => setHoveredTab(2)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`absolute top-[92.5%] left-[2%] w-[24%] pt-1.5 transition-all duration-300 select-none cursor-pointer z-30 ${
                    activeTab === 2 || hoveredTab === 2 ? 'scale-105' : 'opacity-85'
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 1.7 }}
                >
                  <p className="text-[8.5px] sm:text-[9.5px] md:text-[10.5px] text-gray-500 leading-relaxed font-semibold">
                    · 약물방출 조절 개량신약<br />
                    · 고함량 개량신약
                  </p>
                </motion.div>

                {/* Quadrant 04: Bottom-Right */}
                {/* Title Box (Above line at y=555) */}
                <motion.div
                  onClick={() => setActiveTab(3)}
                  onMouseEnter={() => setHoveredTab(3)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`absolute top-[77.5%] right-[2%] w-[24%] h-[15%] flex flex-col justify-end pb-1.5 text-right transition-all duration-300 select-none cursor-pointer z-30 ${
                    activeTab === 3 || hoveredTab === 3 ? 'scale-105 font-bold' : 'opacity-85'
                  }`}
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 1.6 }}
                >
                  <div className="flex items-center justify-between flex-row-reverse">
                    <span className="text-[10px] sm:text-xs md:text-sm font-extrabold text-[#64ad55]">04</span>
                    <span className={`inline-flex items-center gap-0.5 text-[7px] sm:text-[8px] md:text-[9px] font-black px-1.5 py-0.5 rounded-full transition-all duration-300 ${
                      activeTab === 3 ? 'bg-[#64ad55] text-white shadow-xs' : 'bg-[#64ad55]/15 text-[#64ad55] hover:bg-[#64ad55] hover:text-white'
                    }`}>
                      VIEW MORE +
                    </span>
                  </div>
                  <h4 className="font-black text-[8.5px] sm:text-[9.5px] md:text-[11px] lg:text-[12px] leading-tight text-[#64ad55] whitespace-nowrap mt-0.5">
                    개량신약(복합제 & 기타)
                  </h4>
                </motion.div>
                {/* Content Box (Below line at y=555) */}
                <motion.div
                  onClick={() => setActiveTab(3)}
                  onMouseEnter={() => setHoveredTab(3)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`absolute top-[92.5%] right-[2%] w-[24%] pt-1.5 text-right transition-all duration-300 select-none cursor-pointer z-30 ${
                    activeTab === 3 || hoveredTab === 3 ? 'scale-105' : 'opacity-85'
                  }`}
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 1.7 }}
                >
                  <p className="text-[8.5px] sm:text-[9.5px] md:text-[10.5px] text-gray-500 leading-relaxed font-semibold">
                    · 복합제제 개량신약<br />
                    · 제형변경(기타)
                  </p>
                </motion.div>

                {/* SVG Connecting Lines with Framer Motion Animation */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 600 600">
                  {/* Hexagon Border Outline */}
                  <motion.polygon 
                    points="204,133 396,133 492,300 396,467 204,467 108,300" 
                    stroke="#64ad55" 
                    strokeWidth="3" 
                    fill="none" 
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: "easeInOut", delay: 0.4 }}
                  />

                  {/* 01 Top-Left Lines */}
                  <motion.line 
                    x1="12" y1="45" x2="162" y2="45" 
                    stroke="#64ad55" 
                    strokeWidth={activeTab === 0 || hoveredTab === 0 ? '3' : '1.5'} 
                    className="transition-all duration-300"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
                  />
                  <motion.line 
                    x1="162" y1="45" x2="204" y2="133" 
                    stroke="#64ad55" 
                    strokeWidth={activeTab === 0 || hoveredTab === 0 ? '3' : '1.5'} 
                    className="transition-all duration-300"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.5 }}
                  />
                  <motion.circle 
                    cx="162" cy="45" 
                    r={activeTab === 0 || hoveredTab === 0 ? '5.5' : '3.5'} 
                    stroke="#64ad55" 
                    strokeWidth="2" 
                    fill="white" 
                    className="transition-all duration-300"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "backOut", delay: 1.8 }}
                  />

                  {/* 02 Top-Right Lines */}
                  <motion.line 
                    x1="438" y1="45" x2="588" y2="45" 
                    stroke="#64ad55" 
                    strokeWidth={activeTab === 1 || hoveredTab === 1 ? '3' : '1.5'} 
                    className="transition-all duration-300"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
                  />
                  <motion.line 
                    x1="438" y1="45" x2="396" y2="133" 
                    stroke="#64ad55" 
                    strokeWidth={activeTab === 1 || hoveredTab === 1 ? '3' : '1.5'} 
                    className="transition-all duration-300"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.5 }}
                  />
                  <motion.circle 
                    cx="438" cy="45" 
                    r={activeTab === 1 || hoveredTab === 1 ? '5.5' : '3.5'} 
                    stroke="#64ad55" 
                    strokeWidth="2" 
                    fill="white" 
                    className="transition-all duration-300"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "backOut", delay: 1.8 }}
                  />

                  {/* 03 Bottom-Left Lines */}
                  <motion.line 
                    x1="12" y1="555" x2="162" y2="555" 
                    stroke="#64ad55" 
                    strokeWidth={activeTab === 2 || hoveredTab === 2 ? '3' : '1.5'} 
                    className="transition-all duration-300"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
                  />
                  <motion.line 
                    x1="162" y1="555" x2="204" y2="467" 
                    stroke="#64ad55" 
                    strokeWidth={activeTab === 2 || hoveredTab === 2 ? '3' : '1.5'} 
                    className="transition-all duration-300"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.7 }}
                  />
                  <motion.circle 
                    cx="162" cy="555" 
                    r={activeTab === 2 || hoveredTab === 2 ? '5.5' : '3.5'} 
                    stroke="#64ad55" 
                    strokeWidth="2" 
                    fill="white" 
                    className="transition-all duration-300"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "backOut", delay: 2.0 }}
                  />

                  {/* 04 Bottom-Right Lines */}
                  <motion.line 
                    x1="438" y1="555" x2="588" y2="555" 
                    stroke="#64ad55" 
                    strokeWidth={activeTab === 3 || hoveredTab === 3 ? '3' : '1.5'} 
                    className="transition-all duration-300"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
                  />
                  <motion.line 
                    x1="438" y1="555" x2="396" y2="467" 
                    stroke="#64ad55" 
                    strokeWidth={activeTab === 3 || hoveredTab === 3 ? '3' : '1.5'} 
                    className="transition-all duration-300"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.7 }}
                  />
                  <motion.circle 
                    cx="438" cy="555" 
                    r={activeTab === 3 || hoveredTab === 3 ? '5.5' : '3.5'} 
                    stroke="#64ad55" 
                    strokeWidth="2" 
                    fill="white" 
                    className="transition-all duration-300"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "backOut", delay: 2.0 }}
                  />
                </svg>
              </div>
            </div>

            {/* Right Column: Active Category Details Panel (6 cols) */}
            <div className="lg:col-span-6 flex flex-col h-full justify-center">
              <div key={currentTab.id} className="bg-[#FAFBFB] rounded-2xl p-6 sm:p-8 lg:p-9 border border-gray-200/80 animate-fade-in-up h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3.5 mb-7 pb-5 border-b border-gray-200/80">
                    <span className="w-9 h-9 rounded-full bg-[#64ad55] text-white font-black text-[14px] flex items-center justify-center flex-shrink-0 shadow-xs">
                      {currentTab.num}
                    </span>
                    <h4 className="text-[20px] md:text-[22px] font-black text-gray-900 tracking-tight">
                      {currentTab.sectionTitle}
                    </h4>
                  </div>

                  <div className="space-y-7">
                    {currentTab.groups.map((grp, i) => (
                      <div key={i}>
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="w-2 h-2 rounded-full bg-[#64ad55]"></span>
                          <span className="text-[15.5px] font-bold text-gray-900">{grp.subtitle}</span>
                        </div>
                        <div className="pl-4">
                          {grp.items.map((item, itemIdx) => (
                            <p key={itemIdx} className="text-[14px] text-gray-700 font-medium leading-[1.85] break-keep">
                              {item}
                            </p>
                          ))}
                          {grp.note && (
                            <p className="text-[12.5px] text-gray-500 font-medium mt-1.5">
                              {grp.note}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* WHY DASAN Section Header */}
        <div className="mt-16 sm:mt-20 md:mt-24 mb-8 text-left">
          <h3 className="text-[28px] md:text-[34px] font-black text-gray-900 tracking-tight mb-2">
            WHY DASAN
          </h3>
          <p className="text-[15px] md:text-[16px] text-gray-600 font-medium break-keep">
            개발부터 생산까지, 의약품의 가치를 완성하는 파트너
          </p>
        </div>

        {/* 4 Informational Cards with Hover Effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-4.5 xl:gap-5">
          {tabData.map((tab) => {
            const Icon = tab.icon;
            return (
              <div
                key={tab.id}
                className="text-left rounded-2xl px-4.5 py-6 sm:px-5 sm:py-6 xl:px-6 xl:py-7 flex flex-col justify-between bg-white border border-gray-200/70 hover:border-[#64ad55] shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group select-none cursor-default"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="inline-block font-black text-[11.5px] px-3 py-1 rounded-full tracking-wider uppercase bg-[#64ad55]/10 text-[#64ad55] transition-colors group-hover:bg-[#64ad55] group-hover:text-white">
                      {tab.badge}
                    </span>
                    <Icon
                      size={20}
                      strokeWidth={1.75}
                      className="text-[#64ad55] transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h4 className="text-[13px] sm:text-[13.5px] lg:text-[12.5px] xl:text-[13.8px] font-bold tracking-tight leading-snug whitespace-nowrap text-gray-900 transition-colors group-hover:text-[#64ad55]">
                    {tab.cardTitle}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
