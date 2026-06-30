'use client';

import React, { useEffect, useState, useRef } from 'react';
import { X, GripHorizontal } from 'lucide-react';

interface PopupData {
  id: number;
  title: string;
  content: string;
  link_url: string;
  width: number;
  height: number;
  top_pos: number;
  left_pos: number;
}

function DraggablePopupItem({ popup, closePopup }: { popup: PopupData, closePopup: (id: number, doNotShowToday: boolean) => void }) {
  const [position, setPosition] = useState({ x: popup.left_pos || 100, y: popup.top_pos || 100 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only drag on left click
    if (e.button !== 0) return;
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    };
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      className="fixed z-[9999] bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] rounded-3xl overflow-hidden flex flex-col border border-brand-green/20 animate-popup ring-1 ring-black/5 backdrop-blur-xl"
      style={{
        width: popup.width ? `${popup.width}px` : '400px',
        height: popup.height ? `${popup.height}px` : 'auto',
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      {/* Header - Green Premium Design & Draggable Area */}
      <div 
        onMouseDown={handleMouseDown}
        className="bg-gradient-to-r from-brand-green to-brand-green-dark px-4 py-2 border-b border-brand-green/20 flex justify-between items-center z-10 sticky top-0 cursor-move select-none"
      >
        <div className="flex items-center space-x-2 text-white">
          <GripHorizontal size={16} className="opacity-60" />
          <h3 className="text-[15px] font-extrabold tracking-tight truncate pr-4 drop-shadow-md">{popup.title}</h3>
        </div>
        <button 
          onClick={() => closePopup(popup.id, false)} 
          className="p-1.5 -mr-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
          onMouseDown={(e) => e.stopPropagation()} // Prevent drag when clicking close
        >
          <X size={18} strokeWidth={2.5} />
        </button>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-auto bg-white relative">
        {popup.link_url ? (
          <a href={popup.link_url} target="_blank" rel="noreferrer" className="block w-full h-full">
            <div className="w-full h-full p-6 prose prose-sm prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: popup.content || '' }} />
          </a>
        ) : (
          <div className="w-full h-full p-6 prose prose-sm prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: popup.content || '' }} />
        )}
      </div>

      {/* Footer Controls */}
      <div className="bg-gray-50/90 backdrop-blur px-5 py-3.5 flex justify-between items-center border-t border-gray-100">
        <label className="flex items-center space-x-2.5 cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded-md border-gray-300 text-brand-green focus:ring-brand-green/20 transition-all cursor-pointer peer"
              onChange={(e) => {
                if (e.target.checked) closePopup(popup.id, true);
              }}
            />
          </div>
          <span className="text-xs font-semibold text-gray-500 group-hover:text-brand-green transition-colors">오늘 하루 보지 않기</span>
        </label>
        <button 
          onClick={() => closePopup(popup.id, false)} 
          className="text-xs font-bold text-gray-500 hover:text-white hover:bg-brand-green transition-colors px-4 py-1.5 rounded-lg border border-gray-200 hover:border-brand-green shadow-sm"
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default function PopupWrapper() {
  const [popups, setPopups] = useState<PopupData[]>([]);

  useEffect(() => {
    // Fetch active popups
    const loadPopups = async () => {
      try {
        const res = await fetch('/api/popups');
        if (res.ok) {
          const data = await res.json();
          // Filter out popups that are hidden via cookies
          const visiblePopups = (data || []).filter((p: PopupData) => {
            const isHidden = document.cookie.includes(`hide_popup_${p.id}=true`);
            return !isHidden;
          });
          setPopups(visiblePopups);
        }
      } catch (err) {
        console.error('Failed to load popups', err);
      }
    };
    loadPopups();
  }, []);

  const closePopup = (id: number, doNotShowToday: boolean) => {
    if (doNotShowToday) {
      // Set cookie to expire in 24 hours
      const date = new Date();
      date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
      document.cookie = `hide_popup_${id}=true;expires=${date.toUTCString()};path=/`;
    }
    setPopups(prev => prev.filter(p => p.id !== id));
  };

  if (popups.length === 0) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes popup-enter {
          0% { opacity: 0; transform: translateY(20px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-popup {
          animation: popup-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
      {popups.map(popup => (
        <DraggablePopupItem key={popup.id} popup={popup} closePopup={closePopup} />
      ))}
    </>
  );
}
