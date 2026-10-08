'use client';

import React, { useEffect, useRef, useState } from 'react';
import { 
  Building2, 
  Factory, 
  Landmark,
  Zap, 
  MapPin, 
  Phone, 
  Train, 
  BusFront, 
  Layers,
  Map as MapIcon,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';

export interface FacilityLocation {
  id: string;
  name: string;
  shortName: string;
  enName: string;
  enShortName: string;
  category: string;
  enCategory: string;
  pic3Tag: string;
  pic3Title: string;
  pic3Desc: string;
  enPic3Tag: string;
  enPic3Title: string;
  enPic3Desc: string;
  country: string;
  countryBadge: string;
  enCountryBadge: string;
  lat: number;
  lng: number;
  labelPositionClass: string;
  address: string;
  enAddress: string;
  tel: string;
  role: string;
  enRole: string;
  description: string;
  enDescription: string;
  keyFeatures: string[];
  enKeyFeatures: string[];
  transport: {
    subway: string[];
    bus: string[];
  };
  enTransport: {
    subway: string[];
    bus: string[];
  };
  googleSearchUrl: string;
  googleRouteUrl: string;
  kakaoRouteUrl?: string;
}

const FACILITIES_DATA: FacilityLocation[] = [
  {
    id: 'seoul',
    shortName: '서울 사무실',
    enShortName: 'Seoul Office',
    name: '다산제약 서울 사무실 (Seoul Office)',
    enName: 'Dasan Pharmaceutical Seoul Office',
    category: '본사 거점',
    enCategory: 'Headquarters',
    pic3Tag: 'SEOUL OFFICE',
    pic3Title: '서울사무실',
    pic3Desc: '경영, 영업, 구매, 사업개발 등 지속 가능한 미래 성장 전략 수립',
    enPic3Tag: 'SEOUL OFFICE',
    enPic3Title: 'Seoul Office',
    enPic3Desc: 'Establishment of management, sales, purchasing, business development, and sustainable future growth strategies',
    country: '대한민국',
    countryBadge: '국내 본사',
    enCountryBadge: 'Headquarters',
    lat: 37.520170,
    lng: 126.890212,
    labelPositionClass: 'bottom-5 left-1/2 -translate-x-1/2', // Above pointer (North)
    address: '서울특별시 영등포구 선유로 70 우리벤처타운 II 1302호',
    enAddress: '#1302, Woori Venture Town II, 70 Seonyu-ro, Yeongdeungpo-gu, Seoul, Korea',
    tel: '02-2627-5300',
    role: '경영 총괄, 국내외 영업 및 마케팅, 글로벌 사업개발(BD) 등 지속 가능한 미래 성장 전략 수립',
    enRole: 'Management, domestic & overseas sales, BD, and long-term sustainable growth strategy formulation.',
    description: '다산제약의 두뇌 역할을 하는 전략적 컨트롤 타워로서, 국내외 제약사와의 파트너십, 의약품 유통, 신성장 동력 발굴을 이끌어갑니다.',
    enDescription: 'Serving as the strategic brain and control tower of Dasan Pharmaceutical, steering business development and global partnerships.',
    keyFeatures: [
      '글로벌 라이선싱 & 비즈니스 개발(BD) 총괄',
      '전국 병·의원 및 약국 대상 영업/마케팅 네트워크',
      '지속 가능한 ESG 경영 및 미래 투자 전략 수립'
    ],
    enKeyFeatures: [
      'Global licensing & Business Development (BD) leadership',
      'Nationwide medical and pharmaceutical distribution network',
      'ESG management and long-term corporate strategy execution'
    ],
    transport: {
      subway: [
        '지하철 2호선 문래역 3번 출구 도보 약 8분',
        '지하철 2/5호선 영등포구청역 6번 출구 도보 약 10분'
      ],
      bus: [
        '우리벤처타운 정류장 하차',
        '지선 6625, 6640A번 / 마을 영등포05번'
      ]
    },
    enTransport: {
      subway: [
        'Line 2 Mullae Station Exit 3 (approx. 8 mins walk)',
        'Line 2/5 Yeongdeungpo-gu Office Station Exit 6 (approx. 10 mins walk)'
      ],
      bus: [
        'Get off at Woori Venture Town stop',
        'Bus 6625, 6640A / Village bus Yeongdeungpo 05'
      ]
    },
    googleSearchUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('다산제약 서울특별시 영등포구 선유로 70'),
    googleRouteUrl: 'https://www.google.com/maps/dir/?api=1&destination=37.520170,126.890212',
    kakaoRouteUrl: 'https://map.kakao.com/link/to/다산제약 서울사무실,37.520170,126.890212'
  },
  {
    id: 'suwon',
    shortName: '수원 중앙연구소',
    enShortName: 'Suwon Central R&D Lab',
    name: '수원 중앙연구소 (Suwon Central R&D Lab)',
    enName: 'Dasan Central Research Institute (Suwon)',
    category: 'R&D 중앙연구소',
    enCategory: 'Central R&D Lab',
    pic3Tag: 'R&D NETWORK',
    pic3Title: '수원 중앙연구소',
    pic3Desc: '제제 및 합성 관련 연구시설을 갖추고 연구개발 총괄',
    enPic3Tag: 'R&D NETWORK',
    enPic3Title: 'Suwon Central R&D Lab',
    enPic3Desc: 'Formulation and synthetic drug research facilities leading overall R&D operations',
    country: '대한민국',
    countryBadge: '연구 시설',
    enCountryBadge: 'R&D Hub',
    lat: 37.262182,
    lng: 127.061019,
    labelPositionClass: 'left-5 top-1/2 -translate-y-1/2', // Right of pointer (East)
    address: '경기 수원시 영통구 신원로 304 (원천동) 이노플렉스 3동 306호',
    enAddress: '#306, Bldg 3, Innoplex, 304 Sinwon-ro, Yeongtong-gu, Suwon-si, Gyeonggi-do, Korea',
    tel: '031-546-8200',
    role: '약물전달시스템(DDS) 플랫폼 기술 개발, 복합 개량신약 제제 연구 및 원료의약품(API) 고효율 합성 공정 총괄',
    enRole: 'Formulation DDS platform design, combination incrementally modified drugs (IMD), and API synthesis development.',
    description: '고난도 약물 방출 제어 기술과 마이크로 펠렛 코팅 기술을 기반으로 혁신적인 개량신약 및 차별화된 원료의약품 합성 연구를 선도합니다.',
    enDescription: 'Leading advanced drug delivery systems (DDS) and micro-pellet formulation technologies for differentiated modified drugs and API synthesis.',
    keyFeatures: [
      'DDS(Drug Delivery System) 서방형/다층 펠렛 제형 개발',
      '초고성능 액체크로마토그래피(UPLC), 나노 입도분석기 등 첨단 분석 인프라',
      '자체 API 합성 공정 최적화 및 제네릭 차별화 연구'
    ],
    enKeyFeatures: [
      'DDS sustained-release & multi-layer pellet coating formulation',
      'Cutting-edge analytical instruments: UPLC, nanoparticle size analyzer',
      'In-house high-efficiency API synthesis process optimization'
    ],
    transport: {
      subway: [
        '수인분당선 망포역 4번 출구 (도보 15분 또는 시내버스 환승)',
        '수인분당선 영통역 또는 청명역 하차 후 시내버스 환승'
      ],
      bus: [
        '이노플렉스 정류장 하차',
        '일반 62-1, 82-1, 99번 / 마을 55번'
      ]
    },
    enTransport: {
      subway: [
        'Suin-Bundang Line Mangpo Station Exit 4 (15 mins walk or bus transfer)',
        'Suin-Bundang Line Yeongtong or Cheongmyeong Station + bus transfer'
      ],
      bus: [
        'Get off at Innoplex stop',
        'Bus 62-1, 82-1, 99 / Village bus 55'
      ]
    },
    googleSearchUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('다산제약 중앙연구소 경기 수원시 영통구 신원로 304'),
    googleRouteUrl: 'https://www.google.com/maps/dir/?api=1&destination=37.262182,127.061019',
    kakaoRouteUrl: 'https://map.kakao.com/link/to/다산제약 수원중앙연구소,37.262182,127.061019'
  },
  {
    id: 'asan1',
    shortName: '아산 제1공장',
    enShortName: 'Asan Plant 1',
    name: '다산제약 아산 제1공장 (Asan Plant 1)',
    enName: 'Dasan Pharmaceutical Asan Plant 1',
    category: 'cGMP 생산시설',
    enCategory: 'cGMP Plant',
    pic3Tag: 'PRODUCTION BASE · 국내',
    pic3Title: '아산 제1공장 (충남 아산시)',
    pic3Desc: '원료 및 완제의약품 생산본부, cGMP 수준의 우수 의약품 생산',
    enPic3Tag: 'PRODUCTION BASE · DOMESTIC',
    enPic3Title: 'Asan Plant 1 (Asan, Chungnam)',
    enPic3Desc: 'Finished pharmaceuticals & API production headquarters meeting cGMP standards',
    country: '대한민국',
    countryBadge: '생산 거점',
    enCountryBadge: 'Production 1',
    lat: 36.759907,
    lng: 126.926416,
    labelPositionClass: 'right-5 top-1/2 -translate-y-1/2', // Left of pointer (West)
    address: '충청남도 아산시 도고면 덕암산로 342 (와산리 10번지)',
    enAddress: '342 Deogam-sanro, Dogo-myeon, Asan-si, Chungcheongnam-do, Korea',
    tel: '041-543-5311',
    role: '원료 및 완제의약품 생산본부, cGMP 및 KGMP 규격에 부합하는 우수 의약품 대량 제조',
    enRole: 'API & finished dosage production conforming to cGMP/KGMP standards, mass solid dosage production.',
    description: '독일 Glatt社 최첨단 유동층 코팅 설비와 초고속 타정 라인을 기반으로 연간 9억 정 이상의 정제, 캡슐제, 과립제를 안정적으로 양산하는 핵심 생산기지입니다.',
    enDescription: 'Equipped with German Glatt fluid-bed coater and high-speed tableting machines, delivering over 900 million tablets annually.',
    keyFeatures: [
      '독일 Glatt社 최첨단 유동층 코팅기 (GPCG-300, GPCG-120)',
      '초고속 이중정 타정기 및 연간 9억 정 규모 고형제 생산 라인',
      '중앙 자동화 컨트롤 모니터링 시스템(SCADA/BMS) 가동'
    ],
    enKeyFeatures: [
      'German Glatt fluid-bed coating systems (GPCG-300, GPCG-120)',
      'High-speed double rotary tablet press & 900M tablet annual capacity',
      'Integrated SCADA & BMS automated facility monitoring system'
    ],
    transport: {
      subway: [
        '수도권 전철 1호선 신창역(순천향대) 하차 후 택시 이동 (약 10분)',
        '장항선 도고온천역 하차 후 택시 이용'
      ],
      bus: [
        '와산1리 정류장 하차 후 도보 2분',
        '아산 시내버스 400번대 노선 이용'
      ]
    },
    enTransport: {
      subway: [
        'Line 1 Sinchang Station + taxi ride (approx. 10 mins)',
        'Janghang Line Dogo Oncheon Station + taxi ride'
      ],
      bus: [
        'Get off at Wasan 1-ri stop (2 mins walk)',
        'Asan City Bus route 400 series'
      ]
    },
    googleSearchUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('다산제약 아산제1공장 충청남도 아산시 도고면 덕암산로 342'),
    googleRouteUrl: 'https://www.google.com/maps/dir/?api=1&destination=36.759907,126.926416',
    kakaoRouteUrl: 'https://map.kakao.com/link/to/다산제약 아산제1공장,36.759907,126.926416'
  },
  {
    id: 'asan2',
    shortName: '아산 제2공장',
    enShortName: 'Asan Plant 2',
    name: '다산제약 아산 제2공장 (Asan Plant 2)',
    enName: 'Dasan Pharmaceutical Asan Plant 2',
    category: '스마트 패키징 & 자동화 물류',
    enCategory: 'Smart Packaging & Logistics',
    pic3Tag: 'PRODUCTION BASE · 국내',
    pic3Title: '아산 제2공장 (충남 아산시)',
    pic3Desc: '내용고형제 대량 생산 체제 및 최첨단 스마트 자동화 패키징 라인 구축',
    enPic3Tag: 'PRODUCTION BASE · DOMESTIC',
    enPic3Title: 'Asan Plant 2 (Asan, Chungnam)',
    enPic3Desc: 'Mass solid dosage production system and cutting-edge automated packaging line',
    country: '대한민국',
    countryBadge: '스마트 물류',
    enCountryBadge: 'Production 2',
    lat: 36.762073,
    lng: 126.923416,
    labelPositionClass: 'top-5 left-1/2 -translate-x-1/2', // Below pointer (South)
    address: '충청남도 아산시 도고면 덕암산로 381 (와산리 30번지)',
    enAddress: '381 Deogam-sanro, Dogo-myeon, Asan-si, Chungcheongnam-do, Korea',
    tel: '041-428-9484',
    role: '내용고형제 대량 생산 체제 및 최첨단 스마트 자동화 패키징, 항온항습 스마트 물류창고 운영',
    enRole: 'Mass solid formulation packaging automation and real-time climate-controlled smart logistics.',
    description: '유럽산 고속 블리스터 및 카토너 자동화 포장 라인과 함께 의약품 품질을 완벽하게 보존하는 실시간 온습도 제어 자동화 물류 시스템을 구축하고 있습니다.',
    enDescription: 'Equipped with European high-speed blister & cartoner lines and 24/7 temperature/humidity controlled smart logistics centers.',
    keyFeatures: [
      '독일·이탈리아산 고속 블리스터(Alu-Alu, PVC/PVDC) 포장 라인',
      '정제 고해상도 카메라 인쇄 선별 및 초고속 카토너 카운터 일원화',
      '24시간 실시간 온습도 조절 자동화 항온물류창고'
    ],
    enKeyFeatures: [
      'European high-speed blister packaging lines (Alu-Alu, PVC/PVDC)',
      'High-resolution vision inspection system & integrated cartoning',
      '24/7 climate-controlled smart automated warehouse'
    ],
    transport: {
      subway: [
        '수도권 전철 1호선 신창역(순천향대) 하차 후 택시 이동 (약 10분)',
        '장항선 도고온천역 하차 후 택시 이용'
      ],
      bus: [
        '와산1리 정류장 하차 후 도보 2분',
        '아산 시내버스 400번대 노선 이용'
      ]
    },
    enTransport: {
      subway: [
        'Line 1 Sinchang Station + taxi ride (approx. 10 mins)',
        'Janghang Line Dogo Oncheon Station + taxi ride'
      ],
      bus: [
        'Get off at Wasan 1-ri stop (2 mins walk)',
        'Asan City Bus route 400 series'
      ]
    },
    googleSearchUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('다산제약 아산제2공장 충청남도 아산시 도고면 덕암산로 381'),
    googleRouteUrl: 'https://www.google.com/maps/dir/?api=1&destination=36.762073,126.923416',
    kakaoRouteUrl: 'https://map.kakao.com/link/to/다산제약 아산제2공장,36.762073,126.923416'
  },
  {
    id: 'china',
    shortName: '중국 선양연구소',
    enShortName: 'Shenyang Lab (China)',
    name: '다산제약 중국 선양연구소 (Shenyang Lab)',
    enName: 'Dasan Pharmaceutical China Shenyang Lab',
    category: '글로벌 R&D 거점',
    enCategory: 'Global R&D Hub',
    pic3Tag: 'R&D NETWORK · 해외',
    pic3Title: '중국 선양연구소',
    pic3Desc: '중국 내 연구, 허가, 사업개발을 담당하는 글로벌 영토 확장의 전초시설',
    enPic3Tag: 'R&D NETWORK · OVERSEAS',
    enPic3Title: 'China Shenyang Lab',
    enPic3Desc: 'Overseas vanguard base overseeing R&D, clinical regulatory affairs, and global business development in China',
    country: '중국',
    countryBadge: '해외 거점',
    enCountryBadge: 'Overseas Hub',
    lat: 41.698403,
    lng: 123.481515,
    labelPositionClass: 'top-5 left-1/2 -translate-x-1/2', // Below pointer
    address: 'Room 310, Building F9, Shenyang International Software Park, Hunnan District, Shenyang, Liaoning, China 110179',
    enAddress: 'Room 310, Building F9, Shenyang International Software Park, Hunnan District, Shenyang, Liaoning, China 110179',
    tel: '-',
    role: '중국 내 연구, 허가, 임상 지원 및 글로벌 파트너링을 전담하는 글로벌 영토 확장의 핵심 전초기지',
    enRole: 'Oversees R&D, clinical trials, and regulatory approval in China as a vanguard for global market expansion.',
    description: '거대한 중국 제약 바이오 시장 진출을 위한 인허가 및 오픈 이노베이션 R&D 기지로서, 현지 유수 연구기관과의 공동 연구 및 글로벌 비즈니스 네트워크 확대를 주도합니다.',
    enDescription: 'Serving as an open innovation R&D and regulatory base for entering China, leading joint research and expanding global pharma networks.',
    keyFeatures: [
      '중국 내 신약/개량신약 인허가(NMPA) 등록 및 임상 지원',
      '현지 오픈 이노베이션 및 유망 바이오텍 파트너십 구축',
      '글로벌 시장 수출 확대를 위한 전략적 네트워크 거점'
    ],
    enKeyFeatures: [
      'NMPA regulatory registration and clinical trial support in China',
      'Open innovation partnerships with local Chinese research institutes',
      'Strategic networking hub to accelerate global market entry'
    ],
    transport: {
      subway: [
        '심양 트램 1·2호선 궈지롼젠위안(国际软件园)역 하차',
        '심양 지하철 2호선 취안윈루(全运路)역 또는 백탑하(白塔河路)역 하차 후 택시 환승'
      ],
      bus: [
        '선양국제소프트웨어파크(Shenyang International Software Park) 방면 버스 이용',
        '상성거우(上深沟, Shangshengou) 또는 소프트웨어파크 F동 인근 하차'
      ]
    },
    enTransport: {
      subway: [
        'Shenyang Modern Tram Line 1/2: International Software Park Station',
        'Shenyang Metro Line 2: Quanyunlu or Baitahelu Station + Taxi transfer'
      ],
      bus: [
        'Bus routes bound for Shenyang International Software Park',
        'Get off near Building F or Shangshengou stop'
      ]
    },
    googleSearchUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Shenyang International Software Park Building F9'),
    googleRouteUrl: 'https://www.google.com/maps/dir/?api=1&destination=41.698403,123.481515'
  },
  {
    id: 'anhui',
    shortName: '중국 안휘성 공장',
    enShortName: 'Anhui Plant (China)',
    name: '다산제약 중국 안휘성 공장 (Anhui Plant)',
    enName: 'Dasan Pharmaceutical China Anhui Plant',
    category: '글로벌 생산 거점',
    enCategory: 'Global Manufacturing Plant',
    pic3Tag: 'PRODUCTION BASE · 해외',
    pic3Title: '중국 안휘성 공장 (안휘허이다산의약)',
    pic3Desc: '중국 및 글로벌 시장 공급을 위한 첨단 의약품 생산 제조 거점',
    enPic3Tag: 'PRODUCTION BASE · OVERSEAS',
    enPic3Title: 'China Anhui Plant (Anhui Heyi Dasan Pharma)',
    enPic3Desc: 'State-of-the-art pharmaceutical manufacturing base supplying the Chinese and global markets',
    country: '중국',
    countryBadge: '해외 생산 거점',
    enCountryBadge: 'Overseas Plant',
    lat: 32.787400,
    lng: 118.985600,
    labelPositionClass: 'top-5 left-1/2 -translate-x-1/2',
    address: '中国安徽省天长市杨村镇工业园 (안후이성 추주시 톈창시 양춘진 공업단지)',
    enAddress: 'Kangda Road, Yangcun Town Industrial Zone, Tianchang City, Anhui Province, China',
    tel: '-',
    role: '중국 현지 및 글로벌 시장을 겨냥한 고품질 완제의약품 생산 및 기술 현지화 제조 거점',
    enRole: 'High-quality finished pharmaceutical production and local manufacturing base for Chinese and global markets.',
    description: '다산제약의 선진 제제기술과 현지 생산 인프라를 결합한 합작 생산기지로서, 우수한 품질의 의약품을 중국 전역 및 글로벌 시장에 안정적으로 생산·공급합니다.',
    enDescription: 'A joint manufacturing base combining Dasan Pharmaceutical advanced formulation technology with local infrastructure to supply high-quality pharmaceuticals across China and global markets.',
    keyFeatures: [
      '다산제약 제제기술 기반 고품질 완제의약품 제조',
      '중국 NMPA 규격에 부합하는 첨단 cGMP 생산 라인 구축',
      '거대 중국 및 아시아 시장 진출을 위한 핵심 공급망 거점'
    ],
    enKeyFeatures: [
      'High-quality finished pharmaceutical production based on Dasan DDS formulation technology',
      'Advanced cGMP production lines compliant with China NMPA standards',
      'Strategic supply chain hub accelerating expansion into China and Asian markets'
    ],
    transport: {
      subway: [
        '난징 루커우 국제공항(NKG) 또는 톈창시 시외버스터미널 연계 차량 이동',
        '고속철도 추저우역(滁州站) 또는 난징남역(南京南站) 하차 후 차량 이동'
      ],
      bus: [
        '톈창시(天长市) 버스터미널에서 양춘진(杨村镇) 방면 시내버스 또는 차량 이용',
        '양춘진 공업단지(杨村镇工业园 / 康达路) 하차'
      ]
    },
    enTransport: {
      subway: [
        'Nanjing Lukou International Airport (NKG) / Tianchang Coach Terminal transfer',
        'High-speed rail Chuzhou Station or Nanjing South Station + taxi transfer'
      ],
      bus: [
        'From Tianchang Bus Terminal take bus or taxi toward Yangcun Town',
        'Get off at Yangcun Town Industrial Zone (Kangda Road)'
      ]
    },
    googleSearchUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Kangda Road Yangcun Town Tianchang Anhui China'),
    googleRouteUrl: 'https://www.google.com/maps/dir/?api=1&destination=32.787400,118.985600'
  }
];

const getFacilityIcon = (id: string, size: number = 16) => {
  switch (id) {
    case 'seoul':
      return <Landmark size={size} />;
    case 'suwon':
    case 'china':
      return <Building2 size={size} />;
    default:
      return <Factory size={size} />;
  }
};

const resetToOverview = (map: any, animate: boolean = false) => {
  if (!map) return;
  const width = (map.getSize && typeof map.getSize === 'function') ? (map.getSize().x || 1200) : 1200;
  const zoom = width < 640 ? 3.6 : width < 960 ? 4.2 : 5;
  const center: [number, number] = [38.5, 124.0];

  if (animate && typeof map.flyTo === 'function') {
    map.flyTo(center, zoom, { duration: 1.2, easeLinearity: 0.25 });
  } else {
    map.setView(center, zoom);
  }
};

export default function GlobalFacilitiesMap({ isEnglish = false }: { isEnglish?: boolean }) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const currentTileLayerRef = useRef<any>(null);
  const isDetailedRef = useRef<boolean>(false);
  const mapTypeRef = useRef<'roadmap' | 'satellite'>('roadmap');
  const updateDetailModeRef = useRef<(detailed: boolean) => void>(() => {});
  const markersRef = useRef<{ [key: string]: any }>({});
  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  const selectedLoc = FACILITIES_DATA.find((f) => f.id === selectedId) || FACILITIES_DATA[0];

  // Reset to default regional view (returns to '지도' world overview & unselects buttons)
  const handleResetView = () => {
    if (!mapInstanceRef.current) return;
    try {
      setSelectedId(null);
      if (mapTypeRef.current !== 'roadmap') {
        handleToggleMapType('roadmap');
      }
      updateDetailModeRef.current(false);
      resetToOverview(mapInstanceRef.current, true);
    } catch (e) {
      console.error(e);
    }
  };

  // Dedicated handler to go straight back to initial screen with auto-scroll if needed
  const handleBackToInitialScreen = () => {
    handleResetView();
    const mapEl = document.getElementById('global-facilities-map-wrapper');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Focus map on a specific location (activates detailed mode with full text)
  const handleSelectFacility = (id: string, lat: number, lng: number, zoom = 18) => {
    setSelectedId(id);
    updateDetailModeRef.current(true);
    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.flyTo([lat, lng], zoom, {
          duration: 1.2,
          easeLinearity: 0.25
        });
      } catch (e) {
        console.error(e);
      }
    }
    // Ensure the facility detail panel is visible when selected
    setTimeout(() => {
      const panel = document.getElementById('facility-detail-panel');
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 120);
  };

  const handleSelectFacilityRef = useRef(handleSelectFacility);
  handleSelectFacilityRef.current = handleSelectFacility;

  // Switch between Google Roadmap and Google Hybrid Satellite
  const handleToggleMapType = async (type: 'roadmap' | 'satellite') => {
    setMapType(type);
    mapTypeRef.current = type;
    if (!mapInstanceRef.current) return;
    const L = (await import('leaflet')).default;
    const map = mapInstanceRef.current;
    
    if (currentTileLayerRef.current && map.hasLayer(currentTileLayerRef.current)) {
      map.removeLayer(currentTileLayerRef.current);
    }

    const hl = isEnglish ? 'en' : 'ko';
    // 'roadmap' (lyrs=m): standard roadmap with native text
    // 'satellite' (lyrs=y): hybrid satellite with full country, ocean, city, and street labels
    const lyrs = type === 'roadmap' ? 'm' : 'y';
    const tileUrl = `https://{s}.google.com/vt/lyrs=${lyrs}&x={x}&y={y}&z={z}&hl=${hl}`;
    const newLayer = L.tileLayer(tileUrl, {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: ''
    }).addTo(map);
    currentTileLayerRef.current = newLayer;
  };

  // Initialize Leaflet Map with authentic Google Maps Tile Layer
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      const L = (await import('leaflet')).default;
      if (!isMounted || !mapContainerRef.current) return;

      // Prevent tile seam lines (바둑판 실선 현상 방지: 타일 1px 오버랩 패치)
      const GridLayerClass = L.GridLayer as any;
      if (!GridLayerClass.__nogap_patched) {
        GridLayerClass.__nogap_patched = true;
        const originalInitTile = GridLayerClass.prototype._initTile;
        GridLayerClass.include({
          _initTile: function (tile: HTMLElement) {
            originalInitTile.call(this, tile);
            const tileSize = (this as any).getTileSize();
            tile.style.width = (tileSize.x + 1) + 'px';
            tile.style.height = (tileSize.y + 1) + 'px';
          }
        });
      }

      // Initial center matching user screenshot (East Asia: Korea, Shenyang, Japan, Eastern China)
      const containerWidth = mapContainerRef.current?.clientWidth || 1200;
      const initialCenter: [number, number] = [38.5, 124.0];
      const initialZoom = containerWidth < 640 ? 3.6 : containerWidth < 960 ? 4.2 : 5;

      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: initialZoom,
        zoomSnap: 0.25,
        zoomDelta: 0.5,
        minZoom: 1,
        maxZoom: 19,
        worldCopyJump: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        touchZoom: true,
        zoomControl: false,
        attributionControl: false
      });

      const hl = isEnglish ? 'en' : 'ko';
      const lyrs = mapTypeRef.current === 'roadmap' ? 'm' : 'y';
      const initialTileUrl = `https://{s}.google.com/vt/lyrs=${lyrs}&x={x}&y={y}&z={z}&hl=${hl}`;
      const initialLayer = L.tileLayer(initialTileUrl, {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: ''
      }).addTo(map);
      currentTileLayerRef.current = initialLayer;

      // Custom Red Dot Pointer Marker Creation with generous click targets
      FACILITIES_DATA.forEach((loc) => {
        const displayName = isEnglish ? loc.enShortName : loc.shortName;

        // Custom HTML for Compact Red Dot Pointer with 36x36px clickable target
        const customHtml = `
          <div 
            class="dasan-pointer-wrapper group cursor-pointer relative flex items-center justify-center select-none" 
            id="marker-${loc.id}" 
            style="width: 36px; height: 36px;"
          >
            <!-- Large transparent clickable hit circle -->
            <div class="absolute inset-0 rounded-full cursor-pointer"></div>

            <!-- Outer Subtle Pulse Wave -->
            <div class="absolute w-5 h-5 rounded-full bg-red-600/30 animate-ping pointer-events-none"></div>
            
            <!-- Compact Red Dot Pointer -->
            <div class="relative w-2.5 h-2.5 rounded-full bg-red-600 border border-white shadow-[0_0_5px_rgba(220,38,38,1)] transition-transform duration-150 transform group-hover:scale-150 pointer-events-none"></div>
          </div>
        `;

        const icon = L.divIcon({
          html: customHtml,
          className: 'custom-dasan-marker',
          iconSize: [36, 36],
          iconAnchor: [18, 18]
        });

        const marker = L.marker([loc.lat, loc.lng], { 
          icon,
          interactive: true,
          bubblingMouseEvents: false 
        }).addTo(map);

        // Hover Tooltip: Displays facility name when cursor hovers over the dot
        const tooltipHtml = `
          <div class="flex items-center gap-1.5 py-0.5 px-0.5 whitespace-nowrap">
            <span class="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,1)]"></span>
            <span class="text-xs font-black text-white tracking-tight">${displayName}</span>
          </div>
        `;

        marker.bindTooltip(tooltipHtml, {
          direction: 'top',
          offset: [0, -18],
          opacity: 1,
          className: 'dasan-facility-tooltip'
        });

        marker.on('click', (e: any) => {
          if (e && e.originalEvent) {
            e.originalEvent.stopPropagation();
          }
          handleSelectFacilityRef.current(loc.id, loc.lat, loc.lng, 17);
        });

        markersRef.current[loc.id] = marker;
      });

      // Proximity click handler on the map canvas:
      // Catches clicks anywhere within 40 pixels of any marker, guaranteeing seamless clicking even when zoomed out
      map.on('click', (e: any) => {
        if (!e.latlng) return;
        const clickPoint = map.latLngToContainerPoint(e.latlng);
        let closestLoc: any = null;
        let minDistance = 40; // 40px radius

        FACILITIES_DATA.forEach((loc) => {
          const locPoint = map.latLngToContainerPoint([loc.lat, loc.lng]);
          const dist = Math.hypot(clickPoint.x - locPoint.x, clickPoint.y - locPoint.y);
          if (dist < minDistance) {
            minDistance = dist;
            closestLoc = loc;
          }
        });

        if (closestLoc) {
          handleSelectFacilityRef.current(closestLoc.id, closestLoc.lat, closestLoc.lng, 17);
        }
      });

      const updateDetailMode = (detailed: boolean) => {
        isDetailedRef.current = detailed;
      };
      updateDetailModeRef.current = updateDetailMode;

      // Default View: Exactly matching the user uploaded screenshot (Korea, Shenyang, Japan, Eastern China)
      resetToOverview(map, false);

      mapInstanceRef.current = map;
      setMapLoaded(true);

      // Invalidate size and ensure accurate bounds after container renders in DOM
      const timer1 = setTimeout(() => {
        if (!isMounted || !map) return;
        map.invalidateSize();
        resetToOverview(map, false);
      }, 150);

      const timer2 = setTimeout(() => {
        if (!isMounted || !map) return;
        map.invalidateSize();
        resetToOverview(map, false);
      }, 450);

      const handleResize = () => {
        if (map) {
          map.invalidateSize();
          if (!isDetailedRef.current) {
            resetToOverview(map, false);
          }
        }
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }

    let cleanupResize: (() => void) | undefined;
    initMap().then((cleanup) => {
      cleanupResize = cleanup;
    });

    return () => {
      isMounted = false;
      if (cleanupResize) cleanupResize();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isEnglish]);

  // Update active marker styling when selectedId changes
  useEffect(() => {
    FACILITIES_DATA.forEach((loc) => {
      const el = document.getElementById(`marker-${loc.id}`);
      if (!el) return;
      if (loc.id === selectedId) {
        el.classList.add('scale-125', 'z-50');
      } else {
        el.classList.remove('scale-125', 'z-50');
      }
    });
  }, [selectedId]);

  return (
    <div id="global-facilities-map-wrapper" className="w-full space-y-6 my-8 animate-fade-in">
      {/* Custom Styles for Map Tiles & Interactive Facility Hover Tooltips */}
      <style>{`
        /* Completely eliminate tile borders and checkerboard seams (바둑판 실선 완전 제거) */
        .leaflet-container {
          background: #060b14 !important;
          outline: none !important;
        }
        .leaflet-container img.leaflet-tile {
          mix-blend-mode: normal !important;
          max-width: none !important;
          max-height: none !important;
          border: none !important;
          margin: 0 !important;
          padding: 0 !important;
          outline: 1px solid transparent !important;
          box-shadow: 0 0 1px rgba(0, 0, 0, 0.05);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .leaflet-tile {
          border: none !important;
          outline: 1px solid transparent !important;
        }

        .dasan-facility-tooltip {
          background-color: rgba(15, 23, 42, 0.95) !important;
          color: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.25) !important;
          border-radius: 8px !important;
          padding: 4px 10px !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3) !important;
          font-family: inherit !important;
          pointer-events: none !important;
        }
        .leaflet-tooltip-top.dasan-facility-tooltip::before {
          border-top-color: rgba(15, 23, 42, 0.95) !important;
        }
        .leaflet-tooltip-bottom.dasan-facility-tooltip::before {
          border-bottom-color: rgba(15, 23, 42, 0.95) !important;
        }
        .custom-dasan-marker {
          cursor: pointer !important;
          background: transparent !important;
          border: none !important;
        }
        .custom-dasan-marker:hover {
          z-index: 9999 !important;
        }
      `}</style>

      {/* Facility Selection Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        {FACILITIES_DATA.map((loc) => {
          const isSelected = selectedId === loc.id;
          const label = isEnglish ? loc.enShortName : loc.shortName;
          return (
            <button
              key={loc.id}
              type="button"
              onClick={() => handleSelectFacility(loc.id, loc.lat, loc.lng, 18)}
              className={`inline-flex items-center justify-center px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer border group shrink-0 ${
                isSelected
                  ? 'bg-brand-green text-white border-brand-green shadow-green-glow'
                  : 'bg-white text-gray-900 border-gray-300 hover:bg-brand-green hover:text-white hover:border-brand-green hover:shadow-green-glow'
              }`}
            >
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Map & Facility Detail Enclosed in a Bordered Container */}
      <div className="bg-white rounded-[28px] sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-gray-200 shadow-sm space-y-6 sm:space-y-7">
        {/* Main Map Box with Real Google Maps Graphics */}
        <div 
          className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-white"
          style={{ transform: 'translateZ(0)', WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
        >
          <div ref={mapContainerRef} className="w-full h-full z-0 bg-transparent" />

          {/* Map Mode & Reset Controls (Top Right) */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            {/* Map Layer Switcher: Roadmap vs Satellite */}
            <div className="bg-white/95 backdrop-blur-md p-1 rounded-xl border border-gray-200 shadow-md flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleToggleMapType('roadmap')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  mapType === 'roadmap'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <MapIcon size={12} />
                <span>{isEnglish ? 'Map' : '지도'}</span>
              </button>
              <button
                type="button"
                onClick={() => handleToggleMapType('satellite')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  mapType === 'satellite'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Layers size={12} />
                <span>{isEnglish ? 'Satellite' : '위성'}</span>
              </button>
            </div>

            {/* Direct Return to Initial Screen Button */}
            <button
              type="button"
              onClick={handleResetView}
              className="bg-white/95 backdrop-blur-md hover:bg-white text-gray-800 px-3 py-2 rounded-xl text-xs font-extrabold border border-gray-200 shadow-md transition-all flex items-center gap-1.5 cursor-pointer hover:text-blue-600 hover:border-blue-300"
              title="초기 전체 화면으로 바로 돌아갑니다"
            >
              <RotateCcw size={13} className="text-blue-600" />
              <span>{isEnglish ? 'Initial View' : '처음 화면'}</span>
            </button>
          </div>
        </div>

        {/* Selected Location Detailed Information (Inner border removed per user request) */}
        <div 
          id="facility-detail-panel" 
          className="space-y-6 animate-fade-in"
        >
        {/* Header Information: Picture 3 content style */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 pb-5 border-b border-gray-100">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-gray-50 text-gray-700 border border-gray-200/70 rounded-2xl shrink-0 mt-0.5 shadow-2xs">
              {getFacilityIcon(selectedLoc.id, 28)}
            </div>
            <div className="space-y-1.5">
              <span className="text-[10.5px] text-gray-400 font-extrabold uppercase tracking-widest block">
                {isEnglish ? selectedLoc.enPic3Tag : selectedLoc.pic3Tag}
              </span>
              <h4 className="font-black text-gray-900 text-xl sm:text-2xl text-brand-blue">
                {isEnglish ? selectedLoc.enPic3Title : selectedLoc.pic3Title}
              </h4>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5 text-xs sm:text-sm">
                <span className="text-gray-600 font-semibold flex items-center gap-1.5">
                  <MapPin size={14} className="shrink-0 text-gray-400" />
                  {isEnglish ? selectedLoc.enAddress : selectedLoc.address}
                </span>
                {selectedLoc.tel && selectedLoc.tel !== '-' && (
                  <span className="text-gray-500 font-semibold flex items-center gap-1.5">
                    <Phone size={13} className="shrink-0 text-gray-400" />
                    <span>{isEnglish ? "Tel: " : "대표번호: "}</span>
                    <a href={`tel:${selectedLoc.tel}`} className="text-gray-600 hover:text-brand-blue hover:underline">
                      {selectedLoc.tel}
                    </a>
                  </span>
                )}
              </div>
              <p className="text-[13.5px] sm:text-[14px] text-gray-600 font-medium leading-relaxed pt-1 break-keep pl-5">
                {isEnglish ? selectedLoc.enPic3Desc : selectedLoc.pic3Desc}
              </p>
            </div>
          </div>
        </div>

        {/* Transportation Details (Exact Picture 2 Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-600 pt-1">
          {/* Subway Section */}
          <div className="p-4.5 sm:p-5 bg-white border border-gray-200 rounded-2xl space-y-3">
            <div className="flex items-center space-x-2 text-brand-green font-bold">
              <Train size={18} />
              <h5 className="text-brand-blue text-sm font-extrabold">
                {isEnglish ? "By Subway/Train" : "지하철/철도 이용 시"}
              </h5>
            </div>
            <ul className="space-y-1.5 pl-4.5 sm:pl-5 list-disc text-gray-600 font-semibold break-keep">
              {(isEnglish ? selectedLoc.enTransport.subway : selectedLoc.transport.subway).map((item, idx) => (
                <li key={idx} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>

          {/* Bus Section */}
          <div className="p-4.5 sm:p-5 bg-white border border-gray-200 rounded-2xl space-y-3">
            <div className="flex items-center space-x-2 text-brand-green font-bold">
              <BusFront size={18} />
              <h5 className="text-brand-blue text-sm font-extrabold">
                {isEnglish ? "By Bus" : "버스 이용 시"}
              </h5>
            </div>
            <ul className="space-y-1.5 pl-4.5 sm:pl-5 list-disc text-gray-600 font-semibold break-keep">
              {(isEnglish ? selectedLoc.enTransport.bus : selectedLoc.transport.bus).map((item, idx) => (
                <li key={idx} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
