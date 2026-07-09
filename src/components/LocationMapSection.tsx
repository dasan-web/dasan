'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import KakaoMap from './KakaoMap';
import { Landmark, Building2, Factory, Train, BusFront } from 'lucide-react';

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
    name: '서울 본사',
    subName: '경영총괄, 해외 영업본부, 마케팅 전략부서',
    lat: 37.5186,
    lng: 126.8906,
    placeName: '다산제약 서울 본사',
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
    subName: 'DDS 제제 연구, 유기합성 연구',
    lat: 37.266205,
    lng: 127.054366,
    placeName: '다산제약 수원 중앙연구소',
    address: '경기 수원시 영통구 신원로 304 (원천동) 이노플렉스 3동 306호',
    tel: '031-546-8200',
    subway: [
      '수인분당선 영통역 또는 청명역 하차 후 시내버스 환승 이용',
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
    subName: '완제의약품 생산본부',
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
    subName: '최첨단 스마트 패키징 & 대량생산 라인',
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
  }
];

export default function LocationMapSection({ dbContent }: { dbContent?: string | null }) {
  const [activeTab, setActiveTab] = useState<string>('seoul');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loc = params.get('loc');
    if (loc && ['seoul', 'suwon', 'asan1', 'asan2'].includes(loc)) {
      setActiveTab(loc);
    }
  }, []);

  let displayLocations = locations;

  if (dbContent) {
    const lines = dbContent.split('\n');
    displayLocations = [
      {
        id: 'seoul',
        name: lines[0] || '서울 본사',
        subName: lines[1] || '경영총괄, 해외 영업본부, 마케팅 전략부서',
        lat: parseFloat((lines[2] || '').split(',')[0]) || 37.5186,
        lng: parseFloat((lines[2] || '').split(',')[1]) || 126.8906,
        placeName: lines[3] || '다산제약 서울 본사',
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
      }
    ];
  }

  const activeLoc = displayLocations.find(loc => loc.id === activeTab) || displayLocations[0];

  const getIcon = (id: string, size: number = 18) => {
    switch (id) {
      case 'seoul':
        return <Landmark size={size} />;
      case 'suwon':
        return <Building2 size={size} />;
      default:
        return <Factory size={size} />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Location Selection Buttons (Tabs) & Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-gray-150">
        <div className="flex flex-wrap gap-3">
          {displayLocations.map(loc => {
          const isActive = activeTab === loc.id;
          return (
            <button
              key={loc.id}
              onClick={() => setActiveTab(loc.id)}
              className={`flex items-center space-x-2.5 px-6 py-3.5 rounded-full text-sm font-black transition-all cursor-pointer border ${
                isActive
                  ? 'bg-brand-green text-white border-brand-green shadow-green-glow'
                  : 'bg-[#FAFBFB] text-gray-650 border-gray-200 hover:bg-gray-50 hover:text-brand-green'
              }`}
            >
              {getIcon(loc.id, 16)}
              <span>{loc.name}</span>
            </button>
          );
        })}
        </div>
        <Link 
          href="/about/facilities"
          className="flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full text-sm font-bold text-gray-500 hover:text-white hover:bg-brand-green transition-all border border-gray-200 hover:border-brand-green group whitespace-nowrap"
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>이전페이지로 가기</span>
        </Link>
      </div>

      {/* Main Map Card for the Active Location */}
      <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-[0_10px_35px_rgba(0,0,0,0.02)] space-y-6">
        {/* Header Information */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div className="space-y-1">
            <div className="flex items-center space-x-2.5 text-brand-green">
              {getIcon(activeLoc.id, 20)}
              <h4 className="font-extrabold text-brand-blue text-lg md:text-xl">
                {activeLoc.placeName} 오시는 길
              </h4>
            </div>
            <p className="text-xs text-gray-500 font-bold pl-7">
              {activeLoc.subName}
            </p>
          </div>
          <div className="text-right text-xs pl-7 md:pl-0">
            <p className="text-gray-700 font-semibold">{activeLoc.address}</p>
            <p className="text-gray-500 font-bold mt-1">대표번호: {activeLoc.tel}</p>
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
          <div className="p-5 bg-[#FAFBFB] border border-gray-150 rounded-2xl space-y-3">
            <div className="flex items-center space-x-2 text-brand-green font-bold">
              <Train size={18} />
              <h5 className="text-brand-blue text-sm font-extrabold">지하철/철도 이용 시</h5>
            </div>
            <ul className="space-y-1.5 pl-6 list-disc text-gray-600 font-semibold">
              {activeLoc.subway.map((item, idx) => (
                <li key={idx} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>

          {/* Bus Section */}
          <div className="p-5 bg-[#FAFBFB] border border-gray-150 rounded-2xl space-y-3">
            <div className="flex items-center space-x-2 text-brand-green font-bold">
              <BusFront size={18} />
              <h5 className="text-brand-blue text-sm font-extrabold">버스 이용 시</h5>
            </div>
            <ul className="space-y-1.5 pl-6 list-disc text-gray-600 font-semibold">
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
