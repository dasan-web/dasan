'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface CustomDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CustomDatePicker({ value, onChange, placeholder = 'YYYY-MM-DD' }: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) return d;
    }
    return new Date();
  });
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync input value when prop value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Handle outside click to close calendar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9]/g, ''); // only allow digits
    
    // Auto-format to YYYY-MM-DD
    if (val.length > 4 && val.length <= 6) {
      val = val.slice(0, 4) + '-' + val.slice(4);
    } else if (val.length > 6) {
      val = val.slice(0, 4) + '-' + val.slice(4, 6) + '-' + val.slice(6, 8);
    }
    
    setInputValue(val);
    
    // If fully valid length, update parent
    if (val.length === 10) {
      const d = new Date(val);
      if (!isNaN(d.getTime())) {
        onChange(val);
        setCurrentMonth(d);
      }
    } else if (val.length === 0) {
      onChange('');
    }
  };

  const handleInputBlur = () => {
    if (inputValue.length > 0 && inputValue.length < 10) {
      // If incomplete, reset to parent value
      setInputValue(value);
    }
  };

  const generateDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    // Padding for first week
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    // Days of month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  };

  const handleDayClick = (day: Date) => {
    const year = day.getFullYear();
    const month = String(day.getMonth() + 1).padStart(2, '0');
    const dateStr = String(day.getDate()).padStart(2, '0');
    const formatted = `${year}-${month}-${dateStr}`;
    
    setInputValue(formatted);
    onChange(formatted);
    setIsOpen(false);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          maxLength={10}
          className="w-full bg-[#0a1120] border border-white/10 text-white rounded-xl px-4 py-2.5 font-semibold text-xs focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green/50 outline-none transition-all placeholder:text-gray-600"
        />
        <CalendarIcon 
          size={16} 
          className="absolute right-3 text-gray-400 cursor-pointer" 
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 p-4 bg-white rounded-xl shadow-xl z-50 w-64 border border-gray-100 animate-fade-in">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
              <ChevronLeft size={16} />
            </button>
            <div className="font-bold text-gray-800 text-sm">
              {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
            </div>
            <button type="button" onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
              <ChevronRight size={16} />
            </button>
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2 text-center">
            {['일', '월', '화', '수', '목', '금', '토'].map(d => (
              <div key={d} className="text-xs font-bold text-gray-400">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {generateDays().map((day, idx) => {
              if (!day) return <div key={`empty-${idx}`} className="h-8"></div>;
              
              const isSelected = value && !isNaN(new Date(value).getTime()) 
                ? isSameDay(day, new Date(value)) 
                : false;
              const isToday = isSameDay(day, new Date());
              
              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => handleDayClick(day)}
                  className={`
                    h-8 w-8 rounded-full flex items-center justify-center text-xs transition-colors
                    ${isSelected ? 'bg-brand-green text-white font-bold' : 
                      isToday ? 'bg-gray-100 text-brand-green font-bold hover:bg-gray-200' : 
                      'text-gray-700 hover:bg-gray-100'}
                  `}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
