'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import ReCAPTCHA from 'react-google-recaptcha';

interface ContactFormProps {
  inquiryType?: 'product' | 'sales' | 'corruption';
}

export default function ContactForm({ inquiryType = 'product' }: ContactFormProps) {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    content: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Email Verification States
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [timer, setTimer] = useState(0);

  // ReCAPTCHA state
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && verificationSent && !isEmailVerified) {
      setVerificationSent(false);
      setVerificationError(isEnglish ? 'Verification time expired. Please try again.' : '인증 시간이 만료되었습니다. 다시 시도해주세요.');
    }
    return () => clearInterval(interval);
  }, [timer, verificationSent, isEmailVerified]);

  const formatTimer = () => {
    const m = Math.floor(timer / 60);
    const s = timer % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSendVerification = async () => {
    if (!formData.email) {
      setVerificationError(isEnglish ? 'Please enter your email address.' : '이메일 주소를 입력해주세요.');
      return;
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setVerificationError('유효한 이메일 형식이 아닙니다.');
      return;
    }
    setVerifying(true);
    setVerificationError('');
    try {
      const res = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await res.json();
      if (res.ok) {
        setVerificationSent(true);
        setTimer(300); // 5 minutes
      } else {
        setVerificationError(data.error || '인증번호 발송에 실패했습니다.');
      }
    } catch (e) {
      setVerificationError('네트워크 오류가 발생했습니다.');
    } finally {
      setVerifying(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) return;
    setVerifying(true);
    setVerificationError('');
    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, code: verificationCode })
      });
      const data = await res.json();
      if (res.ok) {
        setIsEmailVerified(true);
        setTimer(0);
        setVerificationError('');
      } else {
        setVerificationError(data.error || '인증번호가 올바르지 않습니다.');
      }
    } catch (e) {
      setVerificationError('네트워크 오류가 발생했습니다.');
    } finally {
      setVerifying(false);
    }
  };

  const config = {
    product: {
      badge: 'PRODUCT INQUIRY',
      desc: isEnglish ? 'If you leave any questions about Dasan Pharmaceutical\'s products, the person in charge will quickly check and contact you.' : '다산제약의 제품에 대해 궁금한 사항을 남겨주시면, 담당자가 신속히 확인하여 연락 드리겠습니다.',
      subjectPlaceholder: isEnglish ? 'Please enter the title for product or partnership inquiry.' : '제품명 또는 제품 제휴 관련 문의 제목을 입력해주세요.',
    },
    sales: {
      badge: 'SALES INQUIRY',
      desc: isEnglish ? 'If you leave an inquiry regarding Dasan Pharmaceutical\'s sales/purchase partnership and business, the relevant department will guide you promptly.' : '다산제약의 영업/구매 제휴 및 비즈니스 관련 문의를 남겨주시면, 담당 부서에서 신속히 안내 드리겠습니다.',
      subjectPlaceholder: isEnglish ? 'Please enter the title for business cooperation or sales inquiry.' : '비즈니스 협력 또는 영업 관련 문의 제목을 입력해주세요.',
    },
    corruption: {
      badge: 'ETHICS & COMPLIANCE (ANONYMOUS)',
      desc: (
        <>
          {isEnglish ? 'Dasan Pharmaceutical practices ethical management. If there is any corruption or absurdity related to work performance, please report it safely and anonymously.' : '다산제약은 윤리경영을 실천하고 있습니다. 업무수행과 관련하여 부패 행위나 부조리한 사실이 있는 경우 익명으로 안전하게 제보해 주시기 바랍니다.'}<br />
          {isEnglish ? 'The identity and personal information of the informant will be kept strictly confidential in accordance with relevant laws.' : '제보자의 신원 및 인적사항은 관련 법령에 따라 철저히 비밀이 보장됩니다.'}
        </>
      ),
      subjectPlaceholder: isEnglish ? 'Please enter the title for corruption or absurdity report.' : '부패 행위 제보 또는 부조리 신고 제목을 입력해주세요.',
    },
  };

  const currentConfig = config[inquiryType] || config.product;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const numOnly = value.replace(/[^0-9]/g, '');
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

    const isCorruption = inquiryType === 'corruption';
    const isNameValid = isCorruption ? true : !!formData.name;
    const isEmailValid = isCorruption ? true : !!formData.email;

    if (!isNameValid || !isEmailValid || !formData.subject || !formData.content || (isCorruption && !formData.password)) {
      setStatus('error');
      setMessage('필수 항목을 모두 작성해주세요.');
      setLoading(false);
      return;
    }

    if (!isCorruption && !isEmailVerified) {
      alert('이메일주소 인증이 안되었으니, 확인해주세요.');
      setLoading(false);
      return;
    }

    if (!recaptchaToken) {
      alert('로봇인지 아닌지 체크해 주세요.');
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
          recaptchaToken,
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
          password: '',
        });
        setIsEmailVerified(false);
        setVerificationCode('');
        setVerificationSent(false);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        setRecaptchaToken(null);
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
                  {isEnglish ? 'Name' : '이름'} <span className="text-brand-green font-black">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={isEnglish ? "John Doe" : "홍길동"}
                  required
                  className="w-full px-4.5 py-3.5 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 text-sm text-brand-blue font-semibold outline-none transition-all placeholder:text-gray-400 bg-gray-50/30 focus:bg-white"
                />
              </div>
            )}

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-xs font-black text-brand-blue uppercase tracking-wider mb-2">
                {isEnglish ? 'Inquiry Subject' : '문의 제목'} <span className="text-brand-green font-black">*</span>
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
                    {isEnglish ? 'Contact Number' : '연락처'}
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
                    {isEnglish ? 'Email Address' : '이메일 주소'} <span className="text-brand-green font-black">*</span>
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => {
                        handleChange(e);
                        if (isEmailVerified) setIsEmailVerified(false);
                        if (verificationSent) setVerificationSent(false);
                      }}
                      disabled={isEmailVerified}
                      placeholder="example@gmail.com"
                      required
                      className="flex-1 min-w-0 px-4.5 py-3.5 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 text-sm text-brand-blue font-semibold outline-none transition-all placeholder:text-gray-400 bg-gray-50/30 focus:bg-white disabled:bg-gray-100 disabled:text-gray-500"
                    />
                    <button
                      type="button"
                      onClick={handleSendVerification}
                      disabled={isEmailVerified || verifying || !formData.email}
                      className="px-4 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap border border-gray-200 cursor-pointer shrink-0"
                    >
                      {isEmailVerified ? (isEnglish ? 'Verified' : '인증완료') : (verifying && !verificationSent ? (isEnglish ? 'Sending...' : '발송중...') : (verificationSent ? (isEnglish ? 'Resend' : '재발송') : (isEnglish ? 'Send Code' : '인증번호 발송')))}
                    </button>
                  </div>

                  {/* Verification Code Input */}
                  {verificationSent && !isEmailVerified && (
                    <div className="mt-3 flex space-x-2 animate-fade-in-up">
                      <div className="relative flex-1 min-w-0">
                        <input
                          type="text"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                          placeholder="인증번호 6자리"
                          className="w-full px-4.5 py-3.5 rounded-xl border border-brand-green/50 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 text-sm text-brand-blue font-semibold outline-none transition-all placeholder:text-gray-400 bg-white"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-rose-500">
                          {formatTimer()}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleVerifyCode}
                        disabled={verifying || verificationCode.length < 6}
                        className="px-4 py-3.5 bg-brand-green hover:bg-brand-green-dark text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap shadow-sm cursor-pointer shrink-0"
                      >
                        {verifying ? '확인중' : '확인'}
                      </button>
                    </div>
                  )}
                  {verificationError && <p className="mt-2 text-xs font-bold text-rose-500">{verificationError}</p>}
                </div>
              </div>
            )}

            {/* Anonymous Password Row */}
            {inquiryType === 'corruption' && (
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="password" className="block text-xs font-black text-brand-blue uppercase tracking-wider mb-2">
                    {isEnglish ? 'Password for lookup' : '조회용 비밀번호'} <span className="text-brand-green font-black">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={isEnglish ? "Enter password (required for future lookup)" : "비밀번호 입력 (추후 조회 시 필요)"}
                    required
                    className="w-full px-4.5 py-3.5 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 text-sm text-brand-blue font-semibold outline-none transition-all placeholder:text-gray-400 bg-gray-50/30 focus:bg-white"
                  />
                  <p className="text-[11px] font-bold text-brand-green mt-1.5 ml-1">
                    {isEnglish ? "* Please remember this to check your anonymous inquiry." : "* 익명 문의 조회를 위해 반드시 기억해 주세요."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-xs font-black text-brand-blue uppercase tracking-wider mb-2">
              {isEnglish ? 'Inquiry Content' : '문의 내용'} <span className="text-brand-green font-black">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              rows={6}
              value={formData.content}
              onChange={handleChange}
              placeholder={isEnglish ? "Please leave detailed inquiries and we will answer you sincerely." : "상세한 문의 사항을 남겨주시면 정성껏 답변 드리겠습니다."}
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
                {isEnglish ? 'I agree to the collection and use of personal information' : '개인정보 수집 및 이용에 동의합니다'}.<br />{isEnglish ? "(Required) Dasan Pharmaceutical collects name, email, and contact information for the purpose of receiving inquiries and processing answers." : "(필수) 다산제약은 문의 접수 및 답변 처리를 목적으로 이름, 이메일, 연락처 정보를 수집합니다."}
              </label>
            </div>
          )}

          {/* ReCAPTCHA */}
          <div className="flex justify-start">
            <ReCAPTCHA
                        hl={isEnglish ? "en" : "ko"}
                        ref={recaptchaRef}
              sitekey="6LdRVT0tAAAAAD5Ug_N3IhbggKeT1vj5jwVlki88"
              onChange={(token) => setRecaptchaToken(token)}
            />
          </div>

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
                <span>{isEnglish ? 'Submit Inquiry' : '문의 접수하기'}</span>
                <Send size={16} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
