'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  englishName: string;
  type: '전문의약품' | '일반의약품';
  efficacy: string;
  consonant: string;
  file_url?: string | null;
  file_name?: string | null;
  category?: string | null;
  ingredient?: string | null;
  content?: string | null;
  reference_drug?: string | null;
  efficacy_detail?: string | null;
  appearance?: string | null;
  ingredient_detail?: string | null;
  usage_capacity?: string | null;
  storage_method?: string | null;
  packaging_unit?: string | null;
  insurance_code?: string | null;
  insurance_price?: number | null;
  precautions?: string | null;
}





const consonants = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];


const efficacyDict: Record<string, string> = {
  "동맥경화용제": "Anti-arteriosclerotic",
  "기타의화학요법제": "Other Chemotherapeutics",
  "해열,진통,소염제": "Antipyretic, Analgesic, Anti-inflammatory",
  "혈압강하제": "Antihypertensive",
  "소화성궤양용제": "Peptic Ulcer Agents",
  "기타의순환계용약": "Other Cardiovascular Agents",
  "당뇨병용제": "Antidiabetics",
  "혈관확장제": "Vasodilators",
  "정신신경용제": "Psychotropics",
  "기타의중추신경용약": "Other Central Nervous System Agents",
  "주로그람양성,음성균,리케치아,비루스에작용하는것": "Antibiotics (Gram+/-, Rickettsia, Virus)",
  "주로그람양성,음성균에작용하는것": "Antibiotics (Gram+/-)",
  "최면진정제": "Hypnotics & Sedatives",
  "해열.진통.소염제": "Antipyretic, Analgesic, Anti-inflammatory",
  "항히스타민제": "Antihistamines",
  "간장질환용제": "Hepatic Protectants",
  "소화기관용약": "Gastrointestinal Agents",
  "진해거담제": "Antitussives & Expectorants",
  "이비과용제": "Otorhinolaryngologicals",
  "기타의소화기관용약": "Other Gastrointestinal Agents",
  "항악성종양제": "Antineoplastics",
  "혈액응고저지제": "Anticoagulants",
  "안과용제": "Ophthalmics",
  "호흡기관용약": "Respiratory Agents",
  "치과구강용약": "Dental & Oral Agents",
  "비타민제": "Vitamins",
  "기타의비타민제": "Other Vitamins",
  "혼합비타민제(비타민AD혼합제제외)": "Mixed Vitamins",
  "따로분류되지않는대사성의약품": "Other Metabolic Agents"
};

const translateEfficacy = (koText: string, isEng: boolean) => {
  if (!isEng || !koText) return koText;
  return efficacyDict[koText.trim()] || koText;
};

export default function ProductSearch() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');

  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'prescription' | 'otc'>('all');
  const [searchMode, setSearchMode] = useState<'name' | 'efficacy'>('name');
  const [selectedConsonant, setSelectedConsonant] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetch('/api/products', { cache: 'no-store' })
      .then(res => {
        if (!res.ok) return null;
        const ct = res.headers.get('content-type');
        if (ct && ct.includes('application/json')) return res.json();
        return null;
      })
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

  // Filter and Sort Products (Ascending by Product Name)
  const filteredProducts = useMemo(() => {
    const list = productsList.filter(product => {
      if (activeTab === 'prescription' && product.type !== '전문의약품') return false;
      if (activeTab === 'otc' && product.type !== '일반의약품') return false;
      if (searchMode === 'name' && selectedConsonant && product.consonant !== selectedConsonant) return false;

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        if (searchMode === 'name') {
          const matchesName = (product.name && product.name.toLowerCase().includes(q)) || 
                              (product.englishName && product.englishName.toLowerCase().includes(q)) ||
                              (product.efficacy && product.efficacy.toLowerCase().includes(q));
          if (!matchesName) return false;
        } else {
          const matchesEfficacy = product.efficacy && product.efficacy.toLowerCase().includes(q);
          if (!matchesEfficacy) return false;
        }
      }

      return true;
    });

    return list.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'ko'));
  }, [productsList, activeTab, searchMode, selectedConsonant, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            setCurrentPage(1);
          }}
          className={`pb-3 transition-all cursor-pointer select-none font-bold ${
            activeTab === 'all'
              ? 'text-brand-green border-b-2 border-brand-green'
              : 'text-gray-400 hover:text-brand-green'
          }`}
        >{isEnglish ? 'All' : '전체'}</button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('prescription');
            setSelectedConsonant(null);
            setSearchQuery('');
            setCurrentPage(1);
          }}
          className={`pb-3 transition-all cursor-pointer select-none font-bold ${
            activeTab === 'prescription'
              ? 'text-brand-green border-b-2 border-brand-green'
              : 'text-gray-400 hover:text-brand-green'
          }`}
        >{isEnglish ? 'ETC' : '전문의약품'}</button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('otc');
            setSelectedConsonant(null);
            setSearchQuery('');
            setCurrentPage(1);
          }}
          className={`pb-3 transition-all cursor-pointer select-none font-bold ${
            activeTab === 'otc'
              ? 'text-brand-green border-b-2 border-brand-green'
              : 'text-gray-400 hover:text-brand-green'
          }`}
        >{isEnglish ? 'OTC' : '일반의약품'}</button>
      </div>

      {/* 2. Main Search Area (Flat & Sleek) */}
      <div className="border border-gray-200 rounded-xl bg-white p-5 md:p-6 space-y-6">
        {/* Search Mode Buttons (Simple Flat Links) */}
        <div className="flex space-x-6 border-b border-gray-100 pb-3 text-xs md:text-sm font-bold">
          <button
            type="button"
            onClick={() => {
              setSearchMode('name');
              setSearchQuery('');
              setCurrentPage(1);
            }}
            className={`pb-1 transition-all cursor-pointer select-none ${
              searchMode === 'name' 
                ? 'text-brand-green border-b-2 border-brand-green' 
                : 'text-gray-400 hover:text-brand-green'
            }`}
          >{isEnglish ? 'Search by Name' : '제품명 검색'}</button>
          <button
            type="button"
            onClick={() => {
              setSearchMode('efficacy');
              setSelectedConsonant(null);
              setSearchQuery('');
              setCurrentPage(1);
            }}
            className={`pb-1 transition-all cursor-pointer select-none ${
              searchMode === 'efficacy' 
                ? 'text-brand-green border-b-2 border-brand-green' 
                : 'text-gray-400 hover:text-brand-green'
            }`}
          >{isEnglish ? 'Search by Efficacy' : '효능별 검색'}</button>
        </div>

        {/* Consonant Filter */}
        {searchMode === 'name' && !isEnglish && (
          <div className="space-y-2.5">
            <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
              {consonants.map(con => (
                <button
                  key={con}
                  onClick={() => {
                    setSelectedConsonant(selectedConsonant === con ? null : con);
                    setCurrentPage(1);
                  }}
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
        <form onSubmit={(e) => e.preventDefault()} className="flex max-w-2xl w-full items-stretch border border-gray-200 rounded-md overflow-hidden bg-white relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={
              searchMode === 'name'
                ? isEnglish ? 'Enter product name (e.g., Levodrop)' : '검색하실 제품명 또는 영문명을 입력해 주세요 (예: 레 -> 레보드로프)'
                : isEnglish ? 'Please enter the efficacy/effect to search (e.g., hypertension, diabetes, etc.)' : '검색하실 효능/효과를 입력해 주세요 (예: 고혈압, 당뇨 등)'
            }
            className="flex-1 bg-transparent border-none outline-none px-4 py-2.5 pr-10 text-xs md:text-sm text-gray-700 placeholder-gray-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              title={isEnglish ? 'Clear' : '초기화'}
            >
              <X size={16} />
            </button>
          )}
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
            {isEnglish ? 'Loading data...' : '데이터를 불러오는 중입니다...'}
          </div>
        ) : paginatedProducts.length > 0 ? (
          paginatedProducts.map((product: Product) => (
            <Link 
              key={product.id} 
              href={isEnglish ? `/en/business/finished/search/${product.id}` : `/business/finished/search/${product.id}`}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col group hover:border-gray-300 transition-colors cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-200"
            >
              {/* Product Image / Logo Fallback Container */}
              <div className="aspect-square bg-white flex items-center justify-center border-b border-gray-100 overflow-hidden relative">
                <div className="absolute top-0 left-0 z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-br-2xl text-[9px] font-bold tracking-widest bg-white/95 backdrop-blur-md border-b border-r border-gray-100 shadow-[2px_2px_8px_rgba(0,0,0,0.04)] text-gray-600 transition-all hover:shadow-[2px_4px_12px_rgba(0,0,0,0.08)] cursor-default">
                    <span className={`w-1.5 h-1.5 rounded-full ${product.type === '전문의약품' ? 'bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.4)]' : 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.4)]'}`} />
                    {product.type === '전문의약품' ? (isEnglish ? 'ETC' : '전문의약품') : (isEnglish ? 'OTC' : '일반의약품')}
                  </div>
                </div>
                {product.file_url && /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(product.file_url) ? (
                  <img 
                    src={product.file_url} 
                    alt={product.name} 
                    className="w-full h-full object-contain p-4 pt-10"
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
                    {isEnglish ? (product.englishName || product.name) : product.name}
                  </h5>
                  <p className="text-[10px] text-gray-450 mt-0.5">
                    {isEnglish ? product.name : product.englishName}
                  </p>
                </div>

                {/* Efficacy Box */}
                <div className="space-y-2">
                  <div className="bg-gray-50 text-gray-500 text-[10px] md:text-xs font-semibold py-1 px-2.5 rounded text-center">{translateEfficacy(product.efficacy, isEnglish)}</div>

                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-16 text-gray-400 text-sm">
            {isEnglish ? 'No products match your search.' : '검색 결과와 일치하는 제품이 없습니다.'}
          </div>
        )}
      </div>

      {/* 4. Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 pt-8">
          {/* First Page Button << */}
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-xs"
            title="첫 페이지"
          >
            &lt;&lt;
          </button>

          {/* Prev Page Button < */}
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            title="이전 페이지"
          >
            &lt;
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-semibold transition-colors ${
                currentPage === page
                  ? 'bg-brand-green text-white border border-brand-green'
                  : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Page Button > */}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            title="다음 페이지"
          >
            &gt;
          </button>

          {/* Last Page Button >> */}
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-xs"
            title="마지막 페이지"
          >
            &gt;&gt;
          </button>
        </div>
      )}
    </div>
  );
}
