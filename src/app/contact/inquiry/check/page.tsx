'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Mail, FileText, Calendar, CheckCircle2, RefreshCw } from 'lucide-react';
import { navigationData } from '@/lib/navigation';
import SubmenuTabBar from '@/components/SubmenuTabBar';

interface InquiryItem {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  content: string;
  created_at: string;
}

export default function InquiryCheckPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');
    setSearched(true);
    setExpandedId(null);

    try {
      let url = `/api/inquiries?email=${encodeURIComponent(email)}`;
      if (email === 'anonymous@dspharm.com') {
        if (!password) {
          setError('익명 문의 조회를 위해 비밀번호를 입력해 주세요.');
          setLoading(false);
          return;
        }
        url += `&password=${encodeURIComponent(password)}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        setInquiries(data);
      } else {
        throw new Error(data.error || '조회 중 오류가 발생했습니다.');
      }
    } catch (err: any) {
      setError(err.message || '문의 내역을 가져오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const currentPath = '/contact/inquiry/check';
  const activeTitle = '문의 확인';
  const activeMajor = '고객센터';
  const grandContact = navigationData.find(g => g.name === 'Connect');
  const activeMajorObj = grandContact?.majors.find(m => m.name === activeMajor) || null;

  return (
    <div className="relative bg-white py-16 md:py-24 min-h-screen">
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 mt-8">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Left Sidebar Submenu (PC) - Hidden by user request to remove left frame */}
          <aside className="lg:col-span-1 pr-6 border-r border-gray-100 hidden space-y-8">
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-black text-brand-green tracking-tight pb-2 border-b-2 border-brand-green inline-block">
                  {grandContact?.name}
                </h3>
              </div>
              <nav className="space-y-6">
                {grandContact?.majors.map(major => (
                  <div key={major.name} className="space-y-2 mt-5 first:mt-0">
                    {grandContact.majors.length > 1 && (
                      <h4 className="text-[12px] font-bold tracking-wider text-gray-400 uppercase">
                        {major.name}
                      </h4>
                    )}
                    <ul className="space-y-1.5">
                      {major.subMenus.map(sub => {
                        const isActive = currentPath === sub.link;
                        return (
                          <li key={sub.name}>
                            <Link
                              href={sub.link}
                              className={`group flex items-center py-2 text-[15px] transition-all duration-200 ${
                                isActive
                                  ? 'text-brand-green font-black'
                                  : 'text-gray-500 hover:text-brand-green font-semibold hover:translate-x-0.5'
                              }`}
                            >
                              <span className={`mr-2 h-1.5 rounded-full bg-brand-green transition-all duration-300 ${
                                isActive ? 'w-1.5 opacity-100' : 'w-0 opacity-0 group-hover:w-1 group-hover:opacity-50'
                              }`} />
                              {sub.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Right Main Content - Expanded to full width (col-span-5) to remove sidebar frame space */}
          <div className="lg:col-span-5 space-y-8 flex flex-col items-center w-full">
            {/* Header - Centered for symmetry */}
            <div className="pb-8 w-full text-center flex flex-col items-center">
              <div className="flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-green mb-3">
                <span>{grandContact?.name}</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-400">{activeMajor}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-brand-blue tracking-tight text-center mb-6">{activeTitle}</h2>

              {/* Premium Glassmorphic Tab Bar with Sliding Animation */}
              <SubmenuTabBar subMenus={activeMajorObj?.subMenus || []} currentPath={currentPath} />
            </div>

            {/* Dynamic Content - Width centered and bounded for clean layout */}
            <div className="min-h-[550px] space-y-8 w-full max-w-5xl flex flex-col items-center">
              <div className="text-center w-full max-w-4xl">
                <p className="text-sm text-gray-500 leading-relaxed break-keep">
                  제품 문의 및 영업 문의 접수 시 입력하셨던 이메일 주소를 입력하시면 접수된 문의글의 상태를 확인하실 수 있습니다.
                </p>
                <p className="text-xs text-brand-green/90 font-bold mt-2 leading-relaxed break-keep">
                  * 부패신고 문의(익명)의 경우, 조회용 기본 이메일인 <span className="underline">anonymous@dspharm.com</span>을 입력하시면 익명 접수 완료 여부를 확인하실 수 있습니다.
                </p>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="flex flex-col gap-3 w-full max-w-xl">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setSearched(false); }}
                      placeholder="example@dasan.com"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 text-sm text-brand-blue outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>
                  {email !== 'anonymous@dspharm.com' && (
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3 bg-brand-green hover:bg-brand-green/90 text-white font-bold rounded-lg text-sm shadow-sm hover:shadow transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <RefreshCw size={16} className="animate-spin" />
                      ) : (
                        <>
                          <Search size={16} />
                          <span>조회하기</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Password input for anonymous queries */}
                {email === 'anonymous@dspharm.com' && (
                  <div className="flex flex-col sm:flex-row gap-3 mt-1">
                    <div className="relative flex-1">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setSearched(false); }}
                        placeholder="익명 문의 조회용 비밀번호 입력"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 text-sm text-brand-blue outline-none transition-all placeholder:text-gray-400"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3 bg-brand-green hover:bg-brand-green/90 text-white font-bold rounded-lg text-sm shadow-sm hover:shadow transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <RefreshCw size={16} className="animate-spin" />
                      ) : (
                        <>
                          <Search size={16} />
                          <span>조회하기</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>

              {/* Results Area */}
              {searched && (
                <div className="border-t border-gray-100 pt-8 w-full max-w-2xl">
                  {loading ? (
                    <div className="flex justify-center items-center py-10">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-teal"></div>
                    </div>
                  ) : error ? (
                    <div className="text-center py-6 text-rose-500 text-sm">{error}</div>
                  ) : inquiries.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 text-sm">
                      입력하신 이메일({email})로 등록된 문의 내역이 없습니다.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-brand-blue mb-4">조회 결과 (총 {inquiries.length}건)</h4>
                      
                      <div className="divide-y divide-gray-100">
                        {inquiries.map((item) => {
                          const isExpanded = expandedId === item.id;
                          const dateObj = new Date(item.created_at);
                          
                          return (
                            <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                              <div
                                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-brand-gray-light/30 p-3 rounded-lg transition-colors"
                              >
                                <div className="flex items-start space-x-3">
                                  <span className="p-2 bg-brand-blue/5 text-brand-blue rounded-lg mt-0.5">
                                    <FileText size={18} />
                                  </span>
                                  <div>
                                    <h5 className="font-bold text-brand-blue text-sm hover:text-brand-teal">
                                      {item.subject}
                                    </h5>
                                    <div className="flex items-center space-x-3 text-xs text-gray-400 mt-1">
                                      <span className="flex items-center space-x-1">
                                        <Calendar size={12} />
                                        <span>{dateObj.toLocaleDateString('ko-KR')}</span>
                                      </span>
                                      <span>•</span>
                                      <span>작성자: {item.name}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Status tag */}
                                <div>
                                  <span className="inline-flex items-center space-x-1 text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full">
                                    <CheckCircle2 size={12} />
                                    <span>접수 완료</span>
                                  </span>
                                </div>
                              </div>

                              {/* Expanded content */}
                              {isExpanded && (
                                <div className="mt-4 ml-14 p-5 bg-brand-gray-light/40 rounded-lg border border-gray-100 text-sm space-y-4 animate-fade-in-up">
                                  <div className="space-y-1">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">문의 내용</span>
                                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{item.content}</p>
                                  </div>
                                  
                                  <div className="border-t border-gray-200/70 pt-4 space-y-1">
                                    <span className="text-[10px] text-brand-teal font-bold uppercase tracking-wider block">답변 정보</span>
                                    <div className="text-gray-500 italic text-xs">
                                      접수된 문의는 순차적으로 내부 담당자가 검토 중에 있습니다. 기재해주신 이메일({item.email}) 또는 연락처로 회신을 드릴 예정입니다.
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
