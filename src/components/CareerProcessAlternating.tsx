'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  ClipboardList, 
  Briefcase, 
  UserCheck, 
  Stethoscope, 
  CheckCircle2, 
  ChevronDown, 
  Check 
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
  badgeBg: string;
  containerBg: string;
  containerBorder: string;
  shadowColor: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
}

function ProcessStepCard({
  item,
  index,
  isIconRight,
  hoveredId,
  setHoveredId,
  isLast,
}: {
  item: StepItem;
  index: number;
  isIconRight: boolean;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  isLast: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const Icon = item.icon;
  const isHovered = hoveredId === item.id;

  return (
    <div 
      ref={cardRef} 
      className={`relative transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}
    >
      <div 
        onMouseEnter={() => setHoveredId(item.id)}
        onMouseLeave={() => setHoveredId(null)}
        className={`group relative p-6 sm:p-8 md:p-10 rounded-[28px] sm:rounded-[32px] border transition-all duration-500 bg-white ${
          isHovered 
            ? 'border-emerald-300 shadow-xl -translate-y-1' 
            : 'border-slate-200/80 shadow-xs hover:border-slate-300'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-10 items-center">
          
          {/* Squircle Icon Showcase Column (4 cols) */}
          <div 
            className={`lg:col-span-4 relative py-8 sm:py-10 px-6 rounded-[24px] sm:rounded-[28px] overflow-hidden flex flex-col items-center justify-center transition-all duration-500 bg-transparent ${
              isIconRight ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            {/* Squircle Icon Button */}
            <div className={`relative w-22 h-22 sm:w-26 sm:h-26 rounded-[24px] sm:rounded-[28px] ${item.badgeBg} text-white flex items-center justify-center shadow-lg ${item.shadowColor} transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1`}>
              <Icon size={40} strokeWidth={2.2} className="text-white drop-shadow-xs" />
            </div>

            {/* Subtitle Under Icon */}
            <span className="mt-3.5 text-xs font-bold text-slate-600 tracking-wider text-center select-none">
              {item.subTitle}
            </span>
          </div>

          {/* Text Description Column (8 cols) */}
          <div 
            className={`lg:col-span-8 space-y-4 ${
              isIconRight ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            {/* Header */}
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-green block">
                RECRUITMENT STEP {item.stepNumber}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                {item.title}
              </h3>
            </div>

            {/* Detailed Description */}
            <p className="text-[15px] sm:text-[16px] text-slate-600 leading-[1.85] font-normal break-keep">
              {item.desc}
            </p>

            {/* Key Process Tags */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
              {item.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-600 group-hover:border-emerald-200 group-hover:bg-emerald-50/50 group-hover:text-emerald-800 transition-colors duration-300"
                >
                  <Check size={12} className="text-brand-green" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Connecting Downward Indicator (between steps) */}
      {!isLast && (
        <div className="flex justify-center my-3 sm:my-4">
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 border border-slate-200/80 flex items-center justify-center shadow-2xs">
            <ChevronDown size={16} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function CareerProcessAlternating({ isEnglish = false, dbContent = null, data }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const processData = React.useMemo(() => {
    if (data) return data;
    return parseCareerProcessData(dbContent, isEnglish);
  }, [data, dbContent, isEnglish]);

  const mainTitle = processData.mainTitle;
  const intro = processData.intro;

  const STEP_STYLES = [
    {
      icon: FileText,
      badgeBg: 'bg-sky-600',
      containerBg: 'bg-gradient-to-br from-sky-50/80 via-sky-50/30 to-white',
      containerBorder: 'border-sky-100',
      shadowColor: 'shadow-sky-600/30',
    },
    {
      icon: ClipboardList,
      badgeBg: 'bg-teal-600',
      containerBg: 'bg-gradient-to-br from-teal-50/80 via-teal-50/30 to-white',
      containerBorder: 'border-teal-100',
      shadowColor: 'shadow-teal-600/30',
    },
    {
      icon: Briefcase,
      badgeBg: 'bg-indigo-600',
      containerBg: 'bg-gradient-to-br from-indigo-50/80 via-indigo-50/30 to-white',
      containerBorder: 'border-indigo-100',
      shadowColor: 'shadow-indigo-600/30',
    },
    {
      icon: UserCheck,
      badgeBg: 'bg-purple-600',
      containerBg: 'bg-gradient-to-br from-purple-50/80 via-purple-50/30 to-white',
      containerBorder: 'border-purple-100',
      shadowColor: 'shadow-purple-600/30',
    },
    {
      icon: Stethoscope,
      badgeBg: 'bg-rose-500',
      containerBg: 'bg-gradient-to-br from-rose-50/80 via-rose-50/30 to-white',
      containerBorder: 'border-rose-100',
      shadowColor: 'shadow-rose-500/30',
    },
    {
      icon: CheckCircle2,
      badgeBg: 'bg-emerald-600',
      containerBg: 'bg-gradient-to-br from-emerald-50/80 via-emerald-50/30 to-white',
      containerBorder: 'border-emerald-100',
      shadowColor: 'shadow-emerald-600/30',
    },
  ];

  const steps: StepItem[] = React.useMemo(() => {
    return processData.steps.map((st, idx) => {
      const style = STEP_STYLES[idx] || STEP_STYLES[0];
      return {
        id: `step-${idx + 1}`,
        stepNumber: st.stepNumber || `0${idx + 1}`,
        title: st.title,
        subTitle: st.subTitle,
        desc: st.desc,
        tags: st.tags || [],
        badgeBg: style.badgeBg,
        containerBg: style.containerBg,
        containerBorder: style.containerBorder,
        shadowColor: style.shadowColor,
        icon: style.icon,
      };
    });
  }, [processData]);

  return (
    <div className="space-y-12 animate-fade-in-up py-4">
      {/* Top Header Section */}
      <div className="border-b border-gray-100 pb-6">
        <h4 className="font-black text-brand-blue text-xl md:text-2xl mb-2 whitespace-pre-wrap">
          {mainTitle}
        </h4>
        {typeof intro === 'string' && (intro.includes('<p') || intro.includes('<h')) ? (
          <div 
            dangerouslySetInnerHTML={{ __html: intro }} 
            className="[&_p]:text-gray-500 [&_p]:text-sm md:[&_p]:text-base [&_p]:whitespace-pre-wrap [&_h4]:font-bold [&_strong]:font-bold" 
          />
        ) : (
          <p className="text-gray-500 text-sm md:text-base whitespace-pre-wrap">
            {intro}
          </p>
        )}
      </div>

      {/* Alternating Step Cards Stack (Right - Left - Right - Left...) with Squircle Icons (No Photos) */}
      <div className="space-y-8 sm:space-y-10">
        {steps.map((item, index) => {
          // User requested: Icon visual on the RIGHT for first item, LEFT for second item, alternating downwards
          const isIconRight = index % 2 === 0;

          return (
            <ProcessStepCard
              key={item.id}
              item={item}
              index={index}
              isIconRight={isIconRight}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
              isLast={index === steps.length - 1}
            />
          );
        })}
      </div>
    </div>
  );
}
