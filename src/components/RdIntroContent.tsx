'use client';

import React, { useState } from 'react';
import { FlaskConical, Layers, Microscope, Cpu, ArrowRight, CheckCircle2, Sparkles, Binary } from 'lucide-react';

interface RdIntroContentProps {
  dbContent?: string | null;
}

export default function RdIntroContent({ dbContent }: RdIntroContentProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'synthesis' | 'formulation'>('all');

  return (
    <div className="space-y-16 animate-fade-in-up text-slate-800">
      
      {/* 1. Main Central Research Institute Hero Section (Frameless) */}
      <section className="relative overflow-hidden py-2 space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-extrabold tracking-wider uppercase">
          <Sparkles size={14} className="text-emerald-500" />
          <span>Central Research Institute</span>
        </div>

        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
          중앙연구소 <span className="text-emerald-600 font-bold">- 혁신 신약의 메카</span>
        </h3>

        <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          <p>
            다산제약의 중앙연구소는 <strong className="font-bold text-slate-900 bg-emerald-50 px-1 py-0.5 rounded">50여명의 석·박사급 연구인력</strong>을 중심으로 합성연구소와 제제연구소의 유기적인 협력체계를 구축하고 있습니다. 유기합성 기술을 기반으로 한 원료의약품(API) 개발부터 자사의 <strong className="font-bold text-slate-900 bg-emerald-50 px-1 py-0.5 rounded">Multistra® 기술</strong>을 활용한 특화된 약물전달시스템(DDS) 적용 완제품 개발까지의 의약품 개발 전 과정을 아우르는 종합의약품 연구개발 역량을 확보하고 있습니다.
          </p>
          <p>
            또한 연구소 내에 30L 규모 Pilot-scale의 다목적 합성 반응 시스템과 유동층 과립제조 및 코팅이 가능한 Multilab® GPCG 시스템과 다층정 타정기 등의 제조설비와 LC-MS/MS, Differential Scanning Calorimetry, Laser Diffraction Particle Size Analyzer, Automated Flow-Through Cell Dissolution System 등의 첨단 분석 시스템을 활용하여 고도화된 의약품 연구를 수행하고 있습니다.
          </p>
        </div>

        {/* Quick Highlight Feature Grid (Clean Frameless Line Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-slate-100">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">Research Power</span>
            <h5 className="font-extrabold text-slate-900 text-base">50여 명 석·박사 연구진</h5>
            <p className="text-xs text-slate-500">합성연구소 & 제제연구소 유기적 협력</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">DDS Platform</span>
            <h5 className="font-extrabold text-slate-900 text-base">Multistra® 특화 기술</h5>
            <p className="text-xs text-slate-500">원료API부터 DDS 완제품 전 과정</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">Pilot Facility</span>
            <h5 className="font-extrabold text-slate-900 text-base">30L Pilot & Multilab®</h5>
            <p className="text-xs text-slate-500">다목적 합성반응 & GPCG 코팅설비</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">Advanced Analytics</span>
            <h5 className="font-extrabold text-slate-900 text-base">LC-MS/MS & DSC 분석</h5>
            <p className="text-xs text-slate-500">첨단 입도·용출 자동화 분석 시스템</p>
          </div>
        </div>
      </section>

      {/* 2. Light Minimalist Luxury Filter Selector */}
      <div className="flex items-center justify-center my-8">
        <div className="inline-flex p-1.5 rounded-full bg-slate-100/80 border border-slate-200/70 shadow-sm flex items-center space-x-1">
          
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-extrabold tracking-tight transition-all duration-300 flex items-center space-x-2 ${
              activeTab === 'all'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Sparkles size={15} className={activeTab === 'all' ? 'text-white' : 'text-slate-500'} />
            <span>전체 연구 분야</span>
          </button>

          <button
            onClick={() => setActiveTab('synthesis')}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-extrabold tracking-tight transition-all duration-300 flex items-center space-x-2 ${
              activeTab === 'synthesis'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <FlaskConical size={15} className={activeTab === 'synthesis' ? 'text-white' : 'text-slate-500'} />
            <span>합성 연구 파트</span>
          </button>

          <button
            onClick={() => setActiveTab('formulation')}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-extrabold tracking-tight transition-all duration-300 flex items-center space-x-2 ${
              activeTab === 'formulation'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Layers size={15} className={activeTab === 'formulation' ? 'text-white' : 'text-slate-500'} />
            <span>제제 연구 파트</span>
          </button>

        </div>
      </div>

      {/* 3. Section 1: 합성 연구 파트 (Synthesis Research) */}
      {(activeTab === 'all' || activeTab === 'synthesis') && (
        <section className="space-y-8 animate-fade-in">
          <div className="flex items-center space-x-4 border-b border-slate-200 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
              <FlaskConical size={20} />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600">Synthesis Research Division</span>
              <h4 className="text-2xl font-black text-slate-900 tracking-tight">합성 연구 파트</h4>
            </div>
          </div>

          <div className="text-slate-700 leading-relaxed font-normal space-y-2">
            <p>
              합성연구소는 유기합성 기술을 기반으로 원료의약품 및 의약품 개발에 필요한 핵심 합성기술과 공정기술을 연구합니다.
            </p>
            <p>
              신약의 후보물질, 지식재산권 확보와 특허 전략을 고려한 차별화된 원료의약품(염변경, 결정형변경, Pro-drug…)을 설계하고 고도화된 공정기술을 적용한 불순물 발생 억제 제품 등을 개발하고 상용화하는 최적의 합성공정 개발 체계를 구축하고 있습니다.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            
            {/* Item 1 */}
            <div className="py-6 first:pt-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600">01. Process Design</span>
              </div>
              <h5 className="text-lg font-extrabold text-slate-900 leading-snug">
                신약 후보물질에서 상업생산까지, 최적의 합성공정을 설계합니다.
              </h5>
              <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-2 font-normal">
                <p>합성연구소는 유기합성 기술을 기반으로 신약 및 차별화 의약품 후보물질의 합성공정 설계와 원료의약품 개발을 수행하고 있습니다.</p>
                <p>신규 후보물질의 합성경로 설계부터 공정 최적화, Scale-up 및 기술이전에 이르기까지 의약품 개발 단계별 요구사항을 반영하여 효율적이고 재현성 높은 제조공정의 확립과 고순도 원료의약품 개발을 목표로 연구를 수행하고 있습니다.</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="py-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600">02. Differentiated API</span>
              </div>
              <h5 className="text-lg font-extrabold text-slate-900 leading-snug">
                차별화된 원료의약품 개발
              </h5>
              <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-2 font-normal">
                <p>의약품의 특성과 개발 목적에 따라 신규염(Salt), 결정형(Polymorph) 및 다양한 물성 변화에 대한 연구를 수행하고 있으며, 지식재산권 및 특허 전략을 고려한 차별화된 원료의약품 개발을 추진하고 있습니다.</p>
                <p>또한 합성공정에서 발생할 수 있는 유해 불순물 및 공정 관련 불순물의 발생 가능성을 사전에 검토하고, 필요에 따라 Pro-drug 설계 및 합성기술을 적용하여 불순물 발생을 억제하고 안정적인 제조공정을 확보하기 위한 연구를 수행하고 있습니다.</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="py-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600">03. Scale-Up System</span>
              </div>
              <h5 className="text-lg font-extrabold text-slate-900 leading-snug">
                Lab.에서 Commercial Scale까지
              </h5>
              <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-2 font-normal">
                <p>연구실 규모에서 확보한 합성기술을 실제 제조공정으로 연결하기 위해 Lab. → Pilot → Commercial Scale로 이어지는 단계적 Scale-up 및 기술이전 체계를 구축하고 있습니다.</p>
                <p>50 L Pilot-scale 다목적 합성 반응 시스템을 활용하여 합성공정의 Scale-up 가능성을 검토하고, 반응조건, 원료 투입순서, 반응시간, 정제 및 결정화 조건 등 주요 공정변수를 최적화하여 생산성·재현성·경제성을 갖춘 제조공정을 확립합니다.</p>
                <p>이를 통해 연구실에서 개발된 합성법이 실제 상업생산 환경에서도 안정적으로 구현될 수 있도록 공정개발과 기술이전을 수행하고 있습니다.</p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="py-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600">04. High Purity API</span>
              </div>
              <h5 className="text-lg font-extrabold text-slate-900 leading-snug">
                고순도 원료의약품을 위한 공정개발
              </h5>
              <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-2 font-normal">
                <p>원료의약품의 품질은 최종 제품의 안전성과 유효성을 결정하는 중요한 요소입니다.</p>
                <p>합성연구소는 합성단계별 불순물 생성 가능성을 체계적으로 검토하고, 반응 및 정제조건의 최적화를 통해 불순물 발생을 최소화하고 고순도의 원료의약품을 확보할 수 있는 합성공정을 개발하고 있습니다.</p>
                <p>이를 통해 단순한 합성법 개발을 넘어 품질, 생산성, 공정 안정성 및 상업적 제조 가능성을 종합적으로 고려한 원료의약품 개발을 수행하고 있습니다.</p>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 4. Section 2: 제제 연구 파트 (Formulation Research) */}
      {(activeTab === 'all' || activeTab === 'formulation') && (
        <section className="space-y-8 animate-fade-in">
          <div className="flex items-center space-x-4 border-b border-slate-200 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <Layers size={20} />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600">Formulation Research Division</span>
              <h4 className="text-2xl font-black text-slate-900 tracking-tight">제제 연구 파트</h4>
            </div>
          </div>

          <div className="text-slate-700 leading-relaxed font-normal space-y-2">
            <p>
              제제연구소는 의약품의 물리·화학적 특성과 약물의 방출 및 흡수 특성을 기반으로 다산제약만의 차별화된 제형 설계와 여러가지 방식의 약물전달시스템(DDS) 개발을 수행하고 있습니다.
            </p>
            <p>
              당사의 보유 기술을 융합한 <strong className="font-bold text-slate-900">Multistra®</strong>는 다양한 약물의 특성과 목표하는 약효 및 방출조절 특성에 적합한 제제기술의 집약체로서 새로운 제형의 제품이나 신규 복합제, 용량 개선 개량신약, 특수 방출제어 제제 등의 다양한 고부가가치 의약품 개발에 활용되고 있으며 이를 통해 다산제약만의 제품 차별화와 경쟁력 향상에 기여하고 있습니다.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            
            {/* Item 1 */}
            <div className="py-6 first:pt-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600">01. Multistra® DDS</span>
              </div>
              <h5 className="text-lg font-extrabold text-slate-900 leading-snug">
                Multistra® 기반 DDS 기술
              </h5>
              <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-2 font-normal">
                <p>당사는 독자적인 Multistra® 기술 플랫폼을 기반으로 약물의 물리·화학적 특성 및 목표하는 약물 방출 특성에 따라 다양한 제제 설계가 가능하도록 연구개발 역량을 구축하고 있습니다.</p>
                <p>약물의 용출 및 방출 특성을 정밀하게 제어하고, 유효성분의 용량과 특성에 적합한 제형 및 제조공정을 설계함으로써 차별화된 약물전달시스템(DDS) 개발을 추진하고 있습니다.</p>
                <p>이를 통해 기존 의약품의 제형을 개선하거나 새로운 방출 특성을 구현하는 등 다양한 형태의 개량신약 및 차별화 의약품 개발에 적용하고 있습니다.</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="py-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600">02. Combination Formulation</span>
              </div>
              <h5 className="text-lg font-extrabold text-slate-900 leading-snug">
                다양한 제형 및 복합제 개발
              </h5>
              <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-2 font-normal">
                <p>의약품 개발 과정에서 요구되는 다양한 제형에 대한 연구를 수행하고 있습니다.</p>
                <p>특히 서로 다른 물리·화학적 특성을 갖는 복수의 유효성분을 하나의 제형에 구현하기 위한 다층정 복합제 설계 및 제조공정 개발을 수행하며, 각 유효성분의 안정성과 용출 특성을 고려한 최적의 제제설계를 구현하고 있습니다.</p>
                <p>이에 방출제어, 서방화 및 다양한 DDS 기술을 접목시켜 복용 편의성과 제품 차별성을 향상시킬 수 있는 제형 개발을 지속하고 있습니다.</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="py-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600">03. Formulation Commercialization</span>
              </div>
              <h5 className="text-lg font-extrabold text-slate-900 leading-snug">
                제제설계에서 상업생산까지
              </h5>
              <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-2 font-normal">
                <p>연구실 수준의 제제설계에 그치지 않고, 실제 제조환경을 고려한 공정개발 및 Scale-up 연구를 수행하고 있습니다.</p>
                <p>독일 Glatt사의 Multilab® GPCG를 활용하여 유동층 펠렛 제조 및 코팅 공정, 방출제어 제제 등의 연구를 수행하고 있으며, 일본 HATA사의 다층정 타정기를 활용하여 복합적인 다층 제형의 제조공정 연구를 수행하고 있습니다.</p>
                <p>이를 통해 제제 조성 및 제조조건을 최적화하고 Lab. Scale부터 상업생산까지 이어지는 제조공정의 재현성과 안정성을 확보하고 있습니다.</p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="py-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600">04. Scientific Analysis</span>
              </div>
              <h5 className="text-lg font-extrabold text-slate-900 leading-snug">
                과학적 분석을 기반으로 한 제제 최적화
              </h5>
              <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-2 font-normal">
                <p>제제연구소는 다양한 분석 및 평가 시스템을 활용하여 의약품의 물리·화학적 특성과 제제의 품질 특성을 종합적으로 평가합니다.</p>
                <p>HPLC 및 GC, LC-MS/MS 등을 활용한 성분 및 불순물 분석뿐만 아니라, Differential Scanning Calorimetry(DSC)를 이용한 열적 특성 평가, Laser Diffraction Particle Size Analyzer를 이용한 입자도 분석, Automated Flow-Through Cell Dissolution System을 이용한 용출 및 방출 특성 평가 등을 수행하고 있습니다.</p>
                <p>이를 통해 제제 조성, 제조공정 및 약물 방출 특성 간의 상관관계를 분석하고, 목표하는 품질특성을 구현하기 위한 최적의 제제 및 공정을 설계합니다.</p>
              </div>
            </div>

          </div>
        </section>
      )}

    </div>
  );
}
