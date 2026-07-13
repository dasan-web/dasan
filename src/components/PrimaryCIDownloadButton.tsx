"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Download } from 'lucide-react';

export default function PrimaryCIDownloadButton() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = '/dasan_logo_new_1.png';
    link.download = 'dasan_logo.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="group w-full md:w-auto relative inline-flex items-center justify-center px-8 py-5 font-bold text-white transition-all duration-300 bg-[#2A5C43] rounded-2xl hover:shadow-xl hover:-translate-y-1 overflow-hidden cursor-default"
    >
      <span className="relative flex items-center space-x-3 tracking-wide text-[15px]">
        <span>{isEnglish ? "Download CI" : "CI 다운로드"}</span>
        <button 
          onClick={handleDownload}
          className="bg-white/20 hover:bg-white/40 active:bg-white/50 rounded-full p-1.5 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#2A5C43]"
          aria-label={isEnglish ? "Download CI" : "CI 다운로드"}
        >
          <Download size={18} strokeWidth={2.5} />
        </button>
      </span>
    </div>
  );
}
