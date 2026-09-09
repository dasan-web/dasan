'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Send, 
  Upload, 
  X, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  Briefcase,
  User,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

interface TalentApplyFormProps {
  isEnglish?: boolean;
}

const ROLES_LIST = [
  { ko: '생산직 (의약품 제조·생산)', en: 'Manufacturing & Production (Asan Plant)', value: '생산직' },
  { ko: '연구직 (R&D / 제제·합성·분석)', en: 'R&D (Formulation / Synthesis / Analysis)', value: '연구직' },
  { ko: '품질관리 & 약사 (QA·QC)', en: 'Quality & Pharmacist (QA / QC)', value: '품질관리/약사' },
  { ko: '영업·마케팅 (ETC / 해외수출)', en: 'Sales & Marketing (ETC / Global)', value: '영업/마케팅' },
  { ko: '경영지원 (인사총무 / 재경 / IT)', en: 'Corporate Management (HR / Finance / IT)', value: '경영지원' },
  { ko: '상시 인재풀 (전체)', en: 'Talent Pool (General)', value: '상시인재풀' },
  { ko: '기타 직무 (자유 기술)', en: 'Other Field', value: '기타' },
];

export default function TalentApplyForm({ isEnglish = false }: TalentApplyFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('role');

  // Determine initial role
  const getInitialRole = () => {
    if (!roleParam) return isEnglish ? ROLES_LIST[0].en : ROLES_LIST[0].ko;
    const decoded = decodeURIComponent(roleParam).toLowerCase();
    const found = ROLES_LIST.find(
      r => r.ko.toLowerCase().includes(decoded) || 
           r.en.toLowerCase().includes(decoded) || 
           decoded.includes(r.value.toLowerCase())
    );
    if (found) {
      return isEnglish ? found.en : found.ko;
    }
    return roleParam;
  };

  const [selectedRole, setSelectedRole] = useState<string>(getInitialRole);
  const [careerType, setCareerType] = useState<'신입' | '경력'>('신입');
  const [workLocation, setWorkLocation] = useState<string>('무관');

  // Update role if searchParam changes
  useEffect(() => {
    if (roleParam) {
      const decoded = decodeURIComponent(roleParam).toLowerCase();
      const found = ROLES_LIST.find(
        r => r.ko.toLowerCase().includes(decoded) || 
             r.en.toLowerCase().includes(decoded) || 
             decoded.includes(r.value.toLowerCase())
      );
      if (found) {
        setSelectedRole(isEnglish ? found.en : found.ko);
      } else {
        setSelectedRole(roleParam);
      }
    }
  }, [roleParam, isEnglish]);

  // Form inputs
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [memo, setMemo] = useState('');
  const [agreed, setAgreed] = useState(false);

  // File Upload State
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submit State
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > 15 * 1024 * 1024) {
      setUploadError(isEnglish ? 'File size must not exceed 15MB.' : '파일 크기는 15MB를 초과할 수 없습니다.');
      return;
    }

    setFile(selected);
    setFileName(selected.name);
    setUploadError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', selected);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Upload failed');
      }
      setFileUrl(data.url);
      setFileName(data.name || selected.name);
    } catch (err: any) {
      setUploadError(isEnglish ? 'File upload failed. Please try again.' : '파일 업로드에 실패했습니다. 다시 시도해주세요.');
      setFile(null);
      setFileName('');
      setFileUrl('');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      alert(isEnglish ? 'Please agree to personal information collection.' : '개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }

    setSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          role: selectedRole,
          careerType,
          location: workLocation,
          memo: memo.trim(),
          file_url: fileUrl || null,
          file_name: fileName || null,
        }),
      });

      const result = await res.json();
      if (!res.ok || result.error) {
        throw new Error(result.error || 'Submission failed');
      }

      setSubmitStatus('success');
      setSubmitMessage(isEnglish 
        ? 'Your application has been successfully registered to our Talent Pool! We will contact you on priority when a matching position opens.' 
        : '상시 인재풀 등록이 완료되었습니다! 적합한 포지션 소요 발생 시 기재해주신 연락처로 최우선 안내해 드리겠습니다.');
      
      setName('');
      setPhone('');
      setEmail('');
      setMemo('');
      setFile(null);
      setFileName('');
      setFileUrl('');
      setAgreed(false);
    } catch (err: any) {
      setSubmitStatus('error');
      setSubmitMessage(err.message || (isEnglish ? 'An error occurred during submission.' : '지원서 접수 중 오류가 발생했습니다.'));
    } finally {
      setSubmitting(false);
    }
  };

  const jobsListUrl = isEnglish ? '/en/contact/careers/jobs' : '/contact/careers/jobs';

  if (submitStatus === 'success') {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 size={44} />
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isEnglish ? 'Application Received Successfully' : '상시 지원서가 성공적으로 접수되었습니다'}
          </h3>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed break-keep max-w-lg mx-auto">
            {submitMessage}
          </p>
        </div>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={jobsListUrl}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm shadow-sm transition-all"
          >
            <ArrowLeft size={16} />
            <span>{isEnglish ? 'Back to Job Openings' : '채용공고 목록으로 돌아가기'}</span>
          </Link>
          <button
            type="button"
            onClick={() => setSubmitStatus('idle')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
          >
            {isEnglish ? 'Submit Another Application' : '추가 지원서 작성하기'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Top Navigation & Context Bar */}
      <div className="flex items-center justify-between">
        <Link
          href={jobsListUrl}
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-slate-500 hover:text-emerald-700 transition-colors group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span>{isEnglish ? 'Back to Job Openings' : '채용공고 목록으로 돌아가기'}</span>
        </Link>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          {isEnglish ? 'Continuous Recruitment' : '다산제약 상시 인재풀'}
        </span>
      </div>

      {/* Main Application Form Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 md:p-12 shadow-sm space-y-8">
        
        {/* Form Title & Description */}
        <div className="border-b border-slate-100 pb-6 space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isEnglish ? 'Talent Pool Application' : '상시 지원서 작성 및 접수'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed break-keep">
            {isEnglish 
              ? 'Register your profile in our talent pool. We will review your application on priority whenever corresponding positions open.' 
              : '다산제약 상시 인재풀에 지원서를 등록해 주시면, 해당 직무 채용 소요 발생 시 최우선으로 검토 후 개별 연락을 드립니다.'}
          </p>
        </div>

        {submitStatus === 'error' && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center space-x-3">
            <AlertCircle size={18} className="shrink-0 text-rose-600" />
            <span className="font-medium">{submitMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">

          {/* 1. Job Role & Career Type Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center space-x-1.5">
                <Briefcase size={15} className="text-emerald-600" />
                <span>{isEnglish ? 'Target Role' : '지원 부문'}</span>
                <span className="text-rose-500">*</span>
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl px-3.5 py-3 bg-white text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-medium cursor-pointer"
              >
                {ROLES_LIST.map((r) => (
                  <option key={r.value} value={isEnglish ? r.en : r.ko}>
                    {isEnglish ? r.en : r.ko}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center space-x-1.5">
                <User size={15} className="text-emerald-600" />
                <span>{isEnglish ? 'Experience Level' : '경력 구분'}</span>
                <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setCareerType('신입')}
                  className={`py-3 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                    careerType === '신입'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {isEnglish ? 'Entry-Level (New)' : '신입'}
                </button>
                <button
                  type="button"
                  onClick={() => setCareerType('경력')}
                  className={`py-3 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                    careerType === '경력'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {isEnglish ? 'Experienced' : '경력'}
                </button>
              </div>
            </div>
          </div>

          {/* 2. Personal Info (Name, Phone, Email) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center space-x-1.5">
                <User size={15} className="text-emerald-600" />
                <span>{isEnglish ? 'Name' : '성명'}</span>
                <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isEnglish ? 'John Doe' : '홍길동'}
                className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl px-3.5 py-3 text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center space-x-1.5">
                <Phone size={15} className="text-emerald-600" />
                <span>{isEnglish ? 'Phone' : '연락처'}</span>
                <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-1234-5678"
                className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl px-3.5 py-3 text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center space-x-1.5">
                <Mail size={15} className="text-emerald-600" />
                <span>{isEnglish ? 'Email' : '이메일'}</span>
                <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dasan@example.com"
                className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl px-3.5 py-3 text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* 3. Preferred Workplace */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center space-x-1.5">
              <MapPin size={15} className="text-emerald-600" />
              <span>{isEnglish ? 'Preferred Workplace' : '희망 근무지'}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { ko: '무관', en: 'Any' },
                { ko: '아산 제1·2공장', en: 'Asan Plant' },
                { ko: '중앙연구소 (수원)', en: 'R&D Center (Suwon)' },
                { ko: '서울사무소 (영등포)', en: 'Seoul Office (Yeongdeungpo)' },
              ].map((loc) => (
                <button
                  key={loc.ko}
                  type="button"
                  onClick={() => setWorkLocation(loc.ko)}
                  className={`py-2.5 px-3 text-xs sm:text-sm rounded-xl border transition-all cursor-pointer text-center font-medium ${
                    workLocation === loc.ko 
                      ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isEnglish ? loc.en : loc.ko}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Resume Attachment (File Upload) */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <FileText size={15} className="text-emerald-600" />
                <span>{isEnglish ? 'Resume & Portfolio Attachment' : '이력서 / 자기소개서 첨부파일'}</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                {isEnglish ? 'PDF, DOCX, HWP, ZIP up to 15MB' : 'PDF, Word, HWP, ZIP (최대 15MB)'}
              </span>
            </label>

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.hwp,.hwpx,.zip,.rar"
              className="hidden"
            />

            {fileName ? (
              <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                <div className="flex items-center space-x-3 truncate">
                  <FileText size={20} className="text-emerald-700 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-emerald-950 truncate max-w-xs sm:max-w-md">
                    {fileName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setFileName('');
                    setFileUrl('');
                  }}
                  className="text-slate-400 hover:text-rose-500 p-1.5 transition-colors cursor-pointer"
                  title="Remove file"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-emerald-50/30"
              >
                <Upload size={24} className="text-slate-400 mx-auto mb-2" />
                <p className="text-xs sm:text-sm text-slate-700 font-semibold">
                  {uploading ? (
                    <span className="text-emerald-600 font-bold">{isEnglish ? 'Uploading file...' : '파일 업로드 중...'}</span>
                  ) : (
                    isEnglish ? 'Click to select or drop your resume file' : '클릭하여 이력서 및 자기소개서 파일을 첨부하세요'
                  )}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  {isEnglish ? 'Free format resume accepted (PDF, Word, HWP)' : '자유 양식 이력서 접수 가능 (PDF, Word, HWP 등)'}
                </p>
              </div>
            )}

            {uploadError && (
              <p className="text-xs text-rose-500 font-medium">{uploadError}</p>
            )}
          </div>

          {/* 5. Summary / Self-Intro Note */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-800 block">
              {isEnglish ? 'Brief Introduction or Note (Optional)' : '주요 경력 요약 및 한마디 (선택)'}
            </label>
            <textarea
              rows={4}
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder={isEnglish ? 'Highlight your key skills, experiences, or message to Dasan...' : '주요 역량, 관련 프로젝트/경력 요약 또는 다산제약에 전하고 싶은 말을 간략히 적어주세요.'}
              className="w-full text-xs sm:text-sm border border-slate-200 rounded-2xl p-4 text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-none"
            />
          </div>

          {/* 6. Privacy Consent */}
          <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/90 text-xs text-slate-600 space-y-2.5">
            <div className="flex items-start space-x-2.5">
              <input
                type="checkbox"
                id="privacy-consent-talent-page"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <label htmlFor="privacy-consent-talent-page" className="font-bold text-slate-800 cursor-pointer leading-snug">
                {isEnglish 
                  ? '[Required] I agree to the collection and use of personal information for talent pool registration.' 
                  : '[필수] 채용 및 인재풀 등록을 위한 개인정보 수집 및 이용에 동의합니다.'}
              </label>
            </div>
            <p className="text-[11px] text-slate-500 pl-6 leading-relaxed">
              {isEnglish 
                ? 'Collected Items: Name, Phone, Email, Preferred Location, Resume details / Purpose: Recruitment evaluation and talent pool management / Retention Period: Up to 2 years from submission (Destroyed immediately upon applicant request).'
                : '수집항목: 성명, 연락처, 이메일, 희망근무지, 이력서 기재사항 / 수집목적: 다산제약 인재 채용 전형 진행 및 인재풀 관리 / 보유기간: 접수일로부터 최대 2년 (지원자 요청 시 즉시 파기)'}
            </p>
          </div>

          {/* Submit Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={submitting || uploading}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50 cursor-pointer active:scale-98"
            >
              <Send size={15} />
              <span>{submitting ? (isEnglish ? 'Submitting...' : '지원서 접수 처리 중...') : (isEnglish ? 'Submit Application' : '상시 지원서 제출')}</span>
            </button>
            <Link
              href={jobsListUrl}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 text-slate-600 text-xs sm:text-sm font-semibold hover:bg-slate-100 transition-colors text-center cursor-pointer"
            >
              {isEnglish ? 'Cancel' : '취소'}
            </Link>
          </div>

        </form>

      </div>
    </div>
  );
}
