'use client';

import React, { useState } from 'react';
import { Layers, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import FinancialChart from './FinancialChart';

interface DetailedFinancialTablesProps {
  consolidatedBS: string[][];
  separateBS: string[][];
  consolidatedIS: string[][];
  separateIS: string[][];
  years: string[];
  isEnglish?: boolean;
}

export default function DetailedFinancialTables({
  consolidatedBS,
  separateBS,
  consolidatedIS,
  separateIS,
  years,
  isEnglish = false,
}: DetailedFinancialTablesProps) {
  const [activeCategory, setActiveCategory] = useState<'bs' | 'is'>('bs');
  const [subCategory, setSubCategory] = useState<'consolidated' | 'separate'>('consolidated');

  const highlightRowsBS = ['자산총계', '부채총계', '자본총계', 'Total Assets', 'Total Liabilities', 'Total Equity'];
  const highlightRowsIS = ['영업이익', '당기순이익', 'Operating Profit', 'Net Income'];

  const renderTable = (title: string, data: string[][], isBS: boolean = false) => {
    return (
      <div className="space-y-2">
        <div className="flex items-end justify-between px-1">
          <span className="text-xs sm:text-sm font-bold text-gray-800">{title}</span>
          <span className="text-[10px] text-gray-500 font-medium">{isEnglish ? '(Unit: Million KRW)' : '(단위: 백만원)'}</span>
        </div>
        <div className="overflow-x-auto border border-gray-400 rounded-lg shadow-none">
          <table className="w-full text-xs min-w-[500px] border-collapse">
            <thead className="bg-brand-green text-white uppercase">
              <tr>
                <th className="p-2 font-bold text-center border-b border-r border-gray-400 w-1/4">{isEnglish ? 'Category' : '구분'}</th>
                {years.map((year, idx) => {
                  const cleanYear = year
                    .replace('년', '')
                    .replace('(', '')
                    .replace(')', '')
                    .replace('개별', '')
                    .replace('연결', '')
                    .replace('Separate', '')
                    .replace('Consolidated', '')
                    .trim();
                  const isLastCol = idx === years.length - 1;
                  return (
                    <th
                      key={idx}
                      className={`p-2 font-bold text-center border-b ${isLastCol ? '' : 'border-r'} border-gray-400 w-1/4`}
                    >
                      {cleanYear}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="text-gray-750 bg-white">
              {data.map((row, rowIdx) => {
                const label = row[0] || '';
                const isHighlighted = isBS 
                  ? highlightRowsBS.includes(label) 
                  : highlightRowsIS.includes(label);
                const isLastRow = rowIdx === data.length - 1;
                return (
                  <tr
                    key={rowIdx}
                    className={
                      isHighlighted 
                        ? 'bg-brand-green-light font-bold text-brand-green-dark' 
                        : 'hover:bg-brand-green-light/20'
                    }
                  >
                    <td
                      className={`p-2 border-r ${isLastRow ? '' : 'border-b'} border-gray-400 text-left px-3 ${
                        isHighlighted ? 'font-bold text-brand-green-dark' : 'font-semibold text-gray-800'
                      }`}
                    >
                      {label}
                    </td>
                    {years.map((_, colIdx) => {
                      const isLastCol = colIdx === years.length - 1;
                      let borderClass = '';
                      if (!isLastRow && !isLastCol) borderClass = 'border-b border-r';
                      else if (!isLastRow && isLastCol) borderClass = 'border-b';
                      else if (isLastRow && !isLastCol) borderClass = 'border-r';
                      return (
                        <td
                          key={colIdx}
                          className={`p-2 text-center ${borderClass} border-gray-400 font-medium`}
                        >
                          {row[colIdx + 1] || ''}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pt-6 border-t border-gray-150 animate-fade-in-up">
      {/* Tabs Switcher - Hidden when printing */}
      <div className="flex space-x-1 border-b border-gray-200 print:hidden">
        <button
          onClick={() => setActiveCategory('bs')}
          className={`px-6 py-3 text-xs sm:text-sm font-bold rounded-t-xl transition-all duration-200 border-b-2 -mb-px cursor-pointer ${
            activeCategory === 'bs'
              ? 'text-brand-green border-brand-green bg-brand-green/5 font-extrabold shadow-sm'
              : 'text-gray-400 border-transparent hover:text-gray-650 hover:bg-gray-50'
          }`}
        >
          {isEnglish ? 'Balance Sheet' : '재무상태표 (Balance Sheet)'}
        </button>
        <button
          onClick={() => setActiveCategory('is')}
          className={`px-6 py-3 text-xs sm:text-sm font-bold rounded-t-xl transition-all duration-200 border-b-2 -mb-px cursor-pointer ${
            activeCategory === 'is'
              ? 'text-brand-green border-brand-green bg-brand-green/5 font-extrabold shadow-sm'
              : 'text-gray-400 border-transparent hover:text-gray-650 hover:bg-gray-50'
          }`}
        >
          {isEnglish ? 'Income Statement' : '손익계산서 (Income Statement)'}
        </button>
      </div>

      {/* Sub-tabs Selector (Consolidated vs Separate) - Hidden when printing */}
      <div className="flex justify-start items-center print:hidden pt-2">
        <div className="inline-flex p-1 bg-white rounded-xl relative shadow-xs">
          <button
            onClick={() => setSubCategory('consolidated')}
            className="relative px-5 py-2 text-xs font-bold rounded-lg transition-colors duration-200 cursor-pointer z-10 flex items-center space-x-1.5"
          >
            <Layers size={13} className={subCategory === 'consolidated' ? 'text-brand-green-dark' : 'text-gray-450'} />
            <span className={subCategory === 'consolidated' ? 'text-brand-green-dark font-extrabold' : 'text-gray-500 hover:text-gray-700'}>
              {isEnglish ? 'Consolidated' : '연결 재무제표 (Consolidated)'}
            </span>
            {subCategory === 'consolidated' && (
              <motion.div
                layoutId="activeSubTab"
                className="absolute inset-0 bg-brand-green-light rounded-lg border border-brand-green/20 z-[-1]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
          <button
            onClick={() => setSubCategory('separate')}
            className="relative px-5 py-2 text-xs font-bold rounded-lg transition-colors duration-200 cursor-pointer z-10 flex items-center space-x-1.5"
          >
            <FileText size={13} className={subCategory === 'separate' ? 'text-brand-green-dark' : 'text-gray-455'} />
            <span className={subCategory === 'separate' ? 'text-brand-green-dark font-extrabold' : 'text-gray-500 hover:text-gray-700'}>
              {isEnglish ? 'Separate' : '별도 재무제표 (Separate)'}
            </span>
            {subCategory === 'separate' && (
              <motion.div
                layoutId="activeSubTab"
                className="absolute inset-0 bg-brand-green-light rounded-lg border border-brand-green/20 z-[-1]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Visualized Premium Chart */}
      <FinancialChart
        category={activeCategory}
        subCategory={subCategory}
        years={years}
        data={
          activeCategory === 'bs'
            ? (subCategory === 'consolidated' ? consolidatedBS : separateBS)
            : (subCategory === 'consolidated' ? consolidatedIS : separateIS)
        }
        isEnglish={isEnglish}
      />

      {/* Panels */}
      <div>
        {/* 재무상태표 (Balance Sheet) */}
        <div className={`space-y-8 ${activeCategory === 'bs' ? 'block' : 'hidden print:block'}`}>
          <div className="space-y-6">
            <h4 className="text-sm sm:text-base font-extrabold text-brand-blue border-l-4 border-brand-green pl-3">
              {isEnglish ? 'Balance Sheet' : '재무상태표 (Balance Sheet)'}
            </h4>
            <div className="space-y-8">
              <div className={subCategory === 'consolidated' ? 'block' : 'hidden print:block'}>
                {renderTable(isEnglish ? '[Consolidated Balance Sheet]' : '[연결 재무상태표]', consolidatedBS, true)}
              </div>
              <div className={subCategory === 'separate' ? 'block' : 'hidden print:block'}>
                {renderTable(isEnglish ? '[Separate Balance Sheet]' : '[별도 재무상태표]', separateBS, true)}
              </div>
            </div>
          </div>
        </div>

        {/* 손익계산서 (Income Statement) */}
        <div className={`space-y-8 mt-8 print:mt-12 ${activeCategory === 'is' ? 'block' : 'hidden print:block'}`}>
          <div className="space-y-6">
            <h4 className="text-sm sm:text-base font-extrabold text-brand-blue border-l-4 border-brand-green pl-3">
              {isEnglish ? 'Income Statement' : '손익계산서 (Income Statement)'}
            </h4>
            <div className="space-y-8">
              <div className={subCategory === 'consolidated' ? 'block' : 'hidden print:block'}>
                {renderTable(isEnglish ? '[Consolidated Income Statement]' : '[연결 손익계산서]', consolidatedIS, false)}
              </div>
              <div className={subCategory === 'separate' ? 'block' : 'hidden print:block'}>
                {renderTable(isEnglish ? '[Separate Income Statement]' : '[별도 손익계산서]', separateIS, false)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
