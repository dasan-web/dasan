export interface EsgData {
  imageUrl?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  title: string;
  statement: string;
  bridgeText?: string;
  items: string[];
  date: string;
  signerCompany: string;
  signerName: string;
}

export interface EsgEthicsPillarBullet {
  bold: string;
  text: string;
}

export interface EsgEthicsPillar {
  id: 'E' | 'S' | 'G';
  title: string;
  imageUrl: string;
  quote: string;
  bullets: EsgEthicsPillarBullet[];
}

export interface EsgEthicsCert {
  code: string;
  subTitle: string;
  desc: string;
}

export interface EsgEthicsOverviewData {
  imageUrl: string;
  heroTitle: string;
  heroDesc: string;
  pillarSectionTitle: string;
  pillarSectionDesc: string;
  pillars: EsgEthicsPillar[];
  certSectionTitle: string;
  certSectionDesc: string;
  certs: EsgEthicsCert[];
}

export const DEFAULT_ESG_ETHICS_OVERVIEW_DATA: EsgEthicsOverviewData = {
  imageUrl: '/images/ESG.jpg',
  heroTitle: '바른 경영으로 내일을 치유하는 다산제약의 약속',
  heroDesc: "다산제약은 창업이념인 '애민(愛民)' 정신을 바탕으로, 환경(E)을 생각하는 친환경 공정, 사회(S)와 상생하는 안전한 일터, 투명하고 올바른 지배구조(G)를 구축하여 지속 가능한 헬스케어 미래를 열어갑니다.",
  pillarSectionTitle: 'ESG 영역별 실천 과제',
  pillarSectionDesc: '환경(E), 사회(S), 지배구조(G) 전 과정에 걸쳐 투명하고 책임 있는 지속가능경영을 이행하며, 첨단 현장 중심의 실천을 이어가고 있습니다.',
  pillars: [
    {
      id: 'E',
      title: '친환경 경영 (E)',
      imageUrl: '/esg_environment_leaf.png',
      quote: '인류의 건강을 지키는 시작은 건강한 지구를 만드는 것에서 출발합니다. 다산제약은 환경 영향을 최소화하는 친환경 생산 생태계를 조성하고 있습니다.',
      bullets: [
        {
          bold: 'ISO 14001(환경경영시스템) 인증 획득',
          text: '글로벌 기준에 부합하는 환경경영 체계를 체계적으로 운영하고 있습니다.'
        },
        {
          bold: '스마트생태공장 구축',
          text: '환경부·한국환경공단 지원 사업에 선정되어 오염물질 배출 저감, 에너지 효율 제고 등 친환경 제조 인프라 고도화를 실천하고 있습니다.'
        }
      ]
    },
    {
      id: 'S',
      title: '사회적 책임 및 안전 경영 (S)',
      imageUrl: '/esg_social_hands.png',
      quote: '임직원의 안전이 곧 품질의 근간이며, 임직원의 성장이 곧 기업의 경쟁력입니다. 다산제약은 모두가 안전하고 행복한 상생의 가치를 실현합니다.',
      bullets: [
        {
          bold: 'ISO 45001(안전보건경영시스템) 인증 획득',
          text: "현장의 위험 요인을 선제적으로 관리하고 예방하여 '중대재해 Zero'의 안전한 작업 환경을 유지합니다."
        },
        {
          bold: '일하기 좋은 일터 지향',
          text: '청년친화 강소기업 및 좋은 일자리 기업 선정을 바탕으로, 안전하고 일과 삶이 조화를 이루는 건강한 조직 문화를 만들어갑니다.'
        }
      ]
    },
    {
      id: 'G',
      title: '투명하고 투철한 정도 경영 (G)',
      imageUrl: '/esg_governance_lab.png',
      quote: "다산(茶山) 정약용 선생의 '실사구시' 정신을 계승하여 공리공론이 아닌, 투명하고 청렴한 경영 프로세스로 시장의 신뢰를 증명합니다.",
      bullets: [
        {
          bold: 'ISO 37001(부패방지경영시스템) 인증 획득',
          text: '전사적인 부패방지 방침과 윤리경영 체계를 확립하여 리스크를 철저히 통제하고 투명한 거래 문화를 주도합니다.'
        },
        {
          bold: 'K-ESG 지표 공식 만족',
          text: '한국형 ESG 가이드라인(K-ESG) 기준을 충족하는 지배구조 체계와 공시 역량을 확보하여, 상장 기업에 걸맞은 주주 가치 극대화와 투명 경영을 이어갑니다.'
        }
      ]
    }
  ],
  certSectionTitle: '공인된 지속가능경영 표준 인증',
  certSectionDesc: '국제 표준(ISO) 및 국가 가이드라인을 엄격히 준수하여 획득한 공신력 있는 인증 체계입니다.',
  certs: [
    {
      code: 'ISO 14001',
      subTitle: '환경경영시스템 인증',
      desc: '친환경 제조 생태계 구축 및 체계적인 오염물질·에너지 저감 관리 기준 충족'
    },
    {
      code: 'ISO 45001',
      subTitle: '안전보건경영시스템 인증',
      desc: '사업장 위험 요인 선제적 예방 및 임직원 생명·안전을 최우선하는 체계 확보'
    },
    {
      code: 'ISO 37001',
      subTitle: '부패방지경영시스템 인증',
      desc: '투명하고 청렴한 거래 규정 준수 및 비윤리적 리스크를 원천 통제하는 시스템'
    },
    {
      code: 'K-ESG',
      subTitle: '한국형 ESG 가이드라인',
      desc: '정부 공식 K-ESG 가이드라인 충족 및 주주 가치 극대화를 위한 공시 체계 이행'
    }
  ]
};

export function parseEsgEthicsOverviewData(raw: string | null | undefined): EsgEthicsOverviewData {
  if (!raw || !raw.trim()) {
    return JSON.parse(JSON.stringify(DEFAULT_ESG_ETHICS_OVERVIEW_DATA));
  }
  const trimmed = raw.trim();
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    try {
      const parsed = JSON.parse(trimmed);
      return {
        imageUrl: typeof parsed.imageUrl === 'string' && parsed.imageUrl.trim() ? parsed.imageUrl : DEFAULT_ESG_ETHICS_OVERVIEW_DATA.imageUrl,
        heroTitle: typeof parsed.heroTitle === 'string' ? parsed.heroTitle : DEFAULT_ESG_ETHICS_OVERVIEW_DATA.heroTitle,
        heroDesc: typeof parsed.heroDesc === 'string' ? parsed.heroDesc : DEFAULT_ESG_ETHICS_OVERVIEW_DATA.heroDesc,
        pillarSectionTitle: typeof parsed.pillarSectionTitle === 'string' ? parsed.pillarSectionTitle : DEFAULT_ESG_ETHICS_OVERVIEW_DATA.pillarSectionTitle,
        pillarSectionDesc: typeof parsed.pillarSectionDesc === 'string' ? parsed.pillarSectionDesc : DEFAULT_ESG_ETHICS_OVERVIEW_DATA.pillarSectionDesc,
        pillars: Array.isArray(parsed.pillars) && parsed.pillars.length > 0
          ? parsed.pillars.map((p: any, idx: number) => {
              const def = DEFAULT_ESG_ETHICS_OVERVIEW_DATA.pillars[idx] || DEFAULT_ESG_ETHICS_OVERVIEW_DATA.pillars[0];
              return {
                id: p?.id || def.id,
                title: typeof p?.title === 'string' ? p.title : def.title,
                imageUrl: typeof p?.imageUrl === 'string' && p.imageUrl.trim() ? p.imageUrl : def.imageUrl,
                quote: typeof p?.quote === 'string' ? p.quote : def.quote,
                bullets: Array.isArray(p?.bullets) && p.bullets.length > 0
                  ? p.bullets.map((b: any, bIdx: number) => ({
                      bold: typeof b?.bold === 'string' ? b.bold : (def.bullets[bIdx]?.bold || ''),
                      text: typeof b?.text === 'string' ? b.text : (def.bullets[bIdx]?.text || '')
                    }))
                  : def.bullets
              };
            })
          : DEFAULT_ESG_ETHICS_OVERVIEW_DATA.pillars,
        certSectionTitle: typeof parsed.certSectionTitle === 'string' ? parsed.certSectionTitle : DEFAULT_ESG_ETHICS_OVERVIEW_DATA.certSectionTitle,
        certSectionDesc: typeof parsed.certSectionDesc === 'string' ? parsed.certSectionDesc : DEFAULT_ESG_ETHICS_OVERVIEW_DATA.certSectionDesc,
        certs: Array.isArray(parsed.certs) && parsed.certs.length > 0
          ? parsed.certs.map((c: any, idx: number) => {
              const def = DEFAULT_ESG_ETHICS_OVERVIEW_DATA.certs[idx] || DEFAULT_ESG_ETHICS_OVERVIEW_DATA.certs[0];
              return {
                code: typeof c?.code === 'string' ? c.code : def.code,
                subTitle: typeof c?.subTitle === 'string' ? c.subTitle : def.subTitle,
                desc: typeof c?.desc === 'string' ? c.desc : def.desc
              };
            })
          : DEFAULT_ESG_ETHICS_OVERVIEW_DATA.certs
      };
    } catch {
      // fall through
    }
  }
  const parts = trimmed.split('|');
  const hasImg = parts.length >= 3 && (parts[1].startsWith('/') || parts[1].startsWith('http'));
  return {
    ...JSON.parse(JSON.stringify(DEFAULT_ESG_ETHICS_OVERVIEW_DATA)),
    imageUrl: hasImg ? parts[1] : DEFAULT_ESG_ETHICS_OVERVIEW_DATA.imageUrl
  };
}

export const DEFAULT_ESG_DATA: Record<string, EsgData> = {
  'about/esg/ethics': {
    imageUrl: '/images/ESG.jpg',
    heroTitle: '바른 경영으로 내일을 치유하는 다산제약의 약속',
    heroSubtitle: "다산제약은 창업이념인 '애민(愛民)' 정신을 바탕으로, 환경(E)을 생각하는 친환경 공정, 사회(S)와 상생하는 안전한 일터, 투명하고 올바른 지배구조(G)를 구축하여 지속 가능한 헬스케어 미래를 열어갑니다.",
    title: '윤리경영 실천 선언문',
    statement: '다산제약은 윤리경영을 지속 가능한 성장의 핵심 가치로 삼고, 투명하고 공정한 경영활동을 통해 고객과 주주, 사회로부터 신뢰받는 기업이 되고자 합니다.',
    bridgeText: '이를 위해 모든 임직원은 다음의 윤리 원칙을 준수하고 적극 실천합니다.',
    items: [
      '투명하고 공정한 업무 수행을 통해 신뢰받는 기업문화를 구축한다.',
      '모든 이해관계자와의 거래에서 정직과 신의성실의 원칙을 철저히 준수한다.',
      '국내외 모든 법규와 규범을 준수하며, 반부패 및 공정경쟁을 실천한다.',
      '사회적 책임을 다하고 인류의 건강한 삶에 기여하는 기업 시민이 된다.'
    ],
    date: '2025년 01월 02일',
    signerCompany: '주식회사 다산제약',
    signerName: '류 형 선'
  },
  'about/esg/environment': {
    imageUrl: '/images/environment_banner.png',
    heroTitle: '자연과 인류의 지속 가능한 미래를 위한 환경경영',
    heroSubtitle: '다산제약은 모든 경영활동에서 환경보전을 기업의 핵심 가치로 삼고, 친환경적 공정과 철저한 환경오염 예방을 통해 깨끗하고 안전한 환경을 만들어갑니다.',
    title: '환경경영방침',
    statement: '다산제약은 모든 경영활동에서 환경보전을 기업의 핵심 가치로 삼고, 깨끗하고 안전한 환경을 조성하여 지속가능한 성장을 실현하고자 한다.',
    bridgeText: '이를 위해 다음과 같은 사항을 적극 실천한다.',
    items: [
      '경영활동 전 과정에서 환경에 미치는 영향을 최소화하고, 자원과 에너지를 효율적으로 사용한다.',
      '환경오염을 사전에 예방하고, 친환경적 공정과 기술을 적극 도입한다.',
      '환경 관련 법규와 규제, 그리고 회사가 동의한 기타 요구사항을 철저히 준수한다.',
      '환경목표와 세부 실행 계획을 수립,이행하여 환경 성과를 지속적으로 개선한다.',
      '환경 위험 요인을 사전에 파악, 제거하고, 환경 영향을 줄이기 위한 개선 활동을 적극 추진한다.',
      '전 임직원의 환경의식 제고를 위해 교육과 참여를 활성화하고, 친환경보전 문화를 정착시킨다.'
    ],
    date: '2025년 10월 20일',
    signerCompany: '주식회사 다산제약',
    signerName: '류 형 선'
  },
  'about/esg/anti-corruption': {
    imageUrl: '/images/anticorruption_banner.png',
    heroTitle: '정직과 신뢰로 투명한 미래를 여는 부패방지경영',
    heroSubtitle: '다산제약은 사업 추진 전 과정에서 공정하고 투명한 절차를 준수하며, 어떠한 부패 행위도 용납하지 않는 무관용 원칙을 바탕으로 신뢰받는 제약 바이오 기업으로 도약합니다.',
    title: '부패방지 방침',
    statement: '다산제약은 제제기술 연구와 우수한 의약품 생산을 통해 인류의 건강과 행복에 기여하고, 사업추진에 있어 투명한 절차와 신뢰를 바탕으로 업무를 처리하기 위하여 부패방지경영시스템을 도입하며, 모든 임직원은 부패방지 방침을 인식하고 다음 사항을 준수한다.',
    bridgeText: '',
    items: [
      '부패방지경영시스템 구축과 당사 윤리경영의 추진은 본 방침을 토대로 하며, 당사의 모든 업무는 본 방침에 적합하여야 한다.',
      '부정청탁 및 금품 등 수수를 포함한 모든 부패 행위를 금지한다.',
      '부패방지를 위한 모든 법규, 내부규정 및 관련 국제표준을 철저히 준수한다.',
      '부패가능성 및 부패 행위에 대하여 즉시 신고하며, 이에 대한 기밀 준수와 그로 인한 보복이나 인사상의 피해가 발생하지 않도록 한다.',
      '본 방침은 적절한 언어로 의사소통 되고 모든 이해관계자가 인식할 수 있도록 전파 및 공유한다.',
      '본 방침 달성을 위하여 부패방지 목표를 수립하고 지속적으로 개선한다.',
      '부패방지 책임자는 부패 및 뇌물수수 방지와 관련된 독립적인 책임과 권한을 부여받으며, 당사 부패방지 업무에 대한 신뢰를 제고한다.',
      '본 방침을 위반하거나 위반을 발견하고도 합리적인 조치를 취하지 않은 경우 당사 규정에 따라 징계조치를 취할 수 있다.'
    ],
    date: '2025년 03월 04일',
    signerCompany: '주식회사 다산제약',
    signerName: '류 형 선'
  },
  'about/esg/safety': {
    imageUrl: '/images/safety_banner.jpg',
    heroTitle: '생명 존중과 안전을 최우선으로 하는 일터',
    heroSubtitle: '다산제약은 함께 일하는 모든 사람의 생명과 안전을 경영의 최우선 가치로 삼고, 철저한 안전보건 관리체계 구축과 예방 활동을 통해 안심하고 일할 수 있는 건강한 일터를 만들어갑니다.',
    title: '안전보건경영 방침',
    statement: '다산제약은 함께 일하는 모든 사람의 안전과 건강을 최우선 가치로 여기고 최상의 안전보건경영시스템을 구축하고 실행에 옮기기 위해 아래와 같은 사항을 적극 실천한다.',
    bridgeText: '',
    items: [
      '회사의 모든 활동에 안전보건경영을 최우선으로 삼는다.',
      '집단 감염병 예방 및 건강증진활동을 실행하고 참여하며, 비상상황에 대응할 수 있는 보건대응체계를 구축한다.',
      '안전보건 방침을 달성하기 위한 안전보건 목표를 수립하고 적극 실천한다.',
      '안전보건 관계 법령을 비롯한 기타 요구사항을 준수하는 준법경영을 실천한다.',
      '유해,위험 요인을 제거하고 안전보건 리스크를 감소하기 위한 개선활동을 수행한다.',
      '안전보건경영시스템 지속적 개선을 위한 인적, 물적 자원을 적극 지원한다.',
      '노사가 함께하는 안전 문화를 정착하기 위해 근로자의 참여와 협의를 적극 장려한다.'
    ],
    date: '2024년 09월 30일',
    signerCompany: '주식회사 다산제약',
    signerName: '류 형 선'
  }
};

export function parseEsgData(content: string | null | undefined, pageKey: string): EsgData {
  const defaultData = DEFAULT_ESG_DATA[pageKey] || DEFAULT_ESG_DATA['about/esg/environment'];

  if (!content || !content.trim()) {
    return { ...defaultData };
  }

  const trimmed = content.trim();

  // 1. JSON parsing
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    try {
      const parsed = JSON.parse(trimmed);
      return {
        imageUrl: parsed.imageUrl || defaultData.imageUrl,
        heroTitle: parsed.heroTitle !== undefined ? parsed.heroTitle : defaultData.heroTitle,
        heroSubtitle: parsed.heroSubtitle !== undefined ? parsed.heroSubtitle : defaultData.heroSubtitle,
        title: parsed.title || defaultData.title,
        statement: parsed.statement || defaultData.statement,
        bridgeText: parsed.bridgeText !== undefined ? parsed.bridgeText : defaultData.bridgeText,
        items: Array.isArray(parsed.items) && parsed.items.length > 0 ? parsed.items : defaultData.items,
        date: parsed.date || defaultData.date,
        signerCompany: parsed.signerCompany || defaultData.signerCompany,
        signerName: parsed.signerName || defaultData.signerName
      };
    } catch {
      // Fallback
    }
  }

  // 2. Legacy Pipe / Line parsing
  if (trimmed.includes('|')) {
    const parts = trimmed.split('|');
    return {
      title: parts[0]?.trim() || defaultData.title,
      heroTitle: defaultData.heroTitle,
      heroSubtitle: defaultData.heroSubtitle,
      statement: parts[1]?.trim() || defaultData.statement,
      bridgeText: defaultData.bridgeText,
      items: parts[2] ? parts[2].split('\n').map(s => s.trim()).filter(Boolean) : defaultData.items,
      date: parts[3]?.trim() || defaultData.date,
      signerCompany: defaultData.signerCompany,
      signerName: parts[4]?.trim() || defaultData.signerName,
      imageUrl: parts[5]?.trim() || defaultData.imageUrl
    };
  }

  return {
    ...defaultData,
    statement: trimmed
  };
}

export const DEFAULT_CODE_OF_ETHICS_HTML = ``;

export interface CodeOfEthicsSection {
  title: string;
  bullets: string[];
}

export interface CodeOfEthicsData {
  imageUrl?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  introParas: string[];
  sections: CodeOfEthicsSection[];
  date: string;
  signerCompany: string;
  signerTitle: string;
  signerName: string;
}

export const DEFAULT_CODE_OF_ETHICS_DATA: CodeOfEthicsData = {
  imageUrl: '/images/ethics_banner.jpg',
  heroTitle: '글로벌 최고 수준의 윤리의식과 투명경영',
  heroSubtitle: '다산제약은 모든 사업 활동에서 정직성, 공정성, 책임감을 최우선 가치로 삼고, 국내외 법규와 국제 표준을 철저히 준수하며 신뢰받는 미래를 만들어갑니다.',
  introParas: [
    '다산제약은 인류의 건강 증진이라는 숭고한 사명을 가지고 있습니다. 이 중요한 사명을 수행함에 있어, 우리는 글로벌 최고 수준의 윤리 의식과 투명한 경영이 무엇보다 중요하다고 믿습니다.',
    '우리는 이 약속을 통해 모든 사업 활동에서 정직성, 공정성, 책임감을 최우선 가치로 삼을 것을 다짐합니다.',
    '국내외 모든 법규와 규제, 국제 표준을 철저히 준수하여 여러분의 신뢰를 얻고, 지속 가능한 미래를 함께 만들어 나갈 것입니다.'
  ],
  sections: [
    {
      title: '부정부패 및 리베이트 없는 투명한 경영을 약속합니다.',
      bullets: [
        '우리는 직무와 관련하여 어떠한 부당한 금품, 향응, 편의 등도 요구하거나 제공받지 않습니다.',
        '환자의 건강을 볼모로 의료인에게 불법적인 리베이트나 부당한 경제적 이익을 제공하지 않을 것입니다. 모든 교류는 관련 법규와 윤리적 원칙에 따라 투명하게 이루어질 것입니다.',
        '우리는 투명하고 깨끗한 기업 문화를 정착시키고, 부패 행위를 단호히 배격할 것입니다.'
      ]
    },
    {
      title: '고객의 건강과 안전을 최우선으로 약속합니다.',
      bullets: [
        '우리는 고객의 생명과 건강을 최우선 가치로 삼아, 최고 품질과 안전성이 확보된 의약 관련 제품들을 연구, 개발, 생산, 공급할 것입니다.',
        '모든 임상 시험과 연구 활동은 과학적이고 윤리적인 기준을 철저히 준수하며, 환자 정보 보호에 만전을 기하겠습니다.'
      ]
    },
    {
      title: '공정하고 투명한 관계를 약속합니다.',
      bullets: [
        '고객에게는 최고의 품질과 서비스를 제공하며, 고객 정보 보호를 위해 최선을 다할 것입니다.',
        '협력회사와는 상호 존중과 신뢰를 바탕으로 공정하게 거래하고, 우월적 지위를 남용하지 않으며 동반 성장을 추구할 것입니다.',
        '주주 여러분께는 정확하고 투명한 정보를 적시에 제공하여 알 권리를 충족시키고, 기업 가치 제고를 위해 끊임없이 노력하겠습니다.',
        '정부 및 규제기관과는 관련 법규를 철저히 준수하며 성실하게 협력하여, 제약산업의 건전한 발전에 기여할 것입니다.'
      ]
    },
    {
      title: '임직원의 존중과 성장을 약속합니다.',
      bullets: [
        '모든 임직원은 개인의 존엄성을 존중받으며 공정하게 대우받을 것입니다. 학연, 지연, 혈연, 성별, 종교, 장애 등에 따른 어떠한 차별도 용납하지 않습니다.',
        '안전하고 건강한 근무 환경을 제공하고, 직장 내 괴롭힘 및 성희롱을 철저히 근절하여 서로 존중하고 배려하는 문화를 만들어 나갈 것입니다.',
        '임직원의 역량 개발과 성장을 적극적으로 지원하여, 모두가 만족하며 일할 수 있는 터전을 마련하겠습니다.'
      ]
    },
    {
      title: '사회적 책임 및 환경 보호에 기여할 것을 약속합니다.',
      bullets: [
        '우리는 기업 시민으로서 사회적 책임을 다하고 지역사회 발전에 적극적으로 기여할 것입니다.',
        '의약품 개발 및 생산 과정에서 환경 보호의 중요성을 인식하고, 친환경적인 경영 활동을 통해 지속 가능한 미래를 만들어 나가는 데 앞장서겠습니다.'
      ]
    }
  ],
  date: '2025년 01월 01일',
  signerCompany: '주식회사 다산제약',
  signerTitle: '대표이사',
  signerName: '류 형 선'
};

export function parseCodeOfEthicsData(raw: string | null | undefined): CodeOfEthicsData {
  if (!raw || !raw.trim()) {
    return JSON.parse(JSON.stringify(DEFAULT_CODE_OF_ETHICS_DATA));
  }
  const trimmed = raw.trim();
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    try {
      const parsed = JSON.parse(trimmed);
      return {
        imageUrl: parsed.imageUrl || DEFAULT_CODE_OF_ETHICS_DATA.imageUrl,
        heroTitle: parsed.heroTitle !== undefined ? parsed.heroTitle : DEFAULT_CODE_OF_ETHICS_DATA.heroTitle,
        heroSubtitle: parsed.heroSubtitle !== undefined ? parsed.heroSubtitle : DEFAULT_CODE_OF_ETHICS_DATA.heroSubtitle,
        introParas: Array.isArray(parsed.introParas) && parsed.introParas.length > 0
          ? parsed.introParas
          : DEFAULT_CODE_OF_ETHICS_DATA.introParas,
        sections: Array.isArray(parsed.sections) && parsed.sections.length > 0
          ? parsed.sections.map((s: any, idx: number) => ({
              title: typeof s?.title === 'string' ? s.title : (DEFAULT_CODE_OF_ETHICS_DATA.sections[idx]?.title || ''),
              bullets: Array.isArray(s?.bullets) && s.bullets.length > 0
                ? s.bullets
                : (DEFAULT_CODE_OF_ETHICS_DATA.sections[idx]?.bullets || [])
            }))
          : DEFAULT_CODE_OF_ETHICS_DATA.sections,
        date: typeof parsed.date === 'string' ? parsed.date : DEFAULT_CODE_OF_ETHICS_DATA.date,
        signerCompany: typeof parsed.signerCompany === 'string' ? parsed.signerCompany : DEFAULT_CODE_OF_ETHICS_DATA.signerCompany,
        signerTitle: typeof parsed.signerTitle === 'string' ? parsed.signerTitle : DEFAULT_CODE_OF_ETHICS_DATA.signerTitle,
        signerName: typeof parsed.signerName === 'string' ? parsed.signerName : DEFAULT_CODE_OF_ETHICS_DATA.signerName,
      };
    } catch {
      // Fall through to legacy pipe format
    }
  }
  const parts = trimmed.split('|');
  const hasImg = parts.length >= 3 && (parts[1].startsWith('/') || parts[1].startsWith('http'));
  return {
    ...JSON.parse(JSON.stringify(DEFAULT_CODE_OF_ETHICS_DATA)),
    imageUrl: hasImg ? parts[1] : DEFAULT_CODE_OF_ETHICS_DATA.imageUrl,
  };
}
