'use client';

import React, { useState } from 'react';
import { FlaskConical, Factory, ShieldCheck, Layers } from 'lucide-react';

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

  const currentTab = tabData[activeTab];

  return (
    <div className="w-[100vw] relative left-1/2 -translate-x-1/2 bg-[#f8f9fa] py-16 md:py-20 border-y border-gray-100 mt-20 mb-12">
      <div className="max-w-5xl mx-auto px-4 md:px-0">
        {/* Title & Subtitle */}
        <div className="mb-12 text-left">
          <h3 className="text-[28px] md:text-[34px] font-black text-gray-900 tracking-tight mb-2">
            WHY DASAN
          </h3>
          <p className="text-[15px] md:text-[16px] text-gray-600 font-medium break-keep">
            개발부터 생산까지, 의약품의 가치를 완성하는 파트너
          </p>
        </div>

        {/* 4 Interactive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-10">
          {tabData.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`text-left rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer group active:scale-[0.98] ${
                  isActive
                    ? 'bg-white border-2 border-[#64ad55] shadow-md -translate-y-1'
                    : 'bg-white/80 border border-gray-200/70 hover:border-[#64ad55]/60 hover:bg-white shadow-2xs hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`inline-block font-black text-[11.5px] px-3 py-1 rounded-full tracking-wider uppercase transition-colors ${
                        isActive
                          ? 'bg-[#64ad55] text-white'
                          : 'bg-[#64ad55]/10 text-[#64ad55]'
                      }`}
                    >
                      {tab.badge}
                    </span>
                    <Icon
                      size={20}
                      strokeWidth={1.75}
                      className={`transition-transform duration-300 ${
                        isActive
                          ? 'text-[#64ad55] scale-110'
                          : 'text-[#64ad55]/70 group-hover:scale-110 group-hover:text-[#64ad55]'
                      }`}
                    />
                  </div>
                  <h4
                    className={`text-[14.5px] xl:text-[15px] font-bold tracking-tight leading-snug break-keep transition-colors ${
                      isActive ? 'text-[#64ad55]' : 'text-gray-900 group-hover:text-[#64ad55]'
                    }`}
                  >
                    {tab.cardTitle}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Tab Content Panel Displayed Directly Below Cards */}
        <div key={currentTab.id} className="bg-white rounded-2xl p-7 md:p-9 shadow-sm border border-gray-100/80 animate-fade-in-up">
          <div className="flex items-center gap-3.5 mb-8 pb-5 border-b border-gray-100">
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
  );
}
