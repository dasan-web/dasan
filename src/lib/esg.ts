export interface EsgData {
  imageUrl?: string;
  title: string;
  statement: string;
  bridgeText?: string;
  items: string[];
  date: string;
  signerCompany: string;
  signerName: string;
}

export const DEFAULT_ESG_DATA: Record<string, EsgData> = {
  'about/esg/ethics': {
    imageUrl: '/images/ESG.jpg',
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
    title: '부패방지 방침',
    statement: '다산제약은 제제기술 연구와 우수한 의약품 생산을 통해 인류의 건강과 행복에 기여하고, 사업추진에 있어 투명한 절차와 신뢰를 바탕으로 업무를 처리하기 위하여 부패방지경영시스템을 도입하며, 모든 임직원은 부패방지 방침을 인식하고 다음 사항을 준수한다.',
    bridgeText: '부패방지경영시스템의 체계적 운영을 위해 다음의 실천 지침을 철저히 준수한다.',
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
    title: '안전보건경영 방침',
    statement: '다산제약은 함께 일하는 모든 사람의 안전과 건강을 최우선 가치로 여기고 최상의 안전보건경영시스템을 구축하고 실행에 옮기기 위해 아래와 같은 사항을 적극 실천한다.',
    bridgeText: '안전하고 건강한 일터 조성을 위해 다음과 같은 실천 지침을 철저히 이행한다.',
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
  // format: title|statement|items(separated by \n)|date|signerName|imageUrl
  if (trimmed.includes('|')) {
    const parts = trimmed.split('|');
    return {
      title: parts[0]?.trim() || defaultData.title,
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

export const DEFAULT_CODE_OF_ETHICS_HTML = `<div style="font-family: sans-serif; line-height: 1.8; color: #374151;">
  <div style="margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid #f3f4f6;">
    <p style="font-size: 1.05rem; line-height: 1.8; margin-bottom: 1rem; color: #374151;">
      다산제약은 인류의 건강 증진이라는 숭고한 사명을 가지고 있습니다. 이 중요한 사명을 수행함에 있어, 우리는 글로벌 최고 수준의 윤리 의식과 투명한 경영이 무엇보다 중요하다고 믿습니다.
    </p>
    <p style="font-size: 1.05rem; line-height: 1.8; margin-bottom: 1rem; color: #374151;">
      우리는 이 약속을 통해 모든 사업 활동에서 정직성, 공정성, 책임감을 최우선 가치로 삼을 것을 다짐합니다.
    </p>
    <p style="font-size: 1.05rem; line-height: 1.8; margin-bottom: 0; color: #374151;">
      국내외 모든 법규와 규제, 국제 표준을 철저히 준수하여 여러분의 신뢰를 얻고, 지속 가능한 미래를 함께 만들어 나갈 것입니다.
    </p>
  </div>

  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <!-- Section 1 -->
    <div style="padding: 1.5rem; background-color: #f9fafb; border-radius: 1rem; border: 1px solid #e5e7eb;">
      <h4 style="font-size: 1.15rem; font-weight: 800; color: #111827; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
        <span style="display: inline-flex; align-items: center; justify-content: center; width: 1.75rem; height: 1.75rem; border-radius: 9999px; background-color: #059669; color: #fff; font-size: 0.875rem; font-weight: 700;">1</span>
        부정부패 및 리베이트 없는 투명한 경영을 약속합니다.
      </h4>
      <ul style="padding-left: 2.25rem; margin: 0; color: #4b5563; font-size: 0.95rem; line-height: 1.75;">
        <li style="margin-bottom: 0.5rem;">우리는 직무와 관련하여 어떠한 부당한 금품, 향응, 편의 등도 요구하거나 제공받지 않습니다.</li>
        <li style="margin-bottom: 0.5rem;">환자의 건강을 볼모로 의료인에게 불법적인 리베이트나 부당한 경제적 이익을 제공하지 않을 것입니다. 모든 교류는 관련 법규와 윤리적 원칙에 따라 투명하게 이루어질 것입니다.</li>
        <li>우리는 투명하고 깨끗한 기업 문화를 정착시키고, 부패 행위를 단호히 배격할 것입니다.</li>
      </ul>
    </div>

    <!-- Section 2 -->
    <div style="padding: 1.5rem; background-color: #f9fafb; border-radius: 1rem; border: 1px solid #e5e7eb;">
      <h4 style="font-size: 1.15rem; font-weight: 800; color: #111827; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
        <span style="display: inline-flex; align-items: center; justify-content: center; width: 1.75rem; height: 1.75rem; border-radius: 9999px; background-color: #059669; color: #fff; font-size: 0.875rem; font-weight: 700;">2</span>
        고객의 건강과 안전을 최우선으로 약속합니다.
      </h4>
      <ul style="padding-left: 2.25rem; margin: 0; color: #4b5563; font-size: 0.95rem; line-height: 1.75;">
        <li style="margin-bottom: 0.5rem;">우리는 고객의 생명과 건강을 최우선 가치로 삼아, 최고 품질과 안전성이 확보된 의약 관련 제품들을 연구, 개발, 생산, 공급할 것입니다.</li>
        <li>모든 임상 시험과 연구 활동은 과학적이고 윤리적인 기준을 철저히 준수하며, 환자 정보 보호에 만전을 기하겠습니다.</li>
      </ul>
    </div>

    <!-- Section 3 -->
    <div style="padding: 1.5rem; background-color: #f9fafb; border-radius: 1rem; border: 1px solid #e5e7eb;">
      <h4 style="font-size: 1.15rem; font-weight: 800; color: #111827; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
        <span style="display: inline-flex; align-items: center; justify-content: center; width: 1.75rem; height: 1.75rem; border-radius: 9999px; background-color: #059669; color: #fff; font-size: 0.875rem; font-weight: 700;">3</span>
        공정하고 투명한 관계를 약속합니다.
      </h4>
      <ul style="padding-left: 2.25rem; margin: 0; color: #4b5563; font-size: 0.95rem; line-height: 1.75;">
        <li style="margin-bottom: 0.5rem;">고객에게는 최고의 품질과 서비스를 제공하며, 고객 정보 보호를 위해 최선을 다할 것입니다.</li>
        <li style="margin-bottom: 0.5rem;">협력회사와는 상호 존중과 신뢰를 바탕으로 공정하게 거래하고, 우월적 지위를 남용하지 않으며 동반 성장을 추구할 것입니다.</li>
        <li style="margin-bottom: 0.5rem;">주주 여러분께는 정확하고 투명한 정보를 적시에 제공하여 알 권리를 충족시키고, 기업 가치 제고를 위해 끊임없이 노력하겠습니다.</li>
        <li>정부 및 규제기관과는 관련 법규를 철저히 준수하며 성실하게 협력하여, 제약산업의 건전한 발전에 기여할 것입니다.</li>
      </ul>
    </div>

    <!-- Section 4 -->
    <div style="padding: 1.5rem; background-color: #f9fafb; border-radius: 1rem; border: 1px solid #e5e7eb;">
      <h4 style="font-size: 1.15rem; font-weight: 800; color: #111827; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
        <span style="display: inline-flex; align-items: center; justify-content: center; width: 1.75rem; height: 1.75rem; border-radius: 9999px; background-color: #059669; color: #fff; font-size: 0.875rem; font-weight: 700;">4</span>
        임직원의 존중과 성장을 약속합니다.
      </h4>
      <ul style="padding-left: 2.25rem; margin: 0; color: #4b5563; font-size: 0.95rem; line-height: 1.75;">
        <li style="margin-bottom: 0.5rem;">모든 임직원은 개인의 존엄성을 존중받으며 공정하게 대우받을 것입니다. 학연, 지연, 혈연, 성별, 종교, 장애 등에 따른 어떠한 차별도 용납하지 않습니다.</li>
        <li style="margin-bottom: 0.5rem;">안전하고 건강한 근무 환경을 제공하고, 직장 내 괴롭힘 및 성희롱을 철저히 근절하여 서로 존중하고 배려하는 문화를 만들어 나갈 것입니다.</li>
        <li>임직원의 역량 개발과 성장을 적극적으로 지원하여, 모두가 만족하며 일할 수 있는 터전을 마련하겠습니다.</li>
      </ul>
    </div>

    <!-- Section 5 -->
    <div style="padding: 1.5rem; background-color: #f9fafb; border-radius: 1rem; border: 1px solid #e5e7eb;">
      <h4 style="font-size: 1.15rem; font-weight: 800; color: #111827; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
        <span style="display: inline-flex; align-items: center; justify-content: center; width: 1.75rem; height: 1.75rem; border-radius: 9999px; background-color: #059669; color: #fff; font-size: 0.875rem; font-weight: 700;">5</span>
        사회적 책임 및 환경 보호에 기여할 것을 약속합니다.
      </h4>
      <ul style="padding-left: 2.25rem; margin: 0; color: #4b5563; font-size: 0.95rem; line-height: 1.75;">
        <li style="margin-bottom: 0.5rem;">우리는 기업 시민으로서 사회적 책임을 다하고 지역사회 발전에 적극적으로 기여할 것입니다.</li>
        <li>의약품 개발 및 생산 과정에서 환경 보호의 중요성을 인식하고, 친환경적인 경영 활동을 통해 지속 가능한 미래를 만들어 나가는 데 앞장서겠습니다.</li>
      </ul>
    </div>
  </div>

  <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e5e7eb; text-align: center;">
    <p style="font-size: 0.95rem; font-weight: 600; color: #9ca3af; margin-bottom: 0.75rem;">2025년 01월 01일</p>
    <p style="font-size: 1.25rem; font-weight: 900; color: #111827; margin-bottom: 0.5rem;">주식회사 다산제약</p>
    <p style="font-size: 1.1rem; font-weight: 700; color: #1f2937;">대표이사 <span style="font-weight: 900; margin-left: 0.5rem;">류 형 선</span></p>
  </div>
</div>`;
