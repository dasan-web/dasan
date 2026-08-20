'use client';

import React from 'react';

interface RdIntroContentProps {
  dbContent?: string | null;
}

export default function RdIntroContent({ dbContent }: RdIntroContentProps) {
  return (
    <div className="space-y-16 animate-fade-in-up text-gray-800 pb-16">
      
      {/* 1. Main Visual Header & Central Research Institute Overview (Samik R&D Style) */}
      <section className="space-y-8">
        {/* Main Catchphrase */}
        <h3 className="text-[28px] sm:text-[34px] lg:text-[38px] font-black text-gray-900 tracking-tight leading-[1.3] break-keep">
          다산제약은 글로벌 경쟁력을 갖춘<br className="hidden sm:block" /> 연구소로 거듭납니다.
        </h3>

        {/* Hero Image Banner */}
        <div className="w-full h-[320px] sm:h-[400px] lg:h-[480px] rounded-2xl overflow-hidden relative shadow-sm border border-gray-100 group">
          <img
            src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1600&auto=format&fit=crop"
            alt="다산제약 중앙연구소"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Central Lab Description Flex Grid (Left Title / Right Original Text) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-6 pb-16 border-b border-gray-200/80">
          <div className="lg:col-span-4">
            <h4 className="text-[24px] sm:text-[28px] font-black text-gray-900 tracking-tight border-l-4 border-[#64ad55] pl-4">
              중앙 연구소
            </h4>
          </div>
          <div className="lg:col-span-8 text-[15px] sm:text-[16px] text-gray-600 leading-[1.85] font-normal space-y-5 break-keep">
            <p>
              다산제약의 중앙연구소는 <strong className="font-bold text-gray-900 bg-[#64ad55]/10 px-1.5 py-0.5 rounded text-[#64ad55]">50여명의 석·박사급 연구인력</strong>을 중심으로 합성연구소와 제제연구소의 유기적인 협력체계를 구축하고 있습니다. 유기합성 기술을 기반으로 한 원료의약품(API) 개발부터 자사의 <strong className="font-bold text-gray-900 bg-[#64ad55]/10 px-1.5 py-0.5 rounded text-[#64ad55]">Multistra® 기술</strong>을 활용한 특화된 약물전달시스템(DDS) 적용 완제품 개발까지의 의약품 개발 전 과정을 아우르는 종합의약품 연구개발 역량을 확보하고 있습니다.
            </p>
            <p>
              또한 연구소 내에 30L 규모 Pilot-scale의 다목적 합성 반응 시스템과 유동층 과립제조 및 코팅이 가능한 Multilab® GPCG 시스템과 다층정 타정기 등의 제조설비와 LC-MS/MS, Differential Scanning Calorimetry, Laser Diffraction Particle Size Analyzer, Automated Flow-Through Cell Dissolution System 등의 첨단 분석 시스템을 활용하여 고도화된 의약품 연구를 수행하고 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Grid Section: 첨단 과학의 선도 & 인재 육성 (Samik R&D Style 3-Card Image Grids) */}
      <section className="space-y-16 pb-16 border-b border-gray-200/80">
        
        {/* Section Child 1: 첨단 과학의 선도 */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#64ad55]"></span>
            <h3 className="text-[24px] sm:text-[26px] font-black text-gray-900 tracking-tight">
              첨단 과학의 선도
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group relative h-[260px] sm:h-[290px] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop"
                alt="약물의 용해도와 방출 속도를 조절하는 제제 기술 개발"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <span className="text-[11.5px] font-black uppercase tracking-wider text-[#64ad55] bg-[#64ad55]/20 px-2.5 py-0.5 rounded-full mb-2 inline-block">
                  Multistra® DDS
                </span>
                <p className="text-[17px] sm:text-[18px] font-bold text-white leading-snug break-keep group-hover:text-[#64ad55] transition-colors">
                  약물의 용해도와 방출 속도를<br />조절하는 제제 기술 개발
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative h-[260px] sm:h-[290px] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop"
                alt="약물 재창출 및 차별화 원료의약품 개발"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <span className="text-[11.5px] font-black uppercase tracking-wider text-[#64ad55] bg-[#64ad55]/20 px-2.5 py-0.5 rounded-full mb-2 inline-block">
                  API Synthesis
                </span>
                <p className="text-[17px] sm:text-[18px] font-bold text-white leading-snug break-keep group-hover:text-[#64ad55] transition-colors">
                  약물 재창출 및 차별화된<br />원료의약품(API) 개발
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative h-[260px] sm:h-[290px] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop"
                alt="과학적 분석 기반 제제 최적화"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <span className="text-[11.5px] font-black uppercase tracking-wider text-[#64ad55] bg-[#64ad55]/20 px-2.5 py-0.5 rounded-full mb-2 inline-block">
                  Scientific Analytics
                </span>
                <p className="text-[17px] sm:text-[18px] font-bold text-white leading-snug break-keep group-hover:text-[#64ad55] transition-colors">
                  과학적 분석을 기반으로 한<br />제제 및 공정 최적화
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Child 2: 인재 육성 */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#64ad55]"></span>
            <h3 className="text-[24px] sm:text-[26px] font-black text-gray-900 tracking-tight">
              인재 육성
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group relative h-[260px] sm:h-[290px] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop"
                alt="50여 명 석박사 연구진"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <span className="text-[11.5px] font-black uppercase tracking-wider text-[#64ad55] bg-[#64ad55]/20 px-2.5 py-0.5 rounded-full mb-2 inline-block">
                  Research Power
                </span>
                <p className="text-[17px] sm:text-[18px] font-bold text-white leading-snug break-keep group-hover:text-[#64ad55] transition-colors">
                  50여 명의 석·박사 연구진<br />유기적 수평 협력체계
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative h-[260px] sm:h-[290px] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop"
                alt="연구개발 역량 강화"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <span className="text-[11.5px] font-black uppercase tracking-wider text-[#64ad55] bg-[#64ad55]/20 px-2.5 py-0.5 rounded-full mb-2 inline-block">
                  Capability Building
                </span>
                <p className="text-[17px] sm:text-[18px] font-bold text-white leading-snug break-keep group-hover:text-[#64ad55] transition-colors">
                  특허 전략 및 세미나 확충으로<br />연구개발 전문 역량 강화
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative h-[260px] sm:h-[290px] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"
                alt="연구인재 성장을 위한 지원"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <span className="text-[11.5px] font-black uppercase tracking-wider text-[#64ad55] bg-[#64ad55]/20 px-2.5 py-0.5 rounded-full mb-2 inline-block">
                  Talent Growth
                </span>
                <p className="text-[17px] sm:text-[18px] font-bold text-white leading-snug break-keep group-hover:text-[#64ad55] transition-colors">
                  학술 교육 및 연구 인재<br />지속 성장을 위한 적극 지원
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 3. Section Team: 함께 만드는 혁신 (Samik R&D Team Structure with ALL ORIGINAL DASAN TEXT) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4">
        <div className="lg:col-span-4">
          <h3 className="text-[24px] sm:text-[28px] font-black text-gray-900 tracking-tight border-l-4 border-[#64ad55] pl-4">
            함께 만드는 혁신
          </h3>
        </div>
        <div className="lg:col-span-8 space-y-10">
          
          {/* Team 1: 합성 연구 파트 */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-7 sm:p-8 shadow-xs hover:border-[#64ad55]/60 hover:shadow-md transition-all duration-300">
            <h4 className="text-[20px] font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100 flex items-center justify-between">
              <span>합성 연구 파트 (Synthesis Research Division)</span>
              <span className="text-[12px] font-black text-[#64ad55] uppercase tracking-wider bg-[#64ad55]/10 px-3 py-1 rounded-full">
                API Synthesis
              </span>
            </h4>
            <div className="space-y-4 text-[14.5px] text-gray-600 leading-[1.85] font-normal break-keep">
              <p>
                합성연구소는 유기합성 기술을 기반으로 원료의약품 및 의약품 개발에 필요한 핵심 합성기술과 공정기술을 연구합니다.
              </p>
              <p>
                신약의 후보물질, 지식재산권 확보와 특허 전략을 고려한 차별화된 원료의약품(염변경, 결정형변경, Pro-drug…)을 설계하고 고도화된 공정기술을 적용한 불순물 발생 억제 제품 등을 개발하고 상용화하는 최적의 합성공정 개발 체계를 구축하고 있습니다.
              </p>

              {/* Original Items 01 ~ 04 with Complete Text */}
              <div className="pt-6 border-t border-gray-100 space-y-6">
                {/* Item 01 */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#64ad55] uppercase tracking-wider bg-[#64ad55]/10 px-2 py-0.5 rounded">01. Process Design</span>
                    <h5 className="text-[16px] font-bold text-gray-900">신약 후보물질에서 상업생산까지, 최적의 합성공정을 설계합니다.</h5>
                  </div>
                  <div className="text-[13.5px] text-gray-600 leading-[1.8] space-y-1 pl-2">
                    <p>합성연구소는 유기합성 기술을 기반으로 신약 및 차별화 의약품 후보물질의 합성공정 설계와 원료의약품 개발을 수행하고 있습니다.</p>
                    <p>신규 후보물질의 합성경로 설계부터 공정 최적화, Scale-up 및 기술이전에 이르기까지 의약품 개발 단계별 요구사항을 반영하여 효율적이고 재현성 높은 제조공정의 확립과 고순도 원료의약품 개발을 목표로 연구를 수행하고 있습니다.</p>
                  </div>
                </div>

                {/* Item 02 */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#64ad55] uppercase tracking-wider bg-[#64ad55]/10 px-2 py-0.5 rounded">02. Differentiated API</span>
                    <h5 className="text-[16px] font-bold text-gray-900">차별화된 원료의약품 개발</h5>
                  </div>
                  <div className="text-[13.5px] text-gray-600 leading-[1.8] space-y-1 pl-2">
                    <p>의약품의 특성과 개발 목적에 따라 신규염(Salt), 결정형(Polymorph) 및 다양한 물성 변화에 대한 연구를 수행하고 있으며, 지식재산권 및 특허 전략을 고려한 차별화된 원료의약품 개발을 추진하고 있습니다.</p>
                    <p>또한 합성공정에서 발생할 수 있는 유해 불순물 및 공정 관련 불순물의 발생 가능성을 사전에 검토하고, 필요에 따라 Pro-drug 설계 및 합성기술을 적용하여 불순물 발생을 억제하고 안정적인 제조공정을 확보하기 위한 연구를 수행하고 있습니다.</p>
                  </div>
                </div>

                {/* Item 03 */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#64ad55] uppercase tracking-wider bg-[#64ad55]/10 px-2 py-0.5 rounded">03. Scale-Up System</span>
                    <h5 className="text-[16px] font-bold text-gray-900">Lab.에서 Commercial Scale까지</h5>
                  </div>
                  <div className="text-[13.5px] text-gray-600 leading-[1.8] space-y-1 pl-2">
                    <p>연구실 규모에서 확보한 합성기술을 실제 제조공정으로 연결하기 위해 Lab. → Pilot → Commercial Scale로 이어지는 단계적 Scale-up 및 기술이전 체계를 구축하고 있습니다.</p>
                    <p>50 L Pilot-scale 다목적 합성 반응 시스템을 활용하여 합성공정의 Scale-up 가능성을 검토하고, 반응조건, 원료 투입순서, 반응시간, 정제 및 결정화 조건 등 주요 공정변수를 최적화하여 생산성·재현성·경제성을 갖춘 제조공정을 확립합니다.</p>
                    <p>이를 통해 연구실에서 개발된 합성법이 실제 상업생산 환경에서도 안정적으로 구현될 수 있도록 공정개발과 기술이전을 수행하고 있습니다.</p>
                  </div>
                </div>

                {/* Item 04 */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#64ad55] uppercase tracking-wider bg-[#64ad55]/10 px-2 py-0.5 rounded">04. High Purity API</span>
                    <h5 className="text-[16px] font-bold text-gray-900">고순도 원료의약품을 위한 공정개발</h5>
                  </div>
                  <div className="text-[13.5px] text-gray-600 leading-[1.8] space-y-1 pl-2">
                    <p>원료의약품의 품질은 최종 제품의 안전성과 유효성을 결정하는 중요한 요소입니다.</p>
                    <p>합성연구소는 합성단계별 불순물 생성 가능성을 체계적으로 검토하고, 반응 및 정제조건의 최적화를 통해 불순물 발생을 최소화하고 고순도의 원료의약품을 확보할 수 있는 합성공정을 개발하고 있습니다.</p>
                    <p>이를 통해 단순한 합성법 개발을 넘어 품질, 생산성, 공정 안정성 및 상업적 제조 가능성을 종합적으로 고려한 원료의약품 개발을 수행하고 있습니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team 2: 제제 연구 파트 */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-7 sm:p-8 shadow-xs hover:border-[#64ad55]/60 hover:shadow-md transition-all duration-300">
            <h4 className="text-[20px] font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100 flex items-center justify-between">
              <span>제제 연구 파트 (Formulation Research Division)</span>
              <span className="text-[12px] font-black text-[#64ad55] uppercase tracking-wider bg-[#64ad55]/10 px-3 py-1 rounded-full">
                Multistra® DDS
              </span>
            </h4>
            <div className="space-y-4 text-[14.5px] text-gray-600 leading-[1.85] font-normal break-keep">
              <p>
                제제연구소는 의약품의 물리·화학적 특성과 약물의 방출 및 흡수 특성을 기반으로 다산제약만의 차별화된 제형 설계와 여러가지 방식의 약물전달시스템(DDS) 개발을 수행하고 있습니다.
              </p>
              <p>
                당사의 보유 기술을 융합한 <strong className="font-bold text-gray-900">Multistra®</strong>는 다양한 약물의 특성과 목표하는 약효 및 방출조절 특성에 적합한 제제기술의 집약체로서 새로운 제형의 제품이나 신규 복합제, 용량 개선 개량신약, 특수 방출제어 제제 등의 다양한 고부가가치 의약품 개발에 활용되고 있으며 이를 통해 다산제약만의 제품 차별화와 경쟁력 향상에 기여하고 있습니다.
              </p>

              {/* Original Items 01 ~ 04 with Complete Text */}
              <div className="pt-6 border-t border-gray-100 space-y-6">
                {/* Item 01 */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#64ad55] uppercase tracking-wider bg-[#64ad55]/10 px-2 py-0.5 rounded">01. Multistra® DDS</span>
                    <h5 className="text-[16px] font-bold text-gray-900">Multistra® 기반 DDS 기술</h5>
                  </div>
                  <div className="text-[13.5px] text-gray-600 leading-[1.8] space-y-1 pl-2">
                    <p>당사는 독자적인 Multistra® 기술 플랫폼을 기반으로 약물의 물리·화학적 특성 및 목표하는 약물 방출 특성에 따라 다양한 제제 설계가 가능하도록 연구개발 역량을 구축하고 있습니다.</p>
                    <p>약물의 용출 및 방출 특성을 정밀하게 제어하고, 유효성분의 용량과 특성에 적합한 제형 및 제조공정을 설계함으로써 차별화된 약물전달시스템(DDS) 개발을 추진하고 있습니다.</p>
                    <p>이를 통해 기존 의약품의 제형을 개선하거나 새로운 방출 특성을 구현하는 등 다양한 형태의 개량신약 및 차별화 의약품 개발에 적용하고 있습니다.</p>
                  </div>
                </div>

                {/* Item 02 */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#64ad55] uppercase tracking-wider bg-[#64ad55]/10 px-2 py-0.5 rounded">02. Combination Formulation</span>
                    <h5 className="text-[16px] font-bold text-gray-900">다양한 제형 및 복합제 개발</h5>
                  </div>
                  <div className="text-[13.5px] text-gray-600 leading-[1.8] space-y-1 pl-2">
                    <p>의약품 개발 과정에서 요구되는 다양한 제형에 대한 연구를 수행하고 있습니다.</p>
                    <p>특히 서로 다른 물리·화학적 특성을 갖는 복수의 유효성분을 하나의 제형에 구현하기 위한 다층정 복합제 설계 및 제조공정 개발을 수행하며, 각 유효성분의 안정성과 용출 특성을 고려한 최적의 제제설계를 구현하고 있습니다.</p>
                    <p>이에 방출제어, 서방화 및 다양한 DDS 기술을 접목시켜 복용 편의성과 제품 차별성을 향상시킬 수 있는 제형 개발을 지속하고 있습니다.</p>
                  </div>
                </div>

                {/* Item 03 */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#64ad55] uppercase tracking-wider bg-[#64ad55]/10 px-2 py-0.5 rounded">03. Formulation Commercialization</span>
                    <h5 className="text-[16px] font-bold text-gray-900">제제설계에서 상업생산까지</h5>
                  </div>
                  <div className="text-[13.5px] text-gray-600 leading-[1.8] space-y-1 pl-2">
                    <p>연구실 수준의 제제설계에 그치지 않고, 실제 제조환경을 고려한 공정개발 및 Scale-up 연구를 수행하고 있습니다.</p>
                    <p>독일 Glatt사의 Multilab® GPCG를 활용하여 유동층 펠렛 제조 및 코팅 공정, 방출제어 제제 등의 연구를 수행하고 있으며, 일본 HATA사의 다층정 타정기를 활용하여 복합적인 다층 제형의 제조공정 연구를 수행하고 있습니다.</p>
                    <p>이를 통해 제제 조성 및 제조조건을 최적화하고 Lab. Scale부터 상업생산까지 이어지는 제조공정의 재현성과 안정성을 확보하고 있습니다.</p>
                  </div>
                </div>

                {/* Item 04 */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#64ad55] uppercase tracking-wider bg-[#64ad55]/10 px-2 py-0.5 rounded">04. Scientific Analysis</span>
                    <h5 className="text-[16px] font-bold text-gray-900">과학적 분석을 기반으로 한 제제 최적화</h5>
                  </div>
                  <div className="text-[13.5px] text-gray-600 leading-[1.8] space-y-1 pl-2">
                    <p>제제연구소는 다양한 분석 및 평가 시스템을 활용하여 의약품의 물리·화학적 특성과 제제의 품질 특성을 종합적으로 평가합니다.</p>
                    <p>HPLC 및 GC, LC-MS/MS 등을 활용한 성분 및 불순물 분석뿐만 아니라, Differential Scanning Calorimetry(DSC)를 이용한 열적 특성 평가, Laser Diffraction Particle Size Analyzer를 이용한 입자도 분석, Automated Flow-Through Cell Dissolution System을 이용한 용출 및 방출 특성 평가 등을 수행하고 있습니다.</p>
                    <p>이를 통해 제제 조성, 제조공정 및 약물 방출 특성 간의 상관관계를 분석하고, 목표하는 품질특성을 구현하기 위한 최적의 제제 및 공정을 설계합니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
