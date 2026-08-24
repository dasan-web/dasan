'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationData } from '@/lib/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith('/en');
  const basePath = isEnglish ? '/en' : '';
  
  if (pathname.startsWith('/management')) {
    return null;
  }

  const footerColumns = navigationData.map(grand => ({
    ...grand,
    majors: grand.majors.filter(major => !(isEnglish && major.enName === 'Customer Service'))
  })).filter(grand => grand.majors.length > 0);

  const totalMajors = footerColumns.reduce((sum, grand) => sum + grand.majors.length, 0);

  return (
    <footer className="bg-[#212832] text-slate-200 select-none relative overflow-hidden antialiased">
      {/* Premium ambient glow in footer background */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-brand-green/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[35%] h-[35%] rounded-full bg-brand-cyan/10 blur-[100px] pointer-events-none" />

      <div className="w-full px-6 md:px-16 lg:px-24 py-8 md:py-10 relative z-10">
        
        {/* Unified Premium Section */}
        <div className="w-full flex flex-col">
          <div className="flex flex-col xl:flex-row w-full mb-4 xl:items-end gap-6 xl:gap-0">
            <div className="shrink-0 xl:w-[360px]">
              <span className="text-xl font-black tracking-wider text-white relative">
                DASAN<span className="text-brand-green font-bold">PHARM</span>
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-green" />
              </span>
            </div>
            <h3 className="text-slate-200 font-black text-[15px] uppercase tracking-[0.2em] pl-6 lg:pl-8 xl:pl-0 hidden md:block">
              Site Map
            </h3>
          </div>
          
          <div className="w-full border border-white/15 rounded-xl overflow-hidden bg-white/[0.03] shadow-xl backdrop-blur-xs flex flex-col xl:flex-row">
            
            {/* LEFT: Brand & Address (Connected) */}
            <div className="flex flex-col gap-6 pr-6 lg:pr-8 pl-0 pb-6 lg:pb-8 pt-0 border-b xl:border-b-0 xl:border-r border-white/15 shrink-0 xl:w-[360px]">
              <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <tbody className="divide-y divide-white/15">
                  <tr className="hover:bg-white/[0.04] transition-colors duration-150">
                    <td className="py-1.5 px-2 bg-white/[0.06] font-black text-brand-green whitespace-nowrap w-[45px] border-r border-white/15 text-center">{isEnglish ? "HQ" : "본사"}</td>
                    <td className="py-1.5 px-2 text-slate-200 font-normal break-keep">{isEnglish ? "Rm 1302, Woori Venture Town II, 70 Seonyu-ro, Yeongdeungpo-gu, Seoul" : "서울특별시 영등포구 선유로 70 우리벤처타운 II 1302호"}</td>
                    <td className="py-1.5 px-2 text-slate-300 font-normal whitespace-nowrap border-l border-white/15 text-right">02-2679-5206</td>
                  </tr>
                  <tr className="hover:bg-white/[0.04] transition-colors duration-150">
                    <td className="py-1.5 px-2 bg-white/[0.06] font-black text-brand-green whitespace-nowrap w-[45px] border-r border-white/15 text-center">{isEnglish ? "R&D" : "연구소"}</td>
                    <td className="py-1.5 px-2 text-slate-200 font-normal break-keep">{isEnglish ? "Rm 306, Bldg 3, Innoplex, 304 Sinwon-ro, Yeongtong-gu, Suwon-si, Gyeonggi-do" : "경기 수원시 영통구 신원로 304 이노플렉스 3동 306호"}</td>
                    <td className="py-1.5 px-2 text-slate-300 font-normal whitespace-nowrap border-l border-white/15 text-right">031-546-8200</td>
                  </tr>
                  <tr className="hover:bg-white/[0.04] transition-colors duration-150">
                    <td className="py-1.5 px-2 bg-white/[0.06] font-black text-brand-green whitespace-nowrap w-[45px] border-r border-white/15 text-center">{isEnglish ? "Plant 1" : "1공장"}</td>
                    <td className="py-1.5 px-2 text-slate-200 font-normal break-keep">{isEnglish ? "342 Deogamsan-ro, Dogo-myeon, Asan-si, Chungcheongnam-do" : "충청남도 아산시 도고면 덕암산로 342"}</td>
                    <td className="py-1.5 px-2 text-slate-300 font-normal whitespace-nowrap border-l border-white/15 text-right">041-543-5311</td>
                  </tr>
                  <tr className="hover:bg-white/[0.04] transition-colors duration-150">
                    <td className="py-1.5 px-2 bg-white/[0.06] font-black text-brand-green whitespace-nowrap w-[45px] border-r border-white/15 text-center">{isEnglish ? "Plant 2" : "2공장"}</td>
                    <td className="py-1.5 px-2 text-slate-200 font-normal break-keep">{isEnglish ? "381 Deogamsan-ro, Dogo-myeon, Asan-si, Chungcheongnam-do" : "충청남도 아산시 도고면 덕암산로 381"}</td>
                    <td className="py-1.5 px-2 text-slate-300 font-normal whitespace-nowrap border-l border-white/15 text-right">041-428-9484</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
            
            {/* RIGHT: Sitemap Grid (Desktop) */}
            <div className="flex-1 pb-4 hidden md:block">
              <div className="flex w-full h-full divide-x divide-white/15">
                {footerColumns.map((grand, gIdx) => (
                  <div key={gIdx} style={{ width: `${(grand.majors.length / totalMajors) * 100}%` }} className="flex flex-col">
                    {/* Top Header */}
                    <div className="p-1.5 xl:p-2 bg-white/[0.08] font-black text-slate-100 text-[11px] xl:text-[12px] uppercase tracking-wider text-center border-b border-white/15 break-keep">
                      {isEnglish ? (grand.enName || grand.name) : grand.name}
                    </div>
                    {/* Horizontal Majors */}
                    <div className="flex flex-1 divide-x divide-white/15">
                      {grand.majors.map((major, mIdx) => (
                        <div key={mIdx} className="flex-1 p-1.5 xl:p-2 flex flex-col gap-1.5 xl:gap-2">
                          {major.link ? (
                            <Link href={`${basePath}${major.link}`} className="text-[10px] xl:text-[11px] font-extrabold text-brand-green uppercase tracking-wider block text-center border-b border-white/10 pb-1.5 break-keep hover:underline">
                              {isEnglish ? (major.enName || major.name) : major.name}
                            </Link>
                          ) : (
                            <span className="text-[10px] xl:text-[11px] font-extrabold text-brand-green uppercase tracking-wider block text-center border-b border-white/10 pb-1.5 break-keep">
                              {isEnglish ? (major.enName || major.name) : major.name}
                            </span>
                          )}
                          <ul className="space-y-1.5 text-[10px] xl:text-[11px] font-normal text-center">
                            {major.subMenus.map((sub, sIdx) => (
                              <li key={sIdx}>
                                <Link href={`${basePath}${sub.link}`} className="text-slate-300 hover:text-brand-green transition-colors duration-200 block break-keep leading-tight font-normal">
                                  {isEnglish ? (sub.enName || sub.name) : sub.name}
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
            </div>

        </div>
      </div>

        {/* Bottom copyright row */}
        <div className="border-t border-white/10 mt-6 md:mt-8 pt-4 text-[12px] text-slate-400 font-normal text-center">
          <p>© 2026 DASAN Pharmaceutical Co., Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
