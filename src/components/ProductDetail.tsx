'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

const getOptimizedImageUrl = (url?: string | null, width = 800) => {
  if (!url) return '';
  if (url.includes('cloudinary.com') && url.includes('/upload/')) {
    return url.replace('/upload/', `/upload/f_auto,q_auto:good,w_${width}/`);
  }
  return url;
};

const formatInsurancePrice = (val: any) => {
  if (val === null || val === undefined || val === '') return '';
  const str = String(val).trim();
  if (/^\d+(\.\d+)?$/.test(str)) {
    return `${Number(str).toLocaleString()}원`;
  }
  return str;
};

export interface ProductDetailProps {
  productId: string;
  isEnglish?: boolean;
}

export default function ProductDetail({ productId, isEnglish = false }: ProductDetailProps) {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;
    fetch(`/api/products/${productId}`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setProduct(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch product details:', err);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <div className="py-24 text-center text-gray-500 font-semibold animate-pulse">
        {isEnglish ? 'Loading product details...' : '제품 정보를 불러오는 중입니다...'}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {isEnglish ? 'Product not found' : '제품을 찾을 수 없습니다.'}
        </h2>
        <button 
          onClick={() => router.back()}
          className="text-brand-green font-bold hover:underline cursor-pointer"
        >
          {isEnglish ? 'Go Back' : '목록으로 돌아가기'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in-up">
      {/* Back Button */}
      <button 
        onClick={() => router.push(isEnglish ? '/en/business/finished/search' : '/business/finished/search')}
        className="mb-8 inline-flex items-center text-sm font-bold text-slate-500 hover:text-brand-green transition-colors group cursor-pointer"
      >
        <svg className="w-4 h-4 mr-1.5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
        {isEnglish ? 'Back to List' : '목록으로 돌아가기'}
      </button>

      {/* Main Pure White Container */}
      <div className="bg-white rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-slate-100/80 p-6 md:p-10 lg:p-12 space-y-12">
        
        {/* 1. Hero Overview Section (Pure White Background) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-12 border-b border-slate-100">
          
          {/* Hero Image Showcase (Pure White Background) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative bg-white">
            <div className="absolute top-0 left-0 z-10">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold tracking-wider bg-white border border-slate-200 shadow-xs text-slate-700 cursor-default rounded-full">
                <span className={`w-2 h-2 rounded-full ${product.type === '전문의약품' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'}`} />
                {product.type === '전문의약품' ? (isEnglish ? 'ETC' : '전문의약품') : (isEnglish ? 'OTC' : '일반의약품')}
              </div>
            </div>
            
            <div className="w-full aspect-square max-w-[320px] sm:max-w-[360px] flex items-center justify-center p-2 bg-white">
              {product.file_url && /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(product.file_url) ? (
                <img 
                  src={getOptimizedImageUrl(product.file_url, 800)} 
                  alt={product.name} 
                  className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <span className="text-xl tracking-wider text-slate-300 font-extrabold uppercase select-none">
                  DASAN PHARM
                </span>
              )}
            </div>
          </div>

          {/* Hero Quick Highlights Header */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div>
              <span className="inline-block text-xs font-extrabold tracking-widest text-brand-green uppercase mb-2">
                {product.category || (isEnglish ? 'Pharmaceutical Product' : '완제의약품')}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                {isEnglish ? (product.englishName || product.name) : product.name}
              </h1>
              <p className="text-base sm:text-lg font-bold text-slate-400 tracking-wider uppercase">
                {isEnglish ? product.name : product.englishName}
              </p>
            </div>

            {/* Quick Specs Grid Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {product.ingredient && (
                <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 flex flex-col justify-start space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {isEnglish ? 'Ingredient' : '주성분'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 break-keep leading-snug">
                    {product.ingredient}
                  </span>
                </div>
              )}

              {product.content && (
                <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 flex flex-col justify-start space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {isEnglish ? 'Content' : '함량'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 break-keep leading-snug">
                    {product.content}
                  </span>
                </div>
              )}

              {product.appearance && (
                <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 flex flex-col justify-start space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {isEnglish ? 'Appearance' : '성상'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 break-keep leading-snug">
                    {product.appearance}
                  </span>
                </div>
              )}

              {product.insurance_code && (
                <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 flex flex-col justify-start space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {isEnglish ? 'Insurance Code' : '보험코드'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-brand-green tracking-wide break-keep leading-snug">
                    {product.insurance_code}
                  </span>
                </div>
              )}

              {product.insurance_price && (
                <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 flex flex-col justify-start space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {isEnglish ? 'Price' : '보험약가'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 break-keep leading-snug">
                    {formatInsurancePrice(product.insurance_price)}
                  </span>
                </div>
              )}

              {product.packaging_unit && (
                <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 flex flex-col justify-start space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {isEnglish ? 'Packaging' : '포장단위'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 break-keep leading-snug">
                    {product.packaging_unit}
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 2. Structured Full-Width Detail Sections */}
        <div className="space-y-12 pt-2">
          
          {/* Section A: Efficacy & Effects (효능 · 효과) */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-green"></span>
              {isEnglish ? 'Efficacy & Indications' : '효능 · 효과'}
            </h3>
            <div className="bg-slate-50/70 rounded-2xl p-6 sm:p-8 border border-slate-100/90 text-sm md:text-base font-medium text-slate-800 leading-relaxed whitespace-pre-wrap break-keep">
              {product.efficacy_detail || product.efficacy || (isEnglish ? 'No detailed info' : '등록된 상세 정보가 없습니다.')}
            </div>
          </div>

          {/* Section B: Drug Information (의약품 세부 정보 / 약학정보) */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-green"></span>
              {isEnglish ? 'Detailed Information' : '의약품 세부 정보'}
            </h3>
            
            <div className="bg-slate-50/70 rounded-2xl p-6 sm:p-8 border border-slate-100/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 transition-all">
              <p className="text-sm md:text-base font-medium text-slate-800 leading-relaxed break-keep max-w-2xl">
                {isEnglish ? (
                  <>
                    View comprehensive drug information including ingredients, administration, dosage,<br className="hidden sm:inline" />
                    and patient guidance on the official KPIC portal.
                  </>
                ) : (
                  <>
                    약학정보원에서 제공하는 원료약품 및 분량, 효능효과, 용법용량, 사용상의 주의사항 등<br />
                    공인된 상세 정보를 확인하실 수 있습니다.
                  </>
                )}
              </p>

              <a 
                href={product.drug_info_url || `https://www.health.kr/searchDrug/search_total.asp?search_word=${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 bg-white border border-gray-300 text-gray-900 hover:bg-brand-green hover:text-white hover:border-brand-green text-xs lg:text-sm font-semibold rounded-full transition-colors duration-300 hover:shadow-green-glow group cursor-pointer shrink-0 whitespace-nowrap shadow-xs"
              >
                <span>{isEnglish ? 'View Drug Details' : '약학정보 바로가기'}</span>
                <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
