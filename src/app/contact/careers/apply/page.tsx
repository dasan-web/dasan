import React, { Suspense } from 'react';
import Link from 'next/link';
import { navigationData } from '@/lib/navigation';
import SubmenuTabBar from '@/components/SubmenuTabBar';
import TalentApplyForm from '@/components/TalentApplyForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '상시 지원서 작성 | 다산제약',
  description: '다산제약 상시 인재풀 입사지원서 작성 및 접수 페이지입니다.',
  keywords: '다산제약 채용, 상시 인재풀, 입사지원서, 제약 바이오 채용',
};

export default function ContactCareersApplyPage() {
  const currentPath = '/contact/careers/jobs';
  const activeTitle = '상시 지원서 작성';
  const activeMajor = '채용정보';
  
  const grandContact = navigationData.find(g => g.name === 'Connect');
  const activeMajorObj = grandContact?.majors.find(m => m.name === activeMajor) || null;

  return (
    <div className="relative bg-white py-16 md:py-24 min-h-screen">
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 mt-8">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Right Main Content - Expanded to full width (col-span-5) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col items-center w-full">
            {/* Header - Centered for symmetry */}
            <div className="pb-8 w-full text-center flex flex-col items-center">
              <div className="flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-green mb-3">
                <span>{grandContact?.name}</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-400">{activeMajor}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-brand-blue tracking-tight text-center mb-6">
                {activeTitle}
              </h2>

              {/* Submenu Tab Bar */}
              <SubmenuTabBar subMenus={activeMajorObj?.subMenus || []} currentPath={currentPath} />
            </div>

            {/* Dynamic Content: Talent Apply Form with Suspense for useSearchParams */}
            <div className="min-h-[550px] w-full max-w-3xl">
              <Suspense fallback={
                <div className="text-center py-20 text-slate-400">
                  <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-sm font-medium">지원서 양식을 불러오는 중입니다...</p>
                </div>
              }>
                <TalentApplyForm isEnglish={false} />
              </Suspense>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
