'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, KeyRound, ShieldAlert } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/management/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.replace('/management/dashboard');
      } else {
        setError(data.error || '로그인에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      setError('서버 연결 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#070b13] px-4 relative overflow-hidden font-sans">
      {/* Background radial gradient highlights for dark futuristic aesthetic */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-green/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-brand-cyan/15 blur-[120px] pointer-events-none" />
      
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] -z-10 opacity-30" />

      {/* Glassmorphic Login Container */}
      <div className="w-full max-w-md bg-[#0a1120]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 space-y-8 shadow-2xl relative z-10 transition-all duration-300 hover:border-white/15">
        
        {/* Top Glow bar */}
        <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-brand-green to-brand-cyan/50" />

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-green/20 to-brand-cyan/20 border border-brand-green/30 text-brand-green shadow-lg shadow-brand-green/5 animate-pulse">
            <KeyRound size={26} />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
              DASAN <span className="bg-gradient-to-r from-brand-green to-brand-cyan bg-clip-text text-transparent">PORTAL</span>
            </h2>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
              Administrator Secure Login
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 animate-fade-in-up">
            <ShieldAlert size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-1">
              Administrator ID
            </label>
            <div className="relative flex items-center border border-white/10 rounded-xl overflow-hidden bg-white/[0.02] transition-all focus-within:border-brand-green focus-within:bg-white/[0.04] focus-within:shadow-md focus-within:shadow-brand-green/5">
              <span className="pl-4 text-gray-400"><User size={16} /></span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="아이디를 입력해주세요"
                className="w-full bg-transparent border-none outline-none px-3 py-4 text-xs md:text-sm text-white placeholder-gray-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-1">
              Password
            </label>
            <div className="relative flex items-center border border-white/10 rounded-xl overflow-hidden bg-white/[0.02] transition-all focus-within:border-brand-green focus-within:bg-white/[0.04] focus-within:shadow-md focus-within:shadow-brand-green/5">
              <span className="pl-4 text-gray-400"><Lock size={16} /></span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
                className="w-full bg-transparent border-none outline-none px-3 py-4 text-xs md:text-sm text-white placeholder-gray-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full relative overflow-hidden group bg-gradient-to-r from-brand-green to-brand-green-dark hover:from-brand-green-dark hover:to-brand-green text-white font-extrabold py-4 px-4 rounded-xl transition-all duration-300 text-xs md:text-sm cursor-pointer shadow-lg shadow-brand-green/20 hover:shadow-brand-green/35 hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none active:translate-y-0"
          >
            {loading ? '인증 정보 확인 중...' : 'Secure Login'}
          </button>
        </form>

        <div className="text-center">
          <a
            href="/"
            className="text-[10px] font-bold text-gray-450 hover:text-brand-green transition-colors uppercase tracking-wider underline underline-offset-4"
          >
            ← 메인 웹사이트로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
}
