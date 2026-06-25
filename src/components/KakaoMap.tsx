'use client';

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { MapPin, Navigation, ExternalLink, Settings } from 'lucide-react';

interface KakaoMapProps {
  latitude?: number;
  longitude?: number;
  placeName?: string;
  address?: string;
  useGoogleMap?: boolean;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap({
  latitude = 37.5186,
  longitude = 126.8906,
  placeName = '다산제약 서울 본사',
  address = '서울특별시 영등포구 선유로 70 우리벤처타운 II 1302호',
  useGoogleMap = false,
}: KakaoMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  
  const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

  const handleKakaoMapInit = () => {
    if (!window.kakao || !window.kakao.maps) return;

    window.kakao.maps.load(() => {
      if (!mapContainerRef.current) return;

      const container = mapContainerRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);

      // Add Zoom and MapType Control
      const mapTypeControl = new window.kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

      // Create Marker
      const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);

      // Info Window
      const iwContent = `
        <div style="padding: 10px; width: 220px; font-family: sans-serif; font-size: 12px; border-radius: 8px;">
          <div style="font-weight: bold; color: #1e3a8a; margin-bottom: 4px;">${placeName}</div>
          <div style="color: #6b7280; font-size: 11px; line-height: 1.4; margin-bottom: 6px;">${address}</div>
          <a href="https://map.kakao.com/link/to/${placeName},${latitude},${longitude}" target="_blank" rel="noopener noreferrer" style="color: #0ea5e9; text-decoration: none; font-weight: bold; display: inline-flex; align-items: center; gap: 2px;">
            길찾기 바로가기 ↗
          </a>
        </div>
      `;

      const infowindow = new window.kakao.maps.InfoWindow({
        content: iwContent,
        removable: true,
      });

      infowindow.open(map, marker);

      // Handle window resize
      const handleResize = () => {
        map.setCenter(new window.kakao.maps.LatLng(latitude, longitude));
      };
      window.addEventListener('resize', handleResize);

      setMapLoaded(true);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });
  };

  useEffect(() => {
    if (scriptLoaded && apiKey) {
      handleKakaoMapInit();
    }
  }, [scriptLoaded, apiKey]);

  // Clean address up to building number for reliable map search in Korea
  const getBaseAddress = (addr: string) => {
    const match = addr.match(/^(.*?\s\d+(?:-\d+)?)/);
    return match ? match[1] : addr;
  };
  const baseAddress = getBaseAddress(address);

  // Google Map Links (combining placeName and baseAddress for precise labeling and pin location)
  const googleMapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(placeName + ' ' + baseAddress)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  const googleSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName + ' ' + baseAddress)}`;
  const googleRouteUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  if (useGoogleMap) {
    return (
      <div className="w-full h-full min-h-[320px] rounded-xl overflow-hidden border border-slate-200 shadow-sm relative bg-slate-100 flex flex-col animate-fade-in">
        <iframe
          src={googleMapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full min-h-[320px]"
        />
        
        {/* Info Banner at the top-right */}
        <div className="absolute top-3 right-3 z-10 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200/50 shadow-sm text-[10px] text-slate-500 flex items-center gap-1.5 max-w-max">
          <Settings size={12} className="text-slate-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>지도를 보시려면 아래 버튼을 눌러 실시간 지도로 바로 연결할 수 있습니다.</span>
        </div>

        {/* Actions Overlay at the bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 w-full max-w-xs sm:max-w-md justify-center px-4">
          <a
            href={googleSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] sm:text-xs font-bold rounded-xl shadow-lg transition-all hover:shadow-xl duration-200 border border-blue-500 cursor-pointer"
          >
            <ExternalLink size={14} />
            구글맵 크게보기
          </a>
          <a
            href={googleRouteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-[11px] sm:text-xs font-bold rounded-xl shadow-lg transition-all hover:shadow-xl duration-200 border border-slate-200 cursor-pointer"
          >
            <Navigation size={14} />
            빠른 길찾기
          </a>
        </div>
      </div>
    );
  }

  // Kakao Map Links
  const mapLink = `https://map.kakao.com/link/search/${encodeURIComponent(address)}`;
  const routeLink = `https://map.kakao.com/link/to/${placeName},${latitude},${longitude}`;

  if (!apiKey) {
    const isSeoul = placeName.includes('서울');

    return (
      <div className="w-full h-full min-h-[320px] rounded-xl flex items-center justify-center border border-slate-200 relative overflow-hidden bg-slate-50 shadow-inner">
        {isSeoul ? (
          /* Real Map Screenshot Background for Seoul */
          <div 
            className="absolute inset-0 bg-cover bg-center pointer-events-none" 
            style={{ backgroundImage: "url('/images/kakao-map-preview.png')" }}
          />
        ) : (
          /* Clean Modern Placeholder for Suwon & Asan */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-50">
            {/* SVG Grid pattern background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            <div className="w-14 h-14 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mb-4 z-10">
              <MapPin size={28} />
            </div>
            <h5 className="text-base font-extrabold text-brand-blue mb-1 z-10">{placeName}</h5>
            <p className="text-xs text-gray-500 font-bold text-center max-w-sm leading-relaxed mb-6 z-10">{address}</p>
          </div>
        )}

        {/* Info Banner at the top-right */}
        <div className="absolute top-3 right-3 z-10 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200/50 shadow-sm text-[10px] text-slate-500 flex items-center gap-1.5 max-w-max">
          <Settings size={12} className="text-slate-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>지도를 보시려면 아래 버튼을 눌러 실시간 지도로 바로 연결할 수 있습니다.</span>
        </div>

        {/* Actions Overlay at the bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 w-full max-w-xs sm:max-w-md justify-center px-4">
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-slate-900 text-[11px] sm:text-xs font-bold rounded-xl shadow-lg transition-all hover:shadow-xl duration-200 border border-yellow-300 cursor-pointer"
          >
            <ExternalLink size={14} />
            카카오맵 크게보기
          </a>
          <a
            href={routeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-[11px] sm:text-xs font-bold rounded-xl shadow-lg transition-all hover:shadow-xl duration-200 border border-slate-200 cursor-pointer"
          >
            <Navigation size={14} />
            빠른 길찾기
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[320px] rounded-xl overflow-hidden border border-slate-200 shadow-sm relative bg-slate-100">
      {/* Script element to load Kakao SDK */}
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />

      {/* Map container */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[320px]" />

      {/* Map Overlay Loading State */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-slate-50 flex items-center justify-center flex-col gap-3">
          <div className="w-8 h-8 border-4 border-brand-teal border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400 font-medium">카카오 지도를 불러오는 중...</p>
        </div>
      )}
    </div>
  );
}
