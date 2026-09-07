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

interface Props {
  isEnglish?: boolean;
  dbContent?: string | null;
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

export default function CareerProcessAlternating({ isEnglish = false, dbContent = null }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const lines = dbContent ? dbContent.split(/\r?\n/) : [];
  const mainTitle = lines[0] || (isEnglish ? 'Recruitment Process Guide' : '채용 프로세스 안내');
  const intro = lines[1] || (isEnglish 
    ? 'Dasan Pharmaceutical carefully reviews the precious documents and sincere potential of every applicant.'
    : '다산제약은 지원자 한 분 한 분의 소중한 서류와 인성을 세밀히 검토하고 있습니다.');

  const stepsKo: StepItem[] = [
    {
      id: 'step-1',
      stepNumber: '01',
      title: lines[2] || '서류 전형',
      subTitle: lines[3] || '기본 요건 및 직무 적합성 검토',
      desc: '지원자의 직무 적합성과 전문성, 성장 잠재력 및 제출 서류의 충실도를 종합적으로 검토하여 1차 선발을 진행합니다.',
      tags: ['온라인 입사지원', '자격 요건 검토', '직무 역량 심사'],
      badgeBg: 'bg-sky-600',
      containerBg: 'bg-gradient-to-br from-sky-50/80 via-sky-50/30 to-white',
      containerBorder: 'border-sky-100',
      shadowColor: 'shadow-sky-600/30',
      icon: FileText
    },
    {
      id: 'step-2',
      stepNumber: '02',
      title: '인적성검사',
      subTitle: '종합 인적성 평가 및 역량 진단',
      desc: '다산제약의 핵심 인재상 부합도와 기본 인성, 직무 수행에 필요한 논리적 사고력 및 문제 해결 역량을 온라인으로 진단합니다.',
      tags: ['온라인 인성검사', '직무 적성 진단', '핵심가치 적합도'],
      badgeBg: 'bg-teal-600',
      containerBg: 'bg-gradient-to-br from-teal-50/80 via-teal-50/30 to-white',
      containerBorder: 'border-teal-100',
      shadowColor: 'shadow-teal-600/30',
      icon: ClipboardList
    },
    {
      id: 'step-3',
      stepNumber: '03',
      title: lines[4] || '1차 실무 면접',
      subTitle: lines[5] || '직무 적합성 및 실무 역량 평가',
      desc: '해당 부서 현업 실무진과의 심층 면접을 통해 지원 분야의 전문 지식, 실무 수행 능력, 협업 및 커뮤니케이션 역량을 집중 검증합니다.',
      tags: ['실무진 심층 면접', '전문 역량 검증', '직무 인터뷰'],
      badgeBg: 'bg-indigo-600',
      containerBg: 'bg-gradient-to-br from-indigo-50/80 via-indigo-50/30 to-white',
      containerBorder: 'border-indigo-100',
      shadowColor: 'shadow-indigo-600/30',
      icon: Briefcase
    },
    {
      id: 'step-4',
      stepNumber: '04',
      title: lines[6] || '2차 임원 면접',
      subTitle: lines[7] || '인성 및 미래 가치 평가',
      desc: '경영진과의 종합 면접을 통해 다산제약의 기업 문화 및 비전과의 부합도, 직업관, 미래 성장 가능성을 다각도로 평가합니다.',
      tags: ['경영진 종합 면접', '인성 및 가치관', '미래 성장성'],
      badgeBg: 'bg-purple-600',
      containerBg: 'bg-gradient-to-br from-purple-50/80 via-purple-50/30 to-white',
      containerBorder: 'border-purple-100',
      shadowColor: 'shadow-purple-600/30',
      icon: UserCheck
    },
    {
      id: 'step-5',
      stepNumber: '05',
      title: '채용 검진',
      subTitle: '건강 검진 실시',
      desc: '입사 전 안전하고 건강한 근무 환경 조성을 위하여 지정 전문 의료기관에서 채용 건강 검진을 진행합니다.',
      tags: ['지정 검진 기관', '신체 건강 진단', '안전한 근무 지원'],
      badgeBg: 'bg-rose-500',
      containerBg: 'bg-gradient-to-br from-rose-50/80 via-rose-50/30 to-white',
      containerBorder: 'border-rose-100',
      shadowColor: 'shadow-rose-500/30',
      icon: Stethoscope
    },
    {
      id: 'step-6',
      stepNumber: '06',
      title: lines[8] || '최종 합격',
      subTitle: lines[9] || '처우 조율 및 온보딩',
      desc: '최종 합격을 진심으로 축하드리며, 처우 협의 및 입사일을 조율하고 다산제약의 새로운 가족으로 힘찬 첫걸음을 함께 시작합니다.',
      tags: ['입사 처우 협의', '입사일 확정', '웰컴 온보딩'],
      badgeBg: 'bg-emerald-600',
      containerBg: 'bg-gradient-to-br from-emerald-50/80 via-emerald-50/30 to-white',
      containerBorder: 'border-emerald-100',
      shadowColor: 'shadow-emerald-600/30',
      icon: CheckCircle2
    }
  ];

  const stepsEn: StepItem[] = [
    {
      id: 'step-1',
      stepNumber: '01',
      title: lines[2] || 'Document Screening',
      subTitle: lines[3] || 'Basic Qualifications Review',
      desc: 'We comprehensively review applicants\' job suitability, professional qualifications, growth potential, and the integrity of submitted documents for primary selection.',
      tags: ['Online Application', 'Qualification Review', 'Competency Assessment'],
      badgeBg: 'bg-sky-600',
      containerBg: 'bg-gradient-to-br from-sky-50/80 via-sky-50/30 to-white',
      containerBorder: 'border-sky-100',
      shadowColor: 'shadow-sky-600/30',
      icon: FileText
    },
    {
      id: 'step-2',
      stepNumber: '02',
      title: 'Personality & Aptitude Test',
      subTitle: 'Comprehensive Aptitude Assessment',
      desc: 'We diagnose applicants\' alignment with Dasan\'s core values, integrity, logical problem-solving abilities, and practical aptitude through an online examination.',
      tags: ['Online Assessment', 'Aptitude Test', 'Core Values Alignment'],
      badgeBg: 'bg-teal-600',
      containerBg: 'bg-gradient-to-br from-teal-50/80 via-teal-50/30 to-white',
      containerBorder: 'border-teal-100',
      shadowColor: 'shadow-teal-600/30',
      icon: ClipboardList
    },
    {
      id: 'step-3',
      stepNumber: '03',
      title: lines[4] || '1st Practical Interview',
      subTitle: lines[5] || 'Job Fit & Working Competency',
      desc: 'Through in-depth interviews with working-level practitioners, we verify applicants\' specialized knowledge, practical job capabilities, and collaborative communication skills.',
      tags: ['Practitioner Interview', 'Practical Competency', 'Job Verification'],
      badgeBg: 'bg-indigo-600',
      containerBg: 'bg-gradient-to-br from-indigo-50/80 via-indigo-50/30 to-white',
      containerBorder: 'border-indigo-100',
      shadowColor: 'shadow-indigo-600/30',
      icon: Briefcase
    },
    {
      id: 'step-4',
      stepNumber: '04',
      title: lines[6] || '2nd Executive Interview',
      subTitle: lines[7] || 'Personality & Future Potential',
      desc: 'Through comprehensive interviews with executive leadership, we evaluate alignment with company vision, professional ethics, teamwork, and long-term growth potential.',
      tags: ['Executive Leadership', 'Corporate Culture', 'Future Potential'],
      badgeBg: 'bg-purple-600',
      containerBg: 'bg-gradient-to-br from-purple-50/80 via-purple-50/30 to-white',
      containerBorder: 'border-purple-100',
      shadowColor: 'shadow-purple-600/30',
      icon: UserCheck
    },
    {
      id: 'step-5',
      stepNumber: '05',
      title: 'Health Examination',
      subTitle: 'Pre-employment Medical Checkup',
      desc: 'Prior to joining, candidates undergo a routine medical examination at designated healthcare institutions to ensure a healthy and safe work environment.',
      tags: ['Designated Clinic', 'Health Checkup', 'Safe Workplace'],
      badgeBg: 'bg-rose-500',
      containerBg: 'bg-gradient-to-br from-rose-50/80 via-rose-50/30 to-white',
      containerBorder: 'border-rose-100',
      shadowColor: 'shadow-rose-500/30',
      icon: Stethoscope
    },
    {
      id: 'step-6',
      stepNumber: '06',
      title: lines[8] || 'Final Acceptance',
      subTitle: lines[9] || 'Offer & Welcome Onboarding',
      desc: 'Congratulations on your final acceptance! We coordinate employment conditions, finalize starting dates, and welcome you as a proud new member of Dasan Pharmaceutical.',
      tags: ['Offer Coordination', 'Start Date Finalized', 'Welcome Onboarding'],
      badgeBg: 'bg-emerald-600',
      containerBg: 'bg-gradient-to-br from-emerald-50/80 via-emerald-50/30 to-white',
      containerBorder: 'border-emerald-100',
      shadowColor: 'shadow-emerald-600/30',
      icon: CheckCircle2
    }
  ];

  const steps = isEnglish ? stepsEn : stepsKo;

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
