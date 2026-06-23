# 다산제약 홈페이지 SEO 설정 내역

본 문서는 다산제약 홈페이지의 대메뉴별 검색엔진 최적화(SEO) 설정 정보를 정리한 문서입니다. 각 페이지의 역할과 노출 목적에 맞추어 타이틀 및 검색 키워드(Keywords)를 최적화하여 적용했습니다.

---

## 1. SEO 설정 상세 표

| 대메뉴 | 대상 경로 (Route) | 타이틀 (Title) | 설정 키워드 (Keywords) | 역할 및 설명 (Description) |
| :--- | :--- | :--- | :--- | :--- |
| **메인페이지** | `/` | `다산제약 \| 의약품 CDMO 기업` | `다산제약, 의약품 CDMO 기업, Dasan Pharmaceutical, dspharm` | 홈페이지의 메인 브랜드 키워드 및 핵심 정체성인 CDMO 사업 강조 |
| **About Us** | `/about/[[...slug]]` | `About Us \| 다산제약` | `다산제약 연혁, 류형선 대표, 아산 공장 시설, cGMP 인증 제약사` | 기업 개요, 연혁, 경영철학, 아산 스마트 팩토리 등 신뢰성 위주 정보 노출 |
| **Business** | `/business/[[...slug]]` | `Business \| 다산제약` | `의약품 CDMO, 완제의약품 위탁생산, Pharmaceutical CDMO, CMO` | 완제의약품 생산 및 글로벌 위탁개발생산(CDMO/CMO) 비즈니스 전문 키워드 설정 |
| **연구개발 (R&D)** | `/rd/[[...slug]]` | `R&D \| 다산제약` | `DDS 플랫폼 기술, 유동층 코팅 기술, 제품센터` | 약물전달기술(DDS) 및 특화된 유동층 제제 기술 등 독자적인 연구 기술 홍보 |

---

## 2. 파일별 코드 적용 방식

### 메인페이지 ([page.tsx](file:///c:/Share/DASAN/src/app/page.tsx))
정적 컴포넌트 규격에 따라 `Metadata` 객체를 직접 내보내어 적용했습니다.
```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '다산제약 | 의약품 CDMO 기업',
  description: '다산제약은 지속적인 연구개발과 고품질의 의약품 생산을 통해 건강한 삶을 만들어가는 글로벌 제약회사입니다. 신약 개발, CDMO, 완제의약품 및 API 공급.',
  keywords: '다산제약, 의약품 CDMO 기업, Dasan Pharmaceutical, dspharm',
};
```

### 서브페이지 (About Us / Business / R&D)
Next.js App Router의 동적 라우팅(Catch-all) 규격에 맞추어 `generateMetadata` 비동기 함수를 추출 및 적용했습니다.
* **About Us** (`src/app/about/[[...slug]]/page.tsx`):
  ```tsx
  export async function generateMetadata(): Promise<Metadata> {
    return {
      title: 'About Us | 다산제약',
      description: '다산제약의 기업개요, 연혁, 대표이사 메시지, 아산 공장 시설 및 연구소를 소개합니다. cGMP 인증을 획득한 신뢰받는 제약사입니다.',
      keywords: '다산제약 연혁, 류형선 대표, 아산 공장 시설, cGMP 인증 제약사',
    };
  }
  ```
* **Business** (`src/app/business/[[...slug]]/page.tsx`):
  ```tsx
  export async function generateMetadata(): Promise<Metadata> {
    return {
      title: 'Business | 다산제약',
      description: '다산제약의 완제의약품, API 원료의약품 공급 및 의약품 위탁개발생산(CDMO) 사업 영역을 소개합니다.',
      keywords: '의약품 CDMO, 완제의약품 위탁생산, Pharmaceutical CDMO, CMO',
    };
  }
  ```
* **R&D** (`src/app/rd/[[...slug]]/page.tsx`):
  ```tsx
  export async function generateMetadata(): Promise<Metadata> {
    return {
      title: 'R&D | 다산제약',
      description: '다산제약의 약물전달시스템(DDS) 플랫폼 기술, 유동층 코팅 기술 등 독보적인 제제 기술 연구개발 역량을 소개합니다.',
      keywords: 'DDS 플랫폼 기술, 유동층 코팅 기술, 제품센터',
    };
  }
  ```
