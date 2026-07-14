'use client';
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Pill, Building2, ChevronRight, Map as MapIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  englishName: string;
}

interface Pharmacy {
  id: number;
  name: string;
  address: string;
  phone: string;
  products: number[]; // Product IDs they carry
  sido: string;
  sigungu: string;
}

const REGIONS: Record<string, string[]> = {
  '서울': ['강남구', '서초구', '송파구', '영등포구', '마포구', '종로구'],
  '경기': ['수원시', '성남시', '용인시', '고양시', '부천시', '안양시'],
  '인천': ['연수구', '남동구', '부평구', '서구', '중구'],
  '충남': ['천안시', '아산시', '공주시', '보령시', '서산시'],
  // Add more as needed
};

// Mock Data for pharmacies
const MOCK_PHARMACIES: Pharmacy[] = [
  { id: 1, name: '강남제일약국', address: '서울특별시 강남구 테헤란로 152', phone: '02-123-4567', products: [1, 2, 3], sido: '서울', sigungu: '강남구' },
  { id: 2, name: '우리들약국', address: '서울특별시 강남구 역삼로 100', phone: '02-987-6543', products: [2, 4], sido: '서울', sigungu: '강남구' },
  { id: 3, name: '영등포다산약국', address: '서울특별시 영등포구 선유로 70', phone: '02-555-7777', products: [1, 3, 5], sido: '서울', sigungu: '영등포구' },
  { id: 4, name: '수원건강약국', address: '경기도 수원시 영통구 매영로 345', phone: '031-111-2222', products: [1, 2, 3, 4, 5], sido: '경기', sigungu: '수원시' },
  { id: 5, name: '아산행복약국', address: '충청남도 아산시 도고면 덕암산로 342', phone: '041-333-4444', products: [2, 5], sido: '충남', sigungu: '아산시' },
];

export default function FindPharmacy() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Search Flow State
  const [searchMode, setSearchMode] = useState<'product' | 'location'>('product');
  
  // Step State
  const [selectedProductId, setSelectedProductId] = useState<number | ''>('');
  const [selectedSido, setSelectedSido] = useState<string>('');
  const [selectedSigungu, setSelectedSigungu] = useState<string>('');
  
  const [results, setResults] = useState<Pharmacy[] | null>(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);

  useEffect(() => {
    // Fetch products for dropdown
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    let filtered = MOCK_PHARMACIES;

    if (searchMode === 'product') {
      if (!selectedProductId) return alert(isEnglish ? 'Please select a product first.' : '제품을 먼저 선택해주세요.');
      filtered = filtered.filter(p => p.products.includes(Number(selectedProductId)));
      if (selectedSido) filtered = filtered.filter(p => p.sido === selectedSido);
      if (selectedSigungu) filtered = filtered.filter(p => p.sigungu === selectedSigungu);
    } else {
      if (!selectedSido) return alert(isEnglish ? 'Please select a region first.' : '지역을 먼저 선택해주세요.');
      filtered = filtered.filter(p => p.sido === selectedSido);
      if (selectedSigungu) filtered = filtered.filter(p => p.sigungu === selectedSigungu);
      if (selectedProductId) filtered = filtered.filter(p => p.products.includes(Number(selectedProductId)));
    }

    setResults(filtered);
    if (filtered.length > 0) {
      setSelectedPharmacy(filtered[0]);
    } else {
      setSelectedPharmacy(null);
    }
  };

  const resetSearch = (mode: 'product' | 'location') => {
    setSearchMode(mode);
    setSelectedProductId('');
    setSelectedSido('');
    setSelectedSigungu('');
    setResults(null);
    setSelectedPharmacy(null);
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* 1. Category Tabs */}
      <div className="flex space-x-8 border-b border-gray-200/80 text-xs md:text-sm font-semibold pb-px">
        <button
          type="button"
          onClick={() => resetSearch('product')}
          className={`pb-3 transition-all cursor-pointer select-none font-bold ${
            searchMode === 'product'
              ? 'text-brand-green border-b-2 border-brand-green'
              : 'text-gray-400 hover:text-brand-green'
          }`}
        >
          {isEnglish ? 'By Product' : '제품 기반 검색'}
        </button>
        <button
          type="button"
          onClick={() => resetSearch('location')}
          className={`pb-3 transition-all cursor-pointer select-none font-bold ${
            searchMode === 'location'
              ? 'text-brand-green border-b-2 border-brand-green'
              : 'text-gray-400 hover:text-brand-green'
          }`}
        >
          {isEnglish ? 'By Location' : '위치 기반 검색'}
        </button>
      </div>

      {/* 2. Search Controls */}
      <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 md:items-end">
        
        {searchMode === 'product' ? (
          <>
            <div className="flex-1 space-y-2">
              <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-brand-green text-white flex items-center justify-center text-[10px]">1</span>
                {isEnglish ? 'Select Product' : '제품 선택'}
              </label>
              <select 
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
              >
                <option value="">{isEnglish ? 'Select Product' : '제품을 선택하세요'}</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{isEnglish ? p.englishName : p.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden md:flex items-center text-gray-300 pb-3"><ChevronRight size={20} /></div>
            <div className="flex-1 space-y-2">
              <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-brand-green text-white flex items-center justify-center text-[10px]">2</span>
                {isEnglish ? 'Select Region (Optional)' : '지역 선택 (선택)'}
              </label>
              <div className="flex gap-2">
                <select 
                  value={selectedSido}
                  onChange={(e) => { setSelectedSido(e.target.value); setSelectedSigungu(''); }}
                  className="w-1/2 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-green"
                >
                  <option value="">{isEnglish ? 'City/Prov' : '시/도'}</option>
                  {Object.keys(REGIONS).map(sido => (
                    <option key={sido} value={sido}>{sido}</option>
                  ))}
                </select>
                <select 
                  value={selectedSigungu}
                  onChange={(e) => setSelectedSigungu(e.target.value)}
                  disabled={!selectedSido}
                  className="w-1/2 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-green disabled:bg-gray-50"
                >
                  <option value="">{isEnglish ? 'District' : '시/군/구'}</option>
                  {selectedSido && REGIONS[selectedSido]?.map(sigungu => (
                    <option key={sigungu} value={sigungu}>{sigungu}</option>
                  ))}
                </select>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 space-y-2">
              <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-brand-green text-white flex items-center justify-center text-[10px]">1</span>
                {isEnglish ? 'Select Region' : '지역 선택'}
              </label>
              <div className="flex gap-2">
                <select 
                  value={selectedSido}
                  onChange={(e) => { setSelectedSido(e.target.value); setSelectedSigungu(''); }}
                  className="w-1/2 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-green"
                >
                  <option value="">{isEnglish ? 'City/Prov' : '시/도'}</option>
                  {Object.keys(REGIONS).map(sido => (
                    <option key={sido} value={sido}>{sido}</option>
                  ))}
                </select>
                <select 
                  value={selectedSigungu}
                  onChange={(e) => setSelectedSigungu(e.target.value)}
                  disabled={!selectedSido}
                  className="w-1/2 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-green disabled:bg-gray-50"
                >
                  <option value="">{isEnglish ? 'District' : '시/군/구'}</option>
                  {selectedSido && REGIONS[selectedSido]?.map(sigungu => (
                    <option key={sigungu} value={sigungu}>{sigungu}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="hidden md:flex items-center text-gray-300 pb-3"><ChevronRight size={20} /></div>
            <div className="flex-1 space-y-2">
              <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-brand-green text-white flex items-center justify-center text-[10px]">2</span>
                {isEnglish ? 'Select Product (Optional)' : '제품 선택 (선택)'}
              </label>
              <select 
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-green"
              >
                <option value="">{isEnglish ? 'All Products' : '전체 제품'}</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{isEnglish ? p.englishName : p.name}</option>
                ))}
              </select>
            </div>
          </>
        )}

        <button
          onClick={handleSearch}
          className="h-[46px] px-8 bg-brand-green text-white text-sm font-bold rounded-lg hover:bg-brand-green-dark transition-colors flex items-center justify-center gap-2"
        >
          <Search size={16} />
          {isEnglish ? 'Search' : '검색'}
        </button>
      </div>

      {/* 3. Results Section */}
      {results !== null && (
        <div className="animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-brand-blue flex items-center gap-2">
              <MapIcon size={20} className="text-brand-green" />
              {isEnglish ? 'Search Results' : '검색 결과'}
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({isEnglish ? `Total ${results.length}` : `총 ${results.length}건`})
              </span>
            </h3>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 h-[500px]">
            {/* List */}
            <div className="w-full lg:w-1/3 bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm flex flex-col h-full">
              {results.length > 0 ? (
                <div className="overflow-y-auto flex-1 custom-scrollbar">
                  <ul className="divide-y divide-gray-100">
                    {results.map((pharmacy) => (
                      <li key={pharmacy.id}>
                        <button
                          onClick={() => setSelectedPharmacy(pharmacy)}
                          className={`w-full text-left p-5 transition-colors hover:bg-gray-50 ${
                            selectedPharmacy?.id === pharmacy.id ? 'bg-brand-green/5 border-l-4 border-brand-green' : 'border-l-4 border-transparent'
                          }`}
                        >
                          <h4 className="font-bold text-gray-900 text-[15px] mb-2 flex items-center gap-2">
                            <Building2 size={16} className={selectedPharmacy?.id === pharmacy.id ? 'text-brand-green' : 'text-gray-400'} />
                            {pharmacy.name}
                          </h4>
                          <p className="text-xs text-gray-500 mb-1 flex items-start gap-1">
                            <MapPin size={14} className="mt-0.5 flex-shrink-0 text-gray-400" />
                            <span className="break-keep leading-tight">{pharmacy.address}</span>
                          </p>
                          <p className="text-xs text-gray-500 font-medium ml-4.5">{pharmacy.phone}</p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500">
                  <MapPin size={32} className="text-gray-300 mb-3" />
                  <p className="text-sm">{isEnglish ? 'No pharmacies found.' : '검색 조건에 맞는 약국이 없습니다.'}</p>
                  <p className="text-xs text-gray-400 mt-1">{isEnglish ? 'Try changing your search criteria.' : '검색 조건을 변경해 보세요.'}</p>
                </div>
              )}
            </div>

            {/* Map */}
            <div className="w-full lg:w-2/3 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 h-full relative">
              {selectedPharmacy ? (
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(selectedPharmacy.address + ' ' + selectedPharmacy.name)}&output=embed`}
                  allowFullScreen
                  title="Pharmacy Map"
                ></iframe>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-white">
                  <MapIcon size={48} className="text-gray-200 mb-4" />
                  <p className="text-sm">{isEnglish ? 'Select a pharmacy to view on map.' : '목록에서 약국을 선택하시면 지도가 표시됩니다.'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
