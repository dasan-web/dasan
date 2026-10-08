const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  PageOrientation,
  BorderStyle,
  Header,
  Footer,
  PageNumber
} = require('docx');

// Document Colors
const COLOR_PRIMARY = '74B816';      // DASAN Green
const COLOR_DARK = '0F172A';         // Dark Slate
const COLOR_MUTED = '475569';        // Gray Muted
const COLOR_BORDER = 'CBD5E1';       // Light Border
const COLOR_HEADER_BG = '1E293B';    // Table Header Dark Slate
const COLOR_ROW_ALT = 'F8FAFC';      // Zebra light gray
const COLOR_ROW_WHITE = 'FFFFFF';
const COLOR_CALLOUT_BG = 'F0FDF4';

// Helper to create table cell borders
const cellBorders = {
  top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
  left: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
  right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
};

const headerBorders = {
  top: { style: BorderStyle.SINGLE, size: 8, color: COLOR_PRIMARY },
  bottom: { style: BorderStyle.SINGLE, size: 8, color: COLOR_PRIMARY },
  left: { style: BorderStyle.SINGLE, size: 4, color: '334155' },
  right: { style: BorderStyle.SINGLE, size: 4, color: '334155' },
};

// Data Rows
const requirementsData = [
  {
    no: '01',
    menu: '메인화면\n(주요사업영역)',
    summary: '4대 핵심 사업영역 개편 및 세부 링크 연동',
    details: '• 기존 3대 사업축을 4개 영역으로 확장 개편\n  1. 완제 의약품\n  2. 수탁 완제 의약품 개발 (CDMO)\n  3. 의약품 원료 및 중간체 연구개발\n  4. 신약개발 및 임상연구\n• 각 카드 클릭 시 해당 서브페이지로 즉시 이동 링크 처리',
    files: 'CoreBusinessSection.tsx\npage.tsx',
    phase: '1단계 (PC)',
    notes: '각 4개 영역별 이동할 상세 타겟 URL 경로 확정 필요'
  },
  {
    no: '02',
    menu: '메인화면\n(쇼케이스)',
    summary: 'PRODUCT LIST TOP5 디자인 제거',
    details: '• 메인 중앙의 대표 의약품 5~6종 캐러셀 쇼케이스 영역 전체 삭제\n• 화면 세로 스크롤 길이 축소 및 메인 비주얼 집중도 제고',
    files: 'MainProductShowcase.tsx\npage.tsx',
    phase: '1단계 (PC)',
    notes: '섹션 제거 후 상하단 섹션 간의 여백 밸런스 조정'
  },
  {
    no: '03',
    menu: '메인화면 / 제품\n(검색기능)',
    summary: '제품 검색 전용 독립 모듈 구성',
    details: '• 메인의 복잡한 리스트 대신, 의약품을 바로 검색할 수 있는 간결한 독립형 검색창(Search Bar) 또는 전용 검색 위젯 단독 배치',
    files: 'ProductSearch.tsx\n신규 검색 위젯',
    phase: '1단계 (PC)',
    notes: '메인 노출형 검색 바 디자인 vs 검색 페이지 바로가기 UI 협의'
  },
  {
    no: '04',
    menu: 'COMPANY\n(기업개요)',
    summary: '기업이념 및 핵심가치 스크롤 최소화',
    details: '• 마우스 휠 스크롤 릴레이 인터랙션 배제\n• 미션, 비전, 핵심가치(5종), 경영철학(4종)을 한눈에 조망할 수 있는 정적 카드/그리드 레이아웃으로 간결화',
    files: 'PhilosophyGraphic.tsx\nabout/[[...slug]]/page.tsx',
    phase: '1단계 (PC)',
    notes: '스크롤 지연 없이 즉시 정보 파악이 가능하도록 UI 개편'
  },
  {
    no: '05',
    menu: 'COMPANY\n(연혁)',
    summary: '연혁 슬래시(/) 정리 및 핵심 내용 압축',
    details: '• 텍스트 사이의 불필요한 슬래시(/) 기호 전면 삭제\n• 가독성을 저해하는 부가 설명을 정돈하고 연도별 핵심 마일스톤 위주로 깔끔하게 정리',
    files: 'HistoryAccordion.tsx\nabout/[[...slug]]/page.tsx',
    phase: '1단계 (PC)',
    notes: 'CMS/DB(admin_contents) 내 연혁 원문 텍스트 동시 정비'
  },
  {
    no: '06',
    menu: 'COMPANY\n(인프라/오시는길)',
    summary: '5대 거점 지도 포인트 클릭 연동 통합',
    details: '• 지도 위에 5대 거점 핀(포인트) 표시\n  (서울 본사, 수원 중앙연구소, 아산 제1공장, 아산 제2공장, 중앙 선양연구소)\n• 마우스로 포인트 클릭 시 하단에 주소 및 교통편(오시는 길) 상세 즉시 안내',
    files: 'LocationMapSection.tsx\nKakaoMap.tsx',
    phase: '1단계 (PC)',
    notes: '중앙 선양(심양)연구소 영문/중문 주소, 좌표 및 교통 안내 데이터 수급 필요'
  },
  {
    no: '07',
    menu: 'COMPANY\n(IR 투자정보)',
    summary: '재무정보 메뉴 및 화면 비노출 처리',
    details: '• 상단 GNB 내비게이션, 모바일 메뉴, 푸터, 서브탭에서 재무정보(/about/ir/financial) 항목 완전 숨김 처리\n• 공시정보(DART)와 IR News는 유지',
    files: 'navigation.ts\nDetailedFinancialTables.tsx\nFinancialChart.tsx',
    phase: '1단계 (PC)',
    notes: '재무정보 직링크 접속 시 공시정보 페이지로 자동 리다이렉트 처리'
  },
  {
    no: '08',
    menu: 'INNOVATION\n(연구소 소개)',
    summary: '연구소 소개 간소화 및 핵심 기술 재편',
    details: '• 장황한 연구소 설명 간소화\n• 제제연구소: 멀티스타(Multi-Star) 기술 및 실제 적용 사례 중심\n• 합성연구소: 프론트 하이라이트(핵심 합성 기술/특허) 중심 재배치',
    files: 'RdIntroContent.tsx\nrdIntro.ts\nrd/[[...slug]]/page.tsx',
    phase: '1단계 (PC)',
    notes: '★ [상무님 미팅 필수] 멀티스타 기술 소개 및 합성연구소 하이라이트 자료 수급'
  },
  {
    no: '09',
    menu: 'INNOVATION\n(파이프라인)',
    summary: '파이프라인 모서리 라운딩(Round) 처리',
    details: '• R&D 파이프라인 개발 단계 게이지 바 및 프로젝트 카드 모서리를 부드러운 곡선(rounded-xl / rounded-full) 스타일로 세련되게 변경',
    files: 'PipelineChart.tsx',
    phase: '1단계 (PC)',
    notes: '단계별 반응형 게이지의 시각적 완성도 향상'
  },
  {
    no: '10',
    menu: '대메뉴 (GNB)\n(사이트 전반)',
    summary: "대메뉴 'BUSINESS' ➔ 'Product' 명칭 변경",
    details: "• 상단 글로벌 헤더, 모바일 전체메뉴, 푸터, 관리자 메뉴의 대메뉴 명칭을 'BUSINESS'에서 'Product'로 변경",
    files: 'navigation.ts\nHeader.tsx\nFooter.tsx',
    phase: '1단계 (PC)',
    notes: '기존 URL(/business/...) 체계 유지 여부 확인'
  },
  {
    no: '11',
    menu: 'BUSINESS/Product\n(API 원료의약품)',
    summary: 'DMF 등록 현황 및 판매 리스트 신설',
    details: '• 단순 기술 소개를 넘어 B2B 사업 실효성을 갖추도록 개편\n• 원료의약품(API) 및 중간체 품목 리스트 제공\n• 국내외 DMF(원료의약품등록제도) 현황 정보 수록',
    files: 'ApiRawContent.tsx\nbusinessApi.ts',
    phase: '1단계 (PC)',
    notes: '중간체/API 판매 제품 리스트 엑셀 및 DMF 등록 현황 데이터 수급 필요'
  },
  {
    no: '12',
    menu: 'CDMO\n(사업 영역)',
    summary: 'CDMO 프로세스 순서 조정 및 고객 중심 심화 표현',
    details: '• CDMO PROCESS 순서 변경: [기술이전]과 [임상시험] 순서 재배치\n• 고객의뢰서 접수 ➔ 타당성 검토 ➔ 개발 착수 단계를 고객 중심 플로우차트와 심화 설명으로 전문성 강화',
    files: 'CdmoContent.tsx\nCDMOTabSection.tsx\nbusinessCdmo.ts',
    phase: '1단계 (PC)',
    notes: '고객의뢰서 양식 다운로드 버튼 및 온라인 문의 바로가기 연동 검토'
  },
  {
    no: '13',
    menu: 'CONNECT\n(채용정보)',
    summary: '채용절차 & 채용공고 단일 화면 통합',
    details: "• 별도 분리된 '채용절차'와 '채용공고'를 하나의 화면으로 통합\n• 채용절차는 긴 스크롤 대신 상단에 간결한 Step 인디케이터(아이콘/도식)로 축약 배치하고 하단에 채용공고 리스트 연계",
    files: 'CareerProcessAlternating.tsx\nJobList.tsx\nnavigation.ts',
    phase: '1단계 (PC)',
    notes: '지원자 관점에서 한 화면에서 전형 절차와 공고를 즉시 파악하도록 개선'
  },
  {
    no: '14',
    menu: 'CONNECT\n(고객센터)',
    summary: '영문(EN) 사이트 내 1:1 고객 문의 게시판 활성화',
    details: '• 현재 영문 사이트에서 숨김 처리된 1:1 고객 문의(제품/비즈니스 제휴) 메뉴를 정식 오픈\n• 영문 문의 접수 폼 및 이메일 발송 템플릿 연동',
    files: 'navigation.ts\nen/contact/inquiry/page.tsx\nContactForm.tsx',
    phase: '3단계 (영문)',
    notes: '영문 문의 인입 시 사내 알림 수신자(해외영업/글로벌팀) 지정 필요'
  },
  {
    no: '15',
    menu: '사이트 전반\n(운영 체계)',
    summary: '3단계 순차 고도화 추진 체계 확립',
    details: '• 1단계: PC 웹 화면 UI/UX 개편 및 구조 개선 완결 (최우선 과제)\n• 2단계: 모바일 반응형 UI/UX 및 스크롤 최적화\n• 3단계: 영문(EN) 버전 동기화 및 글로벌 번역 검수',
    files: '프로젝트 전체 소스코드',
    phase: '전 단계',
    notes: '단계별 검수 및 컨펌 후 차기 단계 순차 진행'
  }
];

function createCell(content, widthPercent, isHeader = false, isAlt = false, align = AlignmentType.LEFT) {
  const paragraphs = content.split('\n').map((line, idx) => {
    return new Paragraph({
      alignment: align,
      spacing: { before: idx === 0 ? 40 : 20, after: 40 },
      children: [
        new TextRun({
          text: line,
          bold: isHeader || line.startsWith('★') || line.startsWith('•') || line.startsWith('1.') || line.startsWith('2.'),
          color: isHeader ? 'FFFFFF' : (line.startsWith('★') ? 'DC2626' : (isAlt ? '0F172A' : '1E293B')),
          size: isHeader ? 19 : 17, // 9.5pt / 8.5pt
          font: '맑은 고딕'
        })
      ]
    });
  });

  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    borders: isHeader ? headerBorders : cellBorders,
    shading: {
      fill: isHeader ? COLOR_HEADER_BG : (isAlt ? COLOR_ROW_ALT : COLOR_ROW_WHITE)
    },
    margins: { top: 120, bottom: 120, left: 140, right: 140 },
    children: paragraphs
  });
}

const tableRows = [
  // Header Row
  new TableRow({
    tableHeader: true,
    children: [
      createCell('No', 4, true, false, AlignmentType.CENTER),
      createCell('구분 / 메뉴 위치', 12, true, false, AlignmentType.CENTER),
      createCell('요청사항 요약', 17, true, false, AlignmentType.CENTER),
      createCell('세부 변경 및 구현 방향', 35, true, false, AlignmentType.CENTER),
      createCell('관련 컴포넌트 / 파일', 13, true, false, AlignmentType.CENTER),
      createCell('진행 단계', 8, true, false, AlignmentType.CENTER),
      createCell('비고 및 사전 확인 사항', 11, true, false, AlignmentType.CENTER),
    ]
  }),
  // Data Rows
  ...requirementsData.map((item, index) => {
    const isAlt = index % 2 === 1;
    return new TableRow({
      children: [
        createCell(item.no, 4, false, isAlt, AlignmentType.CENTER),
        createCell(item.menu, 12, false, isAlt),
        createCell(item.summary, 17, false, isAlt),
        createCell(item.details, 35, false, isAlt),
        createCell(item.files, 13, false, isAlt),
        createCell(item.phase, 8, false, isAlt, AlignmentType.CENTER),
        createCell(item.notes, 11, false, isAlt),
      ]
    });
  })
];

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          size: {
            orientation: PageOrientation.LANDSCAPE,
            width: 16838, // A4 Landscape
            height: 11906,
          },
          margin: {
            top: 1000,
            bottom: 1000,
            left: 1000,
            right: 1000,
          },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: '다산제약 공식 웹 플랫폼 | UI/UX 개편 및 콘텐츠 수정 요청사항 명세서',
                  size: 16,
                  color: '94A3B8',
                  font: '맑은 고딕'
                })
              ]
            })
          ]
        })
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: 'Dasan Pharmaceutical Co., Ltd. Confidential  |  페이지 ',
                  size: 16,
                  color: '94A3B8',
                  font: '맑은 고딕'
                }),
                new TextRun({
                  children: [PageNumber.CURRENT],
                  size: 16,
                  color: '94A3B8',
                  font: '맑은 고딕'
                }),
                new TextRun({
                  text: ' / ',
                  size: 16,
                  color: '94A3B8',
                  font: '맑은 고딕'
                }),
                new TextRun({
                  children: [PageNumber.TOTAL_PAGES],
                  size: 16,
                  color: '94A3B8',
                  font: '맑은 고딕'
                })
              ]
            })
          ]
        })
      },
      children: [
        // Title Block
        new Paragraph({
          spacing: { before: 0, after: 80 },
          children: [
            new TextRun({
              text: '다산제약 웹사이트 수정 요청사항 명세서',
              bold: true,
              size: 40, // 20pt
              color: COLOR_DARK,
              font: '맑은 고딕'
            }),
          ]
        }),

        new Paragraph({
          spacing: { before: 0, after: 180 },
          children: [
            new TextRun({
              text: '공식 웹 플랫폼 UI/UX 고도화 및 콘텐츠 재편을 위한 세부 기능/디자인 요구사항 명세서 (15개 항목)',
              size: 20,
              color: COLOR_MUTED,
              font: '맑은 고딕'
            })
          ]
        }),

        // Summary Information Box Table
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  borders: cellBorders,
                  shading: { fill: COLOR_CALLOUT_BG },
                  margins: { top: 100, bottom: 100, left: 140, right: 140 },
                  children: [
                    new Paragraph({
                      spacing: { before: 0, after: 40 },
                      children: [
                        new TextRun({ text: '• 대상 프로젝트: ', bold: true, size: 18, color: '166534', font: '맑은 고딕' }),
                        new TextRun({ text: '다산제약 공식 웹 플랫폼 (Next.js 16 App Router 기반)   |   ', size: 18, color: '14532D', font: '맑은 고딕' }),
                        new TextRun({ text: '• 작성 일자: ', bold: true, size: 18, color: '166534', font: '맑은 고딕' }),
                        new TextRun({ text: '2026년 10월   |   ', size: 18, color: '14532D', font: '맑은 고딕' }),
                        new TextRun({ text: '• 추진 체계: ', bold: true, size: 18, color: '166534', font: '맑은 고딕' }),
                        new TextRun({ text: '[1단계: PC 웹 최적화] ➔ [2단계: 모바일 반응형 최적화] ➔ [3단계: 영문(EN) 버전 동기화]', bold: true, size: 18, color: COLOR_PRIMARY, font: '맑은 고딕' }),
                      ]
                    }),
                    new Paragraph({
                      spacing: { before: 0, after: 0 },
                      children: [
                        new TextRun({
                          text: '※ 본 명세서는 총 15개 요구사항에 대한 구현 방향, 영향 파일, 작업 단계 및 사전 협의 사항을 정의합니다.',
                          size: 16,
                          color: '15803D',
                          font: '맑은 고딕'
                        })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        }),

        new Paragraph({ spacing: { before: 180, after: 80 } }),

        // Main Requirements Table
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: tableRows
        }),

        new Paragraph({ spacing: { before: 200, after: 60 } }),

        // Bottom Pre-requisite Checklist Box
        new Paragraph({
          spacing: { before: 100, after: 60 },
          children: [
            new TextRun({
              text: '■ 작업 착수 전 필수 확인 및 데이터 수급 과제 (Action Items)',
              bold: true,
              size: 22,
              color: COLOR_DARK,
              font: '맑은 고딕'
            })
          ]
        }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  borders: cellBorders,
                  shading: { fill: 'F1F5F9' },
                  margins: { top: 100, bottom: 100, left: 140, right: 140 },
                  children: [
                    new Paragraph({
                      spacing: { before: 40, after: 40 },
                      children: [
                        new TextRun({ text: '1. 상무님 미팅 건 (항목 08): ', bold: true, size: 17, color: '0F172A', font: '맑은 고딕' }),
                        new TextRun({ text: "제제연구소 '멀티스타(Multi-Star)' 플랫폼 기술 설명 및 실제 적용 사례, 합성연구소 프론트 하이라이트 기술 문구 확정 후 반영", size: 17, color: '334155', font: '맑은 고딕' })
                      ]
                    }),
                    new Paragraph({
                      spacing: { before: 20, after: 40 },
                      children: [
                        new TextRun({ text: '2. 중앙 선양연구소 지도 데이터 (항목 06): ', bold: true, size: 17, color: '0F172A', font: '맑은 고딕' }),
                        new TextRun({ text: '중국 심양(선양) 소재 연구소의 정확한 도로명 주소, 영문/중문 주소, 위도/경도 좌표 및 현지 교통 안내 문구 수급', size: 17, color: '334155', font: '맑은 고딕' })
                      ]
                    }),
                    new Paragraph({
                      spacing: { before: 20, after: 40 },
                      children: [
                        new TextRun({ text: '3. API 및 중간체 상용 리스트 (항목 11): ', bold: true, size: 17, color: '0F172A', font: '맑은 고딕' }),
                        new TextRun({ text: 'B2B 영업용 원료의약품/중간체 품목명, 규격, 카스번호(CAS No.), 국내외 DMF(원료의약품등록) 등록 현황 엑셀 데이터 수급', size: 17, color: '334155', font: '맑은 고딕' })
                      ]
                    }),
                    new Paragraph({
                      spacing: { before: 20, after: 40 },
                      children: [
                        new TextRun({ text: "4. 대메뉴 명칭 변경 관련 (항목 10): ", bold: true, size: 17, color: '0F172A', font: '맑은 고딕' }),
                        new TextRun({ text: "GNB 명칭을 'BUSINESS'에서 'Product'로 변경 시, 하위 메뉴(완제의약품, API, CDMO)의 메뉴 트리 위계 확정", size: 17, color: '334155', font: '맑은 고딕' })
                      ]
                    }),
                  ]
                })
              ]
            })
          ]
        })
      ]
    }
  ]
});

const outputPath = path.join('c:', 'Share', 'DASAN', '다산제약_웹사이트_수정요청사항_명세서.docx');

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log('Successfully generated docx at:', outputPath);
  const stat = fs.statSync(outputPath);
  console.log('File size:', (stat.size / 1024).toFixed(1), 'KB');
}).catch(err => {
  console.error('Error generating docx:', err);
  process.exit(1);
});
