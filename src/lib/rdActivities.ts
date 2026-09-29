export interface RdActivitiesTechItem {
  id: string;
  title: string;
  shortTitle: string;
  subTitle: string;
  image: string;
  imageAlt: string;
  desc: string;
  tags: string[];
  badgeColor: string;
}

export interface RdActivitiesData {
  heroTitle: string;
  platformTitle: string;
  platformDesc: string;
  techList: RdActivitiesTechItem[];
}

export const DEFAULT_RD_ACTIVITIES_DATA: RdActivitiesData = {
  heroTitle: '다산제약은 차별화된 DDS(약물전달시스템) 설계를 통해 \nMulti-Stra™ 라는 특화된 핵심보유기술을 완성해 나가고 있습니다.',
  platformTitle: '혁신 제제 플랫폼 Multi-Stra™ 기반의 의약품 개발',
  platformDesc: '다산제약은 5대 핵심 플랫폼 기술을 유기적으로 융합하여 원료의약품의 한계를 극복하고, 환자의 복약 순응도와 치료 효과를 극대화하는 고부가가치 개량신약 개발을 지속하고 있습니다.',
  techList: [
    {
      id: 'A',
      title: '경피 약물 전달 시스템 플랫폼 기술',
      shortTitle: '경피 약물 전달 (TDDS)',
      subTitle: 'Transdermal Drug Delivery System',
      image: '/rd_tech_tdds.jpg',
      imageAlt: '마이크로니들 및 실리콘 중합체 경피 약물 전달 시스템',
      desc: '자체 특허를 보유한 실리콘 중합체로서 높은 생체 적합성 및 흡수율, 침투율을 확보한 기술로서 연고제 또는 마이크로니들과 융합하여 경피제로 개발',
      tags: ['자체 특허 실리콘 중합체', '높은 생체적합성 & 침투율', '마이크로니들 융합 경피제'],
      badgeColor: 'bg-emerald-600 text-white'
    },
    {
      id: 'B',
      title: '약물 나노화 기술',
      shortTitle: '약물 나노화 (Nanonization)',
      subTitle: 'Stabilized Drug Nanonization Technology',
      image: '/rd_tech_nanonization.jpg',
      imageAlt: '100nm 균질 입자 나노 에멀전 및 레이저 산란 분석',
      desc: 'Polymer 및 Surfactant를 이용하여 약물간의 Aggergation을 차단하고 완벽하게 Despersion된 과립물을 제조하는 기술로서 100nm 수준의 균질한 입자도의 과립물을 통한 약물의 용해도와 생체 이용률을 향상시킨 제품 개발',
      tags: ['100nm 균질 입자도', '약물 응집(Aggregation) 차단', '용해도 및 생체이용률 극대화'],
      badgeColor: 'bg-teal-600 text-white'
    },
    {
      id: 'C',
      title: '약물 방출 조절 기술',
      shortTitle: '약물 방출 조절 (Release Control)',
      subTitle: 'Drug Release Control Technology',
      image: '/rd_tech_release_control.jpg?v=3',
      imageAlt: '방출제어 서방형 펠렛 코팅 및 자동 용출 시험 시스템',
      desc: 'API를 Shell내에 포획하고, 일정 조건하에서 용해시켜 목적하는 위장관 내에서 활성성분이 방출되도록 설계하는 기술로서 약물의 체내 안정성을 향상하고 용해 및 방출 속도를 미세하게 조절해야 하는 방출제어(DR, SR, ER, CR, TR…) 특수 제품의 개발',
      tags: ['API Shell 포획 기술', '체내 안정성 향상', 'DR · SR · ER · CR · TR 맞춤 방출제어'],
      badgeColor: 'bg-emerald-700 text-white'
    },
    {
      id: 'D',
      title: '다중 약물 다층 정제 기술',
      shortTitle: '다중 다층 정제 (Multilayer)',
      subTitle: 'Multiple-Drug Multilayer Tablet Technology',
      image: '/rd_tech_multilayer.jpg',
      imageAlt: '물리적 층간 분리 다층정(이중정/삼중정) 타정 성형 기술',
      desc: '정제의 각 층에 서로 다른 약물을 물리적으로 분리하여 탑재하는 기술로서 약물간의 비호환성에 대한 상호작용을 격리를 통해 억제하고 서로 다른 약물 방출 조절 기술(IR+SR, IR+TR…)이 접목된 복합제형 개발',
      tags: ['물리적 층간 분리 탑재', '약물 비호환성 상호작용 억제', 'IR+SR / IR+TR 복합제형'],
      badgeColor: 'bg-cyan-700 text-white'
    },
    {
      id: 'E',
      title: '고분자 기반 약물 고체분산체 기술',
      shortTitle: '약물 고체분산체 (Solid Dispersion)',
      subTitle: 'Polymer-Based Drug Solid Dispersion Technology',
      image: '/rd_talent_global.jpg',
      imageAlt: '비정질 고체분산체 고분자 매질 및 초포화 흡수율 정밀 분석',
      desc: '본 기술은 API를 Polymer 매질 내에 분자 수준으로 분산시켜 고체분산체를 제조하는 제형 기술로서 목적하는 원료를 비정질(Amorphous) 상태를 안정화하며 약물 분자의 격자 에너지 제거를 통해 활성화 에너지를 낮추어 용해도를 개선한다. 또한 위장관 통과 내에서 초포화 상태를 유지하여 약물흡수를 증가시킴으로서 난용성 약물의 경구제 생체이용률 개선 제품 개발',
      tags: ['비정질(Amorphous) 분자 분산', '초포화 상태 흡수 증가', '난용성 약물 생체이용률 개선'],
      badgeColor: 'bg-teal-700 text-white'
    }
  ]
};

export function parseRdActivitiesData(raw: string | null | undefined): RdActivitiesData {
  if (!raw || !raw.trim()) {
    return JSON.parse(JSON.stringify(DEFAULT_RD_ACTIVITIES_DATA));
  }

  const trimmed = raw.trim();

  // 1. JSON parsing
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    try {
      const parsed = JSON.parse(trimmed);
      return {
        heroTitle: parsed.heroTitle || DEFAULT_RD_ACTIVITIES_DATA.heroTitle,
        platformTitle: parsed.platformTitle || DEFAULT_RD_ACTIVITIES_DATA.platformTitle,
        platformDesc: parsed.platformDesc || DEFAULT_RD_ACTIVITIES_DATA.platformDesc,
        techList: Array.isArray(parsed.techList) && parsed.techList.length > 0
          ? parsed.techList
          : DEFAULT_RD_ACTIVITIES_DATA.techList
      };
    } catch (e) {
      // Fall through to plain text parsing
    }
  }

  // 2. Plain text parsing (Legacy DB format)
  const result: RdActivitiesData = JSON.parse(JSON.stringify(DEFAULT_RD_ACTIVITIES_DATA));
  const lines = trimmed.split('\n').map(l => l.trim()).filter(Boolean);

  if (lines.length > 0) {
    if (lines[0].includes('Multi-Stra') || lines[0].includes('다산제약')) {
      result.heroTitle = lines[0];
    }
    
    // Parse A., B., C., D., E.
    let currentId = '';
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(/^([A-E])\.\s*(.+)$/);
      if (match) {
        currentId = match[1];
        const titleFull = match[2];
        const item = result.techList.find(t => t.id === currentId);
        if (item) {
          const parts = titleFull.split('(');
          item.title = parts[0].trim();
          if (parts[1]) {
            item.subTitle = parts[1].replace(')', '').trim();
          }
        }
      } else if (currentId) {
        const item = result.techList.find(t => t.id === currentId);
        if (item) {
          item.desc = line;
        }
      }
    }
  }

  return result;
}

export function serializeRdActivitiesData(data: RdActivitiesData): string {
  return JSON.stringify(data, null, 2);
}
