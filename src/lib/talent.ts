export interface TalentItemData {
  letter: string;
  word: string;
  desc: string;
}

export interface TalentData {
  philosophyTitle: string;
  philosophyP1: string;
  philosophyP2: string;
  items: TalentItemData[];
}

export const DEFAULT_TALENT_ITEMS_KO: TalentItemData[] = [
  {
    letter: 'D',
    word: 'Detail',
    desc: '업무의 시작부터 마지막 순간까지 최고의 완성도를 추구한다.',
  },
  {
    letter: 'A',
    word: 'Active',
    desc: '능동적으로 업무를 수행하고 상호 협력한다.',
  },
  {
    letter: 'S',
    word: 'Smart',
    desc: '전문지식을 보유하고 합리적으로 판단한다.',
  },
  {
    letter: 'A',
    word: 'Action',
    desc: '강력한 추진력을 바탕으로 목표한 바를 이뤄낸다.',
  },
  {
    letter: 'N',
    word: 'New thinking',
    desc: '고정관념을 버리고 창의적인 변화를 주도한다.',
  },
];

export const DEFAULT_TALENT_ITEMS_EN: TalentItemData[] = [
  {
    letter: 'D',
    word: 'Detail',
    desc: 'Pursuing the highest perfection from start to finish of every task.',
  },
  {
    letter: 'A',
    word: 'Active',
    desc: 'Proactively carrying out duties and collaborating with team members.',
  },
  {
    letter: 'S',
    word: 'Smart',
    desc: 'Possessing professional expertise and making rational judgments.',
  },
  {
    letter: 'A',
    word: 'Action',
    desc: 'Achieving goals based on strong drive and execution power.',
  },
  {
    letter: 'N',
    word: 'New thinking',
    desc: 'Overcoming fixed ideas to lead creative and meaningful change.',
  },
];

export const DEFAULT_TALENT_DATA: TalentData = {
  philosophyTitle: '좋은 의약품은 좋은 사람에게서 나옵니다',
  philosophyP1: `다산제약은 조선 최고의 실학자 다산 정약용 선생의 '애민(愛民)' 정신을 창업이념으로 삼아, 인류의 건강과 행복한 삶을 위한 의약품을 연구하고 만들어 왔습니다.\n좋은 의약품은 좋은 사람에게서 나온다는 믿음으로, 저희는 함께 일할 동료에게도 같은 진심과 원칙을 기대합니다.`,
  philosophyP2: `'Innovating Today for a Healthier Tomorrow', 건강한 내일을 위한 오늘의 혁신은 이런 사람들이 모였을 때 비로소 가능하다고 믿습니다.\n다산제약은 이 가치에 공감하고 함께 성장해 나갈 인재를 기다립니다.`,
  items: DEFAULT_TALENT_ITEMS_KO,
};

export const DEFAULT_TALENT_DATA_EN: TalentData = {
  philosophyTitle: 'Great Medicine Comes from Great People',
  philosophyP1: `Dasan Pharmaceutical was founded on the philosophy of 'Aemin (Love for the People)' inspired by Dasan Jeong Yak-yong, the greatest practical scholar of the Joseon Dynasty, researching and developing pharmaceuticals for humanity's health and happy life.\nBelieving that good medicine ultimately comes from good people, we expect the same sincerity and principles from the colleagues who join us.`,
  philosophyP2: `'Innovating Today for a Healthier Tomorrow', we believe that innovation today for a healthier tomorrow is only possible when such individuals come together.\nDasan Pharmaceutical awaits talented individuals who resonate with this value and wish to grow together with us.`,
  items: DEFAULT_TALENT_ITEMS_EN,
};

export function parseTalentData(raw: string | null | undefined, isEnglish: boolean = false): TalentData {
  const fallback = isEnglish ? DEFAULT_TALENT_DATA_EN : DEFAULT_TALENT_DATA;
  if (!raw || !raw.trim()) {
    return { ...fallback, items: fallback.items.map(item => ({ ...item })) };
  }

  const trimmed = raw.trim();

  // 1. JSON parse attempt
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    try {
      const parsed = JSON.parse(trimmed);
      return {
        philosophyTitle: parsed.philosophyTitle || fallback.philosophyTitle,
        philosophyP1: parsed.philosophyP1 || fallback.philosophyP1,
        philosophyP2: parsed.philosophyP2 || fallback.philosophyP2,
        items: Array.isArray(parsed.items) && parsed.items.length === 5
          ? parsed.items.map((it: any, idx: number) => ({
              letter: fallback.items[idx].letter,
              word: it.word || fallback.items[idx].word,
              desc: it.desc || fallback.items[idx].desc,
            }))
          : fallback.items.map(item => ({ ...item })),
      };
    } catch {
      // Fallback
    }
  }

  // 2. Line-based format
  const lines = trimmed.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (lines.length >= 2) {
    // If lines match legacy 8-line format or new line format
    const philosophyTitle = lines[0] || fallback.philosophyTitle;
    const philosophyP1 = lines[1] || fallback.philosophyP1;
    const philosophyP2 = lines[2] && lines.length > 8 ? lines[2] : fallback.philosophyP2;

    const items = fallback.items.map((item, idx) => {
      // If there are specific item lines
      const wordIdx = 3 + idx * 2;
      const descIdx = 4 + idx * 2;
      return {
        letter: item.letter,
        word: lines[wordIdx] || item.word,
        desc: lines[descIdx] || item.desc,
      };
    });

    return {
      philosophyTitle,
      philosophyP1,
      philosophyP2,
      items,
    };
  }

  return { ...fallback, items: fallback.items.map(item => ({ ...item })) };
}

export function serializeTalentData(data: TalentData): string {
  return JSON.stringify(data, null, 2);
}
