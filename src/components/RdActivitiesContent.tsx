'use client';

import React from 'react';
import { ShieldCheck, Sparkles, Activity, Layers, Sliders, Atom, Zap, ArrowUpRight } from 'lucide-react';

interface RdActivitiesContentProps {
  dbContent?: string | null;
}

export default function RdActivitiesContent({ dbContent }: RdActivitiesContentProps) {
  const techList = [
    {
      id: 'A',
      title: '경피 약물 전달 시스템 플랫폼 기술',
      subTitle: 'Transdermal Drug Delivery System',
      icon: Activity,
      desc: '자체 특허를 보유한 실리콘 중합체로서 높은 생체 적합성 및 흡수율, 침투율을 확보한 기술로서 연고제 또는 마이크로니들과 융합하여 경피제로 개발'
    },
    {
      id: 'B',
      title: '약물 나노화 기술',
      subTitle: 'Stabilized Drug Nanonization Technology',
      icon: Atom,
      desc: 'Polymer 및 Surfactant를 이용하여 약물간의 Aggergation을 차단하고 완벽하게 Despersion된 과립물을 제조하는 기술로서 100nm 수준의 균질한 입자도의 과립물을 통한 약물의 용해도와 생체 이용률을 향상시킨 제품 개발'
    },
    {
      id: 'C',
      title: '약물 방출 조절 기술',
      subTitle: 'Drug Release Control Technology',
      icon: Sliders,
      desc: 'API를 Shell내에 포획하고, 일정 조건하에서 용해시켜 목적하는 위장관 내에서 활성성분이 방출되도록 설계하는 기술로서 약물의 체내 안정성을 향상하고 용해 및 방출 속도를 미세하게 조절해야 하는 방출제어(DR, SR, ER, CR, TR…) 특수 제품의 개발'
    },
    {
      id: 'D',
      title: '다중 약물 다층 정제 기술',
      subTitle: 'Multiple-Drug Multilayer Tablet Technology',
      icon: Layers,
      desc: '정제의 각 층에 서로 다른 약물을 물리적으로 분리하여 탑재하는 기술로서 약물간의 비호환성에 대한 상호작용을 격리를 통해 억제하고 서로 다른 약물 방출 조절 기술(IR+SR, IR+TR…)이 접목된 복합제형 개발'
    },
    {
      id: 'E',
      title: '고분자 기반 약물 고체분산체 기술',
      subTitle: 'Polymer-Based Drug Solid Dispersion Technology',
      icon: Sparkles,
      desc: '본 기술은 API를 Polymer 매질 내에 분자 수준으로 분산시켜 고체분산체를 제조하는 제형 기술로서 목적하는 원료를 비정질(Amorphous) 상태를 안정화하며 약물 분자의 격자 에너지 제거를 통해 활성화 에너지를 낮추어 용해도를 개선한다. 또한 위장관 통과 내에서 초포화 상태를 유지하여 약물흡수를 증가시킴으로서 난용성 약물의 경구제 생체이용률 개선 제품 개발'
    }
  ];

  return (
    <div className="space-y-12 animate-fade-in-up text-slate-800">
      
      {/* Lead Banner Area (Frameless) */}
      <section className="relative overflow-hidden py-2 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-extrabold tracking-wider uppercase">
          <Zap size={14} className="text-emerald-500" />
          <span>Core DDS Platform Technology</span>
        </div>

        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
          Multi-Stra™ <span className="text-emerald-600 font-extrabold">핵심 보유 기술</span>
        </h3>

        <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium pt-2">
          다산제약은 차별화된 <strong className="font-bold text-slate-900 bg-emerald-50 px-1.5 py-0.5 rounded">DDS(약물전달시스템) 설계</strong>를 통해 <strong className="font-bold text-emerald-700">Multi-Stra™</strong> 라는 특화된 핵심보유기술을 완성해 나가고 있습니다.
        </p>
      </section>

      {/* 5 Core Technology Items A ~ E (Frameless Clean Layout) */}
      <div className="divide-y divide-slate-100">
        {techList.map((item) => {
          return (
            <div key={item.id} className="py-8 first:pt-4 last:pb-4 space-y-4 group">
              <div className="flex items-start space-x-4">
                
                {/* Badge ID */}
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-base flex items-center justify-center shadow-sm shrink-0">
                  {item.id}
                </div>

                {/* Content Header & Body */}
                <div className="space-y-3 flex-1">
                  <div>
                    <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase">
                      {item.subTitle}
                    </span>
                    <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                      {item.title}
                    </h4>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
