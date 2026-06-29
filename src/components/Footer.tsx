'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationData } from '@/lib/navigation';

export default function Footer() {
  const pathname = usePathname();
  
  if (pathname.startsWith('/management')) {
    return null;
  }

  const footerColumns: typeof navigationData = [];
  navigationData.forEach(grand => {
    if (grand.name === 'Company' && grand.majors.length >= 3) {
      footerColumns.push({
        ...grand,
        majors: [grand.majors[0]] // 회사소개
      });
      footerColumns.push({
        ...grand,
        name: 'ESG & IR', // 명칭 분리
        majors: [grand.majors[1], grand.majors[2]] // ESG, IR
      });
    } else {
      footerColumns.push(grand);
    }
  });

  return (
    <footer className="bg-[#050f19] text-white border-t border-white/10 select-none relative overflow-hidden antialiased">
      {/* Premium ambient glow in footer background */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-brand-green/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[35%] h-[35%] rounded-full bg-brand-cyan/5 blur-[100px] pointer-events-none" />

      <div className="w-full px-6 md:px-16 lg:px-24 py-8 md:py-10 relative z-10">
        
        {/* Unified Premium Section */}
        <div className="w-full flex flex-col">
          <h3 className="text-white font-black text-[15px] uppercase tracking-[0.2em] mb-4">
            Site Map
          </h3>
          
          <div className="w-full border border-white/10 rounded-xl overflow-hidden bg-white/[0.01] shadow-2xl backdrop-blur-xs flex flex-col">
            
            {/* TOP: Sitemap Grid */}
            <div className="w-full grid grid-cols-2 md:grid-cols-5 divide-x divide-white/10 divide-y md:divide-y-0 divide-white/10">
              {footerColumns.map((grand, gIdx) => (
              <div key={gIdx} className="flex flex-col divide-y divide-white/10">
                <div className={`p-3 bg-white/5 font-black text-white text-[14px] uppercase tracking-widest text-left ${gIdx === 0 ? 'pl-0' : 'pl-3.5'}`}>
                  {grand.name}
                </div>
                <div className={`p-3.5 flex-1 space-y-3.5 ${gIdx === 0 ? 'pl-0' : ''}`}>
                  {grand.majors.map((major, mIdx) => (
                    <div key={mIdx} className={`space-y-2 ${mIdx > 0 ? 'pt-3 border-t border-white/5' : ''}`}>
                      <span className="text-[13px] font-extrabold text-brand-green uppercase tracking-wider block">
                        {major.name}
                      </span>
                      <ul className="space-y-2 text-[13px] text-white font-bold">
                        {major.subMenus.map((sub, sIdx) => (
                          <li key={sIdx}>
                            <Link href={sub.link} className="hover:text-brand-green hover:translate-x-0.5 transition-all duration-200 block">
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            </div>

            {/* BOTTOM: Brand & Address (Connected) */}
            <div className="w-full flex flex-col gap-6 p-6 lg:p-8 pl-0 lg:pl-0 border-t border-white/10">
              <div className="shrink-0 space-y-3">
                <span className="text-xl font-black tracking-wider text-white relative">
                  DASAN<span className="text-brand-teal font-medium">PHARM</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-green to-brand-cyan/50" />
                </span>
              </div>
              
              <div className="w-fit overflow-x-auto">
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
