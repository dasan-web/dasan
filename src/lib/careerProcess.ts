export interface ProcessStepData {
  stepNumber: string;
  title: string;
  subTitle: string;
  desc: string;
  tags: string[];
}

export interface CareerProcessData {
  mainTitle: string;
  intro: string;
  steps: ProcessStepData[];
}

export const DEFAULT_CAREER_PROCESS_STEPS_KO: ProcessStepData[] = [
  {
    stepNumber: '01',
    title: '서류 전형',
    subTitle: '기본 요건 및 직무 적합성 검토',
    desc: '지원자의 직무 적합성과 전문성, 성장 잠재력 및 제출 서류의 충실도를 종합적으로 검토하여 1차 선발을 진행합니다.',
    tags: ['온라인 입사지원', '자격 요건 검토', '직무 역량 심사'],
  },
  {
    stepNumber: '02',
    title: '인적성검사',
    subTitle: '종합 인적성 평가 및 역량 진단',
    desc: '다산제약의 핵심 인재상 부합도와 기본 인성, 직무 수행에 필요한 논리적 사고력 및 문제 해결 역량을 온라인으로 진단합니다.',
    tags: ['온라인 인성검사', '직무 적성 진단', '핵심가치 적합도'],
  },
  {
    stepNumber: '03',
    title: '1차 실무 면접',
    subTitle: '직무 적합성 및 실무 역량 평가',
    desc: '해당 부서 현업 실무진과의 심층 면접을 통해 지원 분야의 전문 지식, 실무 수행 능력, 협업 및 커뮤니케이션 역량을 집중 검증합니다.',
    tags: ['실무진 심층 면접', '전문 역량 검증', '직무 인터뷰'],
  },
  {
    stepNumber: '04',
    title: '2차 임원 면접',
    subTitle: '인성 및 미래 가치 평가',
    desc: '경영진과의 종합 면접을 통해 다산제약의 기업 문화 및 비전과의 부합도, 직업관, 미래 성장 가능성을 다각도로 평가합니다.',
    tags: ['경영진 종합 면접', '인성 및 가치관', '미래 성장성'],
  },
  {
    stepNumber: '05',
    title: '채용 검진',
    subTitle: '건강 검진 실시',
    desc: '입사 전 안전하고 건강한 근무 환경 조성을 위하여 지정 전문 의료기관에서 채용 건강 검진을 진행합니다.',
    tags: ['지정 검진 기관', '신체 건강 진단', '안전한 근무 지원'],
  },
  {
    stepNumber: '06',
    title: '최종 합격',
    subTitle: '처우 조율 및 온보딩',
    desc: '최종 합격을 진심으로 축하드리며, 처우 협의 및 입사일을 조율하고 다산제약의 새로운 가족으로 힘찬 첫걸음을 함께 시작합니다.',
    tags: ['입사 처우 협의', '입사일 확정', '웰컴 온보딩'],
  },
];

export const DEFAULT_CAREER_PROCESS_STEPS_EN: ProcessStepData[] = [
  {
    stepNumber: '01',
    title: 'Document Screening',
    subTitle: 'Basic Qualifications Review',
    desc: 'We comprehensively review applicants\' job suitability, professional qualifications, growth potential, and the integrity of submitted documents for primary selection.',
    tags: ['Online Application', 'Qualification Review', 'Competency Assessment'],
  },
  {
    stepNumber: '02',
    title: 'Aptitude Test',
    subTitle: 'Competency & Personality Assessment',
    desc: 'An online diagnostic test evaluating alignment with Dasan\'s core values, basic personality traits, logical thinking, and problem-solving abilities required for the job.',
    tags: ['Online Assessment', 'Aptitude Test', 'Core Values Fit'],
  },
  {
    stepNumber: '03',
    title: '1st Practical Interview',
    subTitle: 'Job Suitability & Practical Skills',
    desc: 'Through in-depth interviews with working-level practitioners, we thoroughly evaluate professional knowledge, practical performance capabilities, teamwork, and communication skills.',
    tags: ['Technical Interview', 'Competency Verification', 'Job Interview'],
  },
  {
    stepNumber: '04',
    title: '2nd Executive Interview',
    subTitle: 'Values & Future Potential Evaluation',
    desc: 'Through comprehensive executive interviews, we assess alignment with Dasan\'s corporate culture and vision, work values, and future growth potential from multiple angles.',
    tags: ['Executive Interview', 'Values Alignment', 'Growth Potential'],
  },
  {
    stepNumber: '05',
    title: 'Medical Checkup',
    subTitle: 'Health Screening for Employment',
    desc: 'To foster a safe and healthy working environment prior to joining, applicants undergo an employment medical examination at a designated professional medical institution.',
    tags: ['Medical Checkup', 'Health Evaluation', 'Safe Workplace Support'],
  },
  {
    stepNumber: '06',
    title: 'Final Acceptance',
    subTitle: 'Offer Terms & Onboarding',
    desc: 'We sincerely congratulate you on your acceptance. We finalize compensation packages, coordinate your start date, and warmly welcome you to your first step as a new family member.',
    tags: ['Terms Coordination', 'Start Date Finalized', 'Welcome Onboarding'],
  },
];

export const DEFAULT_CAREER_PROCESS_DATA: CareerProcessData = {
  mainTitle: '채용 프로세스 안내',
  intro: '다산제약은 지원자 한 분 한 분의 소중한 서류와 인성을 세밀히 검토하고 있습니다.',
  steps: DEFAULT_CAREER_PROCESS_STEPS_KO,
};

export const DEFAULT_CAREER_PROCESS_DATA_EN: CareerProcessData = {
  mainTitle: 'Recruitment Process Guide',
  intro: 'Dasan Pharmaceutical carefully reviews the precious documents and sincere potential of every applicant.',
  steps: DEFAULT_CAREER_PROCESS_STEPS_EN,
};

export function parseCareerProcessData(raw: string | null | undefined, isEnglish: boolean = false): CareerProcessData {
  const fallback = isEnglish ? DEFAULT_CAREER_PROCESS_DATA_EN : DEFAULT_CAREER_PROCESS_DATA;
  if (!raw || !raw.trim()) {
    return { ...fallback, steps: fallback.steps.map(s => ({ ...s, tags: [...s.tags] })) };
  }

  const trimmed = raw.trim();

  // 1. JSON parse attempt
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    try {
      const parsed = JSON.parse(trimmed);
      return {
        mainTitle: parsed.mainTitle || fallback.mainTitle,
        intro: parsed.intro || fallback.intro,
        steps: Array.isArray(parsed.steps) && parsed.steps.length === 6
          ? parsed.steps.map((st: any, idx: number) => ({
              stepNumber: fallback.steps[idx].stepNumber,
              title: st.title || fallback.steps[idx].title,
              subTitle: st.subTitle || fallback.steps[idx].subTitle,
              desc: st.desc || fallback.steps[idx].desc,
              tags: Array.isArray(st.tags) && st.tags.length > 0 ? st.tags : [...fallback.steps[idx].tags],
            }))
          : fallback.steps.map(s => ({ ...s, tags: [...s.tags] })),
      };
    } catch {
      // Fallback
    }
  }

  // 2. Legacy Line-based format (lines[0]: mainTitle, lines[1]: intro, lines[2..9]: steps 1,3,4,6)
  const lines = trimmed.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const mainTitle = lines[0] || fallback.mainTitle;
  const intro = lines[1] || fallback.intro;

  const steps = fallback.steps.map((st, idx) => {
    // If old 10-line format:
    // lines[2], lines[3] -> Step 1 (idx 0)
    // lines[4], lines[5] -> Step 3 (idx 2)
    // lines[6], lines[7] -> Step 4 (idx 3)
    // lines[8], lines[9] -> Step 6 (idx 5)
    let title = st.title;
    let subTitle = st.subTitle;
    let desc = st.desc;

    if (idx === 0 && lines[2]) {
      title = lines[2];
      if (lines[3]) subTitle = lines[3];
    } else if (idx === 2 && lines[4]) {
      title = lines[4];
      if (lines[5]) subTitle = lines[5];
    } else if (idx === 3 && lines[6]) {
      title = lines[6];
      if (lines[7]) subTitle = lines[7];
    } else if (idx === 5 && lines[8]) {
      title = lines[8];
      if (lines[9]) subTitle = lines[9];
    }

    return {
      stepNumber: st.stepNumber,
      title,
      subTitle,
      desc,
      tags: [...st.tags],
    };
  });

  return {
    mainTitle,
    intro,
    steps,
  };
}

export function serializeCareerProcessData(data: CareerProcessData): string {
  return JSON.stringify(data, null, 2);
}
