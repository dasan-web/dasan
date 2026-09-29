export interface CdmoProcessStep {
  step: string;
  title: string;
  desc: string;
}

export interface BusinessCdmoData {
  title: string;
  desc1: string;
  desc2: string;
  processTitle: string;
  steps: CdmoProcessStep[];
}

export const DEFAULT_BUSINESS_CDMO_DATA: BusinessCdmoData = {
  title: 'One-stop CDMO Solution',
  desc1: '다산제약은 의약품 연구개발 역량과 GMP 기반 생산 인프라를 바탕으로 제네릭 및 개량신약의 개발부터 생산까지 맞춤형 CDMO 서비스를 제공합니다.',
  desc2: 'Multi-Stra®를 기반으로 차별화된 제형 설계 및 약물 방출 기술을 제공합니다.',
  processTitle: 'CDMO PROCESS',
  steps: [
    {
      step: 'STEP 01',
      title: '개발',
      desc: '개량신약, 제네릭 의약품의 제제 및 공정 개발 능력'
    },
    {
      step: 'STEP 02',
      title: '임상',
      desc: '소규모부터 대규모 글로벌 임상까지 다양한 규모의 임상 경험'
    },
    {
      step: 'STEP 03',
      title: '기술이전',
      desc: '연구개발된 제제 및 공정의 Scale-up을 통해 안정적인 생산으로 연결'
    },
    {
      step: 'STEP 04',
      title: '품질(QA/QC)',
      desc: 'QA·QC 체계를 기반으로 원료부터 완제품까지 전 과정의 품질 관리'
    },
    {
      step: 'STEP 05',
      title: '생산',
      desc: '비임상물질부터 상업 생산까지 다양한 생산 규모에 대응할 수 있는 생산 시설'
    }
  ]
};

export function parseBusinessCdmoData(raw?: string | null): BusinessCdmoData {
  if (!raw || typeof raw !== 'string') return DEFAULT_BUSINESS_CDMO_DATA;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return {
        title: typeof parsed.title === 'string' && parsed.title.trim() ? parsed.title : DEFAULT_BUSINESS_CDMO_DATA.title,
        desc1: typeof parsed.desc1 === 'string' ? parsed.desc1 : DEFAULT_BUSINESS_CDMO_DATA.desc1,
        desc2: typeof parsed.desc2 === 'string' ? parsed.desc2 : DEFAULT_BUSINESS_CDMO_DATA.desc2,
        processTitle: typeof parsed.processTitle === 'string' && parsed.processTitle.trim() ? parsed.processTitle : DEFAULT_BUSINESS_CDMO_DATA.processTitle,
        steps: Array.isArray(parsed.steps) && parsed.steps.length > 0
          ? parsed.steps.map((s: any, i: number) => {
              const def = DEFAULT_BUSINESS_CDMO_DATA.steps[i] || DEFAULT_BUSINESS_CDMO_DATA.steps[0];
              return {
                step: typeof s?.step === 'string' ? s.step : def.step,
                title: typeof s?.title === 'string' ? s.title : def.title,
                desc: typeof s?.desc === 'string' ? s.desc : def.desc
              };
            })
          : DEFAULT_BUSINESS_CDMO_DATA.steps
      };
    }
  } catch {
    // fallback if non-JSON
  }
  return DEFAULT_BUSINESS_CDMO_DATA;
}

export function serializeBusinessCdmoData(data: BusinessCdmoData): string {
  return JSON.stringify(data, null, 2);
}
