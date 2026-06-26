const fs = require('fs');
const path = require('path');
const https = require('https');

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

// Construct JSON and encode base64
const obj = { code: mermaidCode, mermaid: { theme: 'default' } };
const jsonStr = JSON.stringify(obj);
const base64 = Buffer.from(jsonStr).toString('base64');
const url = `https://mermaid.ink/img/${base64}`;

console.log('Fetching image from:', url);

const file = fs.createWriteStream(path.join(__dirname, 'db_erd_test.png'));

https.get(url, (response) => {
  if (response.statusCode !== 200) {
    console.error('Failed to fetch image:', response.statusCode);
    return;
  }
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Image download complete!');
  });
}).on('error', (err) => {
  console.error('Error fetching image:', err);
});
