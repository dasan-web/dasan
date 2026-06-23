'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  inquiryType?: 'product' | 'sales' | 'corruption';
}

export default function ContactForm({ inquiryType = 'product' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    content: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const config = {
    product: {
      badge: 'PRODUCT INQUIRY',
      desc: '다산제약의 제품에 대해 궁금한 사항을 남겨주시면, 담당자가 신속히 확인하여 연락 드리겠습니다.',
      subjectPlaceholder: '제품명 또는 제품 제휴 관련 문의 제목을 입력해주세요.',
    },
    sales: {
      badge: 'SALES INQUIRY',
      desc: '다산제약의 영업/구매 제휴 및 비즈니스 관련 문의를 남겨주시면, 담당 부서에서 신속히 안내 드리겠습니다.',
      subjectPlaceholder: '비즈니스 협력 또는 영업 관련 문의 제목을 입력해주세요.',
    },
    corruption: {
      badge: 'ETHICS & COMPLIANCE (ANONYMOUS)',
      desc: (
        <>
          다산제약은 윤리경영을 실천하고 있습니다. 업무수행과 관련하여 부패 행위나 부조리한 사실이 있는 경우 익명으로 안전하게 제보해 주시기 바랍니다.<br />
          제보자의 신원 및 인적사항은 관련 법령에 따라 철저히 비밀이 보장됩니다.
        </>
      ),
      subjectPlaceholder: '부패 행위 제보 또는 부조리 신고 제목을 입력해주세요.',
    },
  };

  const currentConfig = config[inquiryType] || config.product;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Numbers only
      const numOnly = value.replace(/[^0-9]/g, '');
      
      // Auto format for typical Korean phone numbers (e.g. 010-1111-2222 or 02-111-2222)
      let formatted = numOnly;
      if (numOnly.length > 3) {
        if (numOnly.startsWith('02')) {
          if (numOnly.length <= 5) {
            formatted = `${numOnly.slice(0, 2)}-${numOnly.slice(2)}`;
          } else if (numOnly.length <= 9) {
            formatted = `${numOnly.slice(0, 2)}-${numOnly.slice(2, 5)}-${numOnly.slice(5)}`;
          } else {
            formatted = `${numOnly.slice(0, 2)}-${numOnly.slice(2, 6)}-${numOnly.slice(6, 10)}`;
          }
        } else {
          // 3-digit prefix (010, 031, etc.)
          if (numOnly.length <= 6) {
            formatted = `${numOnly.slice(0, 3)}-${numOnly.slice(3)}`;
          } else if (numOnly.length <= 10) {
            formatted = `${numOnly.slice(0, 3)}-${numOnly.slice(3, 6)}-${numOnly.slice(6)}`;
          } else {
            formatted = `${numOnly.slice(0, 3)}-${numOnly.slice(3, 7)}-${numOnly.slice(7, 11)}`;
          }
        }
      }
      
      setFormData((prev) => ({ ...prev, [name]: formatted.slice(0, 13) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setMessage('');

    // Basic Validation - Name and Email are optional for corruption reports
    const isCorruption = inquiryType === 'corruption';
    const isNameValid = isCorruption ? true : !!formData.name;
    const isEmailValid = isCorruption ? true : !!formData.email;

    if (!isNameValid || !isEmailValid || !formData.subject || !formData.content) {
      setStatus('error');
      setMessage('필수 항목을 모두 작성해주세요.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          name: isCorruption && !formData.name ? '익명' : formData.name,
          email: isCorruption && !formData.email ? 'anonymous@dspharm.com' : formData.email,
          inquiryType,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(result.message || '문의가 정상적으로 등록되었습니다.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          content: '',
        });
      } else {
        throw new Error(result.error || '등록 중 오류가 발생했습니다.');
      }
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || '서버와의 통신에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-150 shadow-[0_10px_35px_rgba(0,0,0,0.02)] w-full max-w-4xl mx-auto transition-all duration-300">
      <div className="mb-8">
        <span className="inline-block bg-brand-green/10 text-brand-green text-[10.5px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-3.5">
          {currentConfig.badge}
        </span>
        <p className="text-sm md:text-[14.5px] text-gray-500 leading-relaxed font-medium">
          {currentConfig.desc}
        </p>
      </div>

      {status === 'success' ? (
        <div className="bg-emerald-50/50 border border-emerald-150 rounded-2xl p-8 text-center space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-3.5 bg-emerald-100/80 rounded-full text-emerald-600">
            <CheckCircle size={32} />
          </div>
          <h4 className="text-xl font-extrabold text-emerald-800">접수 완료!</h4>
          <p className="text-sm text-emerald-700 max-w-md mx-auto font-medium">{message}</p>
          <button
            onClick={() => setStatus('idle')}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm font-bold transition-all shadow-md hover:shadow-emerald-600/10 cursor-pointer"
          >
            새 문의 작성하기
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === 'error' && (
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex items-center space-x-3 text-rose-700 text-sm animate-fade-in-up">
              <AlertCircle size={18} className="flex-shrink-0" />
              <span className="font-semibold">{message}</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Name */}
            {inquiryType !== 'corruption' && (
              <div>
                <label htmlFor="name" className="block text-xs font-black text-brand-blue uppercase tracking-wider mb-2">
                  이름 <span className="text-brand-green font-black">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="홍길동"
                  required
                  className="w-full px-4.5 py-3.5 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 text-sm text-brand-blue font-semibold outline-none transition-all placeholder:text-gray-400 bg-gray-50/30 focus:bg-white"
                />
              </div>
            )}

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-xs font-black text-brand-blue uppercase tracking-wider mb-2">
                문의 제목 <span className="text-brand-green font-black">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={currentConfig.subjectPlaceholder}
                required
                className="w-full px-4.5 py-3.5 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 text-sm text-brand-blue font-semibold outline-none transition-all placeholder:text-gray-400 bg-gray-50/30 focus:bg-white"
              />
            </div>

            {/* Phone & Email Row */}
            {inquiryType !== 'corruption' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-black text-brand-blue uppercase tracking-wider mb-2">
                    연락처
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="010-0000-0000"
                    className="w-full px-4.5 py-3.5 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 text-sm text-brand-blue font-semibold outline-none transition-all placeholder:text-gray-400 bg-gray-50/30 focus:bg-white"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-black text-brand-blue uppercase tracking-wider mb-2">
                    이메일 주소 <span className="text-brand-green font-black">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    required
                    className="w-full px-4.5 py-3.5 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 text-sm text-brand-blue font-semibold outline-none transition-all placeholder:text-gray-400 bg-gray-50/30 focus:bg-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-xs font-black text-brand-blue uppercase tracking-wider mb-2">
              문의 내용 <span className="text-brand-green font-black">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              rows={6}
              value={formData.content}
              onChange={handleChange}
              placeholder="상세한 문의 사항을 남겨주시면 정성껏 답변 드리겠습니다."
              required
              className="w-full px-4.5 py-3.5 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 text-sm text-brand-blue font-semibold outline-none transition-all resize-none placeholder:text-gray-400 bg-gray-50/30 focus:bg-white"
            />
          </div>

          {/* Privacy Consent Checkbox (Mock) */}
          {inquiryType !== 'corruption' && (
            <div className="flex items-start space-x-2.5 pb-2">
              <input
                type="checkbox"
                id="privacy"
                required
                defaultChecked
                className="mt-1 w-4 h-4 border-gray-300 rounded text-brand-green focus:ring-brand-green cursor-pointer accent-brand-green"
              />
              <label htmlFor="privacy" className="text-xs text-gray-500 leading-normal font-semibold cursor-pointer select-none">
                개인정보 수집 및 이용에 동의합니다.<br />(필수) 다산제약은 문의 접수 및 답변 처리를 목적으로 이름, 이메일, 연락처 정보를 수집합니다.
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 bg-brand-green hover:bg-brand-green-dark text-white font-black py-4 rounded-xl shadow-lg hover:shadow-brand-green/15 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-base"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              <>
                <span>문의 접수하기</span>
                <Send size={16} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
