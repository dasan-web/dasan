'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Eye, Download } from 'lucide-react';

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

interface JobListProps {
  initialJobs: NewsItem[];
}

interface JobParsed {
  id: number;
  type: string;
  title: string;
  qualifications: string;
  deadline: string;
  description: string;
  created_at: string;
  views: number;
  file_url?: string | null;
  file_name?: string | null;
}

const isHtml = (str: string) => {
  return /<[a-z][\s\S]*>/i.test(str);
};

const parseJobContent = (item: NewsItem): JobParsed => {
  if (!item.content || !item.content.includes('|')) {
    return {
      id: item.id,
      type: '공통',
      title: item.title,
      qualifications: '상세내용 참조',
      deadline: '상시채용',
      description: item.content || '',
      created_at: item.created_at,
      views: item.views,
      file_url: item.file_url,
      file_name: item.file_name,
    };
  }
  const parts = item.content.split('|');
  const type = parts[0] || '신입/경력';
  const qualifications = parts[1] || '학사 이상';
  const deadline = parts[2] || '상시채용';
  const description = parts.slice(3).join('|') || '';
  return {
    id: item.id,
    type,
    title: item.title,
    qualifications,
    deadline,
    description,
    created_at: item.created_at,
    views: item.views,
    file_url: item.file_url,
    file_name: item.file_name,
  };
};

export default function JobList({ initialJobs }: JobListProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [jobs, setJobs] = useState<NewsItem[]>(initialJobs);

  const handleToggle = (item: NewsItem) => {
    if (expandedId === item.id) {
      setExpandedId(null);
    } else {
      setExpandedId(item.id);
      // Increment views count locally for immediate responsiveness
      setJobs(prev =>
        prev.map(j => (j.id === item.id ? { ...j, views: j.views + 1 } : j))
      );
      // Update views in DB
      fetch(`/api/news/views?id=${item.id}`, { method: 'POST' }).catch(() => {});
    }
  };

  const renderLinkedText = (text: string) => {
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
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const getBadgeClass = (type: string) => {
    const cleanType = type.trim();
    if (cleanType === '신입') return 'bg-brand-teal/10 text-brand-teal border border-brand-teal/20';
    if (cleanType === '경력') return 'bg-brand-green/10 text-brand-green border border-brand-green/20';
    return 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20';
  };

  return (
    <div className="w-full space-y-6">
      <h4 className="font-bold text-brand-blue text-base">진행 중인 상시/정기 공고 ({jobs.length})</h4>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[650px] border-collapse border-t-2 border-t-brand-green text-sm text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-gray-700 text-xs md:text-sm font-bold">
              <th className="py-4 px-4 text-center w-[12%]">채용구분</th>
              <th className="py-4 px-4 text-left w-[45%]">공고명</th>
              <th className="py-4 px-4 text-left w-[25%]">자격요건</th>
              <th className="py-4 px-4 text-center w-[10%]">마감일</th>
              <th className="py-4 px-4 text-center w-[8%]">조회수</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {jobs.length > 0 ? (
              jobs.map((item) => {
                const isExpanded = expandedId === item.id;
                const parsed = parseJobContent(item);
                const isUrgent = parsed.deadline.includes('D-') || parsed.deadline.includes('오늘');

                return (
                  <React.Fragment key={item.id}>
                    {/* Header Row */}
                    <tr
                      onClick={() => handleToggle(item)}
                      className="hover:bg-gray-50/50 transition-colors text-gray-700 cursor-pointer"
                    >
                      <td className="py-4.5 px-4 text-center">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-black ${getBadgeClass(parsed.type)}`}>
                          {parsed.type}
                        </span>
                      </td>
                      <td className="py-4.5 px-4 text-left">
                        <div className="flex items-center space-x-2 font-semibold text-brand-blue hover:text-brand-green transition-colors text-xs md:text-sm leading-snug">
                          <span className="flex-1">{parsed.title}</span>
                          {isExpanded ? (
                            <ChevronUp size={16} className="text-brand-green flex-shrink-0" />
                          ) : (
                            <ChevronDown size={16} className="text-gray-450 flex-shrink-0" />
                          )}
                        </div>
                      </td>
                      <td className="py-4.5 px-4 text-left text-xs text-gray-500 font-medium">
                        {parsed.qualifications}
                      </td>
                      <td className={`py-4.5 px-4 text-center font-bold text-xs ${isUrgent ? 'text-rose-500' : 'text-gray-500'}`}>
                        {parsed.deadline}
                      </td>
                      <td className="py-4.5 px-4 text-center text-xs text-gray-400 font-medium">
                        {parsed.views}
                      </td>
                    </tr>

                    {/* Expandable Details Row */}
                    {isExpanded && (
                      <tr className="bg-gray-50/30">
                        <td colSpan={5} className="py-6 px-8 text-gray-650 text-xs md:text-sm leading-relaxed border-b border-gray-150">
                          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-fade-in space-y-6">
                            <div className="flex items-center space-x-1.5 text-xs text-brand-green font-bold uppercase tracking-wider">
                              <Eye size={14} />
                              <span>채용공고 상세 모집요강</span>
                            </div>
                            
                            {/* Job Description Block */}
                            {isHtml(parsed.description) ? (
                              <div 
                                className="rich-text-content text-left" 
                                dangerouslySetInnerHTML={{ __html: parsed.description }} 
                              />
                            ) : (
                              <div className="whitespace-pre-line text-left">
                                {renderLinkedText(parsed.description)}
                              </div>
                            )}

                            {/* Job File Attachment Block */}
                            {parsed.file_url && (
                              <div className="pt-4 border-t border-gray-100 flex justify-start">
                                <a
                                  href={parsed.file_url}
                                  download={parsed.file_name || '첨부파일'}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-2 text-xs md:text-sm text-gray-500 hover:text-brand-green bg-gray-50 hover:bg-gray-100 px-3.5 py-2 rounded-lg border border-gray-200 transition-colors font-bold"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Download size={14} />
                                  <span className="truncate max-w-[250px]">{parsed.file_name || '채용 공고문 다운로드'}</span>
                                </a>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-16 text-gray-400 bg-gray-50/50 rounded-2xl">
                  진행 중인 채용공고가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
