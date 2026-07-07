"use client";

import React from 'react';
import { Download } from 'lucide-react';

export default function CIDownloadButton() {
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = '/다산제약 CI 브랜드 가이드 라인.pdf';
    link.download = '다산제약 CI 브랜드 가이드 라인.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-16 mb-12 w-full">
      <div className="group relative flex items-center w-full p-1 bg-[#2A5C43] rounded-3xl hover:shadow-[0_20px_40px_-15px_rgba(42,92,67,0.5)] hover:-translate-y-1 transition-all duration-500 overflow-hidden text-left cursor-default">
        <div className="relative w-full flex flex-col sm:flex-row items-center justify-center bg-white px-10 py-7 sm:py-6 rounded-[22px] transition-colors duration-500 group-hover:bg-[#f8fcf9] gap-4 sm:gap-6">
          
          <div className="flex flex-col text-center sm:text-left z-10">
            <span className="text-[13px] font-extrabold text-[#777] tracking-[0.2em] mb-1">BRAND IDENTITY</span>
            <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-4">
              <span className="text-[22px] sm:text-[24px] font-extrabold text-gray-900 tracking-tight group-hover:text-[#2A5C43] transition-colors duration-300">다산제약 CI 가이드라인 파일 받기</span>
              <button 
                onClick={handleDownload}
                className="group/btn flex-shrink-0 w-14 h-14 bg-[#f0f5f2] hover:bg-[#2A5C43] active:bg-[#1a3a2a] rounded-2xl flex items-center justify-center transition-colors duration-300 shadow-inner cursor-pointer z-20 relative focus:outline-none focus:ring-2 focus:ring-[#2A5C43] focus:ring-offset-2"
                aria-label="CI 가이드라인 다운로드"
              >
                <Download className="text-[#2A5C43] group-hover/btn:text-white transition-colors duration-300" size={26} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-[#4294D0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-r-[22px] pointer-events-none z-0"></div>
        </div>
      </div>
    </div>
  );
}
