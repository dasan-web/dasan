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
      <div className="border border-gray-150 rounded-xl bg-white p-5 md:p-6 space-y-6">
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
        <form onSubmit={handleSearch} className="flex max-w-2xl w-full items-stretch border border-gray-250 rounded-md overflow-hidden bg-white">
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
              className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col group hover:border-brand-green transition-colors cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-200"
            >
              {/* Product Image / Logo Fallback Container */}
              <div className="aspect-square bg-gray-50/50 flex items-center justify-center border-b border-gray-100 overflow-hidden">
                {product.file_url && /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(product.file_url) ? (
                  <img 
                    src={product.file_url} 
                    alt={product.name} 
                    className="w-full h-full object-fill"
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
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-bold text-gray-400 uppercase">
                      {product.type}
                    </span>
                  </div>
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
          className="fixed inset-0 z-50 flex justify-center overflow-y-auto p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-[380px] w-full shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in-95 duration-200 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-650 transition-colors p-1.5 hover:bg-gray-150 rounded-full z-10 cursor-pointer bg-white/80 backdrop-blur-xs shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Scrollable Container for Content */}
            <div className="max-h-[85vh] overflow-y-auto">
              {/* Product Image Area */}
              <div className="aspect-video bg-gray-50/50 flex items-center justify-center border-b border-gray-100 overflow-hidden relative">
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
              <div className="p-5 space-y-4 text-left">
                <div>
                  <span className="text-[10px] font-extrabold text-brand-green uppercase tracking-wider bg-brand-green/10 px-2 py-0.5 rounded">
                    {selectedProduct.type}
                  </span>
                  <h3 className="text-base font-black text-gray-805 mt-2">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-gray-450 mt-0.5">
                    {selectedProduct.englishName}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-2.5">
                  <div>
                    <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-wider">효능 / 효과</h4>
                    <p className="text-xs font-semibold text-gray-650 mt-1 leading-relaxed bg-gray-50/80 p-3 rounded-xl border border-gray-200/60 whitespace-pre-wrap">
                      {selectedProduct.efficacy || '등록된 정보가 없습니다.'}
                    </p>
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
