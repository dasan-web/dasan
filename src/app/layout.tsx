import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
  title: '다산제약 | 혁신적 바이오 헬스케어 리더',
  description: '다산제약은 지속적인 연구개발과 고품질의 의약품 생산을 통해 건강한 삶을 만들어가는 글로벌 제약회사입니다. 신약 개발, CDMO, 완제의약품 및 API 공급.',
  keywords: '다산제약, 제약회사, 신약개발, CDMO, 완제의약품, API, 원료의약품, 바이오 헬스케어',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning className={`${notoSansKr.variable} h-full scroll-smooth`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-white antialiased">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
