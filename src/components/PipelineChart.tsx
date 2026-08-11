'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface PipelineItem {
  id: number;
  category: string;
  projectName: string;
  disease: string;
  phase: string;
  partner: string;
  rowSpan?: number;
  isFirst?: boolean;
}

export default function PipelineChart() {
  const pathname = usePathname();
  const isEnglish = pathname ? pathname.startsWith('/en') : false;
  const [pipelineList, setPipelineList] = useState<PipelineItem[]>([]);
  const [phases, setPhases] = useState<string[]>(['기초연구', '전임상', '임상 1상', '임상 2상', '임상 3상', '허가']);
  const [hideProjectName, setHideProjectName] = useState(false);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Fetch phases first, then pipelines
    Promise.all([
      fetch('/api/pipeline/phases').then(res => res.json()),
      fetch('/api/pipeline').then(res => res.json())
    ])
    .then(([phasesData, pipelineData]) => {
      if (phasesData) {
        if (phasesData.phases) setPhases(phasesData.phases);
        if (phasesData.hideProjectName !== undefined) setHideProjectName(!!phasesData.hideProjectName);
      }
      
      if (Array.isArray(pipelineData)) {
        const formatted = pipelineData.map((item: any) => ({
          id: item.id,
          category: item.category,
          projectName: item.project_name,
          disease: item.disease,
          phase: item.phase,
          partner: item.partner || '',
        }));
        setPipelineList(formatted);
        setTimeout(() => setAnimate(true), 100);
      }
      setLoading(false);
    })
    .catch(err => {
      console.error('Failed to fetch pipeline data:', err);
      setLoading(false);
    });
  }, []);

  const getPhaseWidth = (phase: string) => {
    const idx = phases.indexOf(phase);
    if (idx === -1) return '0%';
    const pct = ((idx + 0.5) / phases.length) * 100;
    return `${pct}%`;
  };

  // Interactive sliding removed by user request (Read-only view)

  // Dynamically calculate rowSpan and isFirst based on category ordering
  
  const t = (ko: string) => {
    if (!isEnglish) return ko;
    const dict: Record<string, string> = {
      '분류': 'Category',
      '프로젝트명': 'Project Name',
      '적응증': 'Indication',
      '단계': 'Development Phase',
      '협력기관': 'Partners',
      '기초연구': 'Basic Research',
      '전임상': 'Pre-Clinical',
      '임상 1상': 'Phase 1',
      '임상 2상': 'Phase 2',
      '임상 3상': 'Phase 3',
      '허가': 'Approval',
      '개량신약': 'IMD',
      '자료 제출 의약품': 'Data Submission Drug',
      '퍼스트 제네릭': 'First Generic',
      '비만치료제': 'Obesity Treatment',
      '항암·면역보조치료제': 'Anti-cancer / Immune Adjuvant',
      '류마티스관절염치료제': 'Rheumatoid Arthritis Treatment',
      '고혈압(최초복합제) 치료제': 'Hypertension Treatment',
      '위식도역류(P-CAB) 치료제': 'GERD (P-CAB) Treatment',
      '고지혈증 치료제': 'Hyperlipidemia Treatment',
      '파이프라인 데이터를 불러오는 중입니다...': 'Loading pipeline data...',
      '등록된 파이프라인 항목이 없습니다.': 'No pipeline data available.'
    };
    return dict[ko] || ko;
  };

  const processedData = React.useMemo(() => {
    const data: PipelineItem[] = [];
    const categoryCounts: { [key: string]: number } = {};
    const categoryFirstIndex: { [key: string]: number } = {};

    pipelineList.forEach((item, index) => {
      const cat = item.category;
      if (categoryCounts[cat] === undefined) {
        categoryCounts[cat] = 1;
        categoryFirstIndex[cat] = index;
        data.push({ ...item, isFirst: true, rowSpan: 1 });
      } else {
        categoryCounts[cat]++;
        data.push({ ...item, isFirst: false, rowSpan: 0 });
      }
    });

    Object.keys(categoryCounts).forEach(cat => {
      const firstIdx = categoryFirstIndex[cat];
      if (data[firstIdx]) {
        data[firstIdx].rowSpan = categoryCounts[cat];
      }
    });

    return data;
  }, [pipelineList]);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse border border-gray-200 text-sm font-sans">
        {/* Table Head */}
        <thead>
          <tr className="bg-[#1F4E78] text-white">
            <th className={`border border-gray-300 px-4 py-6 text-center font-bold ${hideProjectName ? 'w-[18%]' : 'w-[15%]'}`}>{t('분류')}</th>
            {!hideProjectName && (
              <th className="border border-gray-300 px-4 py-6 text-center font-bold w-[12%]">{t('프로젝트명')}</th>
            )}
            <th className={`border border-gray-300 px-4 py-6 text-center font-bold ${hideProjectName ? 'w-[28%]' : 'w-[23%]'}`}>{t('적응증')}</th>
            
            {/* 개발단계 (Nested Columns) */}
            <th className={`border border-gray-300 p-0 ${hideProjectName ? 'w-[42%]' : 'w-[38%]'}`} colSpan={phases.length || 1}>
              <div className="text-center font-bold py-3.5 border-b border-gray-300">{t('단계')}</div>
              <div 
                className="grid text-[11px] font-semibold bg-[#1F4E78]"
                style={{ gridTemplateColumns: `repeat(${phases.length || 1}, minmax(0, 1fr))` }}
              >
                {phases.map((phase) => (
                  <div key={t(phase)} className="py-2.5 text-center border-r last:border-r-0 border-gray-300">
                    {t(phase)}
                  </div>
                ))}
              </div>
            </th>
            
            <th className="border border-gray-300 px-4 py-6 text-center font-bold w-[12%]">{t('협력기관')}</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="bg-white">
          {loading ? (
            <tr>
              <td colSpan={10} className="border border-gray-200 py-16 text-center text-gray-400 font-medium">{t('파이프라인 데이터를 불러오는 중입니다...')}</td>
            </tr>
          ) : processedData.length > 0 ? (
            processedData.map((item, index) => {
              const widthStr = getPhaseWidth(item.phase);
              return (
                <tr key={item.id} className="group hover:bg-brand-green/[0.015] transition-colors duration-250">
                  {/* Category Column (rowSpan applied) */}
                  {item.isFirst && (
                    <td
                      rowSpan={item.rowSpan}
                      className="border border-gray-200 px-4 py-6 text-center font-bold text-gray-700 bg-white"
                    >{t(item.category)}</td>
                  )}

                  {/* Project Name */}
                  {!hideProjectName && (
                    <td className="border border-gray-200 px-4 py-6 text-center text-gray-600 font-medium font-mono">
                      {item.projectName}
                    </td>
                  )}

                  {/* Indication / Disease */}
                  <td className="border border-gray-200 px-4 py-6 text-center text-gray-700 font-medium">{t(item.disease)}</td>

                  {/* Progress Bar spanned across the phases (Draggable Interactive Track) */}
                  <td className="border border-gray-200 p-0 relative" colSpan={phases.length || 1}>
                    <div className="absolute inset-0 flex items-center px-4">
                      {/* Aligned relative wrapper to match coordinates of progress bar and circle handle */}
                      <div className="relative w-full h-full flex items-center">
                        {/* Read-only progress bar track */}
                        <div
                          className="relative w-full h-3 bg-gray-100 rounded-full border border-gray-200/80 select-none overflow-hidden shadow-inner cursor-default"
                        >
                          {/* Active progress bar (Green with spring-bouncy transition) */}
                          <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#4da749] to-[#008953] rounded-full transition-all duration-[1200ms] cubic-bezier(0.34, 1.56, 0.64, 1) pointer-events-none"
                            style={{ width: animate ? widthStr : '0%' }}
                          />
                        </div>
                        
                        {/* End circle handle inside the progress bar (spring-bounce + sliding cursor, pointer-events disabled) */}
                        <div
                          className="absolute top-1/2 -translate-y-1/2 w-4.5 h-4.5 bg-white border-[3.5px] border-[#008953] rounded-full shadow-md transition-all duration-[1200ms] cubic-bezier(0.34, 1.56, 0.64, 1) z-10 pointer-events-none"
                          style={{ left: `calc(${animate ? widthStr : '0%'} - 9px)` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Cooperative Institution */}
                  <td className="border border-gray-200 px-4 py-6 text-center text-gray-500">
                    {item.partner}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={10} className="border border-gray-200 py-16 text-center text-gray-400 font-medium">{t('등록된 파이프라인 항목이 없습니다.')}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
