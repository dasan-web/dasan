export interface ApiCardItem {
  num: string;
  title: string;
  subTitle: string;
  shortName: string;
  intro: string;
  body: string;
}

export interface BusinessApiData {
  title: string;
  desc1: string;
  desc2: string;
  sectionTitle: string;
  sectionDesc: string;
  cards: ApiCardItem[];
}

export const DEFAULT_BUSINESS_API_DATA: BusinessApiData = {
  title: '원료를 넘어, 의약품의 새로운 가능성을 만듭니다.',
  desc1: '다산제약은 축적된 의약품 개발 경험과 차별화된 기술력을 기반으로 고품질 원료의약품(API)을 개발하고 공급합니다.',
  desc2: 'Prodrug를 비롯한 고부가가치 원료 개발부터 안정적인 글로벌 소싱, 품질관리 및 공급망 구축까지 고객의 의약품 개발과 사업화를 위한 통합적인 API 솔루션을 제공합니다.',
  sectionTitle: '원료의약품 핵심 경쟁력',
  sectionDesc: '원료의약품 개발부터 글로벌 공급망까지, 다산제약이 약속하는 5가지 핵심 가치입니다.',
  cards: [
    {
      num: '01',
      title: 'Innovative API Development',
      subTitle: '혁신적인 원료의약품 개발',
      shortName: '혁신 원료 개발',
      intro: '차별화된 원료가 의약품의 새로운 가치를 만듭니다.',
      body: 'Prodrug 및 고부가가치 원료의약품을 비롯하여 최신 제약 기술을 적용한 차별화된 API 개발을 추진합니다.\n다산제약이 보유한 제제·연구개발 역량과 원료 개발 경험을 연결하여 고객의 제품 경쟁력을 높이고 글로벌 시장 진출을 지원합니다.'
    },
    {
      num: '02',
      title: 'Quality First',
      subTitle: '품질을 최우선으로',
      shortName: '품질 최우선',
      intro: '품질은 선택이 아니라 신뢰의 기준입니다.',
      body: '의약품의 출발점인 원료부터 엄격한 품질 기준을 적용합니다.\n원료 선정, 제조, 시험 및 공급 단계에 이르기까지 체계적인 품질관리 시스템을 기반으로 안전성과 일관성을 확보하고, 고객이 신뢰할 수 있는 원료 파트너가 되겠습니다.'
    },
    {
      num: '03',
      title: 'Sustainable API',
      subTitle: '지속가능한 미래를 위한 원료',
      shortName: '지속가능 원료',
      intro: '환경을 고려한 의약품 개발은 미래 경쟁력의 시작입니다.',
      body: '효율적인 제조공정과 친환경적인 원료 및 생산기술을 지속적으로 검토하고 도입하여 환경 부담을 줄이는 원료의약품 사업을 추구합니다.\n품질과 생산성뿐만 아니라 지속가능성까지 고려한 API 개발을 통해 더 나은 제약 산업의 미래를 만들어갑니다.'
    },
    {
      num: '04',
      title: 'Partnership for Success',
      subTitle: '고객과 함께 성장하는 파트너',
      shortName: '성장 파트너십',
      intro: 'Supplier가 아닌, 성공을 함께 설계하는 Partner.',
      body: '다산제약 원료사업부는 단순한 원료 공급을 넘어 고객의 개발 단계와 사업 전략을 이해하는 장기적인 파트너십을 추구합니다.\n개발 초기의 원료 검토부터 상업화 이후의 안정적인 공급까지 고객의 프로젝트에 필요한 최적의 솔루션을 함께 만들어갑니다.'
    },
    {
      num: '05',
      title: 'Global Supply Network',
      subTitle: '안정적인 글로벌 공급 네트워크',
      shortName: '글로벌 공급망',
      intro: 'Global Network. Reliable Supply.',
      body: '중국사업본부를 기반으로 중국을 비롯하여 일본, 인도 등 주요 제약 시장의 다양한 제조사 및 파트너와 장기간 구축해온 글로벌 네트워크를 보유하고 있습니다.\n검증된 해외 파트너와의 협력과 공급망 다변화를 통해 원료의 안정적인 조달과 지속적인 공급을 지원하며, 국내외 시장 환경 변화에 유연하게 대응할 수 있는 글로벌 API 공급 체계를 구축하고 있습니다.'
    }
  ]
};

export function parseBusinessApiData(raw?: string | null): BusinessApiData {
  if (!raw || typeof raw !== 'string') return DEFAULT_BUSINESS_API_DATA;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return {
        title: typeof parsed.title === 'string' && parsed.title.trim() ? parsed.title : DEFAULT_BUSINESS_API_DATA.title,
        desc1: typeof parsed.desc1 === 'string' ? parsed.desc1 : DEFAULT_BUSINESS_API_DATA.desc1,
        desc2: typeof parsed.desc2 === 'string' ? parsed.desc2 : DEFAULT_BUSINESS_API_DATA.desc2,
        sectionTitle: typeof parsed.sectionTitle === 'string' && parsed.sectionTitle.trim() ? parsed.sectionTitle : DEFAULT_BUSINESS_API_DATA.sectionTitle,
        sectionDesc: typeof parsed.sectionDesc === 'string' ? parsed.sectionDesc : DEFAULT_BUSINESS_API_DATA.sectionDesc,
        cards: Array.isArray(parsed.cards) && parsed.cards.length > 0
          ? parsed.cards.map((c: any, i: number) => {
              const def = DEFAULT_BUSINESS_API_DATA.cards[i] || DEFAULT_BUSINESS_API_DATA.cards[0];
              return {
                num: typeof c?.num === 'string' ? c.num : def.num,
                title: typeof c?.title === 'string' ? c.title : def.title,
                subTitle: typeof c?.subTitle === 'string' ? c.subTitle : def.subTitle,
                shortName: typeof c?.shortName === 'string' ? c.shortName : def.shortName,
                intro: typeof c?.intro === 'string' ? c.intro : def.intro,
                body: typeof c?.body === 'string' ? c.body : def.body
              };
            })
          : DEFAULT_BUSINESS_API_DATA.cards
      };
    }
  } catch {
    // If not JSON, check if it's the old 5-line string or empty
  }
  return DEFAULT_BUSINESS_API_DATA;
}

export function serializeBusinessApiData(data: BusinessApiData): string {
  return JSON.stringify(data, null, 2);
}
