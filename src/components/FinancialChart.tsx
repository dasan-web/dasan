'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FinancialChartProps {
  category: 'bs' | 'is';
  subCategory: 'consolidated' | 'separate';
  years: string[];
  data: string[][];
  isEnglish?: boolean;
}

export default function FinancialChart({
  category,
  subCategory,
  years,
  data,
  isEnglish = false,
}: FinancialChartProps) {
  // Parse string values (e.g., "154,600" -> 154600)
  const parseValue = (valStr: string): number => {
    if (!valStr) return 0;
    const cleaned = valStr.replace(/,/g, '').trim();
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  };

  // Format number to Korean format (e.g., 154600 -> "154,600")
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  // Determine which rows to chart based on category
  const targetLabels = category === 'bs' 
    ? (isEnglish ? ['Total Assets', 'Total Liabilities', 'Total Equity'] : ['자산총계', '부채총계', '자본총계'])
    : (isEnglish ? ['Sales', 'Operating Profit', 'Net Income'] : ['매출액', '영업이익', '당기순이익']);

  const colors: Record<string, { bg: string; fill: string; text: string }> = {
    '자산총계': { bg: 'bg-brand-green', fill: '#379A35', text: 'text-brand-green-dark' },
    'Total Assets': { bg: 'bg-brand-green', fill: '#379A35', text: 'text-brand-green-dark' },
    '부채총계': { bg: 'bg-amber-500', fill: '#F59E0B', text: 'text-amber-600' },
    'Total Liabilities': { bg: 'bg-amber-500', fill: '#F59E0B', text: 'text-amber-600' },
    '자본총계': { bg: 'bg-red-500', fill: '#EF4444', text: 'text-red-600' },
    'Total Equity': { bg: 'bg-red-500', fill: '#EF4444', text: 'text-red-600' },
    '매출액': { bg: 'bg-brand-green', fill: '#379A35', text: 'text-brand-green-dark' },
    'Sales': { bg: 'bg-brand-green', fill: '#379A35', text: 'text-brand-green-dark' },
    '영업이익': { bg: 'bg-amber-500', fill: '#F59E0B', text: 'text-amber-600' },
    'Operating Profit': { bg: 'bg-amber-500', fill: '#F59E0B', text: 'text-amber-600' },
    '당기순이익': { bg: 'bg-red-500', fill: '#EF4444', text: 'text-red-600' },
    'Net Income': { bg: 'bg-red-500', fill: '#EF4444', text: 'text-red-600' },
  };

  // Extract row data
  const chartSeries = targetLabels.map(label => {
    const row = data.find(r => r[0] === label);
    const values = years.map((_, idx) => (row ? parseValue(row[idx + 1]) : 0));
    return { label, values };
  });

  const isBS = category === 'bs';
  const maxScaleValue = isBS ? 250000 : 125000;
  
  // Custom Ticks representing Korean '억' units
  const ticks = isBS
    ? [
        { val: 250000, label: '2,500' },
        { val: 200000, label: '2,000' },
        { val: 150000, label: '1,500' },
        { val: 100000, label: '1,000' },
        { val: 50000, label: '500' },
        { val: 0, label: '0' }
      ]
    : [
        { val: 125000, label: '1,250' },
        { val: 100000, label: '1,000' },
        { val: 75000, label: '750' },
        { val: 50000, label: '500' },
        { val: 25000, label: '250' },
        { val: 0, label: '0' }
      ];

  return (
    <div className="bg-gradient-to-br from-white to-gray-50/50 p-5 rounded-2xl border border-gray-150 shadow-sm print:hidden space-y-4 animate-fade-in-up">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h5 className="text-xs sm:text-sm font-bold text-gray-800 flex items-center space-x-1.5 flex-wrap">
          <span className="w-1.5 h-3 bg-brand-green rounded-full animate-pulse"></span>
          <span>
            {category === 'bs' ? (isEnglish ? 'Financial Structure' : '재무구조') : (isEnglish ? 'Net Income Trend' : '당기순이익 추이')}
            {subCategory === 'consolidated' ? (isEnglish ? ' (Consolidated)' : ' (연결)') : (isEnglish ? ' (Separate)' : ' (별도)')}
          </span>
          <span className="text-[10px] text-gray-500 font-medium ml-1 sm:ml-1.5">{isEnglish ? '(Unit: Million KRW)' : '(단위: 백만원)'}</span>
        </h5>
        {/* Legend */}
        <div className="flex space-x-3 text-[10px] font-bold text-gray-500">
          {targetLabels.map(label => (
            <div key={label} className="flex items-center space-x-1.5">
              <span className={`w-2 h-2 rounded-full ${colors[label]?.bg || ''}`}></span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SVG Bar Chart Area */}
      <div className="relative pt-4 pl-12 pr-4 pb-2">
        {/* Y Axis Unit Label */}
        <span className="absolute left-1 top-[20px] text-[8px] text-gray-400 font-semibold font-sans">{isEnglish ? '(100M KRW)' : '(단위: 억원)'}</span>
        {/* Groups of Bars */}
        <div className="h-[200px] flex items-end justify-around relative z-10 pt-4">
          {/* Y Axis Grid Lines - Positioned to align perfectly with the h-[130px] bar wrappers */}
          <div className="absolute top-[41px] bottom-[29px] left-0 right-0 flex flex-col justify-between pointer-events-none z-0">
            {ticks.map((tick, i) => {
              return (
                <div key={i} className="w-full flex items-center border-t border-solid border-gray-200 h-0 relative">
                  <span className="absolute -left-2 -translate-x-full -translate-y-1/2 text-[8px] text-gray-600 font-mono font-bold">
                    {tick.label}
                  </span>
                </div>
              );
            })}
          </div>
          {years.map((year, yearIdx) => {
            const cleanYear = year
              .replace('년', '')
              .replace('(', '')
              .replace(')', '')
              .replace('개별', '')
              .replace('연결', '')
              .trim();

            return (
              <div key={yearIdx} className="flex flex-col items-center space-y-2 w-1/3 relative">
                {/* Bars group */}
                <div className="flex items-end space-x-1 sm:space-x-2.5 h-[160px]">
                  {chartSeries.map(series => {
                    const val = series.values[yearIdx] || 0;
                    const pct = Math.max((val / maxScaleValue) * 100, 2); // At least 2% height so it is visible

                    return (
                      <div key={series.label} className="group relative flex flex-col items-center justify-end h-[160px]">
                        {/* Animated Bar wrapper to trigger height */}
                        <div className="w-4 sm:w-5.5 h-[130px] flex items-end relative">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${pct}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: yearIdx * 0.05 }}
                            className={`w-full rounded-t-md shadow-sm transition-all duration-200 cursor-pointer ${
                              colors[series.label]?.bg || ''
                            } hover:brightness-105 hover:shadow-md hover:shadow-brand-green/5`}
                          />

                          {/* Short text value above the bar */}
                          <span 
                            style={{ bottom: `calc(${pct}% + 2px)` }}
                            className="absolute left-1/2 -translate-x-1/2 text-[8px] sm:text-[9px] font-mono font-bold text-gray-800 whitespace-nowrap scale-90 sm:scale-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                          >
                            {formatNumber(val)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Year Label */}
                <span className="text-[10px] font-bold text-gray-600 bg-gray-100/60 px-3 py-0.5 rounded-full border border-gray-150/40">
                  {cleanYear}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
