export interface GreetingData {
  title: string;
  imageUrl: string;
  slogan: string;
  greeting: string;
  body: string;
  signerCompany?: string;
  signerTitle: string;
  signerName: string;
}

export const DEFAULT_GREETING_DATA: GreetingData = {
  title: 'CEO 메시지',
  imageUrl: '/images/ceo_greeting.webp',
  slogan: '신뢰와 혁신으로 열어가는 더 건강한 미래',
  greeting: '다산제약 홈페이지를 방문해 주신 고객과 주주, 그리고 협력사 여러분을 진심으로 환영합니다.',
  body: `<p>1996년 첫 발을 내딛은 다산제약은 '차별화된 의약품 연구개발'이라는 확고한 신념을 바탕으로 대한민국 제약 산업과 함께 성장해 왔습니다. 우수한 제조 기술력과 엄격한 품질 관리를 기반으로 국내외 시장에서 두터운 신뢰를 쌓을 수 있었던 것은 모두 여러분의 변함없는 성원 덕분입니다.</p>
<p>우리는 다산 정약용 선생의 실사구시(實事求是) 정신을 이어받아 최첨단 제조 공정 도입과 선진화된 인프라 구축을 통해 글로벌 기준에 부합하는 고품질 의약품을 생산하고 있으며, 급변하는 제약 바이오 환경에 발맞추어 보다 신속하고 유연한 경영 체계를 확립해 나가고 있습니다.</p>
<p>나아가 임직원 모두가 창의적으로 역량을 발휘할 수 있는 조직 문화를 바탕으로, 현장에서 창출된 가치를 고객 및 주주 여러분과 함께 나누며 건강한 사회를 만드는 데 앞장서겠습니다.</p>
<p>다산제약은 현실에 안주하지 않고, 질병으로 고통받는 이들에게 희망을 전하며 인류의 건강하고 행복한 삶에 기여하는 '글로벌 헬스케어 리더'로 끊임없이 도약할 것을 약속드립니다.</p>
<p>새롭게 단장한 공간에서 다산제약이 열어갈 원대한 미래와 도전을 계속해서 따뜻한 시선으로 지켜봐 주시기 바랍니다. 감사합니다.</p>`,
  signerCompany: '주식회사 다산제약',
  signerTitle: '대표이사',
  signerName: '류 형 선'
};

export function parseGreetingData(raw: string | null | undefined): GreetingData {
  if (!raw || !raw.trim()) {
    return { ...DEFAULT_GREETING_DATA };
  }

  const trimmed = raw.trim();

  // 1. JSON Format Check
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    try {
      const parsed = JSON.parse(trimmed);
      return {
        title: parsed.title || DEFAULT_GREETING_DATA.title,
        imageUrl: parsed.imageUrl || DEFAULT_GREETING_DATA.imageUrl,
        slogan: parsed.slogan !== undefined ? parsed.slogan : DEFAULT_GREETING_DATA.slogan,
        greeting: parsed.greeting !== undefined ? parsed.greeting : DEFAULT_GREETING_DATA.greeting,
        body: parsed.body !== undefined ? parsed.body : DEFAULT_GREETING_DATA.body,
        signerCompany: parsed.signerCompany || DEFAULT_GREETING_DATA.signerCompany,
        signerTitle: parsed.signerTitle || DEFAULT_GREETING_DATA.signerTitle,
        signerName: parsed.signerName || DEFAULT_GREETING_DATA.signerName,
      };
    } catch {
      // JSON parse failed, proceed to legacy parsing
    }
  }

  // 2. Legacy Pipe-separated format: "Title|HTML Content"
  let title = DEFAULT_GREETING_DATA.title;
  let imageUrl = DEFAULT_GREETING_DATA.imageUrl;
  let slogan = DEFAULT_GREETING_DATA.slogan;
  let greeting = DEFAULT_GREETING_DATA.greeting;
  let signerCompany = DEFAULT_GREETING_DATA.signerCompany;
  let signerTitle = DEFAULT_GREETING_DATA.signerTitle;
  let signerName = DEFAULT_GREETING_DATA.signerName;

  const parts = trimmed.split('|');
  if (parts.length >= 1 && parts[0]?.trim()) {
    title = parts[0].trim();
  }

  let remaining = parts.length > 1 ? parts.slice(1).join('|').trim() : parts[0].trim();

  // Extract Slogan (from <h4>, <h3>, or first strong/bold header)
  const h4Match = remaining.match(/<h[1-4][^>]*>(?:<strong>)?([\s\S]*?)(?:<\/strong>)?<\/h[1-4]>/i);
  if (h4Match) {
    slogan = h4Match[1].replace(/<[^>]+>/g, '').trim();
    remaining = remaining.replace(h4Match[0], '').trim();
  }

  // Extract Welcoming greeting (from <p>...환영합니다...</p>)
  const pMatch = remaining.match(/<p[^>]*>([\s\S]*?환영합니다[\s\S]*?)<\/p>/i);
  if (pMatch) {
    greeting = pMatch[1].replace(/<[^>]+>/g, '').trim();
    remaining = remaining.replace(pMatch[0], '').trim();
  }

  // Extract custom image url if included in img tag
  const imgMatch = remaining.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) {
    imageUrl = imgMatch[1];
    remaining = remaining.replace(imgMatch[0], '').trim();
  }

  const body = remaining || DEFAULT_GREETING_DATA.body;

  return {
    title,
    imageUrl,
    slogan,
    greeting,
    body,
    signerCompany,
    signerTitle,
    signerName
  };
}

export function serializeGreetingData(data: GreetingData): string {
  return JSON.stringify(data);
}
