'use client';

import React from 'react';
import { 
  FlaskConical, 
  ClipboardCheck, 
  RefreshCw, 
  ShieldCheck, 
  Factory, 
  ArrowRight, 
  ArrowDown 
} from 'lucide-react';
import ScrollVideo from '@/components/ScrollVideo';
import CDMOTabSection from '@/components/CDMOTabSection';
import { parseBusinessCdmoData } from '@/lib/businessCdmo';

interface CdmoContentProps {
  dbContent?: string | null;
  isPreview?: boolean;
}

export default function CdmoContent({ dbContent, isPreview = false }: CdmoContentProps) {
  const data = parseBusinessCdmoData(dbContent);

  const stepIcons = [
    FlaskConical,
    ClipboardCheck,
    RefreshCw,
    ShieldCheck,
    Factory
  ];

  return (
    <>
      <div className="mb-12 mt-4">
        <ScrollVideo src="/CDMO_219.mp4?v=clean" poster="/poster_cdmo.jpg?v=clean" isPreview={isPreview} />
      </div>
      
      <div className="mt-24 w-full max-w-full mx-auto animate-fade-in-up px-4 md:px-0 pb-20">
        {/* Header Section */}
        <div className="flex flex-col space-y-6 mb-24 sm:mb-28">
          <h2 className="text-[36px] sm:text-[42px] md:text-[48px] font-black text-[#111] leading-[1.25] tracking-tight">
            {data.title}
          </h2>
          <div className="text-gray-600 leading-[1.85] text-[17px] md:text-[18.5px] space-y-3 w-full">
            <p className="break-keep font-medium text-[#555] whitespace-pre-line">
              {data.desc1}
            </p>
            <p className="break-keep font-medium text-[#555] whitespace-pre-line">
              {data.desc2}
            </p>
          </div>
        </div>

        {/* Quality / Process Title */}
        <div className="mb-7">
          <h3 className="text-[28px] md:text-[32px] font-black text-gray-900 tracking-tight">
            {data.processTitle}
          </h3>
        </div>

        {/* Process Flow (5 Steps) with Arrow Connectors */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-3 pt-2">
          {data.steps.map((stepItem, idx) => {
            const Icon = stepIcons[idx] || FlaskConical;
            const isLast = idx === data.steps.length - 1;

            return (
              <React.Fragment key={idx}>
                {/* Step Card */}
                <div className="flex-1 w-full bg-white border border-gray-200/70 hover:border-[#64ad55] rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
                  <div>
                    <div className="flex items-center justify-between w-full mb-4">
                      <span className="text-[12px] sm:text-[12.5px] font-black text-[#64ad55] uppercase tracking-wider bg-[#64ad55]/10 px-3 py-1 rounded-md">
                        {stepItem.step || `STEP 0${idx + 1}`}
                      </span>
                      <Icon 
                        size={24} 
                        strokeWidth={1.5} 
                        className="text-[#64ad55] transition-transform duration-300 group-hover:scale-110" 
                      />
                    </div>
                    <h4 className="text-[18px] sm:text-[19px] font-bold text-gray-900 mb-2.5 tracking-tight">
                      {stepItem.title}
                    </h4>
                    <p className="text-[14px] sm:text-[14.5px] text-gray-600 leading-[1.7] break-keep font-normal whitespace-pre-line">
                      {stepItem.desc}
                    </p>
                  </div>
                </div>

                {/* Arrow to Next Step */}
                {!isLast && (
                  <div className="flex items-center justify-center py-1 lg:py-0 px-0.5 text-[#64ad55]">
                    <div className="w-8 h-8 rounded-full bg-[#64ad55]/10 border border-[#64ad55]/30 flex items-center justify-center shadow-2xs transition-transform hover:scale-110">
                      <ArrowRight size={16} strokeWidth={2.5} className="hidden lg:block text-[#64ad55]" />
                      <ArrowDown size={16} strokeWidth={2.5} className="block lg:hidden text-[#64ad55]" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Interactive WHY DASAN & Detailed Tab Section */}
        <CDMOTabSection />
      </div>
    </>
  );
}
