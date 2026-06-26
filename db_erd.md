# 다산제약 홈페이지 데이터베이스 ERD (Entity Relationship Diagram)

다산제약 홈페이지 데이터베이스 스키마의 전체 테이블 설계도입니다. 각 테이블은 서비스 컴포넌트(문의 접수, 게시판, 제품/R&D 관리, 방문자 로그, 관리자 계정)별로 독립적이면서 유기적으로 결합되어 있습니다.

```mermaid
erDiagram
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

    %% 테이블 간 관계 선언 (물리적/개념적 포함)
    daily_visitors ||--|{ visitor_logs : "1:N (일자별 상세 로그)"
    admin_users ||--|{ news : "1:N (게시글 작성)"
    admin_users ||--|{ admin_contents : "1:N (콘텐츠 편집)"
    admin_users ||--|{ products : "1:N (제품 등록)"
    admin_users ||--|{ pipeline : "1:N (파이프라인 관리)"
    visitor_logs ||--|{ inquiries : "1:N (동일 IP 문의 등록)"
    pipeline ||--|| products : "1:1 (연구완료 및 제품 상용화)"
```

---

## 🔗 테이블 간 관계 및 차수 (1:N / 1:1) 상세 설명

다산제약 홈페이지 데이터베이스 스키마는 웹 성능과 단순 관리를 고려하여 물리적 외래키(Foreign Key) 제약 조건이 명시적으로 설정되어 있지 않은 플랫(Flat)한 구조이지만, 서비스 운영 흐름상 다음과 같은 **1대다 (1:N) 및 1대1 (1:1) 관계**를 개념적으로 지니고 있습니다.

### 1. 1대다 (1:N) 관계

*   **`daily_visitors` (1) : `visitor_logs` (N)**
    *   **설명:** 1개의 일자별 통계 레코드(1)에 대해 해당 날짜 동안 발생한 다수의 실시간 접속 로그(N)가 연결됩니다.
    *   **조인 기준:** `daily_visitors.visit_date` = `DATE(visitor_logs.created_at)`
*   **`admin_users` (1) : `news` (N)**
    *   **설명:** 1명의 관리자(1)는 뉴스룸에 다수의 보도자료 및 공시 정보 게시글(N)을 등록하고 편집할 수 있습니다.
*   **`admin_users` (1) : `admin_contents` (N)**
    *   **설명:** 1명의 관리자(1)는 회사 소개 및 연구소 소개 등 여러 페이지의 정적 텍스트와 SEO 설정(N)을 개별적/독립적으로 제어합니다.
*   **`admin_users` (1) : `products` (N)**
    *   **설명:** 1명의 관리자(1)는 제품 검색 페이지에 노출될 여러 의약품 정보(N)를 데이터베이스에 추가하고 갱신합니다.
*   **`admin_users` (1) : `pipeline` (N)**
    *   **설명:** 1명의 관리자(1)는 신약 개발 현황판에 나열될 다수의 연구 과제(N)를 기획하고 업데이트합니다.
*   **`visitor_logs` (1) : `inquiries` (N)**
    *   **설명:** 동일한 접속 IP를 가진 1명의 방문자(1)가 홈페이지 이용 도중 다수의 1:1 문의, 영업 문의, 제품 문의(N)를 남길 수 있습니다.
    *   **조인 기준:** `visitor_logs.ip` = `inquiries.email` (또는 동일한 IP 및 디바이스 환경 조건)

### 2. 1대1 (1:1) 관계

*   **`pipeline` (1) : `products` (1)**
    *   **설명:** 다산제약 R&D 연구 단계에 등록되어 개발이 완료된 1개의 신약/제네릭 과제(1)는 최종 임상 및 허가를 통과하면, 1개의 상용화된 완제 의약품(1)으로 제품 데이터베이스에 새롭게 등록됩니다.
    *   **조인 기준:** `pipeline.project_name` = `products.name` (연구 프로젝트 명칭과 제품 상표명이 일치하는 경우 연결)



### 1. 고객 문의 및 접수 그룹
*   **`inquiries`**: 1:1 문의, 영업 문의, 제품 문의 및 부패신고(익명) 접수 내용을 모두 통합 관리하는 테이블입니다. `subject` 컬럼의 접두사(`[제품 문의]`, `[부패신고 문의]`)를 기준으로 구분합니다.

### 2. 콘텐츠 및 R&D/제품 정보 그룹
*   **`news`**: 홈페이지의 뉴스룸(보도자료, 홍보자료) 및 주주 정보 콘텐츠를 담는 게시판 테이블입니다.
*   **`pipeline`**: R&D 연구 단계(기초연구, 전임상, 임상 1~3상 등) 현황판의 정보를 관리합니다.
*   **`products`**: 전문의약품/일반의약품의 초성 및 카테고리 검색을 위한 품목 관리 테이블입니다.
*   **`admin_contents`**: 회사 소개나 시설 소개 등 동적 편집이 필요한 텍스트 및 각 페이지별 SEO 메타데이터(타이틀, 키워드, 설명)를 동적으로 관리하는 공통 스토리지입니다.

### 3. 방문자 통계 및 접속 로그 그룹
*   **`visitor_logs`**: 실시간 접속한 사용자의 유입 경로와 기기 형태(모바일, 태블릿, PC 등)를 즉각 수집합니다.
*   **`daily_visitors`**: `visitor_logs`를 기반으로 가공되어 매일 집계되는 일별 유니크 방문자 요약 통계 테이블입니다.

### 4. 시스템 관리 그룹
*   **`admin_users`**: 관리자 사이트의 로그인 세션을 제어하는 계정 정보로, 슈퍼관리자(모든 권한), 콘텐츠 관리자(읽기/쓰기), 단순 조회자(읽기 전용) 등으로 권한(`role`)을 분할하여 접근 권한을 보안 통제합니다.
