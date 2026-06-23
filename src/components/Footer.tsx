'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  
  if (pathname.startsWith('/management')) {
    return null;
  }
  
  return (
    <footer className="bg-[#050f19] text-white border-t border-white/10 select-none relative overflow-hidden antialiased">
      {/* Premium ambient glow in footer background */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-brand-green/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[35%] h-[35%] rounded-full bg-brand-cyan/5 blur-[100px] pointer-events-none" />

      <div className="w-full px-6 md:px-16 lg:px-24 py-8 md:py-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 justify-between">
          
          {/* Brand Column */}
          <div className="lg:w-[490px] xl:w-[540px] space-y-5 shrink-0">
            <div className="space-y-3">
              <span className="text-xl font-black tracking-wider text-white relative">
                DASAN<span className="text-brand-teal font-medium">PHARM</span>
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-green to-brand-cyan/50" />
              </span>
              <p className="text-[12px] text-white max-w-sm leading-relaxed pt-2 font-semibold">
                다산제약은 끊임없는 R&D 혁신과 품질 제고를 통해 인류의 건강한 삶과<br />행복을 만들어가는 글로벌 바이오 헬스케어 기업입니다.
              </p>
            </div>
            
            <div className="pt-2 w-full overflow-x-auto border border-white/10 rounded-xl bg-white/[0.01] shadow-2xl backdrop-blur-xs">
              <table className="w-full text-left border-collapse text-[12px] min-w-[340px]">
                <tbody className="divide-y divide-white/10">
                  <tr className="hover:bg-white/[0.02] transition-colors duration-150">
                    <td className="py-2 px-3 bg-white/5 font-black text-brand-green whitespace-nowrap w-[55px] border-r border-white/10 text-center">본사</td>
                    <td className="py-2 px-3 text-white font-bold whitespace-nowrap">서울특별시 영등포구 선유로 70 우리벤처타운 II 1302호</td>
                    <td className="py-2 px-3 text-white font-bold whitespace-nowrap border-l border-white/10 text-right">02-2679-5206</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors duration-150">
                    <td className="py-2 px-3 bg-white/5 font-black text-brand-green whitespace-nowrap w-[55px] border-r border-white/10 text-center">연구소</td>
                    <td className="py-2 px-3 text-white font-bold whitespace-nowrap">경기 수원시 영통구 신원로 304 이노플렉스 3동 306호</td>
                    <td className="py-2 px-3 text-white font-bold whitespace-nowrap border-l border-white/10 text-right">031-546-8200</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors duration-150">
                    <td className="py-2 px-3 bg-white/5 font-black text-brand-green whitespace-nowrap w-[55px] border-r border-white/10 text-center">1공장</td>
                    <td className="py-2 px-3 text-white font-bold whitespace-nowrap">충청남도 아산시 도고면 덕암산로 342</td>
                    <td className="py-2 px-3 text-white font-bold whitespace-nowrap border-l border-white/10 text-right">041-543-5311</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors duration-150">
                    <td className="py-2 px-3 bg-white/5 font-black text-brand-green whitespace-nowrap w-[55px] border-r border-white/10 text-center">2공장</td>
                    <td className="py-2 px-3 text-white font-bold whitespace-nowrap">충청남도 아산시 도고면 덕암산로 381</td>
                    <td className="py-2 px-3 text-white font-bold whitespace-nowrap border-l border-white/10 text-right">041-428-9484</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Premium Sitemap Grid Table */}
          <div className="flex-1 w-full border border-white/10 rounded-xl overflow-hidden grid grid-cols-2 md:grid-cols-5 divide-x divide-white/10 divide-y md:divide-y-0 divide-white/10 bg-white/[0.01] shadow-2xl backdrop-blur-xs">
            
            {/* Col 1: About Us */}
            <div className="flex flex-col divide-y divide-white/10">
              <div className="p-3 pl-3.5 bg-white/5 font-black text-white text-[12px] uppercase tracking-widest text-left">
                About Us
              </div>
              <div className="p-3.5 flex-1 space-y-2.5">
                <span className="text-[12px] font-extrabold text-brand-green uppercase tracking-wider block">
                  회사소개
                </span>
                <ul className="space-y-2 text-[12px] text-white font-bold">
                  <li><Link href="/about/intro" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">기업개요</Link></li>
                  <li><Link href="/about/business-area" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">사업영역</Link></li>
                  <li><Link href="/about/history" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">연혁</Link></li>
                  <li><Link href="/about/facilities" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">공장 및 연구소</Link></li>
                  <li><Link href="/about/location" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">찾아오시는 길</Link></li>
                </ul>
              </div>
            </div>

            {/* Col 2: ESG & IR */}
            <div className="flex flex-col divide-y divide-white/10">
              <div className="p-3 pl-3.5 bg-white/5 font-black text-white text-[12px] uppercase tracking-widest text-left">
                ESG & IR
              </div>
              <div className="p-3.5 flex-1 space-y-3.5">
                <div className="space-y-2">
                  <span className="text-[12px] font-extrabold text-brand-green uppercase tracking-wider block">
                    ESG 경영
                  </span>
                  <ul className="space-y-2 text-[12px] text-white font-bold">
                    <li><Link href="/about/esg/ethics" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">윤리경영</Link></li>
                    <li><Link href="/about/esg/environment" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">환경경영</Link></li>
                    <li><Link href="/about/esg/safety" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">안전보건경영</Link></li>
                  </ul>
                </div>
                <div className="space-y-2 pt-3 border-t border-white/5">
                  <span className="text-[12px] font-extrabold text-brand-green uppercase tracking-wider block">
                    공시 및 재무
                  </span>
                  <ul className="space-y-2 text-[12px] text-white font-bold">
                    <li><Link href="/about/ir/announcement" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">공시정보</Link></li>
                    <li><Link href="/about/ir/financial" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">재무정보</Link></li>
                    <li><Link href="/about/ir/news" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">IR News</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Col 3: R&D & CDMO */}
            <div className="flex flex-col divide-y divide-white/10">
              <div className="p-3 pl-3.5 bg-white/5 font-black text-white text-[12px] uppercase tracking-widest text-left">
                R&D & CDMO
              </div>
              <div className="p-3.5 flex-1 space-y-3.5">
                <div className="space-y-2">
                  <span className="text-[12px] font-extrabold text-brand-green uppercase tracking-wider block">
                    연구분야
                  </span>
                  <ul className="space-y-2 text-[12px] text-white font-bold">
                    <li><Link href="/rd/intro" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">연구소 소개</Link></li>
                    <li><Link href="/rd/activities" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">연구 활동</Link></li>
                    <li><Link href="/rd/pipeline" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">파이프라인</Link></li>
                  </ul>
                </div>
                <div className="space-y-2 pt-3 border-t border-white/5">
                  <span className="text-[12px] font-extrabold text-brand-green uppercase tracking-wider block">
                    CDMO 서비스
                  </span>
                  <ul className="space-y-2 text-[12px] text-white font-bold">
                    <li><Link href="/business/cdmo/quality" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">서비스 품질</Link></li>
                    <li><Link href="/business/cdmo/advantages" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">특장점</Link></li>
                    <li><Link href="/business/cdmo/logistics" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">물류</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Col 4: Products */}
            <div className="flex flex-col divide-y divide-white/10">
              <div className="p-3 pl-3.5 bg-white/5 font-black text-white text-[12px] uppercase tracking-widest text-left">
                Products
              </div>
              <div className="p-3.5 flex-1 space-y-3.5">
                <div className="space-y-2">
                  <span className="text-[12px] font-extrabold text-brand-green uppercase tracking-wider block">
                    완제의약품
                  </span>
                  <ul className="space-y-2 text-[12px] text-white font-bold">
                    <li><Link href="/business/finished/search" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">제품검색</Link></li>
                    <li><Link href="/business/finished/news" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">제품소식</Link></li>
                  </ul>
                </div>
                <div className="space-y-2 pt-3 border-t border-white/5">
                  <span className="text-[12px] font-extrabold text-brand-green uppercase tracking-wider block">
                    API
                  </span>
                  <ul className="space-y-2 text-[12px] text-white font-bold">
                    <li><Link href="/business/api/raw" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">원료의약품(API)</Link></li>
                    <li><Link href="/business/api/intermediates" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">원료의약품 중간체</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Col 5: Support */}
            <div className="flex flex-col divide-y divide-white/10">
              <div className="p-3 pl-3.5 bg-white/5 font-black text-white text-[12px] uppercase tracking-widest text-left">
                Support
              </div>
              <div className="p-3.5 flex-1 space-y-3.5">
                <div className="space-y-2">
                  <span className="text-[12px] font-extrabold text-brand-green uppercase tracking-wider block">
                    뉴스룸 & 채용
                  </span>
                  <ul className="space-y-2 text-[12px] text-white font-bold">
                    <li><Link href="/contact/newsroom/press" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">보도자료</Link></li>
                    <li><Link href="/contact/newsroom/media" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">홍보자료실</Link></li>
                    <li><Link href="/contact/careers/talent" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">인재상</Link></li>
                    <li><Link href="/contact/careers/process" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">채용절차</Link></li>
                    <li><Link href="/contact/careers/jobs" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">채용공고</Link></li>
                  </ul>
                </div>
                <div className="space-y-2 pt-3 border-t border-white/5">
                  <span className="text-[12px] font-extrabold text-brand-green uppercase tracking-wider block">
                    고객센터
                  </span>
                  <ul className="space-y-2 text-[12px] text-white font-bold">
                    <li><Link href="/contact/inquiry" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">제품 문의</Link></li>
                    <li><Link href="/contact/inquiry/check" className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">문의 확인</Link></li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="border-t border-white/10 mt-6 md:mt-8 pt-4 text-[12px] text-white font-semibold text-center">
          <p>© 2026 DASAN Pharmaceutical Co., Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
