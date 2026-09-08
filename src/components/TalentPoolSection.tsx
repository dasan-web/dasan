'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FlaskConical, 
  Factory, 
  Pill, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Clock,
  ChevronDown
} from 'lucide-react';

interface TalentPoolSectionProps {
  isEnglish?: boolean;
}

interface CareerRole {
  id: string;
  nameKo: string;
  nameEn: string;
  companyKo: string;
  companyEn: string;
  titleKo: string;
  titleEn: string;
  categoryKo: string;
  categoryEn: string;
  workplaceKo: string;
  workplaceEn: string;
  qualificationKo: string;
  qualificationEn: string;
  badgesKo: string[];
  badgesEn: string[];
  detailsKo: string[];
  detailsEn: string[];
}

const CAREER_ROLES: CareerRole[] = [
  {
    id: 'research',
    nameKo: '연구직 (R&D)',
    nameEn: 'Research & Development (R&D)',
    companyKo: '(주)다산제약 · 중앙연구소',
    companyEn: 'DASAN PHARM · Central R&D Center',
    titleKo: '[연구개발 R&D] 제제연구, 합성연구, 분석연구 신입 및 경력 상시 채용',
    titleEn: '[R&D] Formulation, Synthesis & Analytical Research Entry/Experienced Continuous Hiring',
    categoryKo: '연구개발',
    categoryEn: 'R&D',
    workplaceKo: '중앙연구소 (용인 / 수원)',
    workplaceEn: 'Central R&D Center (Yongin / Suwon)',
    qualificationKo: '약학, 화학, 생명공학, 유기합성 등 이공계 학사·석사·박사',
    qualificationEn: 'B.S., M.S., Ph.D. in Pharmacy, Chemistry, Bioengineering, etc.',
    badgesKo: ['신입 / 경력', '연구개발', '경기 용인, 경기 수원', '약학·화학·생명공학 석·박사 및 학사'],
    badgesEn: ['Entry / Experienced', 'R&D', 'Yongin / Suwon', 'B.S., M.S., Ph.D.'],
    detailsKo: [
      '제제연구: DDS 특화 제형, 서방형 제제, 구강붕해정 연구개발',
      '합성연구: 원료의약품(API) 신규 합성 루트 개발 및 스케일업',
      '분석연구: HPLC, LC-MS/MS 정밀 분석법 개발 및 밸리데이션'
    ],
    detailsEn: [
      'Formulation Research: DDS platform formulations, controlled-release',
      'Synthesis Research: API synthesis route design & scale-up',
      'Analytical Research: HPLC, LC-MS/MS method development & validation'
    ]
  },
  {
    id: 'production',
    nameKo: '생산직 (의약품 제조·생산)',
    nameEn: 'Manufacturing & Production',
    companyKo: '(주)다산제약 · 아산 제1·2공장',
    companyEn: 'DASAN PHARM · Asan Plant 1 & 2',
    titleKo: '[생산직 제조] 의약품 정제·과립·타정·코팅 및 자동화 포장설비 운전 상시 채용',
    titleEn: '[Manufacturing] Solid Dosage Formulation, Tableting & Automated Packaging Continuous Hiring',
    categoryKo: '생산/제조',
    categoryEn: 'Manufacturing',
    workplaceKo: '아산 제1·2공장 (충남 아산)',
    workplaceEn: 'Asan Plant 1 & 2 (Asan, Chungnam)',
    qualificationKo: '고등학교 졸업 이상 (신입/경력), 교대근무 가능자 우대',
    qualificationEn: 'High school diploma or higher (Entry/Experienced), shift work available',
    badgesKo: ['신입 / 경력', '생산 / 제조', '충남 아산', '고등학교 졸업 이상'],
    badgesEn: ['Entry / Experienced', 'Manufacturing', 'Asan, Chungnam', 'High School Diploma+'],
    detailsKo: [
      '고형제/캡슐제 제조 (조제, 과립, 혼합, 타정, 코팅 공정 운전)',
      '자동화 포장 라인 가동 (블리스터, PTP, 병포장, 카토너 운용)',
      'cGMP 제조설비 일상 점검 및 청정 작업장 환경/위생 관리'
    ],
    detailsEn: [
      'Solid dosage manufacturing (granulation, blending, tableting, coating)',
      'Automated packaging line operation (Blister, PTP, bottle packaging)',
      'cGMP equipment routine maintenance & cleanroom environmental control'
    ]
  },
  {
    id: 'pharmacist_quality',
    nameKo: '품질관리 & 약사 (QA·QC)',
    nameEn: 'Quality & Pharmacist (QA / QC)',
    companyKo: '(주)다산제약 · 품질본부 / 공장',
    companyEn: 'DASAN PHARM · Quality Division / Plant',
    titleKo: '[품질·약사 QA/QC] 제조·품질 관리약사, 시험분석(QC) 및 품질보증(QA) 상시 채용',
    titleEn: '[Quality & Pharmacist] Responsible Pharmacist, QC Testing & QA Ongoing Recruitment',
    categoryKo: '품질/약사',
    categoryEn: 'Quality/Pharmacist',
    workplaceKo: '아산 공장 (충남 아산)',
    workplaceEn: 'Asan Plant (Chungnam)',
    qualificationKo: '약사 면허 소지자 우대 / 약학, 화학, 생물학 등 관련 학사 이상',
    qualificationEn: 'Licensed Pharmacist preferred / Bachelor in Chemistry, Biology or related',
    badgesKo: ['신입 / 경력', '품질 / 약사', '충남 아산', '약사 면허 우대'],
    badgesEn: ['Entry / Experienced', 'Quality / Pharmacist', 'Asan, Chungnam', 'Pharmacist Preferred'],
    detailsKo: [
      '제조·품질 관리약사: 의약품 제조/출하 승인 및 규정 준수 총괄',
      '품질관리(QC): 원료, 자재, 완제품 이화학 및 미생물 시험분석',
      '품질보증(QA) & RA: cGMP 밸리데이션, 변경관리, 품목허가 등록'
    ],
    detailsEn: [
      'Responsible Pharmacist: batch release approval & regulatory compliance',
      'Quality Control (QC): physicochemical & microbiological testing',
      'Quality Assurance (QA) & RA: validation, change control, drug registration'
    ]
  },
  {
    id: 'business',
    nameKo: '영업·마케팅 & 경영지원',
    nameEn: 'Business & Corporate Support',
    companyKo: '(주)다산제약 · 서울사무소 / 공장',
    companyEn: 'DASAN PHARM · Seoul Office / Plant',
    titleKo: '[영업·경영지원] 전문의약품(ETC) 영업, 해외수출 및 경영관리 상시 채용',
    titleEn: '[Sales & Corporate] ETC Sales, Global Business & Management Ongoing Recruitment',
    categoryKo: '영업/경영',
    categoryEn: 'Sales/Corporate',
    workplaceKo: '서울사무소 (영등포)',
    workplaceEn: 'Seoul Office (Yeongdeungpo)',
    qualificationKo: '전문학사 이상 (신입/경력), 제약/바이오 관련 직무 유경험자 우대',
    qualificationEn: 'Associate/Bachelor degree (Entry/Experienced), pharma experience preferred',
    badgesKo: ['신입 / 경력', '영업 / 경영지원', '서울 영등포', '전문학사 이상'],
    badgesEn: ['Entry / Experienced', 'Sales / Management', 'Seoul (Yeongdeungpo)', 'Associate Degree+'],
    detailsKo: [
      '전문의약품(ETC) 병·의원 영업 및 유통 거래처 관리',
      '글로벌 수출입 비즈니스 개발 및 해외 파트너사 협력',
      '경영지원: 인사/총무, 회계/재경, SCM(구매/물류), IT 인프라'
    ],
    detailsEn: [
      'Prescription drug (ETC) hospital/clinic sales & distribution',
      'Global business development & overseas partnership communication',
      'Corporate: HR, General Affairs, Accounting/Finance, SCM, IT'
    ]
  }
];

export default function TalentPoolSection({ isEnglish = false }: TalentPoolSectionProps) {
  const router = useRouter();
  const [showRolesList, setShowRolesList] = useState(false);
  const rolesListRef = useRef<HTMLDivElement | null>(null);
  const [expandedRoleId, setExpandedRoleId] = useState<string | null>(null);

  // If accessed directly via #talent-roles, ensure it does not show and remove hash from URL
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#talent-roles') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  const handleToggleRoles = () => {
    setShowRolesList((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => {
          rolesListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
      return next;
    });
  };

  const handleNavigateApply = (roleKo?: string, roleEn?: string) => {
    let url = isEnglish ? '/en/contact/careers/apply' : '/contact/careers/apply';
    if (roleKo || roleEn) {
      const roleParam = encodeURIComponent(isEnglish ? (roleEn || '') : (roleKo || ''));
      url += `?role=${roleParam}`;
    }
    router.push(url);
  };

  return (
    <div className="w-full space-y-10">
      
      {/* 1. Header Banner & Introduction (Clean White with Gray Border) */}
      <div className="relative rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-10 md:p-12 shadow-xs">
        <div className="max-w-3xl space-y-4 text-left">
          <span className="text-xs font-bold text-brand-green uppercase tracking-wider block">
            {isEnglish ? 'Talent Pool · Continuous Hiring' : '상시 인재풀 등록 · 상시 채용'}
          </span>

          <h3 className="text-2xl sm:text-3xl md:text-[34px] font-black text-slate-900 tracking-tight leading-snug">
            {isEnglish ? (
              <>Innovate Together with Dasan,<br /><span className="text-emerald-600">Anytime, Anywhere.</span></>
            ) : (
              <>다산제약과 함께 미래를 열어갈 <span className="text-emerald-600">인재를 상시 모십니다</span></>
            )}
          </h3>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed break-keep font-normal">
            {isEnglish ? (
              'Dasan Pharmaceutical welcomes passionate talents across R&D, manufacturing, quality control/pharmacists, and corporate management. Register your resume in our talent pool, and we will contact you on priority as relevant job openings arise.'
            ) : (
              '다산제약은 생산직, 연구직, 약사·품질관리, 경영·영업 등 전 직군에서 열정적인 인재를 상시 접수받고 있습니다. 본인의 역량을 등록해 주시면 해당 부문의 채용 소요 발생 시 최우선으로 검토하여 개별 연락드립니다.'
            )}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href={isEnglish ? '/en/contact/careers/apply' : '/contact/careers/apply'}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-sm border border-slate-200 transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <span>{isEnglish ? 'Apply to Talent Pool Now' : '상시 지원서 바로 접수하기'}</span>
              <ArrowRight size={16} className="text-slate-500" />
            </Link>
            <button
              type="button"
              onClick={handleToggleRoles}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-sm border border-slate-200 transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <span>
                {showRolesList
                  ? (isEnglish ? 'Hide Positions' : '상시 모집 공고 닫기')
                  : (isEnglish ? 'View Positions' : '상시 모집 공고 목록')}
              </span>
              <ChevronDown
                size={16}
                className={`text-slate-500 transition-transform duration-200 ${showRolesList ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 그림1: 상시 채용 프로세스 및 상시 모집 직군 (토글 표시) */}
      {showRolesList && (
        <div ref={rolesListRef} className="space-y-10 animate-fade-in pt-2">
          {/* 2. Recruitment Process Roadmap (4 Steps) */}
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              {isEnglish ? 'Continuous Recruitment Process' : '상시 채용 프로세스 안내'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {isEnglish ? 'How your registered profile is reviewed and progressed' : '인재풀 등록부터 입사까지 진행되는 단계입니다'}
            </p>
          </div>
          <div className="hidden sm:flex items-center space-x-1.5 text-xs text-emerald-700 font-bold bg-emerald-100/60 px-3 py-1.5 rounded-full border border-emerald-200">
            <Clock size={14} />
            <span>{isEnglish ? 'Rolling Review' : '상시 수시 검토'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: 'STEP 01',
              titleKo: '상시 지원서 접수',
              titleEn: 'Application Submit',
              descKo: '온라인 상시 접수 또는 이메일을 통해 이력서 및 경력기술서 접수',
              descEn: 'Submit your resume & profile via online form or HR email.',
            },
            {
              step: 'STEP 02',
              titleKo: '인재풀 등록 및 상시 검토',
              titleEn: 'Talent Pool Review',
              descKo: '접수된 서류는 인재풀 DB에 보관되며 직무 수요 발생 시 우선 심사',
              descEn: 'Stored securely in DB and screened with priority upon vacancy.',
            },
            {
              step: 'STEP 03',
              titleKo: '개별 연락 및 인터뷰',
              titleEn: 'Individual Interview',
              descKo: '서류 적합 인재 대상 1차 실무진 인터뷰 및 2차 임원 면접 진행',
              descEn: 'Qualified candidates undergo working-level & executive interviews.',
            },
            {
              step: 'STEP 04',
              titleKo: '최종 합격 및 온보딩',
              titleEn: 'Final Offer & Onboarding',
              descKo: '처우 협의 및 입사 일정 조율 후 다산제약 정식 입사',
              descEn: 'Final offer, compensation negotiation, and welcome onboarding.',
            }
          ].map((s, idx) => (
            <div 
              key={idx} 
              className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-emerald-300 transition-colors relative"
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {s.step}
                </span>
                {idx < 3 && (
                  <ArrowRight size={14} className="hidden lg:block text-slate-300" />
                )}
              </div>
              <h5 className="font-bold text-slate-900 text-sm mb-1.5">
                {isEnglish ? s.titleEn : s.titleKo}
              </h5>
              <p className="text-xs text-slate-500 leading-relaxed break-keep">
                {isEnglish ? s.descEn : s.descKo}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Horizontal Recruitment Cards List (Requested Format Matching Image 1) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h4 className="text-lg sm:text-xl font-extrabold text-slate-900">
              {isEnglish ? 'Continuous Hiring Positions' : '상시 모집 직군 안내'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isEnglish ? 'Select your desired field to register your resume anytime.' : '원하시는 직군을 선택하시면 상시 지원서를 바로 접수하실 수 있습니다.'}
            </p>
          </div>
          <span className="text-xs text-slate-400 font-medium self-start sm:self-auto">
            {isEnglish ? '4 Open Divisions' : '4개 대표 모집 분야'}
          </span>
        </div>

        {/* Stacked Horizontal Job Cards (Image 1 Style) */}
        <div className="space-y-3 sm:space-y-3.5">
          {CAREER_ROLES.map((role) => {
            const isExpanded = expandedRoleId === role.id;
            return (
              <div
                key={role.id}
                className="group rounded-2xl border border-slate-200/90 bg-[#f8f9fa] hover:bg-white hover:border-emerald-400/90 p-5 sm:py-5 sm:px-7 transition-all duration-200 shadow-2xs hover:shadow-md cursor-pointer"
                onClick={() => handleNavigateApply(role.nameKo, role.nameEn)}
              >
                {/* Top Row: Company/Division Name on Left, '상시' on Right */}
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-500 font-medium tracking-tight">
                    {isEnglish ? role.companyEn : role.companyKo}
                  </span>
                  <span className="text-xs text-slate-400 font-medium tracking-wide">
                    {isEnglish ? 'Continuous' : '상시'}
                  </span>
                </div>

                {/* Middle Row: Prominent Bold Job Title */}
                <h5 className="text-base sm:text-[17.5px] font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug mb-3">
                  {isEnglish ? role.titleEn : role.titleKo}
                </h5>

                {/* Bottom Row: Badges on Left, Actions on Right */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  {/* Left Badges (Image 1 Style) */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {(isEnglish ? role.badgesEn : role.badgesKo).map((badge, bIdx) => (
                      <span
                        key={bIdx}
                        className="px-2.5 py-1 rounded-md bg-white border border-slate-200/90 text-xs text-slate-600 font-normal shadow-2xs"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Right Actions: Detail Toggle & Apply Button */}
                  <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedRoleId(isExpanded ? null : role.id);
                      }}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? (isEnglish ? 'Close' : '접기') : (isEnglish ? 'Details' : '상세보기')}</span>
                      <ChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    <Link
                      href={isEnglish ? `/en/contact/careers/apply?role=${encodeURIComponent(role.nameEn)}` : `/contact/careers/apply?role=${encodeURIComponent(role.nameKo)}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs transition-colors shadow-2xs active:scale-95 cursor-pointer"
                    >
                      <span>{isEnglish ? 'Apply' : '상시 지원'}</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Expandable Details Container */}
                {isExpanded && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="mt-4 pt-4 border-t border-slate-200/80 text-xs text-slate-600 bg-white rounded-xl p-4 cursor-default animate-fade-in space-y-3"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="font-bold text-slate-800 block mb-1.5">{isEnglish ? 'Key Responsibilities' : '주요 수행 직무'}</span>
                        <ul className="space-y-1 text-slate-600 list-disc list-inside">
                          {(isEnglish ? role.detailsEn : role.detailsKo).map((d, dIdx) => (
                            <li key={dIdx} className="leading-relaxed">{d}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 block mb-1.5">{isEnglish ? 'Qualifications' : '자격요건'}</span>
                        <p className="leading-relaxed text-slate-600">{isEnglish ? role.qualificationEn : role.qualificationKo}</p>
                        <span className="font-bold text-slate-800 block mt-2 mb-1">{isEnglish ? 'Workplace' : '근무지'}</span>
                        <p className="leading-relaxed text-slate-600">{isEnglish ? role.workplaceEn : role.workplaceKo}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )}

</div>
);
}
