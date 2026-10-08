const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const htmlContent = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>다산제약 웹 플랫폼 시스템 아키텍처 및 화면 구조 명세서</title>
<style>
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

  @page {
    size: A4 portrait;
    margin: 12mm 14mm 14mm 14mm;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Malgun Gothic', '맑은 고딕', sans-serif;
    color: #1e293b;
    background-color: #ffffff;
    line-height: 1.5;
    font-size: 9pt;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page-break {
    page-break-after: always;
    break-after: page;
  }

  .avoid-break {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* Cover Page */
  .cover {
    height: 268mm;
    max-height: 268mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24mm 16mm 18mm 16mm;
    background: linear-gradient(145deg, #07120c 0%, #0f2418 55%, #1b3d27 100%);
    color: #ffffff;
    position: relative;
    border-radius: 6px;
    overflow: hidden;
  }

  .cover-decor {
    position: absolute;
    top: -90px;
    right: -90px;
    width: 340px;
    height: 340px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(116, 184, 22, 0.3) 0%, transparent 70%);
  }

  .cover-decor2 {
    position: absolute;
    bottom: -60px;
    left: -60px;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%);
  }

  .cover-header {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cover-badge {
    background: rgba(116, 184, 22, 0.2);
    border: 1px solid #74B816;
    color: #a3e635;
    padding: 5px 13px;
    border-radius: 20px;
    font-size: 8.5pt;
    font-weight: 800;
    letter-spacing: 0.8px;
    display: inline-block;
  }

  .cover-corp-mark {
    font-size: 11pt;
    font-weight: 900;
    letter-spacing: 0.5px;
    color: #ffffff;
  }

  .cover-title-group {
    position: relative;
    z-index: 2;
    margin-top: 25mm;
  }

  .cover-subtitle {
    font-size: 11pt;
    font-weight: 700;
    color: #86efac;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 8px;
  }

  .cover-title {
    font-size: 26pt;
    font-weight: 900;
    line-height: 1.25;
    color: #ffffff;
    margin-bottom: 16px;
    word-break: keep-all;
  }

  .cover-desc {
    font-size: 10pt;
    color: #cbd5e1;
    max-width: 580px;
    line-height: 1.6;
    word-break: keep-all;
  }

  .cover-footer {
    position: relative;
    z-index: 2;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding-top: 10mm;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .cover-meta table {
    border-collapse: collapse;
  }

  .cover-meta td {
    padding: 3px 12px 3px 0;
    font-size: 8.5pt;
  }

  .cover-meta td.label {
    color: #94a3b8;
    font-weight: 600;
  }

  .cover-meta td.val {
    color: #f8fafc;
    font-weight: 700;
  }

  /* Document Content Headers */
  .doc-header {
    border-bottom: 2px solid #74B816;
    padding-bottom: 4px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .doc-header .doc-topic {
    font-size: 8pt;
    font-weight: 800;
    color: #74B816;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  .doc-header .doc-meta {
    font-size: 7.5pt;
    color: #94a3b8;
  }

  h1.sec-title {
    font-size: 14pt;
    font-weight: 900;
    color: #0f172a;
    margin: 10px 0 8px 0;
    display: flex;
    align-items: center;
    gap: 8px;
    border-left: 4px solid #74B816;
    padding-left: 8px;
  }

  h2.sub-title {
    font-size: 11pt;
    font-weight: 800;
    color: #1e293b;
    margin: 12px 0 6px 0;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  p {
    font-size: 8.8pt;
    color: #334155;
    margin-bottom: 7px;
    text-align: justify;
    word-break: keep-all;
    line-height: 1.5;
  }

  /* Table of Contents */
  .toc-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 14px 18px;
    margin: 14px 0;
  }

  .toc-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 7px 0;
    border-bottom: 1px dashed #e2e8f0;
    font-size: 9pt;
  }

  .toc-item:last-child {
    border-bottom: none;
  }

  .toc-num {
    font-weight: 800;
    color: #74B816;
    margin-right: 8px;
  }

  .toc-title {
    font-weight: 700;
    color: #1e293b;
  }

  .toc-page {
    font-size: 8pt;
    font-weight: 700;
    color: #64748b;
  }

  /* Tables */
  table.data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0 12px 0;
    font-size: 8pt;
  }

  table.data-table th, table.data-table td {
    border: 1px solid #e2e8f0;
    padding: 6px 8px;
    vertical-align: top;
  }

  table.data-table th {
    background-color: #f1f5f9;
    color: #0f172a;
    font-weight: 800;
    text-align: left;
  }

  table.data-table tr:nth-child(even) td {
    background-color: #f8fafc;
  }

  .badge {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 7pt;
    font-weight: 700;
    letter-spacing: 0.2px;
  }
  .badge-green { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
  .badge-blue { background: #dbeafe; color: #1d4ed8; border: 1px solid #bfdbfe; }
  .badge-amber { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
  .badge-purple { background: #f3e8ff; color: #7e22ce; border: 1px solid #e9d5ff; }
  .badge-rose { background: #ffe4e6; color: #be123c; border: 1px solid #fecdd3; }
  .badge-gray { background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; }

  /* Diagram Cards */
  .diagram-container {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    padding: 10px;
    margin: 8px 0 12px 0;
  }

  .layer-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 5px;
    padding: 8px 10px;
    margin-bottom: 6px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.03);
  }

  .layer-card:last-child {
    margin-bottom: 0;
  }

  .layer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f1f5f9;
    padding-bottom: 4px;
    margin-bottom: 6px;
  }

  .layer-title {
    font-size: 8.8pt;
    font-weight: 800;
    color: #0f172a;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .card-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }

  .card-grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
  }

  .card-grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .sub-box {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    padding: 6px 8px;
  }

  .sub-box-title {
    font-size: 7.8pt;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .sub-box-desc {
    font-size: 7.3pt;
    color: #64748b;
    line-height: 1.35;
  }

  /* Hierarchy Tree Nodes */
  .tree-branch {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-left: 3.5px solid #74B816;
    border-radius: 5px;
    padding: 7px 10px;
    margin-bottom: 7px;
  }

  .tree-branch.accent-blue { border-left-color: #2563eb; }
  .tree-branch.accent-amber { border-left-color: #f59e0b; }
  .tree-branch.accent-purple { border-left-color: #9333ea; }
  .tree-branch.accent-rose { border-left-color: #e11d48; }

  .tree-head {
    font-size: 8.8pt;
    font-weight: 800;
    color: #0f172a;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }

  .tree-items {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .tree-pill {
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    padding: 3px 6px;
    font-size: 7.3pt;
    color: #334155;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .tree-pill strong {
    color: #0f172a;
    font-weight: 700;
  }

  .tree-pill .path {
    font-size: 6.8pt;
    color: #64748b;
    font-family: monospace;
  }

  .arrow-flow {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 0;
    color: #94a3b8;
    font-size: 7.5pt;
    font-weight: bold;
  }

  /* Callout box */
  .callout {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-left: 3.5px solid #74B816;
    border-radius: 5px;
    padding: 8px 12px;
    margin: 8px 0;
    font-size: 8pt;
    color: #166534;
    line-height: 1.45;
  }
  .callout strong {
    color: #14532d;
  }

  .callout-blue {
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-left: 3.5px solid #3b82f6;
    border-radius: 5px;
    padding: 8px 12px;
    margin: 8px 0;
    font-size: 8pt;
    color: #1e40af;
    line-height: 1.45;
  }
  .callout-blue strong {
    color: #1e3a8a;
  }

  /* Workflow Steps */
  .step-flow {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin: 8px 0;
  }

  .step-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 5px;
    padding: 7px 10px;
  }

  .step-num {
    background: #74B816;
    color: #ffffff;
    font-size: 7.5pt;
    font-weight: 800;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .step-content {
    flex: 1;
  }

  .step-title {
    font-size: 8.2pt;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 2px;
  }

  .step-desc {
    font-size: 7.5pt;
    color: #475569;
    line-height: 1.35;
  }
</style>
</head>
<body>

  <!-- ==================== PAGE 1: COVER ==================== -->
  <div class="cover">
    <div class="cover-decor"></div>
    <div class="cover-decor2"></div>
    
    <div class="cover-header">
      <div class="cover-badge">ENTERPRISE WEB SPECIFICATION</div>
      <div class="cover-corp-mark">(주)다산제약</div>
    </div>

    <div class="cover-title-group">
      <div class="cover-subtitle">Dasan Pharmaceutical Co., Ltd. Web Platform</div>
      <h1 class="cover-title">전체 시스템 아키텍처 및<br>사용자 · 관리자 화면 구조 명세서</h1>
      <p class="cover-desc">
        본 문서는 (주)다산제약 공식 국·영문 웹사이트 및 통합 CMS 관리자 포털의 전체 시스템 아키텍처, 
        계층별 기술 스택, 사용자/관리자 정보구조(IA), 데이터베이스 스키마 및 주요 비즈니스 데이터 상호작용 흐름을 집대성한 공식 기술 명세서입니다.
      </p>
    </div>

    <div class="cover-footer">
      <div class="cover-meta">
        <table>
          <tr>
            <td class="label">대상 시스템</td>
            <td class="val">다산제약 공식 웹 플랫폼 (Next.js 16 App Router)</td>
          </tr>
          <tr>
            <td class="label">운영 데이터베이스</td>
            <td class="val">TiDB Cloud Serverless (MySQL 8.0 호환)</td>
          </tr>
          <tr>
            <td class="label">발행 버전</td>
            <td class="val">v1.0 (Production Release)</td>
          </tr>
          <tr>
            <td class="label">발행 일자</td>
            <td class="val">2026년 10월</td>
          </tr>
        </table>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 11pt; font-weight: 900; color: #ffffff;">(주)다산제약</div>
        <div style="font-size: 7.5pt; color: #94a3b8; margin-top: 2px;">DASAN PHARMACEUTICAL CO., LTD.</div>
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- ==================== PAGE 2: TABLE OF CONTENTS & OVERVIEW ==================== -->
  <div class="doc-header">
    <span class="doc-topic">DOCUMENT OVERVIEW & TABLE OF CONTENTS</span>
    <span class="doc-meta">다산제약 웹 플랫폼 명세서</span>
  </div>

  <h1 class="sec-title">문서 개요 및 목차 (Table of Contents)</h1>
  <p>
    본 문서는 다산제약의 디지털 비즈니스 혁신을 지원하는 웹 서비스 전반의 시스템 구성도와 프론트엔드/백오피스 화면 구조를 정의합니다. 
    글로벌 제약 시장에 대응하는 안정적인 웹 아키텍처와 자체 CMS 운영 체계를 다룹니다.
  </p>

  <div class="toc-card avoid-break">
    <div class="toc-item">
      <div><span class="toc-num">01.</span> <span class="toc-title">전체 시스템 아키텍처 총괄 (Overall Architecture)</span></div>
      <span class="toc-page">Page 3</span>
    </div>
    <div class="toc-item">
      <div><span class="toc-num">02.</span> <span class="toc-title">핵심 기술 스택 및 도입 목적 (Technology Stack)</span></div>
      <span class="toc-page">Page 3</span>
    </div>
    <div class="toc-item">
      <div><span class="toc-num">03.</span> <span class="toc-title">사용자 페이지 구조도 및 라우팅 (User IA & Routing)</span></div>
      <span class="toc-page">Page 4</span>
    </div>
    <div class="toc-item">
      <div><span class="toc-num">04.</span> <span class="toc-title">사용자 5대 대메뉴별 세부 기능 명세 (Feature Breakdown)</span></div>
      <span class="toc-page">Page 4~5</span>
    </div>
    <div class="toc-item">
      <div><span class="toc-num">05.</span> <span class="toc-title">관리자 포털 구조도 및 대시보드 (Admin Management Portal)</span></div>
      <span class="toc-page">Page 6</span>
    </div>
    <div class="toc-item">
      <div><span class="toc-num">06.</span> <span class="toc-title">관리자 역할 기반 접근 제어 (RBAC Permission Matrix)</span></div>
      <span class="toc-page">Page 6</span>
    </div>
    <div class="toc-item">
      <div><span class="toc-num">07.</span> <span class="toc-title">데이터베이스 스키마 및 핵심 엔티티 명세 (Database Architecture)</span></div>
      <span class="toc-page">Page 7</span>
    </div>
    <div class="toc-item">
      <div><span class="toc-num">08.</span> <span class="toc-title">주요 비즈니스 데이터 및 인터랙션 흐름도 (Data & Workflows)</span></div>
      <span class="toc-page">Page 7~8</span>
    </div>
    <div class="toc-item">
      <div><span class="toc-num">09.</span> <span class="toc-title">운영 인프라 및 배포 환경 명세 (Infrastructure & Operations)</span></div>
      <span class="toc-page">Page 8</span>
    </div>
  </div>

  <h2 class="sub-title">핵심 아키텍처 특장점 요약</h2>
  <div class="card-grid-3 avoid-break">
    <div class="sub-box">
      <div class="sub-box-title">하이브리드 렌더링 (SSR/ISR)</div>
      <div class="sub-box-desc">
        사용자 유입이 많은 페이지에 60초 캐싱(ISR)을 적용하여 DB 부하를 차단하고 검색엔진(SEO) 최적화와 초고속 응답 속도를 확보했습니다.
      </div>
    </div>
    <div class="sub-box">
      <div class="sub-box-title">자체 완결형 통합 CMS</div>
      <div class="sub-box-desc">
        외부 상용 솔루션 없이 Next.js 자체에서 동적 텍스트, SEO 메타태그, 팝업 일정, 의약품 DB, 파이프라인 단계를 즉각 수정합니다.
      </div>
    </div>
    <div class="sub-box">
      <div class="sub-box-title">다중 레이어 보안 체계</div>
      <div class="sub-box-desc">
        AES-256 세션 토큰화, SHA-256 해시, 4단계 RBAC 권한 분리, 비회원 이메일 6자리 OTP 인증, HMAC 다운로드 서명을 적용했습니다.
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- ==================== PAGE 3: OVERALL SYSTEM ARCHITECTURE ==================== -->
  <div class="doc-header">
    <span class="doc-topic">SECTION 1. 전체 시스템 아키텍처 (Overall Architecture)</span>
    <span class="doc-meta">다산제약 웹 플랫폼 명세서</span>
  </div>

  <h1 class="sec-title">1. 전체 시스템 아키텍처 총괄</h1>
  <p>
    다산제약 웹 플랫폼은 <strong>Next.js 16 (App Router)</strong> 풀스택 프레임워크를 기반으로 <strong>React 19</strong>, <strong>Node.js v24</strong>, 
    그리고 분산형 <strong>TiDB Cloud MySQL</strong>을 결합하여 구축된 현대적인 고가용성 아키텍처입니다.
  </p>

  <div class="diagram-container avoid-break">
    <div style="text-align: center; font-size: 8.8pt; font-weight: 800; color: #0f172a; margin-bottom: 6px;">
      [다산제약 전체 시스템 엔드-투-엔드 구조도]
    </div>

    <!-- Layer 1 -->
    <div class="layer-card">
      <div class="layer-header">
        <span class="layer-title">Layer 1. 클라이언트 & 프레젠테이션 계층 (Client Presentation)</span>
        <span class="badge badge-green">웹 / 모바일 반응형 & 관리자</span>
      </div>
      <div class="card-grid-2">
        <div class="sub-box">
          <div class="sub-box-title">일반 사용자 프론트엔드 (Public Web) <span class="badge badge-blue">KR / EN</span></div>
          <div class="sub-box-desc">
            - 반응형 모바일/PC 레이아웃, 다국어(국/영문) 분기<br>
            - Three.js 3D 분자 구조 캔버스 및 육각 그리드 모션 연동<br>
            - 카카오 지도 API, 의약품 초성(ㄱ~ㅎ) 필터, 반응형 파이프라인 차트
          </div>
        </div>
        <div class="sub-box">
          <div class="sub-box-title">운영자 관리자 포털 (Admin Portal) <span class="badge badge-amber">/management</span></div>
          <div class="sub-box-desc">
            - AES-256 암호화 세션 기반 싱글 페이지 대시보드<br>
            - Quill RichText 실시간 위지윅 CMS (Company, ESG, IR 편집)<br>
            - 의약품/파이프라인 CRUD, 1:1 문의·부패신고 처리, SEO, 팝업 제어
          </div>
        </div>
      </div>
    </div>

    <div class="arrow-flow">▼ HTTPS 요청 및 트래픽 라우팅 ▼</div>

    <!-- Layer 2 -->
    <div class="layer-card">
      <div class="layer-header">
        <span class="layer-title">Layer 2. 네트워크 & 프록시 인프라 (Network & Ingress)</span>
        <span class="badge badge-purple">Nginx + Reverse Proxy + Tunnels</span>
      </div>
      <div class="card-grid-3">
        <div class="sub-box">
          <div class="sub-box-title">Nginx Reverse Proxy</div>
          <div class="sub-box-desc">
            포트 80/443 수신 후 Next.js(3000) 포워딩, Gzip 압축(레벨5), 50x 장애 페이지 자동 서빙
          </div>
        </div>
        <div class="sub-box">
          <div class="sub-box-title">정적 에셋 고속 캐싱</div>
          <div class="sub-box-desc">
            <code>/_next/static</code> (365일 immutable 캐시), 이미지/폰트/SVG 30일 브라우저 캐싱
          </div>
        </div>
        <div class="sub-box">
          <div class="sub-box-title">외부 연동 터널링</div>
          <div class="sub-box-desc">
            Cloudflare Tunnel / Ngrok / Localtunnel 자동화 스크립트로 외부 데모 및 스테이징 지원
          </div>
        </div>
      </div>
    </div>

    <div class="arrow-flow">▼ 프로세스 제어 및 앱 실행 ▼</div>

    <!-- Layer 3 -->
    <div class="layer-card">
      <div class="layer-header">
        <span class="layer-title">Layer 3. 애플리케이션 서버 계층 (Next.js 16 App Router on PM2 Cluster)</span>
        <span class="badge badge-blue">Node.js v24 + PM2 무중단 클러스터</span>
      </div>
      <div class="card-grid-3">
        <div class="sub-box">
          <div class="sub-box-title">하이브리드 렌더링 엔진</div>
          <div class="sub-box-desc">
            메인 페이지 및 주요 페이지 <code>revalidate = 60</code>(ISR) 적용, 동적 메타태그 실시간 주입
          </div>
        </div>
        <div class="sub-box">
          <div class="sub-box-title">백엔드 API Route Handlers</div>
          <div class="sub-box-desc">
            <code>/api/products</code>, <code>/api/pipeline</code>, <code>/api/news</code>, <code>/api/inquiries</code>, <code>/api/management/*</code>
          </div>
        </div>
        <div class="sub-box">
          <div class="sub-box-title">보안 & 코어 유틸리티</div>
          <div class="sub-box-desc">
            AES-256 세션 토큰 암복호화, HMAC 보안 서명 다운로드, MySQL2 풀링(최대 5개 연결 유지)
          </div>
        </div>
      </div>
    </div>

    <div class="arrow-flow">▼ 분산 쿼리 및 외부 API 연계 ▼</div>

    <!-- Layer 4 -->
    <div class="layer-card">
      <div class="layer-header">
        <span class="layer-title">Layer 4. 데이터 저장소 및 외부 연계 서비스 (Data & Services)</span>
        <span class="badge badge-rose">TiDB + Cloudinary + SMTP</span>
      </div>
      <div class="card-grid-4">
        <div class="sub-box">
          <div class="sub-box-title">TiDB Cloud</div>
          <div class="sub-box-desc">
            AWS 도쿄 리전 분산형 MySQL 8.0 호환 RDBMS (포트 4000, SSL 통신)
          </div>
        </div>
        <div class="sub-box">
          <div class="sub-box-title">Cloudinary CDN</div>
          <div class="sub-box-desc">
            의약품 패키지, 보도자료 사진, 시설 이미지 미디어 클라우드 저장 및 전송 최적화
          </div>
        </div>
        <div class="sub-box">
          <div class="sub-box-title">SMTP 메일 엔진</div>
          <div class="sub-box-desc">
            <code>admin@dspharm.com</code> 연동, 6자리 OTP 인증코드 및 문의 알림 실시간 발송
          </div>
        </div>
        <div class="sub-box">
          <div class="sub-box-title">Open APIs</div>
          <div class="sub-box-desc">
            카카오 지도 API (사업장 위치), Google reCAPTCHA (스팸 방지), DART 공시 연동
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2 class="sub-title">1.2 핵심 기술 스택 명세표</h2>
  <table class="data-table avoid-break">
    <thead>
      <tr>
        <th style="width: 20%;">구분</th>
        <th style="width: 28%;">적용 기술</th>
        <th style="width: 15%;">버전</th>
        <th>도입 목적 및 시스템상 주요 역할</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Core Framework</strong></td>
        <td>Next.js (App Router) + React</td>
        <td>16.2.6 / 19.2.4</td>
        <td>서버 컴포넌트(SSR/ISR)와 클라이언트 인터랙션이 통합된 최신 풀스택 코어</td>
      </tr>
      <tr>
        <td><strong>Language & Style</strong></td>
        <td>TypeScript + Tailwind CSS</td>
        <td>5.x / 4.x</td>
        <td>정적 타입 안정성 보장 및 Tailwind v4 기반 고성능 유틸리티 디자인 시스템</td>
      </tr>
      <tr>
        <td><strong>3D & Animation</strong></td>
        <td>Three.js, R3F, Framer Motion</td>
        <td>0.185 / 12.4</td>
        <td>생명공학 콘셉트의 분자 구조(Molecular Canvas), 스크롤 패럴랙스 및 팝업 모션</td>
      </tr>
      <tr>
        <td><strong>Database</strong></td>
        <td>TiDB Cloud Serverless (MySQL2)</td>
        <td>MySQL 8.0 호환</td>
        <td>고가용성 분산 SQL 클라우드 데이터베이스 (Connection Pool 및 SSL 보안 적용)</td>
      </tr>
      <tr>
        <td><strong>Rich Text & Media</strong></td>
        <td>Quill.js, Sharp, Cloudinary</td>
        <td>2.0 / 0.35 / 2.10</td>
        <td>관리자 HTML 위지윅 편집기, 서버 측 이미지 리사이징 및 고속 CDN 서빙</td>
      </tr>
      <tr>
        <td><strong>Infra & Runtime</strong></td>
        <td>Node.js, PM2 Cluster, Nginx</td>
        <td>Node 24 / PM2</td>
        <td>멀티코어 클러스터링을 통한 무중단 구동, 리버스 프록시 및 정적 에셋 고속 캐싱</td>
      </tr>
    </tbody>
  </table>

  <div class="page-break"></div>

  <!-- ==================== PAGE 4: USER PAGE STRUCTURE ==================== -->
  <div class="doc-header">
    <span class="doc-topic">SECTION 2. 사용자 페이지 구조도 (User IA & Routing)</span>
    <span class="doc-meta">다산제약 웹 플랫폼 명세서</span>
  </div>

  <h1 class="sec-title">2. 사용자 페이지 구조도 (Information Architecture)</h1>
  <p>
    다산제약 공식 웹사이트는 글로벌 사용자를 위한 국문 기본(<code>/</code>) 및 영문(<code>/en/...</code>) 미러링 라우팅 체계를 갖추고 있습니다. 
    대메뉴 5종(Company, Innovation, Business, CDMO, Connect) 아래 체계적인 하위 정보 구조를 형성합니다.
  </p>

  <div class="callout avoid-break">
    <strong>사용자 경험(UX) 핵심 설계:</strong> 메인 화면에서 3D 분자 구조 인터랙션 및 기업 핵심 역량을 직관적으로 전달하고, 
    의약품 검색(초성 ㄱ~ㅎ) 및 파이프라인 차트(기초~허가 단계)를 동적 필터링으로 빠르게 탐색할 수 있도록 설계되었습니다.
  </div>

  <div class="avoid-break">
    <h2 class="sub-title">2.1 대메뉴별 계층 및 화면 경로 명세</h2>

    <!-- Main -->
    <div class="tree-branch">
      <div class="tree-head">
        <span>메인 페이지 (Home)</span>
        <span class="badge badge-green">/ &nbsp;|&nbsp; /en</span>
      </div>
      <div class="tree-items">
        <div class="tree-pill"><strong>Hero Section</strong> <span class="path">DNA 3D 인터랙션 & Ken Burns 모션</span></div>
        <div class="tree-pill"><strong>Core Business</strong> <span class="path">완제의약품 · API · CDMO 3대 핵심 사업 요약</span></div>
        <div class="tree-pill"><strong>Product Showcase</strong> <span class="path">대표 의약품 6종 캐러셀 뷰어</span></div>
        <div class="tree-pill"><strong>News & Notice</strong> <span class="path">최신 보도자료 및 공지사항 탭 피드</span></div>
        <div class="tree-pill"><strong>Popup Wrapper</strong> <span class="path">관리자 지정 일정 기반 자동 팝업 모달</span></div>
      </div>
    </div>

    <!-- 1. Company -->
    <div class="tree-branch accent-blue">
      <div class="tree-head">
        <span>1. Company (회사소개 / ESG / IR)</span>
        <span class="badge badge-blue">/about/* &nbsp;|&nbsp; /en/about/*</span>
      </div>
      <div class="tree-items">
        <div class="tree-pill"><strong>인사말</strong> <span class="path">/about/greeting (CEO 메시지 및 경영 철학)</span></div>
        <div class="tree-pill"><strong>기업개요</strong> <span class="path">/about/intro (비전, 미션, 핵심가치, 4대 경영철학)</span></div>
        <div class="tree-pill"><strong>사업영역</strong> <span class="path">/about/business-area (R&D, API, CDMO 솔루션)</span></div>
        <div class="tree-pill"><strong>연혁</strong> <span class="path">/about/history (1996년 설립 이후 마일스톤)</span></div>
        <div class="tree-pill"><strong>CI 소개</strong> <span class="path">/about/ci (심볼마크 의미, 컬러 규정, 로고 다운로드)</span></div>
        <div class="tree-pill"><strong>글로벌 인프라</strong> <span class="path">/about/facilities (수원 연구소, 아산 제1·2공장)</span></div>
        <div class="tree-pill"><strong>찾아오시는길</strong> <span class="path">/about/location (카카오 지도 API 연동 4개 사업장)</span></div>
        <div class="tree-pill"><strong>ESG 경영</strong> <span class="path">/about/esg/* (지속가능, 환경, 안전보건, 부패방지, 윤리강령 5종)</span></div>
        <div class="tree-pill"><strong>IR 투자정보</strong> <span class="path">/about/ir/* (DART 공시 연동, 3개년 재무차트/엑셀, IR News)</span></div>
      </div>
    </div>

    <!-- 2. Innovation -->
    <div class="tree-branch accent-amber">
      <div class="tree-head">
        <span>2. Innovation (R&D 혁신 및 파이프라인)</span>
        <span class="badge badge-amber">/rd/* &nbsp;|&nbsp; /en/rd/*</span>
      </div>
      <div class="tree-items">
        <div class="tree-pill"><strong>연구소 소개</strong> <span class="path">/rd/intro (수원 중앙연구소 연구인프라 & 첨단 분석설비)</span></div>
        <div class="tree-pill"><strong>연구 활동</strong> <span class="path">/rd/activities (DDS 약물전달 플랫폼, 마이크로캡슐화 기술, 특허)</span></div>
        <div class="tree-pill"><strong>파이프라인</strong> <span class="path">/rd/pipeline (기초연구~임상 1·2·3상~허가 반응형 차트)</span></div>
      </div>
    </div>

    <!-- 3. Business & CDMO -->
    <div class="tree-branch accent-purple">
      <div class="tree-head">
        <span>3. Business & 4. CDMO (사업 영역 및 의약품)</span>
        <span class="badge badge-purple">/business/* &nbsp;|&nbsp; /en/business/*</span>
      </div>
      <div class="tree-items">
        <div class="tree-pill"><strong>제품 검색</strong> <span class="path">/business/finished/search (초성 ㄱ~ㅎ, 효능군, 전문/일반의약품)</span></div>
        <div class="tree-pill"><strong>제품 상세 정보</strong> <span class="path">/business/finished/search?id=... (성분, 효능, 용법, 보험코드, 첨부문서)</span></div>
        <div class="tree-pill"><strong>제품 소식</strong> <span class="path">/business/finished/news (신제품 출시 및 제품 관련 뉴스)</span></div>
        <div class="tree-pill"><strong>원료의약품 (API)</strong> <span class="path">/business/api/raw (수직계열화 기반 합성 API 품목 및 수출 현황)</span></div>
        <div class="tree-pill"><strong>CDMO 서비스</strong> <span class="path">/business/cdmo (c-GMP 품질관리, 고난도 고형제 특장점, 글로벌 물류)</span></div>
      </div>
    </div>

    <!-- 5. Connect -->
    <div class="tree-branch accent-rose">
      <div class="tree-head">
        <span>5. Connect (뉴스룸 / 채용 / 고객센터)</span>
        <span class="badge badge-rose">/contact/* &nbsp;|&nbsp; /en/contact/*</span>
      </div>
      <div class="tree-items">
        <div class="tree-pill"><strong>보도자료</strong> <span class="path">/contact/newsroom/press (기업 언론 보도 기사 및 조회수)</span></div>
        <div class="tree-pill"><strong>홍보자료실</strong> <span class="path">/contact/newsroom/media (브로슈어, 카탈로그 PDF 다운로드)</span></div>
        <div class="tree-pill"><strong>인재상 · 복리후생</strong> <span class="path">/contact/careers/talent (다산 인재 가치관 & 사내 복지)</span></div>
        <div class="tree-pill"><strong>채용절차 & 공고</strong> <span class="path">/contact/careers/jobs (진행 중인 상시·공채 공고 목록)</span></div>
        <div class="tree-pill"><strong>온라인 입사지원</strong> <span class="path">/contact/careers/apply (이력서 첨부 및 인재풀 접수)</span></div>
        <div class="tree-pill"><strong>제품 문의</strong> <span class="path">/contact/inquiry (일반 소비자 의약품 복약/제품 문의 접수)</span></div>
        <div class="tree-pill"><strong>비즈니스 문의</strong> <span class="path">/contact/inquiry/sales (제약사/바이어 대상 CDMO & API 제휴 문의)</span></div>
        <div class="tree-pill"><strong>부패신고 (익명)</strong> <span class="path">/contact/inquiry/corruption (준법감시 익명 제보 시스템)</span></div>
        <div class="tree-pill"><strong>문의내역 확인</strong> <span class="path">/contact/inquiry/check (이메일 6자리 OTP 인증 후 비회원 조회)</span></div>
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- ==================== PAGE 5: ADMIN MANAGEMENT PORTAL ==================== -->
  <div class="doc-header">
    <span class="doc-topic">SECTION 3. 관리자 포털 구조도 (Admin Portal Architecture)</span>
    <span class="doc-meta">다산제약 웹 플랫폼 명세서</span>
  </div>

  <h1 class="sec-title">3. 관리자 페이지 구조도 (Admin Management Portal)</h1>
  <p>
    관리자 시스템(<code>/management</code>)은 별도의 외부 CMS 솔루션에 의존하지 않고 Next.js 내부에서 직접 제어하는 통합 백오피스입니다.
    보안 세션 인증을 거친 관리자는 사이트 전반의 <strong>콘텐츠</strong>, <strong>의약품 및 R&D 데이터</strong>, <strong>고객 문의/제보</strong>, <strong>운영 설정</strong>을 한 곳에서 제어합니다.
  </p>

  <div class="diagram-container avoid-break">
    <div style="text-align: center; font-size: 8.8pt; font-weight: 800; color: #0f172a; margin-bottom: 6px;">
      [관리자 포털 6대 핵심 운영 모듈]
    </div>

    <div class="card-grid-2">
      <!-- Admin 1 -->
      <div class="layer-card">
        <div class="layer-header">
          <span class="layer-title">📊 1. 대시보드 메인 & 통계</span>
          <span class="badge badge-green">/management/dashboard</span>
        </div>
        <p style="font-size: 7.5pt; color: #475569;">
          - <strong>방문자 통계</strong>: 오늘 및 누적 방문자 수 카운터, 일자별 상세 접속 로그 모달<br>
          - <strong>미답변 문의 알림</strong>: 실시간 신규 1:1 고객 문의 및 익명 부패신고 수치 뱃지<br>
          - <strong>데이터 요약 카드</strong>: 등록된 의약품 총계, 진행 파이프라인 수치 즉시 확인
        </p>
      </div>

      <!-- Admin 2 -->
      <div class="layer-card">
        <div class="layer-header">
          <span class="layer-title">📝 2. 실시간 콘텐츠 CMS</span>
          <span class="badge badge-blue">Quill Editor / Live</span>
        </div>
        <p style="font-size: 7.5pt; color: #475569;">
          - <strong>Company 콘텐츠</strong>: 인사말, 개요, 연혁, CI, 시설, 오시는 길<br>
          - <strong>ESG 정책 5종</strong>: 환경, 안전보건, 부패방지, 윤리강령 전문 위지윅 편집<br>
          - <strong>IR 재무제표</strong>: 3개년 손익/대차대조표 수치 테이블 실시간 수정 및 반영
        </p>
      </div>

      <!-- Admin 3 -->
      <div class="layer-card">
        <div class="layer-header">
          <span class="layer-title">💊 3. 의약품 카탈로그 CRUD</span>
          <span class="badge badge-amber">/business/finished/search</span>
        </div>
        <p style="font-size: 7.5pt; color: #475569;">
          - <strong>의약품 등록/수정/삭제</strong>: 한글/영문명, 전문/일반, 초성 자동 지정, 효능군<br>
          - <strong>상세 스펙 관리</strong>: 성분, 용법, 보관법, 포장단위, 보험코드, 보험약가<br>
          - <strong>엑셀 및 미디어</strong>: 제품 패키지 사진(Cloudinary) 및 엑셀 일괄 다운로드/업로드
        </p>
      </div>

      <!-- Admin 4 -->
      <div class="layer-card">
        <div class="layer-header">
          <span class="layer-title">🧬 4. R&D 파이프라인 엔진</span>
          <span class="badge badge-purple">/rd/pipeline</span>
        </div>
        <p style="font-size: 7.5pt; color: #475569;">
          - <strong>연구 과제 관리</strong>: 프로젝트명, 적응증(질환), 공동개발 파트너<br>
          - <strong>드래그 앤 드롭</strong>: 개발 단계(기초연구~임상 1·2·3상~허가) 실시간 순서 변경<br>
          - <strong>카테고리 관리</strong>: 개량신약, 자료제출의약품, 퍼스트제네릭 분류 추가/삭제
        </p>
      </div>

      <!-- Admin 5 -->
      <div class="layer-card">
        <div class="layer-header">
          <span class="layer-title">✉️ 5. 1:1 문의 / 부패신고 관리</span>
          <span class="badge badge-rose">inquiries (통합 접수)</span>
        </div>
        <p style="font-size: 7.5pt; color: #475569;">
          - <strong>통합 필터링</strong>: 전체 / 채용지원 / 제품문의 / 기업영업문의 / 부패신고<br>
          - <strong>상세 열람 및 처리</strong>: 문의자 정보, 내용, 비밀글 여부 확인<br>
          - <strong>SMTP 메일 포워딩</strong>: 사내 담당자에게 원클릭 재전송 및 회신 처리
        </p>
      </div>

      <!-- Admin 6 -->
      <div class="layer-card">
        <div class="layer-header">
          <span class="layer-title">⚙️ 6. 운영 설정 & 백업 & 계정</span>
          <span class="badge badge-gray">SEO, Popups, Backup</span>
        </div>
        <p style="font-size: 7.5pt; color: #475569;">
          - <strong>SEO 관리</strong>: 메인 및 30여 개 서브페이지 Title, Keywords, Description 편집<br>
          - <strong>팝업 관리</strong>: 기간(시작~종료), 화면 위치(Top/Left), 크기, 활성 토글<br>
          - <strong>계정 & 백업 (super_admin)</strong>: 관리자 권한 분등 및 전체 DB/파일 ZIP 백업
        </p>
      </div>
    </div>
  </div>

  <h2 class="sub-title">3.2 관리자 역할 기반 접근 제어 (Role-Based Access Control, RBAC)</h2>
  <table class="data-table avoid-break">
    <thead>
      <tr>
        <th style="width: 20%;">역할 명칭 (Role)</th>
        <th style="width: 47%;">접근 및 편집 허용 범위</th>
        <th style="width: 33%;">제한 사항 및 보안 규칙</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <span class="badge badge-rose">super_admin</span><br>
          <strong>최고 관리자</strong>
        </td>
        <td>
          - 시스템의 모든 기능 100% 접근 및 수정<br>
          - 관리자 계정 생성, 수정, 비밀번호 변경 (<code>admin-users</code>)<br>
          - 전체 데이터베이스 및 첨부파일 ZIP 백업 (<code>backup-settings</code>)
        </td>
        <td>
          모든 권한 보유 (단 1개 이상의 최고관리자 계정 필수 유지)
        </td>
      </tr>
      <tr>
        <td>
          <span class="badge badge-blue">editor</span><br>
          <strong>콘텐츠 관리자</strong>
        </td>
        <td>
          - Company, Innovation, Business, Connect 전 메뉴 콘텐츠 편집<br>
          - 의약품 카탈로그 및 R&D 파이프라인 등록/수정/삭제<br>
          - 1:1 고객 문의 열람, 팝업 관리, SEO 메타태그 설정
        </td>
        <td>
          - 관리자 계정 관리 메뉴 비노출<br>
          - 시스템 백업 다운로드 권한 없음
        </td>
      </tr>
      <tr>
        <td>
          <span class="badge badge-amber">connect_editor</span><br>
          <strong>뉴스룸 관리자</strong>
        </td>
        <td>
          - 보도자료, 홍보자료실, IR News, 채용공고 게시판 CRUD<br>
          - 1:1 고객 문의 목록 조회
        </td>
        <td>
          - 회사소개/ESG/시설/재무 CMS 접근 불가<br>
          - 의약품 DB, 파이프라인, 팝업, SEO, 백업 차단
        </td>
      </tr>
      <tr>
        <td>
          <span class="badge badge-gray">viewer</span><br>
          <strong>조회 전용 권한</strong>
        </td>
        <td>
          - 대시보드 접속 및 전체 통계, 등록 데이터 단순 열람
        </td>
        <td>
          - 신규 등록, 데이터 수정, 삭제 일체 차단 (읽기 전용)
        </td>
      </tr>
    </tbody>
  </table>

  <div class="page-break"></div>

  <!-- ==================== PAGE 6: DATABASE SCHEMA & WORKFLOW ==================== -->
  <div class="doc-header">
    <span class="doc-topic">SECTION 4. 데이터베이스 및 인터랙션 흐름 (Data & Workflows)</span>
    <span class="doc-meta">다산제약 웹 플랫폼 명세서</span>
  </div>

  <h1 class="sec-title">4. 데이터베이스 엔티티 및 주요 상호작용 흐름</h1>
  <p>
    다산제약 웹 플랫폼의 데이터베이스(TiDB Cloud)는 정규화된 10개의 핵심 테이블로 구성되어 있으며, 
    정적 콘텐츠 관리, 비즈니스 의약품 데이터, 보안 접수 내역 및 접속 통계를 안전하게 영속화합니다.
  </p>

  <h2 class="sub-title">4.1 핵심 데이터베이스 테이블 명세</h2>
  <table class="data-table avoid-break">
    <thead>
      <tr>
        <th style="width: 20%;">테이블명</th>
        <th style="width: 42%;">주요 컬럼 정의</th>
        <th>테이블 용도 및 제약 사항</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>products</code></td>
        <td>id(PK), name, english_name, type, efficacy, consonant, category, ingredient, content, appearance, insurance_code, insurance_price, file_url</td>
        <td>완제의약품 카탈로그 데이터. 초성(consonant) 및 효능군 인덱싱으로 고속 검색 지원</td>
      </tr>
      <tr>
        <td><code>pipeline</code></td>
        <td>id(PK), category, project_name, disease, phase, partner, updated_at</td>
        <td>신약 R&D 연구개발 과제 및 임상 단계(기초연구~허가) 현황</td>
      </tr>
      <tr>
        <td><code>news</code></td>
        <td>id(PK), category(press/ir/media/jobs), title, content, views, file_url, file_name, created_at</td>
        <td>보도자료, 홍보자료실, IR 공시, 채용공고 등 게시판 통합 테이블</td>
      </tr>
      <tr>
        <td><code>inquiries</code></td>
        <td>id(PK), name, email, phone, subject, content, password, created_at</td>
        <td>1:1 제품 문의, 기업 비즈니스 제휴 문의, 익명 부패행위 제보 내역 저장</td>
      </tr>
      <tr>
        <td><code>email_verifications</code></td>
        <td>id(PK), email, code(6자리 OTP), expires_at, is_verified, created_at</td>
        <td>비회원 고객 문의 내역 조회를 위한 이메일 인증코드 및 10분 만료 검증</td>
      </tr>
      <tr>
        <td><code>admin_contents</code></td>
        <td>page_key(PK), page_title, content, is_hidden, updated_at</td>
        <td>회사소개, ESG 5종, 연혁, 재무제표 등 동적 CMS 텍스트 및 SEO 메타데이터 저장</td>
      </tr>
      <tr>
        <td><code>popups</code></td>
        <td>id(PK), title, content, link_url, start_date, end_date, is_active, width, height, top_pos, left_pos</td>
        <td>메인 화면 공지 팝업 모달 스케줄링 및 좌표/크기 제어 테이블</td>
      </tr>
      <tr>
        <td><code>admin_users</code></td>
        <td>id(PK), username(UK), password(SHA-256), name, role, created_at</td>
        <td>관리자 포털 접근 계정 및 4단계 RBAC 역할 정보 저장</td>
      </tr>
      <tr>
        <td><code>visitor_logs</code> / <code>daily_visitors</code></td>
        <td>id, ip, device, page, created_at / visit_date(PK), visitor_count</td>
        <td>사이트 실시간 방문자 트래픽 감사 및 일자별 통계 집계 데이터</td>
      </tr>
      <tr>
        <td><code>backup_logs</code></td>
        <td>id(PK), username, name, type(full/db_only), ip_address, created_at</td>
        <td>관리자의 데이터베이스 및 파일 백업 다운로드 감사 이력 기록</td>
      </tr>
    </tbody>
  </table>

  <h2 class="sub-title">4.2 핵심 비즈니스 인터랙션 흐름도</h2>
  <div class="step-flow avoid-break">
    <div class="step-item">
      <div class="step-num">1</div>
      <div class="step-content">
        <div class="step-title">콘텐츠/제품 수정 및 사용자 실시간 반영 흐름</div>
        <div class="step-desc">
          관리자가 대시보드에서 의약품 정보 또는 회사소개 텍스트를 수정하여 저장(PUT/POST)하면, 
          TiDB Cloud 테이블이 즉시 갱신됩니다. 사용자 화면은 Next.js의 <strong>Incremental Static Regeneration (ISR, 60초)</strong> 정책에 따라
          데이터베이스 부하를 최소화하면서 60초 주기로 최신 캐시를 갱신하거나 온디맨드로 최신 데이터를 제공합니다.
        </div>
      </div>
    </div>

    <div class="step-item">
      <div class="step-num">2</div>
      <div class="step-content">
        <div class="step-title">1:1 고객 문의 및 익명 부패신고 접수 흐름</div>
        <div class="step-desc">
          일반 사용자 또는 제보자가 문의폼(ContactForm)에서 Google reCAPTCHA 봇 검증을 통과한 후 데이터를 전송하면, 
          <code>/api/inquiries</code> 라우트가 데이터를 암호화하여 DB에 기록하고, 
          동시에 Nodemailer SMTP 엔진(<code>admin@dspharm.com</code>)을 통해 사내 담당 부서에 알림 메일을 실시간 발송합니다.
        </div>
      </div>
    </div>

    <div class="step-item">
      <div class="step-num">3</div>
      <div class="step-content">
        <div class="step-title">비회원 문의 내역 확인 (이메일 OTP 6자리 보안 인증)</div>
        <div class="step-desc">
          별도의 회원가입 없이 비회원 사용자가 문의 확인 페이지(<code>/contact/inquiry/check</code>)에서 본인 이메일을 입력하면, 
          시스템이 6자리 난수 코드를 생성하여 <code>email_verifications</code>에 만료 시한(10분)과 함께 저장 후 메일로 전송합니다. 
          사용자가 올바른 코드를 입력하면 해당 이메일로 접수된 문의 내역과 관리자의 답변이 안전하게 화면에 렌더링됩니다.
        </div>
      </div>
    </div>

    <div class="step-item">
      <div class="step-num">4</div>
      <div class="step-content">
        <div class="step-title">시스템 백업 및 감사 로깅 (Security Audit Flow)</div>
        <div class="step-desc">
          <code>super_admin</code> 권한 보유자가 시스템 백업을 요청하면, 
          서버는 AES-256 세션을 검증하고 모든 DB 테이블 데이터를 JSON/SQL로 추출하여 Archiver를 통해 ZIP 압축 스트림으로 즉시 다운로드합니다. 
          동시에 요청자의 계정, 이름, 백업 유형, 접속 IP를 <code>backup_logs</code>에 불변 기록하여 정보 유출에 대비한 감사 추적성을 확보합니다.
        </div>
      </div>
    </div>
  </div>

  <div class="callout-blue avoid-break" style="margin-top: 10px;">
    <strong>결론 및 운영 지침:</strong> 다산제약 웹 플랫폼은 고성능 Next.js 16과 고가용성 TiDB Cloud를 바탕으로 대외 기업 신뢰도를 높이는 유려한 인터랙션과 
    운영 편의성을 극대화한 자체 CMS 백오피스를 성공적으로 융합한 아키텍처입니다. 정기적인 백업 및 Nginx 캐시 최적화를 통해 365일 무중단 서비스가 유지됩니다.
  </div>

</body>
</html>
`;

const htmlFilePath = 'C:\\Share\\DASAN\\DASAN_System_Architecture_and_Page_Structure.html';
const pdfFilePath = 'C:\\Share\\DASAN\\DASAN_System_Architecture_and_Page_Structure.pdf';

console.log('Writing refined HTML file to:', htmlFilePath);
fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');

console.log('Converting HTML to PDF via Edge Headless...');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const command = `"${edgePath}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdfFilePath}" "file:///${htmlFilePath.replace(/\\\\/g, '/')}"`;

try {
  execSync(command);
  console.log('PDF execution completed.');
  
  if (fs.existsSync(pdfFilePath)) {
    const stats = fs.statSync(pdfFilePath);
    console.log(`Generated PDF file size: ${(stats.size / 1024).toFixed(1)} KB`);
  } else {
    console.error('PDF file was not found.');
  }
} catch (error) {
  console.error('Error during Edge PDF export:', error);
  process.exit(1);
}
