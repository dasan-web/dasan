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
  desc1: '다산제약은 의약품 연구개발 역량과 GMP 생산 인프라를 바탕으로 제네릭 및 개량신약의 개발부터 생산까지 전 과정을 지원합니다.',
  desc2: 'Multi-Stra® 기반의 제형 기술을 활용하여 제품 특성에 맞는 개발 및 생산 솔루션을 제공합니다.',
  processTitle: 'CDMO PROCESS',
  steps: [
    {
      step: 'STEP 01',
      title: '개발',
      desc: '개량신약 및 제네릭 의약품의 제제·공정 개발을 지원합니다.'
    },
    {
      step: 'STEP 02',
      title: '기술이전',
      desc: '제품 개발 기술을 고객사에 이전하여 안정적인 생산으로 연결합니다.'
    },
    {
      step: 'STEP 03',
      title: '임상',
      desc: '임상1상, 생동시험, 글로벌 임상까지 다양한 임상용 의약품 생산 경험을 보유하고 있습니다.'
    },
    {
      step: 'STEP 04',
      title: '생산',
      desc: '비임상물질부터 상업 생산까지 다양한 규모의 의약품 생산을 지원합니다.'
    },
    {
      step: 'STEP 05',
      title: '품질(QA/QC)',
      desc: 'QA·QC 체계를 기반으로 원료부터 완제품까지 전 과정의 품질을 관리합니다.'
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
