'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import KakaoMap from './KakaoMap';
import { Landmark, Building2, Factory, Train, BusFront, ArrowRight } from 'lucide-react';

interface LocationInfo {
  id: string;
  name: string;
  subName: string;
  lat: number;
  lng: number;
  placeName: string;
  address: string;
  tel: string;
  subway: string[];
  bus: string[];
}

const locations: LocationInfo[] = [
  {
    id: 'seoul',
    name: '서울 사무실',
    subName: '',
    lat: 37.5186,
    lng: 126.8906,
    placeName: '다산제약 서울 사무실',
    address: '서울특별시 영등포구 선유로 70 우리벤처타운 II 1302호',
    tel: '02-2627-5300',
    subway: [
      '2호선 문래역 3번 출구 도보 8분',
      '2/5호선 영등포구청역 6번 출구 도보 10분'
    ],
    bus: [
      '우리벤처타운 정류장 하차',
      '지선 6625, 6640A번 / 마을 영등포05번'
    ]
  },
  {
    id: 'suwon',
    name: '수원 중앙연구소',
    subName: '',
    lat: 37.266205,
    lng: 127.054366,
    placeName: '다산제약 수원 중앙연구소',
    address: '경기 수원시 영통구 신원로 304 (원천동) 이노플렉스 3동 306호',
    tel: '031-546-8200',
    subway: [
      '수인분당선 영통역 또는 청명역 하차 후 시내버스 환승',
      '수인분당선 망포역 4번 출구 도보 15분 (또는 버스 환승)'
    ],
    bus: [
      '이노플렉스 정류장 하차',
      '일반 62-1, 82-1, 99번 / 마을 55번'
    ]
  },
  {
    id: 'asan1',
    name: '아산 제1공장',
    subName: '',
    lat: 36.7589,
    lng: 126.8687,
    placeName: '다산제약 아산 제1공장',
    address: '충청남도 아산시 도고면 덕암산로 342 (와산리 10번지)',
    tel: '041-543-5311',
    subway: [
      '1호선 신창역(순천향대) 하차 후 택시 이동 (약 10분)',
      '도고온천역(장항선) 하차 후 택시 이용'
    ],
    bus: [
      '와산1리 정류장 하차 후 도보 2분',
      '아산 시내버스 400번대 노선 이용'
    ]
  },
  {
    id: 'asan2',
    name: '아산 제2공장',
    subName: '',
    lat: 36.7621,
    lng: 126.8698,
    placeName: '다산제약 아산 제2공장',
    address: '충청남도 아산시 도고면 덕암산로 381 (와산리 30번지)',
    tel: '041-428-9484',
    subway: [
      '1호선 신창역(순천향대) 하차 후 택시 이동 (약 10분)',
      '도고온천역(장항선) 하차 후 택시 이용'
    ],
    bus: [
      '와산1리 정류장 하차 후 도보 2분',
      '아산 시내버스 400번대 노선 이용'
    ]
  },
  {
    id: 'china',
    name: '중국 선양연구소',
    subName: '',
    lat: 41.6906,
    lng: 123.4779,
    placeName: '다산제약 중국 선양연구소',
    address: 'Room 310, Building F9, Shangshengou Village, Hunnan District, Shenyang, Liaoning, 중국 110179',
    tel: '',
    subway: [
      '심양 트램 1·2호선 궈지롼젠위안(国际软件园)역 하차',
      '심양 지하철 2호선 취안윈루(全运路)역 또는 백탑하(白塔河路)역 하차 후 택시 이동'
    ],
    bus: [
      '선양국제소프트웨어파크(Shenyang International Software Park) 방면 버스 이용',
      '상성거우(上深沟, Shangshengou) 또는 소프트웨어파크 F동 인근 하차'
    ]
  },
  {
    id: 'anhui',
    name: '중국 안휘성 공장',
    subName: '',
    lat: 32.787400,
    lng: 118.985600,
    placeName: '다산제약 중국 안휘성 공장 (안휘허이다산의약)',
    address: '中国安徽省天长市杨村镇工业园 (또는 안후이성 추주시 톈창시 양춘진 공업단지)',
    tel: '',
    subway: [
      '난징 루커우 국제공항(NKG) 또는 톈창시 시외버스터미널 연계 차량 이동',
      '고속철도 추저우역(滁州站) 또는 난징남역(南京南站) 하차 후 차량 이동'
    ],
    bus: [
      '톈창시(天长市) 버스터미널에서 양춘진(杨村镇) 방면 시내버스 또는 차량 이용',
      '양춘진 공업단지(杨村镇工业园 / 康达路) 하차'
    ]
  }
];

export default function LocationMapSection({ dbContent, hideBackButton = false }: { dbContent?: string | null, hideBackButton?: boolean }) {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');
  const [activeTab, setActiveTab] = useState<string>('seoul');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loc = params.get('loc');
    if (loc && ['seoul', 'suwon', 'asan1', 'asan2', 'china', 'anhui'].includes(loc)) {
      setActiveTab(loc);
    }
  }, []);

  
  const enLocations = [
    {
      id: 'seoul',
      name: 'Seoul Office',
      subName: '',
      lat: 37.5186,
      lng: 126.8906,
      placeName: 'Dasan Pharmaceutical Seoul Office',
      address: '#1302, Woori Venture Town II, 70 Seonyu-ro, Yeongdeungpo-gu, Seoul',
      tel: '02-2627-5300',
      subway: [
        '8 mins walk from Exit 3, Mullae Stn, Line 2',
        '10 mins walk from Exit 2, Yangpyeong Stn, Line 5'
      ],
      bus: [
        '1 min walk from Crown Confectionery stop (Yeongdeungpo 05 village bus)',
        '3 mins walk from Mullae-dong Post Office stop'
      ]
    },
    {
      id: 'suwon',
      name: 'Suwon Central Research Lab',
      subName: '',
      lat: 37.266205,
      lng: 127.054366,
      placeName: 'Dasan Pharmaceutical Suwon Lab',
      address: '#306, Building 3, Innoplex, 304 Sinwon-ro, Yeongtong-gu, Suwon-si, Gyeonggi-do',
      tel: '031-546-8200',
      subway: [
        'Transfer to bus after getting off at Mangpo Stn (Suin-Bundang Line)',
        'Transfer to bus after getting off at Maetan Gwonseon Stn (Suin-Bundang Line)'
      ],
      bus: [
        '3 mins walk from Digital Empire 2 stop',
        'Use Suwon city bus 39, 51, 62-1 routes'
      ]
    },
    {
      id: 'asan1',
      name: 'Asan Plant 1',
      subName: '',
      lat: 36.7589,
      lng: 126.8687,
      placeName: 'Dasan Pharmaceutical Asan Plant 1',
      address: '342 Deogam-sanro, Dogo-myeon, Asan-si, Chungcheongnam-do',
      tel: '041-543-5311',
      subway: [
        'Take a taxi after getting off at Sinchang Stn (Line 1) (approx. 10 mins)',
        'Take a taxi after getting off at Dogo Oncheon Stn (Janghang Line)'
      ],
      bus: [
        '2 mins walk after getting off at Wasan 1-ri stop',
        'Use Asan city bus 400 series routes'
      ]
    },
    {
      id: 'asan2',
      name: 'Asan Plant 2',
      subName: '',
      lat: 36.7621,
      lng: 126.8698,
      placeName: 'Dasan Pharmaceutical Asan Plant 2',
      address: '381 Deogam-sanro, Dogo-myeon, Asan-si, Chungcheongnam-do',
      tel: '041-428-9484',
      subway: [
        'Take a taxi after getting off at Sinchang Stn (Line 1) (approx. 10 mins)',
        'Take a taxi after getting off at Dogo Oncheon Stn (Janghang Line)'
      ],
      bus: [
        '2 mins walk after getting off at Wasan 1-ri stop',
        'Use Asan city bus 400 series routes'
      ]
    },
    {
      id: 'china',
      name: 'China Shenyang Lab',
      subName: '',
      lat: 41.6906,
      lng: 123.4779,
      placeName: 'Dasan Pharmaceutical China Shenyang Lab',
      address: 'Room 310, Building F9, Shangshengou Village, Hunnan District, Shenyang, Liaoning, China 110179',
      tel: '',
      subway: [
        'Shenyang Modern Tram Line 1/2: Get off at International Software Park (国际软件园) Station',
        'Shenyang Metro Line 2: Get off at Quanyunlu or Baitahelu Station and transfer to taxi'
      ],
      bus: [
        'Bus routes bound for Shenyang International Software Park',
        'Get off near Building F or Shangshengou Village stop'
      ]
    },
    {
      id: 'anhui',
      name: 'Anhui Plant (China)',
      subName: '',
      lat: 32.787400,
      lng: 118.985600,
      placeName: 'Dasan Pharmaceutical China Anhui Plant',
      address: 'Kangda Road, Yangcun Town Industrial Zone, Tianchang City, Anhui Province, China',
      tel: '',
      subway: [
        'Nanjing Lukou International Airport (NKG) / Tianchang Coach Terminal transfer',
        'High-speed rail Chuzhou Station or Nanjing South Station + taxi transfer'
      ],
      bus: [
        'From Tianchang Bus Terminal take bus or taxi toward Yangcun Town',
        'Get off at Yangcun Town Industrial Zone (Kangda Road)'
      ]
    }
  ];

  let displayLocations = isEnglish ? enLocations : locations;

  if (dbContent) {
    const lines = dbContent.split('\n');
    displayLocations = [
      {
        id: 'seoul',
        name: lines[0] || '서울 사무실',
        subName: lines[1] || '경영총괄, 해외 영업본부, 마케팅 전략부서',
        lat: parseFloat((lines[2] || '').split(',')[0]) || 37.5186,
        lng: parseFloat((lines[2] || '').split(',')[1]) || 126.8906,
        placeName: lines[3] || '다산제약 서울 사무실',
        address: lines[4] || '서울특별시 영등포구 선유로 70 우리벤처타운 II 1302호',
        tel: lines[5] || '02-2627-5300',
        subway: (lines[6] || '').split('|').filter(Boolean),
        bus: (lines[7] || '').split('|').filter(Boolean),
      },
      {
        id: 'suwon',
        name: lines[8] || '수원 중앙연구소',
        subName: lines[9] || 'DDS 제제 연구, 유기합성 연구',
        lat: parseFloat((lines[10] || '').split(',')[0]) || 37.266205,
        lng: parseFloat((lines[10] || '').split(',')[1]) || 127.054366,
        placeName: lines[11] || '다산제약 수원 중앙연구소',
        address: lines[12] || '경기 수원시 영통구 신원로 304 (원천동) 이노플렉스 3동 306호',
        tel: lines[13] || '031-546-8200',
        subway: (lines[14] || '').split('|').filter(Boolean),
        bus: (lines[15] || '').split('|').filter(Boolean),
      },
      {
        id: 'asan1',
        name: lines[16] || '아산 제1공장',
        subName: lines[17] || '완제의약품 생산본부',
        lat: parseFloat((lines[18] || '').split(',')[0]) || 36.7589,
        lng: parseFloat((lines[18] || '').split(',')[1]) || 126.8687,
        placeName: lines[19] || '다산제약 아산 제1공장',
        address: lines[20] || '충청남도 아산시 도고면 덕암산로 342 (와산리 10번지)',
        tel: lines[21] || '041-543-5311',
        subway: (lines[22] || '').split('|').filter(Boolean),
        bus: (lines[23] || '').split('|').filter(Boolean),
      },
      {
        id: 'asan2',
        name: lines[24] || '아산 제2공장',
        subName: lines[25] || '최첨단 스마트 패키징 & 대량생산 라인',
        lat: parseFloat((lines[26] || '').split(',')[0]) || 36.7621,
        lng: parseFloat((lines[26] || '').split(',')[1]) || 126.8698,
        placeName: lines[27] || '다산제약 아산 제2공장',
        address: lines[28] || '충청남도 아산시 도고면 덕암산로 381 (와산리 30번지)',
        tel: lines[29] || '041-428-9484',
        subway: (lines[30] || '').split('|').filter(Boolean),
        bus: (lines[31] || '').split('|').filter(Boolean),
      },
      {
        id: 'china',
        name: lines[32] || '중국 선양연구소',
        subName: lines[33] || '',
        lat: parseFloat((lines[34] || '').split(',')[0]) || 41.6906,
        lng: parseFloat((lines[34] || '').split(',')[1]) || 123.4779,
        placeName: lines[35] || '다산제약 중국 선양연구소',
        address: lines[36] || 'Room 310, Building F9, Shangshengou Village, Hunnan District, Shenyang, Liaoning, 중국 110179',
        tel: (lines[37] && lines[37] !== '-') ? lines[37] : '',
        subway: (lines[38] || '심양 트램 1·2호선 궈지롼젠위안(国际软件园)역 하차|심양 지하철 2호선 취안윈루(全运路)역 또는 백탑하(白塔河路)역 하차 후 택시 이동').split('|').filter(Boolean),
        bus: (lines[39] || '선양국제소프트웨어파크(Shenyang International Software Park) 방면 버스 이용|상성거우(上深沟, Shangshengou) 또는 소프트웨어파크 F동 인근 하차').split('|').filter(Boolean),
      }
    ];
  }

  const normalizeName = (name: string) => {
    if (name === '서울 본사') return '서울 사무실';
    if (name === '중국 공장') return '중국 선양연구소';
    return name;
  };

  const normalizePlaceName = (name: string) => {
    if (!name) return '';
    return name.replace(/서울\s*본사/g, '서울 사무실').replace(/중국\s*공장/g, '중국 선양연구소');
  };

  displayLocations = displayLocations.map((loc) => ({
    ...loc,
    name: normalizeName(loc.name),
    placeName: normalizePlaceName(loc.placeName),
    subName: '',
    tel: loc.id === 'china' ? '' : loc.tel,
  }));

  const activeLoc = displayLocations.find(loc => loc.id === activeTab) || displayLocations[0];

  const getIcon = (id: string, size: number = 18) => {
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

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Location Selection Buttons (Tabs) & Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3">
        <div className="flex flex-wrap gap-3">
          {displayLocations.map(loc => {
          const isActive = activeTab === loc.id;
          return (
            <button
              key={loc.id}
              onClick={() => {
                setActiveTab(loc.id);
              }}
              className={`inline-flex items-center justify-center px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer border group shrink-0 ${
                isActive
                  ? 'bg-brand-green text-white border-brand-green shadow-green-glow'
                  : 'bg-white text-gray-900 border-gray-300 hover:bg-brand-green hover:text-white hover:border-brand-green hover:shadow-green-glow'
              }`}
            >
              <span>{loc.name}</span>
            </button>
          );
        })}
        </div>
      </div>

      {/* Main Map Card for the Active Location */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_10px_35px_rgba(0,0,0,0.02)] space-y-6">
        {/* Header Information */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div className="space-y-1">
            <div className="flex items-center space-x-2.5 text-brand-green">
              {getIcon(activeLoc.id, 20)}
              <h4 className="font-extrabold text-brand-blue text-lg md:text-xl">
                {activeLoc.placeName} {isEnglish ? "Directions" : "오시는 길"}
              </h4>
            </div>
          </div>
          <div className="text-right text-xs pl-7 md:pl-0">
            <p className="text-gray-700 font-semibold">{activeLoc.address}</p>
            {activeLoc.tel && activeLoc.tel !== '-' && (
              <p className="text-gray-500 font-bold mt-1">{isEnglish ? "Main Number" : "대표번호"}: {activeLoc.tel}</p>
            )}
          </div>
        </div>

        {/* Map Container */}
        <div className="w-full h-80 md:h-[400px] rounded-2xl overflow-hidden border border-gray-200 relative">
          <KakaoMap
            key={activeLoc.id} // Re-mount Map component to update script lat/lng accurately
            latitude={activeLoc.lat}
            longitude={activeLoc.lng}
            placeName={activeLoc.placeName}
            address={activeLoc.address}
            useGoogleMap={true}
          />
        </div>

        {/* Transportation Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-600 pt-2">
          {/* Subway Section */}
          <div className="p-4.5 sm:p-5 bg-[#FAFBFB] border border-gray-200 rounded-2xl space-y-3">
            <div className="flex items-center space-x-2 text-brand-green font-bold">
              <Train size={18} />
              <h5 className="text-brand-blue text-sm font-extrabold">{isEnglish ? "By Subway/Train" : "지하철/철도 이용 시"}</h5>
            </div>
            <ul className="space-y-1.5 pl-4.5 sm:pl-5 list-disc text-gray-600 font-semibold break-keep">
              {activeLoc.subway.map((item, idx) => (
                <li key={idx} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>

          {/* Bus Section */}
          <div className="p-4.5 sm:p-5 bg-[#FAFBFB] border border-gray-200 rounded-2xl space-y-3">
            <div className="flex items-center space-x-2 text-brand-green font-bold">
              <BusFront size={18} />
              <h5 className="text-brand-blue text-sm font-extrabold">{isEnglish ? "By Bus" : "버스 이용 시"}</h5>
            </div>
            <ul className="space-y-1.5 pl-4.5 sm:pl-5 list-disc text-gray-600 font-semibold break-keep">
              {activeLoc.bus.map((item, idx) => (
                <li key={idx} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
