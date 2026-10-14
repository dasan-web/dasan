'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  ClipboardList, 
  Briefcase, 
  UserCheck, 
  Stethoscope, 
  CheckCircle2, 
  Check,
  ArrowRight
} from 'lucide-react';

import { parseCareerProcessData, CareerProcessData } from '@/lib/careerProcess';

interface Props {
  isEnglish?: boolean;
  dbContent?: string | null;
  data?: CareerProcessData;
}

interface StepItem {
  id: string;
  stepNumber: string;
  title: string;
  subTitle: string;
  desc: string;
  tags: string[];
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  theme: {
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    iconBg: string;
    iconShadow: string;
    cardBorderHover: string;
    ringColor: string;
    accentDot: string;
  };
}

export default function CareerProcessAlternating({ isEnglish = false, dbContent = null, data }: Props) {
  const [activeStepId, setActiveStepId] = useState<string | null>(null);

  const processData = React.useMemo(() => {
    if (data) return data;
    return parseCareerProcessData(dbContent, isEnglish);
  }, [data, dbContent, isEnglish]);

  const mainTitle = processData.mainTitle;
  const intro = processData.intro;

  const STEP_THEMES = [
    {
      icon: FileText,
      badgeBg: 'bg-white text-slate-900',
      badgeText: 'text-slate-900',
      badgeBorder: 'border-slate-200',
      iconBg: 'bg-gradient-to-br from-[#86efac] to-[#34d399]',
      iconShadow: 'shadow-emerald-400/20',
      cardBorderHover: 'hover:border-emerald-300',
      ringColor: 'ring-emerald-300',
      accentDot: 'bg-emerald-400',
    },
    {
      icon: ClipboardList,
      badgeBg: 'bg-white text-slate-900',
      badgeText: 'text-slate-900',
      badgeBorder: 'border-slate-200',
      iconBg: 'bg-gradient-to-br from-[#34d399] to-[#10b981]',
      iconShadow: 'shadow-emerald-500/20',
      cardBorderHover: 'hover:border-emerald-400',
      ringColor: 'ring-emerald-400',
      accentDot: 'bg-emerald-500',
    },
    {
      icon: Briefcase,
      badgeBg: 'bg-white text-slate-900',
      badgeText: 'text-slate-900',
      badgeBorder: 'border-slate-200',
      iconBg: 'bg-gradient-to-br from-[#10b981] to-[#059669]',
      iconShadow: 'shadow-emerald-600/20',
      cardBorderHover: 'hover:border-emerald-500',
      ringColor: 'ring-emerald-500',
      accentDot: 'bg-emerald-600',
    },
    {
      icon: UserCheck,
      badgeBg: 'bg-white text-slate-900',
      badgeText: 'text-slate-900',
      badgeBorder: 'border-slate-200',
      iconBg: 'bg-gradient-to-br from-[#059669] to-[#008953]',
      iconShadow: 'shadow-emerald-700/20',
      cardBorderHover: 'hover:border-emerald-600',
      ringColor: 'ring-emerald-600',
      accentDot: 'bg-[#008953]',
    },
    {
      icon: Stethoscope,
      badgeBg: 'bg-white text-slate-900',
      badgeText: 'text-slate-900',
      badgeBorder: 'border-slate-200',
      iconBg: 'bg-gradient-to-br from-[#008953] to-[#047857]',
      iconShadow: 'shadow-emerald-800/25',
      cardBorderHover: 'hover:border-emerald-700',
      ringColor: 'ring-emerald-700',
      accentDot: 'bg-emerald-700',
    },
    {
      icon: CheckCircle2,
      badgeBg: 'bg-white text-slate-900',
      badgeText: 'text-slate-900',
      badgeBorder: 'border-slate-200',
      iconBg: 'bg-gradient-to-br from-[#047857] to-[#064e3b]',
      iconShadow: 'shadow-emerald-900/30',
      cardBorderHover: 'hover:border-emerald-800',
      ringColor: 'ring-emerald-800',
      accentDot: 'bg-emerald-900',
    },
  ];

  const steps: StepItem[] = React.useMemo(() => {
    return processData.steps.map((st, idx) => {
      const theme = STEP_THEMES[idx] || STEP_THEMES[0];
      return {
        id: `step-${idx + 1}`,
        stepNumber: st.stepNumber || `0${idx + 1}`,
        title: st.title,
        subTitle: st.subTitle,
        desc: st.desc,
        tags: st.tags || [],
        icon: theme.icon,
        theme,
      };
    });
  }, [processData]);

  return (
    <div className="w-full space-y-4 sm:space-y-5 animate-fade-in-up">
      {/* Top Header Row: Clean Title & Intro */}
      <div className="pb-3 sm:pb-4 border-b border-gray-100">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {mainTitle}
        </h3>
        {typeof intro === 'string' && (intro.includes('<p') || intro.includes('<h')) ? (
          <div 
            dangerouslySetInnerHTML={{ __html: intro }} 
            className="mt-1 [&_p]:text-slate-500 [&_p]:text-xs sm:[&_p]:text-sm [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold" 
          />
        ) : (
          <p className="mt-0.5 text-slate-500 text-xs sm:text-sm whitespace-pre-wrap">
            {intro}
          </p>
        )}
      </div>

      {/* User Requested: 표시부분을 하나로 간결하게 다시 정리 - 단일 가로 6단계 파이프라인 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-3.5">
        {steps.map((item, index) => {
          const Icon = item.icon;
          const isHovered = activeStepId === item.id;
          const isLast = index === steps.length - 1;

          return (
            <div
              key={item.id}
              onMouseEnter={() => setActiveStepId(item.id)}
              onMouseLeave={() => setActiveStepId(null)}
              className={`relative bg-white rounded-2xl p-4 lg:p-5 border transition-all duration-300 flex flex-col justify-between group min-h-[130px] sm:min-h-[140px] ${
                isHovered 
                  ? 'border-brand-green shadow-lg -translate-y-1 ring-2 ring-brand-green/10' 
                  : 'border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div>
                {/* Step Badge & Icon */}
                <div className="flex items-center justify-between mb-3.5">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-black tracking-wider ${item.theme.badgeBg} border ${item.theme.badgeBorder}`}>
                    STEP {item.stepNumber}
                  </span>
                  <div className={`w-8 h-8 rounded-xl ${item.theme.iconBg} text-white flex items-center justify-center shadow-xs shrink-0 transition-transform duration-300 group-hover:scale-105`}>
                    <Icon size={16} strokeWidth={2.2} className="drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.18)]" />
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-brand-green transition-colors leading-tight mb-1.5">
                  {item.title}
                </h4>

                {/* Subtitle / Focus Point */}
                <p className="text-xs sm:text-[13px] font-semibold text-slate-500 leading-snug break-keep">
                  {item.subTitle}
                </p>
              </div>

              {/* Arrow Connector between steps on Desktop (lg & xl) */}
              {!isLast && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-white border border-slate-200/90 shadow-2xs items-center justify-center text-slate-400 group-hover:text-brand-green group-hover:border-brand-green transition-colors">
                  <ArrowRight size={11} strokeWidth={2.5} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
