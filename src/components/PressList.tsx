'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Eye, Download } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface NewsItem {
  id: number;
  category: string;
  title: string;
  content: string;
  views: number;
  created_at: string;
  file_url?: string | null;
  file_name?: string | null;
}

interface PressListProps {
  initialNews: NewsItem[];
}

const isHtml = (str: string) => {
  return /<[a-z][\s\S]*>/i.test(str);
};

export default function PressList({ initialNews }: PressListProps) {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [newsList, setNewsList] = useState<NewsItem[]>(initialNews);

  const handleToggle = (item: NewsItem) => {
    if (expandedId === item.id) {
      setExpandedId(null);
    } else {
      setExpandedId(item.id);
      // 클릭 시 조회수 1 증가 (화면단 임시 업데이트)
      setNewsList(prev =>
        prev.map(n => (n.id === item.id ? { ...n, views: n.views + 1 } : n))
      );
      // DB 조회수 업데이트 API가 필요한 경우 fetch('/api/news/views', ...) 등을 호출할 수 있습니다.
      // 여기서는 기본적으로 클라이언트 단 상태 업데이트를 우선 수행합니다.
      fetch(`/api/news/views?id=${item.id}`, { method: 'POST' }).catch(() => {});
    }
  };

  const renderLinkedText = (text: string) => {
    // URL matching regex (matches http, https and ignores trailing commas/dots nicely)
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, i) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-cyan hover:text-brand-green underline break-all font-bold"
            onClick={(e) => e.stopPropagation()} // Prevent row toggle on link click
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[650px] border-collapse border-t-2 border-t-brand-green text-sm text-left">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 text-gray-700 text-xs md:text-sm font-bold">
            <th className="py-4 px-4 text-center w-[10%]">{isEnglish ? "No." : "번호"}</th>
            <th className="py-4 px-4 text-left w-[60%]">{isEnglish ? "Title" : "제목"}</th>
            <th className="py-4 px-4 text-center w-[18%]">{isEnglish ? "Date" : "등록일"}</th>
            <th className="py-4 px-4 text-center w-[12%]">{isEnglish ? "Views" : "조회수"}</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {newsList.map((item, index) => {
            const isExpanded = expandedId === item.id;
            return (
              <React.Fragment key={item.id}>
                {/* 목록 행 */}
                <tr
                  onClick={() => handleToggle(item)}
                  className="hover:bg-gray-50/50 transition-colors text-gray-700 cursor-pointer border-b border-gray-100"
                >
                  <td className="py-4.5 px-4 text-center font-medium text-xs text-gray-400">
                    {newsList.length - index}
                  </td>
                  <td className="py-4.5 px-4 text-left">
                    <div className="flex items-center space-x-2 font-semibold text-brand-blue hover:text-brand-green transition-colors text-xs md:text-sm leading-snug">
                      <span className="flex-1">{item.title}</span>
                      {isExpanded ? (
                        <ChevronUp size={16} className="text-brand-green flex-shrink-0" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-450 flex-shrink-0" />
                      )}
                    </div>
                  </td>
                  <td className="py-4.5 px-4 text-center text-xs text-gray-500 font-medium">
                    {new Date(item.created_at)
                      .toLocaleDateString('ko-KR')
                      .replace(/\. /g, '.')
                      .replace(/\.$/, '')}
                  </td>
                  <td className="py-4.5 px-4 text-center text-xs text-gray-400 font-medium">
                    {item.views}
                  </td>
                </tr>

                {/* 상세 내용 행 */}
                {isExpanded && (
                  <tr className="bg-gray-50/30">
                    <td colSpan={4} className="py-6 px-8 text-gray-650 text-xs md:text-sm leading-relaxed border-b border-gray-150">
                      <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm animate-fade-in">
                        <div className="flex items-center space-x-1 text-xs text-brand-green font-bold mb-3 uppercase tracking-wider">
                          <Eye size={12} />
                          <span>{isEnglish ? "Press Release Details" : "보도자료 상세 내용"}</span>
                        </div>
                        {isHtml(item.content) ? (
                          <div 
                            className="rich-text-content text-left" 
                            dangerouslySetInnerHTML={{ __html: item.content }} 
                          />
                        ) : (
                          <div className="whitespace-pre-line text-left">
                            {renderLinkedText(item.content)}
                          </div>
                        )}
                        {item.file_url && (
                          <div className="mt-5 pt-4 border-t border-gray-100 flex justify-start">
                            <a
                              href={item.file_url}
                              download={item.file_name || (isEnglish ? 'Attachment' : '첨부파일')}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 text-xs md:text-sm text-gray-500 hover:text-brand-green bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 transition-colors font-bold"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Download size={14} />
                              <span className="truncate max-w-[250px]">{item.file_name || (isEnglish ? 'Download Attachment' : '첨부파일 다운로드')}</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
