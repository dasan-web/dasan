'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export interface ProductDetailProps {
  productId: string;
  isEnglish?: boolean;
}

const InfoSection = ({ title, content }: { title: string; content: string }) => (
  <div className="py-4 border-b border-slate-200/60 last:border-0 w-full flex flex-col md:flex-row md:items-start md:gap-8 transition-colors hover:bg-slate-50/50 rounded-lg px-3 -mx-3">
    <div className="md:w-1/3 shrink-0 pt-0.5">
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-green/70"></span>
        {title}
      </h4>
    </div>
    <div className="md:w-2/3 text-sm md:text-base font-medium text-slate-900 leading-relaxed whitespace-pre-wrap break-keep">
      {content}
    </div>
  </div>
);

export default function ProductDetail({ productId, isEnglish = false }: ProductDetailProps) {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${productId}`)
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
          className="text-brand-green font-bold hover:underline"
        >
          {isEnglish ? 'Go Back' : '목록으로 돌아가기'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 animate-fade-in-up">
      {/* Back Button */}
      <button 
        onClick={() => router.push(isEnglish ? '/en/business/finished/search' : '/business/finished/search')}
        className="mb-8 inline-flex items-center text-sm font-bold text-slate-500 hover:text-brand-green transition-colors"
      >
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
        {isEnglish ? 'Back to List' : '목록으로 돌아가기'}
      </button>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          
          {/* Left: Image Area */}
          <div className="lg:w-2/5 bg-slate-50 p-8 md:p-12 flex flex-col justify-center items-center border-b lg:border-b-0 lg:border-r border-slate-100 relative group">
            <div className="absolute top-6 left-6 z-10">
              <div className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold tracking-widest bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm text-slate-700 cursor-default rounded-full">
                <span className={`w-2 h-2 rounded-full ${product.type === '전문의약품' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'}`} />
                {product.type === '전문의약품' ? (isEnglish ? 'ETC' : '전문의약품') : (isEnglish ? 'OTC' : '일반의약품')}
              </div>
            </div>
            
            <div className="w-full h-64 md:h-80 flex items-center justify-center mt-6">
              {product.file_url && /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(product.file_url) ? (
                <img 
                  src={product.file_url} 
                  alt={product.name} 
                  className="max-w-full max-h-full object-contain drop-shadow-md transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <span className="text-xl tracking-wider text-slate-300 font-extrabold uppercase select-none">
                  DASAN PHARM
                </span>
              )}
            </div>
          </div>

          {/* Right: Content Area */}
          <div className="lg:w-3/5 p-8 md:p-12 lg:p-16">
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                {product.name}
              </h1>
              <p className="text-sm md:text-base font-bold text-slate-400 tracking-wider uppercase">
                {product.englishName}
              </p>
            </div>

            <div className="border-t border-slate-200/80 flex flex-col pt-4">
              {product.category && <InfoSection title={isEnglish ? 'Category' : '계열'} content={product.category} />}
              {product.ingredient && <InfoSection title={isEnglish ? 'Ingredient' : '성분명'} content={product.ingredient} />}
              {product.content && <InfoSection title={isEnglish ? 'Content' : '함량'} content={product.content} />}
              {product.reference_drug && <InfoSection title={isEnglish ? 'Reference Drug' : '대조약'} content={product.reference_drug} />}
              
              <InfoSection title={isEnglish ? 'Efficacy & Effects' : '효능/효과'} content={product.efficacy_detail || product.efficacy || (isEnglish ? 'No information registered.' : '등록된 정보가 없습니다.')} />
              
              {product.appearance && <InfoSection title={isEnglish ? 'Appearance' : '성상'} content={product.appearance} />}
              {product.ingredient_detail && <InfoSection title={isEnglish ? 'Ingredient Detail' : '성분/함량 상세'} content={product.ingredient_detail} />}
              {product.usage_capacity && <InfoSection title={isEnglish ? 'Usage & Capacity' : '용법/용량'} content={product.usage_capacity} />}
              {product.storage_method && <InfoSection title={isEnglish ? 'Storage Method' : '저장방법'} content={product.storage_method} />}
              {product.packaging_unit && <InfoSection title={isEnglish ? 'Packaging Unit' : '포장단위'} content={product.packaging_unit} />}
              
              {product.insurance_code && <InfoSection title={isEnglish ? 'Insurance Code' : '보험코드'} content={product.insurance_code} />}
              {product.insurance_price && <InfoSection title={isEnglish ? 'Insurance Price' : '보험약가'} content={`${product.insurance_price}원`} />}
              
              {product.precautions && <InfoSection title={isEnglish ? 'Precautions' : '의약정보/주의사항'} content={product.precautions} />}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
