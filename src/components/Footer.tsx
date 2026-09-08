'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith('/en');
  
  if (pathname.startsWith('/management')) {
    return null;
  }

  return (
    <footer className="bg-[#212832] text-slate-200 select-none relative overflow-hidden antialiased">
      {/* Premium ambient glow in footer background */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-brand-green/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[35%] h-[35%] rounded-full bg-brand-cyan/10 blur-[100px] pointer-events-none" />

      <div className="w-full px-6 md:px-16 lg:px-24 pt-9 sm:pt-12 pb-6 sm:pb-8 relative z-10">
        <div className="text-center flex flex-col items-center gap-8 sm:gap-10">
          {/* Company Details & Privacy Policy Link */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-6 gap-y-2.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-brand-green font-bold text-xs uppercase tracking-wide">
                {isEnglish ? "Address" : "주소"}
              </span>
              <span className="font-medium text-slate-200">
                {isEnglish ? "Rm 1302, Woori Venture Town II, 70 Seonyu-ro, Yeongdeungpo-gu, Seoul, Dasan Pharmaceutical Co., Ltd." : "서울특별시 영등포구 선유로 70 우리벤처타운II 1302호 (주)다산제약"}
              </span>
            </div>

            <span className="hidden sm:inline-block text-white/20">|</span>

            <span className="font-semibold text-slate-100">
              {isEnglish ? "Hyoung-seon Ryu" : "류형선"}
            </span>

            <span className="hidden sm:inline-block text-white/20">|</span>

            <Link 
              href={isEnglish ? "/en/privacy" : "/privacy"} 
              className="font-bold text-slate-200 hover:text-brand-green transition-colors underline-offset-4 hover:underline"
            >
              {isEnglish ? "Privacy Policy" : "개인정보취급방침"}
            </Link>
          </div>

          {/* Copyright Notice */}
          <p className="text-[11.5px] text-slate-400 font-normal tracking-wide">
            © 2026 <span className="text-slate-300 font-semibold">DASAN Pharmaceutical Co., Ltd.</span> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
