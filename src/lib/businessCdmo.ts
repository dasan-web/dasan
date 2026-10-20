export interface CdmoProcessStep {
  step: string;
  title: string;
  desc: string;
}

export interface CdmoTabGroup {
  subtitle: string;
  items: string[];
  note?: string;
}

export interface CdmoTabItem {
  id: string;
  num: string;
  badge: string;
  cardTitle: string;
  cardDesc: string;
  sectionTitle: string;
  groups: CdmoTabGroup[];
}

export interface BusinessCdmoData {
  title: string;
  desc1: string;
  desc2: string;
  processTitle: string;
  steps: CdmoProcessStep[];
  whatWeDevelopTitle: string;
  whatWeDevelopDesc: string;
  whyDasanTitle: string;
  whyDasanDesc: string;
  whyDasanBtnText?: string;
  whyDasanBtnLink?: string;
  tabs: CdmoTabItem[];
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
  ],
  whatWeDevelopTitle: 'What We Develop',
  whatWeDevelopDesc: '다양한 의약품 개발 및 생산 경험을 바탕으로 고객의 제품 특성에 맞는 CDMO 솔루션을 제공합니다.',
  whyDasanTitle: 'WHY DASAN',
  whyDasanDesc: '개발부터 생산까지, 의약품의 가치를 완성하는 파트너',
  whyDasanBtnText: '비즈니스 영업 문의하기',
  whyDasanBtnLink: '/contact/inquiry/sales',
  tabs: [
    {
      id: 'technology',
      num: '01',
      badge: 'TECHNOLOGY',
      cardTitle: 'Multi-Stra® 기반 제형 및 MUPS 기술',
      cardDesc: '축적된 제제 기술을 바탕으로 제품 특성에 맞는 제형을 설계하고, 차별화된 의약품 개발을 지원합니다.',
      sectionTitle: '1st Generic 품목',
      groups: [
        {
          subtitle: '핵심공정 ODM품목',
          items: [
            'Glimepiride, Tacrolimus, Itraconazole, Roxatidine SR, Tolterodine SR, Ramipril, Donepezil ODT, Montelukast Sachet, Duloxetine EC, Telmisartan/Rosuvastatin, Tolvaptan'
          ]
        },
        {
          subtitle: '전공정 ODM품목',
          items: [
            'Adefovir, Telmisartan, Entecavir, Olmesartan/HCTZ, Telmisartan/HCTZ, Olmesartan/Amlodipine, Valsartan/Amlodipine, Amlodipine, Glimepiride/Metformin, Sitagliptin/Metformin, Sitagliptin, Telmisartan/Amlodipine, Tamsulosin 0.4mg, Atorvastatin/Ezetimibe, Donepezil, Rosuvastatin'
          ]
        }
      ]
    },
    {
      id: 'manufacturing',
      num: '02',
      badge: 'MANUFACTURING',
      cardTitle: 'GMP 기반 생산 역량',
      cardDesc: 'GMP 기준에 부합하는 생산 인프라와 제조 역량을 바탕으로 개발 제품의 안정적인 생산을 지원합니다.',
      sectionTitle: '개량신약(염 변경)',
      groups: [
        {
          subtitle: '개량신약(염변경)',
          items: ['Amlodipine maleate*'],
          note: '*공동개발 품목이며 다산에서 핵심기술 진행 (약물의 안정성 확보)'
        },
        {
          subtitle: '전공정 ODM품목',
          items: ['Dabigatran etexilate']
        }
      ]
    },
    {
      id: 'quality',
      num: '03',
      badge: 'QUALITY CONTROL',
      cardTitle: '체계적인 품질관리 시스템',
      cardDesc: '원료 입고부터 제조, 시험, 완제품까지 체계적인 품질관리를 통해 일관된 품질을 유지합니다.',
      sectionTitle: '개량신약(약물방출)',
      groups: [
        {
          subtitle: '약물방출 조절 개량신약',
          items: ['Carvedilol SR*', 'Aspirin/Clopidogrel*'],
          note: '*공동개발 품목이며 다산에서 핵심 약물방출 조절 진행'
        },
        {
          subtitle: '고함량 개량신약',
          items: ['imatinib mesylate 고함량제제']
        }
      ]
    },
    {
      id: 'one-stop',
      num: '04',
      badge: 'ONE-STOP',
      cardTitle: '개발부터 생산까지 One-Stop',
      cardDesc: '연구개발부터 기술이전, 생산, 품질관리까지 전 과정을 연계하여 지원합니다.',
      sectionTitle: '개량신약(복합제)&기타',
      groups: [
        {
          subtitle: '복합제제 개량신약',
          items: ['Telmisartan/S-amlodipine*'],
          note: '*공동개발 품목이며 다산에서 핵심 약물방출 조절 진행'
        },
        {
          subtitle: '제형 변경(기타)',
          items: ['Choline alfoscerate 정제', 'Esomeprazole Mg ODT']
        }
      ]
    }
  ]
};

export function parseBusinessCdmoData(raw?: string | null): BusinessCdmoData {
  if (!raw || typeof raw !== 'string') return JSON.parse(JSON.stringify(DEFAULT_BUSINESS_CDMO_DATA));
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
          : DEFAULT_BUSINESS_CDMO_DATA.steps,
        whatWeDevelopTitle: typeof parsed.whatWeDevelopTitle === 'string' && parsed.whatWeDevelopTitle.trim() ? parsed.whatWeDevelopTitle : DEFAULT_BUSINESS_CDMO_DATA.whatWeDevelopTitle,
        whatWeDevelopDesc: typeof parsed.whatWeDevelopDesc === 'string' ? parsed.whatWeDevelopDesc : DEFAULT_BUSINESS_CDMO_DATA.whatWeDevelopDesc,
        whyDasanTitle: typeof parsed.whyDasanTitle === 'string' && parsed.whyDasanTitle.trim() ? parsed.whyDasanTitle : DEFAULT_BUSINESS_CDMO_DATA.whyDasanTitle,
        whyDasanDesc: typeof parsed.whyDasanDesc === 'string' ? parsed.whyDasanDesc : DEFAULT_BUSINESS_CDMO_DATA.whyDasanDesc,
        whyDasanBtnText: typeof parsed.whyDasanBtnText === 'string' && parsed.whyDasanBtnText.trim() ? parsed.whyDasanBtnText : DEFAULT_BUSINESS_CDMO_DATA.whyDasanBtnText,
        whyDasanBtnLink: typeof parsed.whyDasanBtnLink === 'string' && parsed.whyDasanBtnLink.trim() ? parsed.whyDasanBtnLink : DEFAULT_BUSINESS_CDMO_DATA.whyDasanBtnLink,
        tabs: Array.isArray(parsed.tabs) && parsed.tabs.length > 0
          ? parsed.tabs.map((t: any, i: number) => {
              const def = DEFAULT_BUSINESS_CDMO_DATA.tabs[i] || DEFAULT_BUSINESS_CDMO_DATA.tabs[0];
              return {
                id: typeof t?.id === 'string' ? t.id : def.id,
                num: typeof t?.num === 'string' ? t.num : def.num,
                badge: typeof t?.badge === 'string' ? t.badge : def.badge,
                cardTitle: typeof t?.cardTitle === 'string' ? t.cardTitle : def.cardTitle,
                cardDesc: typeof t?.cardDesc === 'string' ? t.cardDesc : def.cardDesc,
                sectionTitle: typeof t?.sectionTitle === 'string' ? t.sectionTitle : def.sectionTitle,
                groups: Array.isArray(t?.groups) && t.groups.length > 0
                  ? t.groups.map((g: any, gIdx: number) => {
                      const defG = def.groups[gIdx] || def.groups[0];
                      return {
                        subtitle: typeof g?.subtitle === 'string' ? g.subtitle : defG.subtitle,
                        items: Array.isArray(g?.items) && g.items.length > 0 ? g.items : defG.items,
                        note: typeof g?.note === 'string' ? g.note : defG.note
                      };
                    })
                  : def.groups
              };
            })
          : DEFAULT_BUSINESS_CDMO_DATA.tabs
      };
    }
  } catch {
    // fallback if non-JSON
  }
  return JSON.parse(JSON.stringify(DEFAULT_BUSINESS_CDMO_DATA));
}

export function serializeBusinessCdmoData(data: BusinessCdmoData): string {
  return JSON.stringify(data, null, 2);
}
