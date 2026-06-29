'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

export default function CoreTechnology() {
  // State to handle bidirectional highlights between left diagram and right grid sections
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  return (
    <section id="core-tech" className="pt-16 pb-6 md:pt-24 md:pb-8 bg-white">
      <div className="w-full px-6 md:px-16 lg:px-24">
        {/* Section Heading */}
        <ScrollReveal y={50} duration={1.2}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-pretendard font-extrabold text-gray-900 tracking-tight leading-snug md:whitespace-nowrap">
              다산제약은 <span className="text-brand-green font-extrabold">핵심 기술</span>을 통하여{' '}
              <span className="text-brand-green font-extrabold">글로벌 DDS</span> 기업으로 성장하고 있습니다.
            </h2>
          </div>
        </ScrollReveal>

        {/* Core Tech Outer Container with light grey rounded border */}
        <div className="bg-[#FAFBFB] border border-gray-150 rounded-3xl p-4 md:p-6 lg:p-8">
          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: Hexagon Diagram (6 cols) */}
            <ScrollReveal className="lg:col-span-6 flex justify-center items-center relative py-2 w-full" delay={0.15} y={80} duration={1.3}>
              <div className="relative w-full aspect-square max-w-[340px] md:max-w-[480px] lg:max-w-[640px] xl:max-w-[740px] 2xl:max-w-none flex items-center justify-center">
                {/* Central Hexagon - using clean image and CSS clip-path to avoid embedded lines/circles */}
                <motion.div 
                  className="absolute left-[23.33%] top-[26.83%] w-[53.33%] h-[46.33%] z-10 overflow-hidden"
                  style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
                  initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
                  whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                  <div className="w-full h-full relative">
                    <Image
                      src="/hexagon_pills.png"
                      alt="Dasan Core Technology"
                      fill
                      sizes="(max-w-768px) 180px, (max-w-1200px) 280px, 350px"
                      className="object-cover"
                      priority
                    />
                  </div>
                </motion.div>
 
                {/* Quadrant 01: Top-Left */}
                {/* Title Box (Above line at y=45) */}
                <motion.div 
                  onMouseEnter={() => setHoveredSection('01')}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`absolute top-0 left-[2%] w-[28%] h-[7.5%] flex flex-col justify-end pb-1 transition-all duration-300 select-none ${
                    hoveredSection === '01' ? 'scale-102 font-bold' : 'opacity-95'
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
                >
                  <div className="text-[10px] md:text-sm font-extrabold text-brand-green mb-0.5">
                    01
                  </div>
                  <h4 suppressHydrationWarning className="text-[8px] sm:text-[9px] md:text-[13px] lg:text-[15px] font-black leading-tight whitespace-nowrap text-brand-green">
                    1st Generic품목
                  </h4>
                </motion.div>
                {/* Content Box (Below line at y=45) */}
                <motion.div
                  onMouseEnter={() => setHoveredSection('01')}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`absolute top-[7.5%] left-[2%] w-[28%] pt-1 transition-all duration-300 select-none ${
                    hoveredSection === '01' ? 'scale-102' : 'opacity-90'
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }}
                >
                  <p className="text-[9px] sm:text-xs md:text-sm lg:text-base text-gray-500 leading-relaxed font-semibold">
                    · 핵심공정 ODM품목<br />· 전공정 ODM품목
                  </p>
                </motion.div>
 
                {/* Quadrant 02: Top-Right */}
                {/* Title Box (Above line at y=45) */}
                <motion.div 
                  onMouseEnter={() => setHoveredSection('02')}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`absolute top-0 right-[2%] w-[28%] h-[7.5%] flex flex-col justify-end pb-1 text-right transition-all duration-300 select-none ${
                    hoveredSection === '02' ? 'scale-102 font-bold' : 'opacity-95'
                  }`}
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
                >
                  <div className="text-[10px] md:text-sm font-extrabold text-brand-green mb-0.5">
                    02
                  </div>
                  <h4 className="text-[8px] sm:text-[9px] md:text-[13px] lg:text-[15px] font-black leading-tight whitespace-nowrap text-brand-green">
                    개량신약(염 변경)
                  </h4>
                </motion.div>
                {/* Content Box (Below line at y=45) */}
                <motion.div
                  onMouseEnter={() => setHoveredSection('02')}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`absolute top-[7.5%] right-[2%] w-[28%] pt-1 text-right transition-all duration-300 select-none ${
                    hoveredSection === '02' ? 'scale-102' : 'opacity-90'
                  }`}
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }}
                >
                  <p className="text-[9px] sm:text-xs md:text-sm lg:text-base text-gray-500 leading-relaxed font-semibold">
                    · 핵심공정 ODM품목<br />· 전공정 ODM품목
                  </p>
                </motion.div>
 
                {/* Quadrant 03: Bottom-Left */}
                {/* Title Box (Above line at y=510) */}
                <motion.div 
                  onMouseEnter={() => setHoveredSection('03')}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`absolute top-[70%] left-[2%] w-[28%] h-[15%] flex flex-col justify-end pb-1.5 transition-all duration-300 select-none ${
                    hoveredSection === '03' ? 'scale-102 font-bold' : 'opacity-95'
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 1.6 }}
                >
                  <div className="text-[10px] md:text-sm font-extrabold text-brand-green mb-0.5">
                    03
                  </div>
                  <h4 className="text-[8px] sm:text-[9px] md:text-[13px] lg:text-[15px] font-black leading-tight whitespace-nowrap text-brand-green">
                    개량신약(약물방출)
                  </h4>
                </motion.div>
                {/* Content Box (Below line at y=510) */}
                <motion.div
                  onMouseEnter={() => setHoveredSection('03')}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`absolute top-[85%] left-[2%] w-[28%] pt-2 transition-all duration-300 select-none ${
                    hoveredSection === '03' ? 'scale-102' : 'opacity-90'
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 1.7 }}
                >
                  <p className="text-[9px] sm:text-xs md:text-sm lg:text-base text-gray-500 leading-relaxed font-semibold mb-1">
                    · 약물방출 조절 개량신약<br />· 고함량 개량신약
                  </p>
                </motion.div>
 
                {/* Quadrant 04: Bottom-Right */}
                {/* Title Box (Above line at y=510) */}
                <motion.div 
                  onMouseEnter={() => setHoveredSection('04')}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`absolute top-[70%] right-[2%] w-[28%] h-[15%] flex flex-col justify-end pb-1.5 text-right transition-all duration-300 select-none ${
                    hoveredSection === '04' ? 'scale-102 font-bold' : 'opacity-95'
                  }`}
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 1.6 }}
                >
                  <div className="text-[10px] md:text-sm font-extrabold text-brand-green mb-0.5">
                    04
                  </div>
                  <h4 className="text-[8px] sm:text-[9px] md:text-[13px] lg:text-[15px] font-black leading-tight whitespace-nowrap text-brand-green">
                    개량신약(복합제 & 기타)
                  </h4>
                </motion.div>
                {/* Content Box (Below line at y=510) */}
                <motion.div
                  onMouseEnter={() => setHoveredSection('04')}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`absolute top-[85%] right-[2%] w-[28%] pt-2 text-right transition-all duration-300 select-none ${
                    hoveredSection === '04' ? 'scale-102' : 'opacity-90'
                  }`}
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 1.7 }}
                >
                  <p className="text-[9px] sm:text-xs md:text-sm lg:text-base text-gray-500 leading-relaxed font-semibold mb-1">
                    · 복합제제 개량신약<br />· 제형변경(기타)
                  </p>
                </motion.div>
                   
                {/* Connecting Lines Graphic - perfectly matching original PPT design coordinates */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 600 600">
                  {/* Hexagon Border Outline */}
                  <motion.polygon 
                    points="220,161 380,161 460,300 380,439 220,439 140,300" 
                    stroke="#008953" 
                    strokeWidth="3" 
                    fill="none" 
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: "easeInOut", delay: 0.4 }}
                  />
                  {/* ==================== 01 (Top-Left) ==================== */}
                  {/* Horizontal line under title */}
                  <motion.line 
                    x1="12" y1="45" x2="162" y2="45" 
                    stroke="#008953" 
                    strokeWidth={hoveredSection === '01' ? '2.5' : '1.5'} 
                    className="transition-all duration-300"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
                  />
                  {/* Diagonal line to hexagon */}
                  <motion.line 
                    x1="162" y1="45" x2="220" y2="161" 
                    stroke="#008953" 
                    strokeWidth={hoveredSection === '01' ? '2.5' : '1.5'} 
                    className="transition-all duration-300"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.5 }}
                  />
 
                  {/* ==================== 02 (Top-Right) ==================== */}
                  {/* Horizontal line under title */}
                  <motion.line 
                    x1="438" y1="45" x2="588" y2="45" 
                    stroke="#008953" 
                    strokeWidth={hoveredSection === '02' ? '2.5' : '1.5'} 
                    className="transition-all duration-300"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
                  />
                  {/* Diagonal line to hexagon */}
                  <motion.line 
                    x1="438" y1="45" x2="380" y2="161" 
                    stroke="#008953" 
                    strokeWidth={hoveredSection === '02' ? '2.5' : '1.5'} 
                    className="transition-all duration-300"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.5 }}
                  />
 
                  {/* ==================== 03 (Bottom-Left) ==================== */}
                  {/* Horizontal line under title */}
                  <motion.line 
                    x1="12" y1="510" x2="162" y2="510" 
                    stroke="#008953" 
                    strokeWidth={hoveredSection === '03' ? '2.5' : '1.5'} 
                    className="transition-all duration-300"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
                  />
                  {/* Diagonal line to hexagon */}
                  <motion.line 
                    x1="162" y1="510" x2="220" y2="439" 
                    stroke="#008953" 
                    strokeWidth={hoveredSection === '03' ? '2.5' : '1.5'} 
                    className="transition-all duration-300"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.7 }}
                  />
 
                  {/* ==================== 04 (Bottom-Right) ==================== */}
                  {/* Horizontal line under title */}
                  <motion.line 
                    x1="438" y1="510" x2="588" y2="510" 
                    stroke="#008953" 
                    strokeWidth={hoveredSection === '04' ? '2.5' : '1.5'} 
                    className="transition-all duration-300"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
                  />
                  {/* Diagonal line to hexagon */}
                  <motion.line 
                    x1="438" y1="510" x2="380" y2="439" 
                    stroke="#008953" 
                    strokeWidth={hoveredSection === '04' ? '2.5' : '1.5'} 
                    className="transition-all duration-300"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.7 }}
                  />
 
                  {/* Hollow circles at the text underlines */}
                  <motion.circle 
                    cx="162" cy="45" 
                    r={hoveredSection === '01' ? '5.5' : '3.5'} 
                    stroke="#008953" 
                    strokeWidth="2" 
                    fill="white" 
                    className="transition-all duration-300"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "backOut", delay: 1.8 }}
                  />
                  <motion.circle 
                    cx="438" cy="45" 
                    r={hoveredSection === '02' ? '5.5' : '3.5'} 
                    stroke="#008953" 
                    strokeWidth="2" 
                    fill="white" 
                    className="transition-all duration-300"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "backOut", delay: 1.8 }}
                  />
                  <motion.circle 
                    cx="162" cy="510" 
                    r={hoveredSection === '03' ? '5.5' : '3.5'} 
                    stroke="#008953" 
                    strokeWidth="2" 
                    fill="white" 
                    className="transition-all duration-300"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "backOut", delay: 2.0 }}
                  />
                  <motion.circle 
                    cx="438" cy="510" 
                    r={hoveredSection === '04' ? '5.5' : '3.5'} 
                    stroke="#008953" 
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
            </ScrollReveal>

            {/* Right Column: Displaying ALL categories simultaneously (6 cols) with scaled up spacing/fonts */}
            <div className="lg:col-span-6 flex flex-col space-y-6 md:space-y-8">
              
              {/* Row 1: 01 1st Generic 품목 */}
              <ScrollReveal delay={0.15} y={40}>
                <div 
                  onMouseEnter={() => setHoveredSection('01')}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`p-5 md:p-6 rounded-3xl border transition-all duration-300 ${
                    hoveredSection === '01' 
                      ? 'border-brand-green bg-brand-green-light/40' 
                      : 'border-transparent bg-white/50'
                  }`}
                >
                  <div className="flex items-center space-x-3.5 mb-4">
                    <div className="w-8 h-8 bg-brand-green text-white font-extrabold text-base rounded-full flex items-center justify-center">
                      01
                    </div>
                    <h3 suppressHydrationWarning className="text-base lg:text-lg xl:text-xl font-black text-gray-800">
                      1st Generic 품목
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-12 text-sm lg:text-base">
                    {/* 핵심공정 */}
                    <div className="space-y-2">
                      <h5 className="font-extrabold text-gray-800 flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                        <span>핵심공정 ODM품목</span>
                      </h5>
                      <p className="text-gray-500 font-bold leading-relaxed pl-3.5">
                        Glimepiride, Tacrolimus, Itraconazole, Roxatidine SR, Tolterodine SR, Ramipril, Donepezil ODT, Montelukast Sachet, Duloxetine EC, Telmisartan/Rosuvastatin, Tolvaptan
                      </p>
                    </div>
                    {/* 전공정 */}
                    <div className="space-y-2">
                      <h5 className="font-extrabold text-gray-800 flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                        <span>전공정 ODM품목</span>
                      </h5>
                      <p className="text-gray-500 font-bold leading-relaxed pl-3.5">
                        Adefovir, Telmisartan, Entecavir, Olmesartan/HCTZ, Telmisartan/HCTZ, Olmesartan/Amlodipine, Valsartan/Amlodipine, Amlodipine, Glimepiride/Metformin, Sitagliptin/Metformin, Sitagliptin, Telmisartan/Amlodipine, Tamsulosin 0.4mg, Atorvastatin/Ezetimibe, Donepezil, Rosuvastatin
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Row 2: 02 & 03 Side-by-Side Grid */}
              <ScrollReveal delay={0.25} y={40}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  
                  {/* Column 1: 02 개량신약(염 변경) */}
                  <div 
                    onMouseEnter={() => setHoveredSection('02')}
                    onMouseLeave={() => setHoveredSection(null)}
                    className={`p-5 md:p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                      hoveredSection === '02' 
                        ? 'border-brand-green bg-brand-green-light/40' 
                        : 'border-transparent bg-white/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-3.5 mb-4">
                        <div className="w-8 h-8 bg-brand-green text-white font-extrabold text-base rounded-full flex items-center justify-center">
                          02
                        </div>
                        <h3 className="text-base lg:text-lg xl:text-xl font-black text-gray-800">
                          개량신약(염 변경)
                        </h3>
                      </div>
                      <div className="pl-12 space-y-5 text-sm lg:text-base">
                        <div className="space-y-1.5">
                          <h5 className="font-extrabold text-gray-800 flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                            <span>개량신약(염변경)</span>
                          </h5>
                          <p className="text-gray-650 font-extrabold pl-3.5">
                            Amlodipine maleate*
                          </p>
                          <p className="text-xs text-gray-400 font-bold pl-3.5 leading-relaxed">
                            *공동개발 품목이며 다산에서 핵심기술 진행 (약물의 안정성 확보)
                          </p>
                        </div>
                        <div className="space-y-1.5">
                          <h5 className="font-extrabold text-gray-800 flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                            <span>전공정 ODM품목</span>
                          </h5>
                          <p className="text-gray-500 font-bold pl-3.5">
                            Dabigatran etexilate
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: 03 개량신약(약물방출) */}
                  <div 
                    onMouseEnter={() => setHoveredSection('03')}
                    onMouseLeave={() => setHoveredSection(null)}
                    className={`p-5 md:p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                      hoveredSection === '03' 
                        ? 'border-brand-green bg-brand-green-light/40' 
                        : 'border-transparent bg-white/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-3.5 mb-4">
                        <div className="w-8 h-8 bg-brand-green text-white font-extrabold text-base rounded-full flex items-center justify-center">
                          03
                        </div>
                        <h3 className="text-base lg:text-lg xl:text-xl font-black text-gray-800">
                          개량신약(약물방출)
                        </h3>
                      </div>
                      <div className="pl-12 space-y-5 text-sm lg:text-base">
                        <div className="space-y-1.5">
                          <h5 className="font-extrabold text-gray-800 flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                            <span>약물방출 조절 개량신약</span>
                          </h5>
                          <p className="text-gray-650 font-extrabold pl-3.5 leading-snug">
                            Carvedilol SR*<br />
                            Aspirin/Clopidogrel*
                          </p>
                          <p className="text-xs text-gray-400 font-bold pl-3.5 leading-relaxed">
                            *공동개발 품목이며 다산에서 핵심 약물방출 조절 진행
                          </p>
                        </div>
                        <div className="space-y-1.5">
                          <h5 className="font-extrabold text-gray-800 flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                            <span>고함량 개량신약</span>
                          </h5>
                          <p className="text-gray-500 font-bold pl-3.5">
                            imatinib mesylate 고함량제제
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </ScrollReveal>

              {/* Row 3: 04 개량신약(복합제)&기타 */}
              <ScrollReveal delay={0.35} y={40}>
                <div 
                  onMouseEnter={() => setHoveredSection('04')}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`p-5 md:p-6 rounded-3xl border transition-all duration-300 ${
                    hoveredSection === '04' 
                      ? 'border-brand-green bg-brand-green-light/40' 
                      : 'border-transparent bg-white/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-8 h-8 bg-brand-green text-white font-extrabold text-base rounded-full flex items-center justify-center">
                        04
                      </div>
                      <h3 className="text-base lg:text-lg xl:text-xl font-black text-gray-800">
                        개량신약(복합제)&기타
                      </h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-12 text-sm lg:text-base mt-4">
                    {/* 복합제제 */}
                    <div className="space-y-1.5">
                      <h5 className="font-extrabold text-gray-800 flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                        <span>복합제제 개량신약</span>
                      </h5>
                      <p className="text-gray-650 font-bold pl-3.5">
                        Telmisartan/S-amlodipine*
                      </p>
                      <p className="text-xs text-gray-400 font-bold pl-3.5 leading-relaxed">
                        *공동개발 품목이며 다산에서 핵심 약물방출 조절 진행
                      </p>
                    </div>
                    {/* 제형 변경 */}
                    <div className="space-y-1.5">
                      <h5 className="font-extrabold text-gray-800 flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                        <span>제형 변경(기타)</span>
                      </h5>
                      <p className="text-gray-500 font-bold leading-relaxed pl-3.5">
                        Choline alfoscerate 정제<br />
                        Esomeprazole Mg ODT
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>



            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
