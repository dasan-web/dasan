'use client';

import React from 'react';
import { Download } from 'lucide-react';

interface ExcelDownloadButtonProps {
  financialHeaders: string[];
  salesRow: string[];
  profitRow: string[];
  consolidatedBS: string[][];
  separateBS: string[][];
  consolidatedIS: string[][];
  separateIS: string[][];
  isEnglish?: boolean;
}

export default function ExcelDownloadButton({
  financialHeaders,
  salesRow,
  profitRow,
  consolidatedBS,
  separateBS,
  consolidatedIS,
  separateIS,
  isEnglish = false,
}: ExcelDownloadButtonProps) {
  const downloadExcel = () => {
    // Generate HTML for the tables to preserve exact formatting
    const generateTableHtml = (title: string, data: string[][], isSummary = false) => {
      const thead = isSummary
        ? `<tr>
            <th style="background-color: #367e47; color: white; padding: 10px; border: 1px solid #999;">${isEnglish ? 'Category (Unit: Million KRW)' : '재무 항목 (단위: 백만원)'}</th>
            ${financialHeaders.map(h => `<th style="background-color: #367e47; color: white; padding: 10px; border: 1px solid #999;">${h}</th>`).join('')}
          </tr>`
        : `<tr>
            <th style="background-color: #367e47; color: white; padding: 10px; border: 1px solid #999;">${isEnglish ? 'Category' : '구분'}</th>
            ${financialHeaders.map(h => {
              const cleanYear = h.replace('년', '').replace('(', '').replace(')', '').replace('개별', '').replace('연결', '').trim();
              return `<th style="background-color: #367e47; color: white; padding: 10px; border: 1px solid #999;">${cleanYear}</th>`;
            }).join('')}
          </tr>`;

      const tbody = data.map(row => {
        return `<tr>
          <td style="border: 1px solid #999; padding: 8px; font-weight: bold; background-color: #f8fff9;">${row[0] || ''}</td>
          ${financialHeaders.map((_, idx) => `<td style="border: 1px solid #999; padding: 8px; text-align: center;">${row[idx + 1] || ''}</td>`).join('')}
        </tr>`;
      }).join('');

      return `
        <h3>${title}</h3>
        <table style="border-collapse: collapse; text-align: center;">
          <thead>${thead}</thead>
          <tbody>${tbody}</tbody>
        </table>
        <br/><br/>
      `;
    };

    let htmlContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <h2>${isEnglish ? 'Financial Data' : '재무제표 데이터'}</h2>
    `;

    // Summary Table (Image 2)
    htmlContent += generateTableHtml(isEnglish ? 'Summary' : '경영 실적 요약 (그림2)', [salesRow, profitRow], true);
    
    // Balance Sheets
    htmlContent += generateTableHtml(isEnglish ? 'Consolidated Balance Sheet' : '연결 재무상태표', consolidatedBS);
    htmlContent += generateTableHtml(isEnglish ? 'Separate Balance Sheet' : '별도 재무상태표', separateBS);
    
    // Income Statements
    htmlContent += generateTableHtml(isEnglish ? 'Consolidated Income Statement' : '연결 손익계산서', consolidatedIS);
    htmlContent += generateTableHtml(isEnglish ? 'Separate Income Statement' : '별도 손익계산서', separateIS);

    htmlContent += `
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = isEnglish ? 'financial_data.xls' : '재무제표_데이터.xls';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={downloadExcel}
      className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-green hover:bg-brand-green-dark text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-colors"
    >
      <Download size={16} />
      <span>{isEnglish ? 'Excel Download' : '엑셀 다운로드'}</span>
    </button>
  );
}
