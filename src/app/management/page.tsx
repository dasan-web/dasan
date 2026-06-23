'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    fetch('/api/management/auth')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          router.push('/management/dashboard');
        } else {
          router.push('/management/login');
        }
      })
      .catch(() => {
        router.push('/management/login');
      });
  }, [router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50/50">
      <div className="text-center text-xs md:text-sm text-gray-400 font-semibold">
        관리자 세션을 확인 중입니다...
      </div>
    </div>
  );
}
