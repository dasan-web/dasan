"use client";

import React from 'react';
import { Download } from 'lucide-react';

export default function PrimaryCIDownloadButton() {
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
    <button 
      onClick={handleDownload} 
      className="group w-full md:w-auto relative inline-flex items-center justify-center px-8 py-5 font-bold text-white transition-all duration-300 bg-[#2A5C43] rounded-2xl hover:bg-[#1f4532] hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2A5C43] overflow-hidden cursor-pointer"
    >
      <span className="relative flex items-center space-x-3 tracking-wide text-[15px]">
        <span>CI 다운로드</span>
        <div className="bg-white/20 rounded-full p-1.5 group-hover:bg-white/30 transition-colors duration-300">
          <Download size={18} strokeWidth={2.5} />
        </div>
      </span>
    </button>
  );
}
