'use client';

import React, { useState } from 'react';
import { Eye, Download, X, Calendar, Image as ImageIcon, ZoomIn } from 'lucide-react';
import { usePathname } from 'next/navigation';

export interface MediaNewsItem {
  id: number;
  category: string;
  title: string;
  content: string;
  views: number;
  created_at: string;
  file_url?: string | null;
  file_name?: string | null;
}

interface MediaGalleryProps {
  initialNews: MediaNewsItem[];
}

export default function MediaGallery({ initialNews }: MediaGalleryProps) {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');

  const [newsList, setNewsList] = useState<MediaNewsItem[]>(initialNews || []);
  const [selectedItem, setSelectedItem] = useState<MediaNewsItem | null>(null);

  // Handle Photo Card Click -> Open Detail Viewer
  const handleOpenModal = (item: MediaNewsItem) => {
    setSelectedItem(item);
    setNewsList(prev =>
      prev.map(n => (n.id === item.id ? { ...n, views: n.views + 1 } : n))
    );
    fetch(`/api/news/views?id=${item.id}`, { method: 'POST' }).catch(() => {});
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Bar (Count badge only, no public upload button) */}
      <div className="flex items-center justify-between py-2 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold text-gray-500 tracking-wide uppercase">
            {isEnglish ? 'PR Gallery' : '홍보자료 갤러리'}
          </span>
          <span className="bg-brand-green/10 text-brand-green text-xs font-bold px-2.5 py-0.5 rounded-full">
            {isEnglish ? `Total ${newsList.length}` : `전체 ${newsList.length}건`}
          </span>
        </div>
      </div>

      {/* Empty State */}
      {(!newsList || newsList.length === 0) ? (
        <div className="text-center py-20 px-4 bg-gray-50/60 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shadow-inner">
            <ImageIcon size={30} />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-gray-700 text-base">
              {isEnglish ? 'No PR media materials registered yet.' : '등록된 홍보자료가 없습니다.'}
            </h4>
            <p className="text-gray-400 text-xs md:text-sm">
              {isEnglish
                ? 'Promotional photos and media materials will be published soon.'
                : '새로운 다산제약의 홍보 및 미디어 자료가 등록될 예정입니다.'}
            </p>
          </div>
        </div>
      ) : (
        /* Photo Gallery Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {newsList.map((item) => {
            const hasImage = !!item.file_url;
            const formattedDate = new Date(item.created_at)
              .toLocaleDateString('ko-KR')
              .replace(/\. /g, '.')
              .replace(/\.$/, '');

            return (
              <div
                key={item.id}
                onClick={() => handleOpenModal(item)}
                className="group bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-green/50 transition-all duration-300 cursor-pointer flex flex-col transform hover:-translate-y-1"
              >
                {/* Photo Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  {hasImage ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.file_url!}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="w-11 h-11 rounded-full bg-white/95 text-brand-green flex items-center justify-center shadow-xl backdrop-blur-sm">
                          <ZoomIn size={22} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-300 space-y-2 p-6">
                      <ImageIcon size={40} className="text-gray-300" />
                      <span className="text-xs font-semibold text-gray-400">
                        {isEnglish ? 'PR Material' : '홍보 사진'}
                      </span>
                    </div>
                  )}

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-brand-green/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm tracking-wide">
                      {isEnglish ? 'PR Media' : '홍보자료'}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <h3 className="font-bold text-gray-900 group-hover:text-brand-green transition-colors text-base line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100 font-medium">
                    <div className="flex items-center space-x-1.5">
                      <Calendar size={13} className="text-gray-400" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye size={13} className="text-gray-400" />
                      <span>{item.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================= */}
      {/* INTERACTIVE PHOTO MODAL VIEWER                            */}
      {/* ========================================================= */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div className="space-y-1 pr-6">
                <span className="text-[11px] font-black uppercase text-brand-green tracking-wider">
                  {isEnglish ? 'Dasan Media Room' : '다산제약 홍보자료실'}
                </span>
                <h3 className="text-lg md:text-xl font-black text-gray-900 leading-snug">
                  {selectedItem.title}
                </h3>
                <div className="flex items-center space-x-4 text-xs text-gray-400 pt-1">
                  <span>
                    {new Date(selectedItem.created_at)
                      .toLocaleDateString('ko-KR')
                      .replace(/\. /g, '.')
                      .replace(/\.$/, '')}
                  </span>
                  <span>•</span>
                  <span>{isEnglish ? `Views ${selectedItem.views}` : `조회수 ${selectedItem.views}`}</span>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Large High-Res Image */}
              {selectedItem.file_url && (
                <div className="rounded-2xl overflow-hidden bg-gray-950 flex items-center justify-center border border-gray-200 shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedItem.file_url}
                    alt={selectedItem.title}
                    className="max-h-[500px] w-auto max-w-full object-contain mx-auto"
                  />
                </div>
              )}

              {/* Description / Content */}
              {selectedItem.content && selectedItem.content.trim() && (
                <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line bg-gray-50/80 p-5 rounded-2xl border border-gray-100">
                  <div dangerouslySetInnerHTML={{ __html: selectedItem.content }} />
                </div>
              )}

              {/* Download original button */}
              {selectedItem.file_url && (
                <div className="pt-2 flex justify-end">
                  <a
                    href={selectedItem.file_url}
                    download={selectedItem.file_name || 'dasan_pr_photo.jpg'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-5 py-2.5 rounded-xl text-xs md:text-sm shadow-md shadow-brand-green/20 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <Download size={16} />
                    <span>{isEnglish ? 'Download Original Photo' : '원본 사진 다운로드'}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
