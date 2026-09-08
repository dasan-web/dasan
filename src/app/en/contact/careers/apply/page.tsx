import React, { Suspense } from 'react';
import Link from 'next/link';
import { navigationData } from '@/lib/navigation';
import SubmenuTabBar from '@/components/SubmenuTabBar';
import TalentApplyForm from '@/components/TalentApplyForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Talent Pool Application | Dasan Pharmaceutical',
  description: 'Submit your resume and application to Dasan Pharmaceutical Talent Pool.',
  keywords: 'Dasan Pharmaceutical careers, Talent Pool, job application, pharma recruitment',
};

export default function EnContactCareersApplyPage() {
  const currentPath = '/en/contact/careers/jobs';
  const activeTitle = 'Talent Pool Application';
  const activeMajor = 'Careers';
  
  const grandContact = navigationData.find(g => g.name === 'Connect');
  const activeMajorObj = grandContact?.majors.find(m => m.enName === activeMajor || m.name === '채용정보') || null;

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
                  <p className="text-sm font-medium">Loading application form...</p>
                </div>
              }>
                <TalentApplyForm isEnglish={true} />
              </Suspense>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
