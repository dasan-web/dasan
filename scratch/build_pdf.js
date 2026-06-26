const fs = require('fs');
const path = require('path');
const https = require('https');
const { exec } = require('child_process');

const mermaidCode = `erDiagram
    inquiries {
        int id PK "Auto Increment"
        varchar name "50 - 작성자명"
        varchar email "100 - 이메일"
        varchar phone "20 - 연락처 (선택)"
        varchar subject "200 - 문의 제목"
        text content "문의 본문 내용"
        timestamp created_at "등록 일시"
    }
    news {
        int id PK "Auto Increment"
        varchar category "50 - press / ir 등"
        varchar title "200 - 게시글 제목"
        text content "게시글 본문 내용"
        int views "조회수"
        varchar file_url "255 - 첨부파일 경로"
        varchar file_name "255 - 첨부파일명"
        timestamp created_at "작성 일시"
    }
    pipeline {
        int id PK "Auto Increment"
        varchar category "100 - 개량신약 / 퍼스트제네릭 등"
        varchar project_name "100 - 프로젝트명"
        varchar disease "200 - 적응증 (질환명)"
        varchar phase "50 - 개발 단계"
        varchar partner "100 - 파트너사"
        timestamp updated_at "수정 일시"
    }
    products {
        int id PK "Auto Increment"
        varchar name "100 - 의약품 한글명"
        varchar english_name "150 - 의약품 영문명"
        varchar type "50 - 전문의약품 / 일반의약품"
        varchar efficacy "100 - 효능군"
        varchar consonant "10 - 자음 (초성 검색용)"
        varchar file_url "255 - 이미지/문서 경로"
        varchar file_name "255 - 파일명"
    }
    admin_contents {
        varchar page_key PK "100 - 페이지 식별 키"
        varchar page_title "200 - 페이지 제목"
        text content "페이지 설명 및 본문 데이터"
        tinyint is_hidden "숨김 여부 (0/1)"
        timestamp updated_at "최종 수정 일시"
    }
    visitor_logs {
        int id PK "Auto Increment"
        varchar ip "50 - 접속자 IP"
        varchar device "150 - 브라우저/기기 정보"
        varchar page "150 - 접속한 페이지 경로"
        timestamp created_at "접속 시간"
    }
    daily_visitors {
        date visit_date PK "접속 일자"
        int visitor_count "당일 순 방문자수"
    }
    admin_users {
        int id PK "Auto Increment"
        varchar username UK "50 - 로그인 아이디"
        varchar password "255 - 암호화된 패스워드"
        varchar name "50 - 관리자 이름"
        varchar role "30 - 권한 (super_admin / editor / viewer)"
        timestamp created_at "생성 일시"
    }
    daily_visitors ||--|{ visitor_logs : "1:N (일자별 상세 로그)"
    admin_users ||--|{ news : "1:N (게시글 작성)"
    admin_users ||--|{ admin_contents : "1:N (콘텐츠 편집)"
    admin_users ||--|{ products : "1:N (제품 등록)"
    admin_users ||--|{ pipeline : "1:N (파이프라인 관리)"
    visitor_logs ||--|{ inquiries : "1:N (동일 IP 문의 등록)"
    pipeline ||--|| products : "1:1 (연구완료 및 제품 상용화)"`;

// Construct JSON and encode base64 for Mermaid.ink
const obj = { code: mermaidCode, mermaid: { theme: 'default' } };
const jsonStr = JSON.stringify(obj);
const base64 = Buffer.from(jsonStr).toString('base64');
const url = `https://mermaid.ink/img/${base64}`;

const scratchDir = __dirname;
const tempHtmlPath = path.join(scratchDir, 'db_erd.html');
const tempPngPath = path.join(scratchDir, 'db_erd.png');
const psScriptPath = path.join(scratchDir, 'convert.ps1');
const pdfPath = 'c:\\Share\\DASAN\\db_erd.pdf';

console.log('Downloading ERD image from Mermaid API...');
const file = fs.createWriteStream(tempPngPath);

https.get(url, (response) => {
  if (response.statusCode !== 200) {
    console.error('Failed to download image from Mermaid.ink API, status:', response.statusCode);
    process.exit(1);
  }
  
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Image download complete. Building HTML...');
    buildHtmlAndPdf();
  });
}).on('error', (err) => {
  console.error('Error downloading image:', err);
  process.exit(1);
});

function buildHtmlAndPdf() {
  const htmlContent = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>다산제약 홈페이지 데이터베이스 설계서 (ERD)</title>
  <style>
    @page {
      size: A4 landscape;
      margin: 0.5in;
    }
    body {
      font-family: 'Malgun Gothic', '맑은 고딕', Arial, sans-serif;
      color: #2b2b2b;
      line-height: 1.6;
      margin: 0;
      background-color: #ffffff;
    }
    h1 {
      color: #2b2b2b;
      font-size: 26px;
      border-bottom: 3px solid #74b816;
      padding-bottom: 12px;
      margin-bottom: 30px;
      text-align: center;
    }
    h2 {
      color: #74b816;
      font-size: 18px;
      border-left: 5px solid #2b2b2b;
      padding-left: 10px;
      margin-top: 35px;
      margin-bottom: 15px;
      page-break-before: always;
    }
    h2.first {
      page-break-before: avoid;
    }
    h3 {
      color: #2b2b2b;
      font-size: 15px;
      margin-top: 25px;
      margin-bottom: 10px;
      background-color: #f4f9eb;
      padding: 8px 12px;
      border-radius: 4px;
      border-left: 4px solid #74b816;
    }
    p, li {
      font-size: 13px;
      color: #555555;
    }
    ul {
      padding-left: 20px;
    }
    li {
      margin-bottom: 6px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 25px;
      font-size: 12px;
    }
    th, td {
      border: 1px solid #dddddd;
      padding: 8px 10px;
      text-align: left;
    }
    th {
      background-color: #2b2b2b;
      color: #ffffff;
      font-weight: bold;
    }
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    .badge {
      display: inline-block;
      padding: 2px 6px;
      font-size: 10px;
      font-weight: bold;
      border-radius: 3px;
      color: #ffffff;
    }
    .badge-pk {
      background-color: #d9534f;
    }
    .badge-uk {
      background-color: #f0ad4e;
    }
    .relations-box {
      background-color: #f8f9fa;
      border: 1px solid #e9ecef;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 20px;
    }
    .relations-title {
      font-weight: bold;
      color: #2b2b2b;
      margin-bottom: 8px;
      font-size: 13px;
    }
    .erd-container {
      text-align: center;
      margin-top: 10px;
      margin-bottom: 20px;
    }
    .erd-image {
      width: 100%;
      max-width: 100%;
      height: auto;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      border-radius: 8px;
      padding: 4px;
    }
  </style>
</head>
<body>

  <h1>다산제약 홈페이지 데이터베이스 설계서 (ERD)</h1>
  <p style="text-align: center; font-size: 12px; color: #888; margin-top: -20px; margin-bottom: 30px;">
    작성일자: 2026년 06월 26일 | 다산제약 홈페이지 시스템 구축 프로젝트
  </p>

  <h2 class="first">1. 개요</h2>
  <p>
    본 문서는 다산제약 홈페이지의 서비스 컴포넌트(고객 문의, 게시판, R&D 파이프라인, 제품 검색, 공통 콘텐츠 및 SEO, 방문자 세션 로그)를 운영하기 위한 데이터베이스 스키마 설계서입니다.
  </p>

  <h2>2. DB ERD 다이어그램</h2>
  <div class="erd-container">
    <img class="erd-image" src="db_erd.png" alt="Database ERD" />
  </div>

  <h2>3. 테이블 정의서</h2>

  <h3>inquiries (고객 문의 테이블)</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 150px;">컬럼명</th>
        <th style="width: 120px;">데이터 타입</th>
        <th style="width: 80px;">키 (Key)</th>
        <th>설명</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>id</td>
        <td>INT</td>
        <td><span class="badge badge-pk">PK</span></td>
        <td>자동 증가 식별자 (Auto Increment)</td>
      </tr>
      <tr>
        <td>name</td>
        <td>VARCHAR(50)</td>
        <td></td>
        <td>작성자명 (부패신고의 경우 '익명' 저장)</td>
      </tr>
      <tr>
        <td>email</td>
        <td>VARCHAR(100)</td>
        <td></td>
        <td>이메일 주소 (부패신고의 경우 'anonymous@dspharm.com' 저장)</td>
      </tr>
      <tr>
        <td>phone</td>
        <td>VARCHAR(20)</td>
        <td></td>
        <td>연락처 번호 (선택사항)</td>
      </tr>
      <tr>
        <td>subject</td>
        <td>VARCHAR(200)</td>
        <td></td>
        <td>문의 제목 (카테고리 접두사 포함)</td>
      </tr>
      <tr>
        <td>content</td>
        <td>TEXT</td>
        <td></td>
        <td>문의 본문 내용</td>
      </tr>
      <tr>
        <td>created_at</td>
        <td>TIMESTAMP</td>
        <td></td>
        <td>등록 일시 (Default: Current_Timestamp)</td>
      </tr>
    </tbody>
  </table>

  <h3>news (뉴스 및 IR 게시판 테이블)</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 150px;">컬럼명</th>
        <th style="width: 120px;">데이터 타입</th>
        <th style="width: 80px;">키 (Key)</th>
        <th>설명</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>id</td>
        <td>INT</td>
        <td><span class="badge badge-pk">PK</span></td>
        <td>자동 증가 식별자 (Auto Increment)</td>
      </tr>
      <tr>
        <td>category</td>
        <td>VARCHAR(50)</td>
        <td></td>
        <td>게시글 분류 (press: 보도자료, ir: IR 공시 등)</td>
      </tr>
      <tr>
        <td>title</td>
        <td>VARCHAR(200)</td>
        <td></td>
        <td>게시글 제목</td>
      </tr>
      <tr>
        <td>content</td>
        <td>TEXT</td>
        <td></td>
        <td>게시글 본문 내용</td>
      </tr>
      <tr>
        <td>views</td>
        <td>INT</td>
        <td></td>
        <td>조회수 (Default: 0)</td>
      </tr>
      <tr>
        <td>file_url</td>
        <td>VARCHAR(255)</td>
        <td></td>
        <td>첨부파일 웹 경로 (없을 시 NULL)</td>
      </tr>
      <tr>
        <td>file_name</td>
        <td>VARCHAR(255)</td>
        <td></td>
        <td>첨부파일 원본 파일명 (없을 시 NULL)</td>
      </tr>
      <tr>
        <td>created_at</td>
        <td>TIMESTAMP</td>
        <td></td>
        <td>작성 일시 (Default: Current_Timestamp)</td>
      </tr>
    </tbody>
  </table>

  <h3>pipeline (R&D 파이프라인 테이블)</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 150px;">컬럼명</th>
        <th style="width: 120px;">데이터 타입</th>
        <th style="width: 80px;">키 (Key)</th>
        <th>설명</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>id</td>
        <td>INT</td>
        <td><span class="badge badge-pk">PK</span></td>
        <td>자동 증가 식별자 (Auto Increment)</td>
      </tr>
      <tr>
        <td>category</td>
        <td>VARCHAR(100)</td>
        <td></td>
        <td>개발 분류 (개량신약, 퍼스트제네릭 등)</td>
      </tr>
      <tr>
        <td>project_name</td>
        <td>VARCHAR(100)</td>
        <td></td>
        <td>개발 프로젝트 코드명</td>
      </tr>
      <tr>
        <td>disease</td>
        <td>VARCHAR(200)</td>
        <td></td>
        <td>대상 적응증 (질환명)</td>
      </tr>
      <tr>
        <td>phase</td>
        <td>VARCHAR(50)</td>
        <td></td>
        <td>현재 임상/연구 단계 (기초연구, 임상1~3상 등)</td>
      </tr>
      <tr>
        <td>partner</td>
        <td>VARCHAR(100)</td>
        <td></td>
        <td>협력 파트너사 (없을 시 빈값)</td>
      </tr>
      <tr>
        <td>updated_at</td>
        <td>TIMESTAMP</td>
        <td></td>
        <td>최종 수정 일시</td>
      </tr>
    </tbody>
  </table>

  <h3>products (의약품 제품 테이블)</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 150px;">컬럼명</th>
        <th style="width: 120px;">데이터 타입</th>
        <th style="width: 80px;">키 (Key)</th>
        <th>설명</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>id</td>
        <td>INT</td>
        <td><span class="badge badge-pk">PK</span></td>
        <td>자동 증가 식별자 (Auto Increment)</td>
      </tr>
      <tr>
        <td>name</td>
        <td>VARCHAR(100)</td>
        <td></td>
        <td>의약품 한글 상표명</td>
      </tr>
      <tr>
        <td>english_name</td>
        <td>VARCHAR(150)</td>
        <td></td>
        <td>의약품 영문명</td>
      </tr>
      <tr>
        <td>type</td>
        <td>VARCHAR(50)</td>
        <td></td>
        <td>제품 분류 (전문의약품 / 일반의약품)</td>
      </tr>
      <tr>
        <td>efficacy</td>
        <td>VARCHAR(100)</td>
        <td></td>
        <td>의약품 효능군 분류</td>
      </tr>
      <tr>
        <td>consonant</td>
        <td>VARCHAR(10)</td>
        <td></td>
        <td>자음 초성 (초성 검색 인덱싱용: 'ㄱ', 'ㄴ' 등)</td>
      </tr>
      <tr>
        <td>file_url</td>
        <td>VARCHAR(255)</td>
        <td></td>
        <td>제품 이미지/설명서 파일 경로</td>
      </tr>
      <tr>
        <td>file_name</td>
        <td>VARCHAR(255)</td>
        <td></td>
        <td>제품 첨부파일명</td>
      </tr>
    </tbody>
  </table>

  <h3>admin_contents (공통 콘텐츠 및 SEO 테이블)</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 150px;">컬럼명</th>
        <th style="width: 120px;">데이터 타입</th>
        <th style="width: 80px;">키 (Key)</th>
        <th>설명</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>page_key</td>
        <td>VARCHAR(100)</td>
        <td><span class="badge badge-pk">PK</span></td>
        <td>페이지 식별 유니크 키 (예: 'seo/about/location')</td>
      </tr>
      <tr>
        <td>page_title</td>
        <td>VARCHAR(200)</td>
        <td></td>
        <td>페이지의 관리용 한글 제목</td>
      </tr>
      <tr>
        <td>content</td>
        <td>TEXT</td>
        <td></td>
        <td>페이지의 텍스트 본문 또는 직렬화된 SEO 정보</td>
      </tr>
      <tr>
        <td>is_hidden</td>
        <td>TINYINT</td>
        <td></td>
        <td>숨김 처리 여부 (0: 노출, 1: 숨김)</td>
      </tr>
      <tr>
        <td>updated_at</td>
        <td>TIMESTAMP</td>
        <td></td>
        <td>최종 수정 일시</td>
      </tr>
    </tbody>
  </table>

  <h3>visitor_logs (실시간 접속 로그 테이블)</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 150px;">컬럼명</th>
        <th style="width: 120px;">데이터 타입</th>
        <th style="width: 80px;">키 (Key)</th>
        <th>설명</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>id</td>
        <td>INT</td>
        <td><span class="badge badge-pk">PK</span></td>
        <td>자동 증가 식별자 (Auto Increment)</td>
      </tr>
      <tr>
        <td>ip</td>
        <td>VARCHAR(50)</td>
        <td></td>
        <td>접속한 클라이언트 IP 주소</td>
      </tr>
      <tr>
        <td>device</td>
        <td>VARCHAR(150)</td>
        <td></td>
        <td>접속 기기 및 브라우저 운영체제 정보</td>
      </tr>
      <tr>
        <td>page</td>
        <td>VARCHAR(150)</td>
        <td></td>
        <td>유입/방문한 페이지 경로</td>
      </tr>
      <tr>
        <td>created_at</td>
        <td>TIMESTAMP</td>
        <td></td>
        <td>접속 일시 (Default: Current_Timestamp)</td>
      </tr>
    </tbody>
  </table>

  <h3>daily_visitors (일별 방문자 통계 테이블)</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 150px;">컬럼명</th>
        <th style="width: 120px;">데이터 타입</th>
        <th style="width: 80px;">키 (Key)</th>
        <th>설명</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>visit_date</td>
        <td>DATE</td>
        <td><span class="badge badge-pk">PK</span></td>
        <td>집계 기준 날짜</td>
      </tr>
      <tr>
        <td>visitor_count</td>
        <td>INT</td>
        <td></td>
        <td>해당 일자의 중복 제거(IP 기준) 순 방문자수</td>
      </tr>
    </tbody>
  </table>

  <h3>admin_users (관리자 계정 테이블)</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 150px;">컬럼명</th>
        <th style="width: 120px;">데이터 타입</th>
        <th style="width: 80px;">키 (Key)</th>
        <th>설명</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>id</td>
        <td>INT</td>
        <td><span class="badge badge-pk">PK</span></td>
        <td>자동 증가 식별자 (Auto Increment)</td>
      </tr>
      <tr>
        <td>username</td>
        <td>VARCHAR(50)</td>
        <td><span class="badge badge-uk">UK</span></td>
        <td>로그인 아이디 (Unique)</td>
      </tr>
      <tr>
        <td>password</td>
        <td>VARCHAR(255)</td>
        <td></td>
        <td>SHA-256 등으로 암호화된 비밀번호 패스워드</td>
      </tr>
      <tr>
        <td>name</td>
        <td>VARCHAR(50)</td>
        <td></td>
        <td>관리자 이름</td>
      </tr>
      <tr>
        <td>role</td>
        <td>VARCHAR(30)</td>
        <td></td>
        <td>관리자 등급 권한 (super_admin / editor / viewer)</td>
      </tr>
      <tr>
        <td>created_at</td>
        <td>TIMESTAMP</td>
        <td></td>
        <td>생성 일시 (Default: Current_Timestamp)</td>
      </tr>
    </tbody>
  </table>

  <h2>4. 테이블 간 관계 및 차수 (1:N / 1:1) 상세 설명</h2>
  
  <div class="relations-box">
    <div class="relations-title">1. 일별 통계와 방문 상세 로그 [ 1대다 (1:N) 관계 ]</div>
    <p style="margin: 0 0 10px 0;">
      <strong>관계 구조:</strong> daily_visitors (1) ─── <span style="color:#74b816;">1:N</span> ───< { visitor_logs (N)<br>
      <strong>매핑 키:</strong> daily_visitors.visit_date = DATE(visitor_logs.created_at)<br>
      <strong>비즈니스 의의:</strong> 특정 일자(1)의 방문자 집계 요약 레코드는 그 날 수집된 무수한 상세 접속 이력 정보들(N)에 기반하여 추출 및 기록됩니다.
    </p>
  </div>

  <div class="relations-box">
    <div class="relations-title">2. 관리자 계정과 콘텐츠/게시판 [ 1대다 (1:N) 관계 (개념적) ]</div>
    <p style="margin: 0 0 10px 0;">
      <strong>관계 구조:</strong> admin_users (1) ─── <span style="color:#74b816;">1:N</span> ───< { news / admin_contents / products / pipeline (N)<br>
      <strong>비즈니스 의의:</strong> 시스템에 등록된 특정 관리자(1)는 여러 개의 게시글 및 공시 정보(news), 의약품 품목(products), 각 메뉴별 SEO 키 데이터(admin_contents)를 작성하고 제어할 수 있는 개념적 주체 관계입니다.
    </p>
  </div>

  <div class="relations-box">
    <div class="relations-title">3. 동일 방문자 IP와 고객 문의 [ 1대다 (1:N) 관계 (개념적) ]</div>
    <p style="margin: 0 0 10px 0;">
      <strong>관계 구조:</strong> visitor_logs (1) ─── <span style="color:#74b816;">1:N</span> ───< { inquiries (N)<br>
      <strong>비즈니스 의의:</strong> 접속 로그 상의 1개 고유 IP 환경(1)을 지닌 방문자가 홈페이지 이용 도중 영업, 제품 또는 부패신고 문의글(N)을 여러 번 반복해서 생성할 수 있습니다.
    </p>
  </div>

  <div class="relations-box">
    <div class="relations-title">4. 연구 과제와 완제 의약품 [ 1대일 (1:1) 관계 (개념적) ]</div>
    <p style="margin: 0 0 0 0;">
      <strong>관계 구조:</strong> pipeline (1) ─── <span style="color:#74b816;">1:1</span> ─── pipeline.project_name = products.name (1)<br>
      <strong>비즈니스 의의:</strong> 다산제약 중앙연구소에서 진행 중인 특정 파이프라인 과제(1)가 성공적으로 완료되어 임상 및 허가 승인을 얻을 경우, 이는 최종 완제 의약품 제품 정보(1)와 1대1 매핑 관계를 갖게 됩니다.
    </p>
  </div>

</body>
</html>
`;

  fs.writeFileSync(tempHtmlPath, htmlContent, 'utf8');
  console.log('Temporary HTML file created:', tempHtmlPath);

  const psScriptContent = `
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
try {
    $doc = $word.Documents.Open("${tempHtmlPath.replace(/\\/g, '\\\\')}")
    $doc.SaveAs([ref] "${pdfPath.replace(/\\/g, '\\\\')}", [ref] 17)
    $doc.Close()
    Write-Host "PDF created successfully"
} catch {
    Write-Error $_
} finally {
    $word.Quit()
}
`;

  fs.writeFileSync(psScriptPath, psScriptContent, 'utf8');

  exec(`powershell -NoProfile -ExecutionPolicy Bypass -File "${psScriptPath}"`, (err, stdout, stderr) => {
    // Clean up
    try {
      fs.unlinkSync(tempHtmlPath);
      fs.unlinkSync(tempPngPath);
      fs.unlinkSync(psScriptPath);
      console.log('Cleanup finished.');
    } catch (e) {
      console.error('Cleanup failed:', e);
    }

    if (err) {
      console.error('Execution failed:', err);
      console.error(stderr);
      process.exit(1);
    }

    console.log(stdout);
    console.log('PDF Generation Complete!');
  });
}
