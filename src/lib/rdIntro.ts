export interface RdIntroFeature {
  category: string;
  title: string;
  desc: string;
}

export interface RdIntroCard {
  title: string;
  desc: string;
  image?: string;
}

export interface RdIntroDivisionField {
  title: string;
  desc: string;
}

export interface RdIntroDivision {
  id: string;
  name: string;
  subTitle: string;
  leadDesc: string;
  detailDesc: string;
  subFields: RdIntroDivisionField[];
}

export interface RdIntroData {
  // 1. Hero Vision
  heroTitle: string;
  heroSubtitle: string;

  // 2. Central Research Institute Overview
  centerTitle: string;
  centerDesc1: string;
  centerDesc2: string;
  features: RdIntroFeature[];

  // 3. 첨단 과학의 선도 (3 Cards)
  scienceSectionTitle: string;
  scienceSectionDesc: string;
  scienceCards: RdIntroCard[];

  // 4. 인재 육성 및 연구 인프라 (3 Cards)
  infraSectionTitle: string;
  infraSectionDesc: string;
  infraCards: RdIntroCard[];

  // 5. 함께 만드는 혁신 (제제연구소 & 합성연구소)
  synergySectionTitle: string;
  synergySectionDesc: string;
  divisions: RdIntroDivision[];
}

export const DEFAULT_RD_INTRO_DATA: RdIntroData = {
  heroTitle: '다산제약은 글로벌 경쟁력을 갖춘 연구소로 거듭납니다.',
  heroSubtitle: '연구개발(R&D)부터 판매까지의 전주기 인프라를 바탕으로 차별화된 제제 기술과 고부가가치 사업 성장성을 확보하고 있습니다.',

  centerTitle: '중앙 연구소',
  centerDesc1: `다산제약의 중앙연구소는 50여명의 석·박사급 연구인력을 중심으로 합성연구소와 제제연구소의 유기적인 협력체계를 구축하고 있습니다.
유기합성 기술을 기반으로 한 원료의약품(API) 개발부터 자사의 Multistra® 기술을 활용한 특화된 약물전달시스템(DDS) 적용 완제품 개발까지의 의약품 개발 전 과정을 아우르는 종합의약품 연구개발 역량을 확보하고 있습니다.`,
  centerDesc2: `또한 연구소 내에 30L 규모 Pilot-scale의 다목적 합성 반응 시스템과 유동층 과립제조 및 코팅이 가능한 Multilab® GPCG 시스템과 다층정 타정기 등의 제조설비와 LC-MS/MS, Differential Scanning Calorimetry, Laser Diffraction Particle Size Analyzer, Automated Flow-Through Cell Dissolution System 등의 첨단 분석 시스템을 활용하여 고도화된 의약품 연구를 수행하고 있습니다.`,

  features: [
    {
      category: 'Research Power',
      title: '50여명 이상의 석·박사 연구진',
      desc: '신약발굴부터 임상실험까지\n의약품 전주기 개발'
    },
    {
      category: 'DDS Platform',
      title: 'Multistra® 플랫폼',
      desc: '원료부터 DDS 완제품'
    },
    {
      category: 'Pilot Facility',
      title: '30L Pilot & GPCG',
      desc: '다목적 합성 & 코팅설비'
    },
    {
      category: 'Analytics',
      title: 'LC-MS/MS & DSC',
      desc: '정밀 용출·입도 분석'
    }
  ],

  scienceSectionTitle: '첨단 과학의 선도',
  scienceSectionDesc: '다산제약만의 독자적인 제제 기술과 첨단 장비를 통해 고부가가치 개량신약 및 원료의약품을 개발합니다.',
  scienceCards: [
    {
      title: '약물의 용해도와 방출 속도를 조절하는 제제 기술 개발',
      desc: 'Multistra® 기반 서방형·복합제 제제 설계 및 방출제어 기술',
      image: '/core_business_api.jpg'
    },
    {
      title: '유기합성 기반 고순도 원료의약품(API) 및 신규염 개발',
      desc: '특허 회피 및 불순물 억제를 고려한 차별화된 합성공정 설계',
      image: '/core_business_cmo.jpg'
    },
    {
      title: '첨단 분석 시스템을 통한 과학적 품질 검증 및 최적화',
      desc: 'LC-MS/MS, DSC, 입도 및 자동 용출시험을 통한 엄격한 평가',
      image: '/core_business_finished.png'
    }
  ],

  infraSectionTitle: '인재 육성 및 연구 인프라',
  infraSectionDesc: '석·박사급 전문 인재 육성과 첨단 파일럿 시설 투자를 통해 미래 바이오 제약 산업을 이끌어갈 역량을 강화합니다.',
  infraCards: [
    {
      title: '국내외 석학 초빙 및 학술 연구를 통한 역량 강화',
      desc: '50여 명 연구진의 지속적인 전문 교육 및 세미나 역량 지원',
      image: '/rd_talent_seminar.jpg'
    },
    {
      title: '글로벌 연수 및 오픈 이노베이션을 통한 경쟁력 확보',
      desc: '글로벌 규격 R&D 및 국내외 제약 바이오 파트너십 구축',
      image: '/rd_talent_global.jpg'
    },
    {
      title: '첨단 파일럿 연구 시설 및 합성 생산 인프라',
      desc: 'Pilot 다목적 반응기 및 첨단 제제 생산 설비 완비',
      image: '/rd_infra_pilot.jpg'
    }
  ],

  synergySectionTitle: '함께 만드는 혁신',
  synergySectionDesc: '제제연구소와 합성연구소의 유기적인 협력을 바탕으로 후보물질 도출부터 고부가가치 의약품 상용화까지 독보적인 연구 시너지를 창출합니다.',
  divisions: [
    {
      id: 'A',
      name: '제제연구',
      subTitle: 'FORMULATION DIVISION',
      leadDesc: '제제연구소는 의약품의 물리·화학적 특성과 약물의 방출 및 흡수 특성을 기반으로 다산제약만의 차별화된 제형 설계와 여러가지 방식의 약물전달시스템(DDS) 개발을 수행하고 있습니다.',
      detailDesc: '당사의 보유 기술을 융합한 Multistra®는 다양한 약물의 특성과 목표하는 약효 및 방출조절 특성에 적합한 제제기술의 집약체로서 새로운 제형의 제품이나 신규 복합제, 용량 개선 개량신약, 특수 방출제어 제제 등의 다양한 고부가가치 의약품 개발에 활용되고 있으며 이를 통해 다산제약만의 제품 차별화와 경쟁력 향상에 기여하고 있습니다.',
      subFields: [
        { title: '01. Multistra® 기반 DDS 기술', desc: '약물의 물리·화학적 특성에 맞춰 방출속도를 정밀 제어하고 최적의 제형을 설계하여 차별화된 개량신약을 개발합니다.' },
        { title: '02. 다양한 제형 및 복합제 개발', desc: '서로 다른 유효성분을 하나의 제형으로 구현하는 다층정 설계 및 서방화 기술로 복용 편의성을 획기적으로 개선합니다.' },
        { title: '03. 제제설계에서 상업생산까지', desc: 'Glatt사 Multilab® GPCG 유동층 코팅 및 HATA 다층정 타정기를 활용하여 Lab Scale부터 상업생산까지 재현성을 확보합니다.' },
        { title: '04. 과학적 분석을 통한 최적화', desc: 'HPLC, GC, DSC 열분석, 입도분석 및 Automated Dissolution 시스템을 통해 고도화된 품질특성을 검증합니다.' }
      ]
    },
    {
      id: 'B',
      name: '합성연구',
      subTitle: 'SYNTHESIS DIVISION',
      leadDesc: '합성연구소는 유기합성 기술을 기반으로 원료의약품 및 의약품 개발에 필요한 핵심 합성기술과 공정기술을 연구합니다.',
      detailDesc: '신약의 후보물질, 지식재산권 확보와 특허 전략을 고려한 차별화된 원료의약품(염변경, 결정형변경, Pro-drug)을 설계하고 고도화된 공정기술을 적용한 불순물 발생 억제 제품 등을 개발하고 상용화하는 최적의 합성공정 개발 체계를 구축하고 있습니다.',
      subFields: [
        { title: '01. 프로세스 디자인 (Process Design)', desc: '신규 후보물질의 합성경로 설계부터 공정 최적화, Scale-up 및 기술이전에 이르기까지 재현성 높은 공정을 확립합니다.' },
        { title: '02. 차별화된 원료의약품 개발', desc: '신규염(Salt), 결정형(Polymorph) 변경 및 Pro-drug 설계를 통해 유해 불순물을 억제하고 특허 전략을 확보합니다.' },
        { title: '03. Lab에서 Commercial Scale까지', desc: '30L~50L Pilot-scale 다목적 반응 시스템을 활용하여 공정변수를 최적화하고 상업생산 안정성을 확보합니다.' },
        { title: '04. 고순도 원료의약품 공정개발', desc: '합성단계별 불순물 생성을 체계적으로 억제하여 최종 제품의 안전성과 유효성을 보장하는 고순도 API를 제조합니다.' }
      ]
    }
  ]
};

export function parseRdIntroData(raw: string | null | undefined): RdIntroData {
  if (!raw || !raw.trim()) {
    return JSON.parse(JSON.stringify(DEFAULT_RD_INTRO_DATA));
  }

  const trimmed = raw.trim();

  // 1. JSON parsing
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    try {
      const parsed = JSON.parse(trimmed);
      return {
        heroTitle: parsed.heroTitle || DEFAULT_RD_INTRO_DATA.heroTitle,
        heroSubtitle: parsed.heroSubtitle || DEFAULT_RD_INTRO_DATA.heroSubtitle,
        centerTitle: parsed.centerTitle || DEFAULT_RD_INTRO_DATA.centerTitle,
        centerDesc1: parsed.centerDesc1 || DEFAULT_RD_INTRO_DATA.centerDesc1,
        centerDesc2: parsed.centerDesc2 || DEFAULT_RD_INTRO_DATA.centerDesc2,
        features: Array.isArray(parsed.features) && parsed.features.length > 0
          ? parsed.features
          : DEFAULT_RD_INTRO_DATA.features,
        scienceSectionTitle: parsed.scienceSectionTitle || DEFAULT_RD_INTRO_DATA.scienceSectionTitle,
        scienceSectionDesc: parsed.scienceSectionDesc || DEFAULT_RD_INTRO_DATA.scienceSectionDesc,
        scienceCards: Array.isArray(parsed.scienceCards) && parsed.scienceCards.length > 0
          ? parsed.scienceCards
          : DEFAULT_RD_INTRO_DATA.scienceCards,
        infraSectionTitle: parsed.infraSectionTitle || DEFAULT_RD_INTRO_DATA.infraSectionTitle,
        infraSectionDesc: parsed.infraSectionDesc || DEFAULT_RD_INTRO_DATA.infraSectionDesc,
        infraCards: Array.isArray(parsed.infraCards) && parsed.infraCards.length > 0
          ? parsed.infraCards
          : DEFAULT_RD_INTRO_DATA.infraCards,
        synergySectionTitle: parsed.synergySectionTitle || DEFAULT_RD_INTRO_DATA.synergySectionTitle,
        synergySectionDesc: parsed.synergySectionDesc || DEFAULT_RD_INTRO_DATA.synergySectionDesc,
        divisions: Array.isArray(parsed.divisions) && parsed.divisions.length > 0
          ? parsed.divisions
          : DEFAULT_RD_INTRO_DATA.divisions
      };
    } catch (e) {
      // Fall through to plain text parsing
    }
  }

  // 2. Plain text parsing (Legacy DB format)
  const result: RdIntroData = JSON.parse(JSON.stringify(DEFAULT_RD_INTRO_DATA));
  
  // Check if text has multiple paragraphs separated by \n\n
  const paragraphs = trimmed.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  
  if (paragraphs.length >= 2) {
    // First paragraph might contain a title on line 1
    const p0Lines = paragraphs[0].split('\n').map(l => l.trim()).filter(Boolean);
    if (p0Lines.length > 1 && (p0Lines[0].includes('중앙연구소') || p0Lines[0].includes('연구소'))) {
      result.centerTitle = p0Lines[0].replace(/^[#\-\*\s]+/, '').trim();
      result.centerDesc1 = p0Lines.slice(1).join('\n');
    } else {
      result.centerDesc1 = paragraphs[0];
    }

    result.centerDesc2 = paragraphs[1];
  } else if (paragraphs.length === 1) {
    const lines = paragraphs[0].split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length > 1 && (lines[0].includes('중앙연구소') || lines[0].includes('연구소'))) {
      result.centerTitle = lines[0].replace(/^[#\-\*\s]+/, '').trim();
      result.centerDesc1 = lines.slice(1).join('\n');
    } else {
      result.centerDesc1 = paragraphs[0];
    }
  }

  return result;
}

export function serializeRdIntroData(data: RdIntroData): string {
  return JSON.stringify(data, null, 2);
}
