'use client';
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  englishName: string;
  type: '전문의약품' | '일반의약품';
  efficacy: string;
  consonant: string;
  file_url?: string | null;
  file_name?: string | null;
}



const consonants = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

export default function ProductSearch() {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'prescription' | 'otc'>('all');
  const [searchMode, setSearchMode] = useState<'name' | 'efficacy'>('name');
  const [selectedConsonant, setSelectedConsonant] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProductsList(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, []);

  // Handle Search Submission
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSubmittedQuery(searchQuery);
  };

  // Filter Products
  const filteredProducts = productsList.filter(product => {
    if (activeTab === 'prescription' && product.type !== '전문의약품') return false;
    if (activeTab === 'otc' && product.type !== '일반의약품') return false;
    if (searchMode === 'name' && selectedConsonant && product.consonant !== selectedConsonant) return false;

    if (submittedQuery.trim() !== '') {
      const q = submittedQuery.toLowerCase().trim();
      if (searchMode === 'name') {
        const matchesName = product.name.toLowerCase().includes(q) || product.englishName.toLowerCase().includes(q);
        if (!matchesName) return false;
      } else {
        const matchesEfficacy = product.efficacy.toLowerCase().includes(q);
        if (!matchesEfficacy) return false;
      }
    }

    return true;
  });

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* 1. Category Tabs (Classic Minimal Underline) */}
      <div className="flex space-x-8 border-b border-gray-200/80 text-xs md:text-sm font-semibold pb-px">
        <button
          type="button"
          onClick={() => {
            setActiveTab('all');
            setSelectedConsonant(null);
            setSearchQuery('');
            setSubmittedQuery('');
          }}
          className={`pb-3 transition-all cursor-pointer select-none font-bold ${
            activeTab === 'all'
              ? 'text-brand-green border-b-2 border-brand-green'
              : 'text-gray-400 hover:text-brand-green'
          }`}
        >
          전체
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('prescription');
            setSelectedConsonant(null);
            setSearchQuery('');
            setSubmittedQuery('');
          }}
          className={`pb-3 transition-all cursor-pointer select-none font-bold ${
            activeTab === 'prescription'
              ? 'text-brand-green border-b-2 border-brand-green'
              : 'text-gray-400 hover:text-brand-green'
          }`}
        >
          전문의약품
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('otc');
            setSelectedConsonant(null);
            setSearchQuery('');
            setSubmittedQuery('');
          }}
          className={`pb-3 transition-all cursor-pointer select-none font-bold ${
            activeTab === 'otc'
              ? 'text-brand-green border-b-2 border-brand-green'
              : 'text-gray-400 hover:text-brand-green'
          }`}
        >
          일반의약품
        </button>
      </div>

      {/* 2. Main Search Area (Flat & Sleek) */}
      <div className="border border-brand-green rounded-xl bg-white p-5 md:p-6 space-y-6">
        {/* Search Mode Buttons (Simple Flat Links) */}
        <div className="flex space-x-6 border-b border-gray-100 pb-3 text-xs md:text-sm font-bold">
          <button
            type="button"
            onClick={() => {
              setSearchMode('name');
              setSearchQuery('');
              setSubmittedQuery('');
            }}
            className={`pb-1 transition-all cursor-pointer select-none ${
              searchMode === 'name' 
                ? 'text-brand-green border-b-2 border-brand-green' 
                : 'text-gray-400 hover:text-brand-green'
            }`}
          >
            제품명 검색
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchMode('efficacy');
              setSelectedConsonant(null);
              setSearchQuery('');
              setSubmittedQuery('');
            }}
            className={`pb-1 transition-all cursor-pointer select-none ${
              searchMode === 'efficacy' 
                ? 'text-brand-green border-b-2 border-brand-green' 
                : 'text-gray-400 hover:text-brand-green'
            }`}
          >
            효능별 검색
          </button>
        </div>

        {/* Consonant Filter */}
        {searchMode === 'name' && (
          <div className="space-y-2.5">
            <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
              {consonants.map(con => (
                <button
                  key={con}
                  onClick={() => setSelectedConsonant(selectedConsonant === con ? null : con)}
                  className={`w-7 h-7 text-xs font-semibold border rounded transition-all cursor-pointer select-none ${
                    selectedConsonant === con
                      ? 'bg-brand-green text-white border-brand-green'
                      : 'bg-white text-gray-500 hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  {con}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Text Input Search Bar (Flat Border) */}
        <form onSubmit={handleSearch} className="flex max-w-2xl w-full items-stretch border border-brand-green rounded-md overflow-hidden bg-white">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              searchMode === 'name'
                ? '검색하실 제품명을 입력해 주세요'
                : '검색하실 효능/효과를 입력해 주세요 (예: 고혈압, 당뇨 등)'
            }
            className="flex-1 bg-transparent border-none outline-none px-4 py-2.5 text-xs md:text-sm text-gray-700 placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-brand-green hover:bg-brand-green-dark text-white px-5 transition-colors flex items-center justify-center cursor-pointer"
          >
            <Search size={16} strokeWidth={2.5} />
          </button>
        </form>
      </div>

      {/* 3. Flat & Minimalist Product Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-2">
        {loading ? (
          <div className="col-span-full text-center py-16 text-gray-400 text-sm">
            데이터를 불러오는 중입니다...
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div 
              key={product.id} 
              onClick={() => setSelectedProduct(product)}
              className="bg-white border border-brand-green rounded-lg overflow-hidden flex flex-col group hover:border-brand-green transition-colors cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-200"
            >
              {/* Product Image / Logo Fallback Container */}
              <div className="aspect-square bg-white flex items-center justify-center border-b border-gray-100 overflow-hidden relative">
                <div className="absolute top-0 left-0 z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-br-2xl text-[9px] font-bold tracking-widest bg-white/95 backdrop-blur-md border-b border-r border-gray-100 shadow-[2px_2px_8px_rgba(0,0,0,0.04)] text-gray-600 transition-all hover:shadow-[2px_4px_12px_rgba(0,0,0,0.08)] cursor-default">
                    <span className={`w-1.5 h-1.5 rounded-full ${product.type === '전문의약품' ? 'bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.4)]' : 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.4)]'}`} />
                    {product.type}
                  </div>
                </div>
                {product.file_url && /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(product.file_url) ? (
                  <img 
                    src={product.file_url} 
                    alt={product.name} 
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <span className="text-[10px] tracking-wider text-gray-300 font-extrabold uppercase select-none">
                    DASAN PHARM
                  </span>
                )}
              </div>

              {/* Text Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h5 className="font-bold text-gray-800 text-xs md:text-sm leading-tight group-hover:text-brand-green transition-colors">
                    {product.name}
                  </h5>
                  <p className="text-[10px] text-gray-450 mt-0.5">
                    {product.englishName}
                  </p>
                </div>

                {/* Efficacy Box */}
                <div className="space-y-2">
                  <div className="bg-gray-50 text-gray-500 text-[10px] md:text-xs font-semibold py-1 px-2.5 rounded text-center">
                    {product.efficacy}
                  </div>

                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 text-gray-400 text-sm">
            검색 결과와 일치하는 제품이 없습니다.
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex justify-center overflow-y-auto p-4 bg-slate-900/60 backdrop-blur-md transition-all duration-300"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="bg-white rounded-[24px] max-w-[420px] w-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] relative ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-300 my-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 transition-all p-2 hover:bg-slate-100 rounded-full z-20 cursor-pointer bg-white/90 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Scrollable Container for Content */}
            <div className="max-h-[85vh] overflow-y-auto">
              {/* Product Image Area */}
              <div className="aspect-video bg-white flex items-center justify-center border-b border-gray-100 overflow-hidden relative">
                <div className="absolute top-0 left-0 z-10">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-br-2xl text-[10px] font-bold tracking-widest bg-white/95 backdrop-blur-md border-b border-r border-gray-100 shadow-[2px_2px_12px_rgba(0,0,0,0.06)] text-gray-700 cursor-default">
                    <span className={`w-1.5 h-1.5 rounded-full ${selectedProduct.type === '전문의약품' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'}`} />
                    {selectedProduct.type}
                  </div>
                </div>
                {selectedProduct.file_url && /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(selectedProduct.file_url) ? (
                  <img 
                    src={selectedProduct.file_url} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <span className="text-sm tracking-wider text-gray-300 font-extrabold uppercase select-none">
                    DASAN PHARM
                  </span>
                )}
              </div>

              {/* Content Area */}
              <div className="p-6 md:p-8 space-y-6 text-left bg-white relative z-10">
                <div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 mt-1.5 tracking-wider uppercase">
                    {selectedProduct.englishName}
                  </p>
                </div>

                <div className="border-t border-slate-100/80 pt-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-3.5 bg-brand-green rounded-full"></div>
                    <h4 className="text-[11px] font-extrabold text-slate-800 tracking-widest">효능 및 효과</h4>
                  </div>
                  <div className="bg-slate-50/80 text-sm font-medium text-slate-700 leading-relaxed p-4 rounded-xl border border-slate-200/50 whitespace-pre-wrap shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                    {selectedProduct.efficacy || '등록된 정보가 없습니다.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
