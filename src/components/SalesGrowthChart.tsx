'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const salesData = [
  { year: 2016, value: 300, label: '300억' },
  { year: 2017, value: 296, label: '296억' },
  { year: 2018, value: 342, label: '342억' },
  { year: 2019, value: 515, label: '515억' },
  { year: 2020, value: 539, label: '539억' },
  { year: 2021, value: 519, label: '519억' },
  { year: 2022, value: 672, label: '672억' },
  { year: 2023, value: 793, label: '793억' },
  { year: 2024, value: 927, label: '927억' },
  { year: 2025, value: 1069, label: '1,069억' }
];

export default function SalesGrowthChart() {
  const maxVal = 1500; 
  const containerRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<{x: number, y: number}[]>([]);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const updatePoints = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      setChartWidth(width);
      
      // 여백을 약간 주어 첫번째와 마지막 라벨이 잘리지 않도록 함
      const padding = width > 768 ? 40 : 20; 
      const availableWidth = width - (padding * 2);
      const step = availableWidth / (salesData.length - 1);
      
      const maxVal = 1500; // 최대값을 더 넉넉하게
      const LINE_OFFSET = 100; // 꺾은선 그래프를 조금 더 위로 (70 -> 100)

      const newPoints = salesData.map((data, index) => {
        const x = padding + (index * step);
        const heightPercent = data.value / maxVal;
        
        // 막대(유리관)의 높이 위치
        const barTopY = 400 - (400 * heightPercent);
        
        // 꺾은선 그래프 점의 위치 (유리관 위로 띄움)
        const y = barTopY - LINE_OFFSET;
        
        return { x, y };
      });
      setPoints(newPoints);
    };

    updatePoints();
    // 딜레이를 주어 초기 렌더링 시 정확한 width 계산을 보장
    setTimeout(updatePoints, 100);
    window.addEventListener('resize', updatePoints);
    return () => window.removeEventListener('resize', updatePoints);
  }, []);

  const createPath = (points: {x: number, y: number}[]) => {
    if (points.length === 0) return '';
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    return path;
  };

  // 막대 색상을 왼쪽(2016, 옅은색)에서 오른쪽(2025, 짙은색)으로 원본처럼 그라데이션 적용
  // 사용자 요청: 2017년 색상('#7DD3FC')을 2016, 2018, 2019년에도 동일하게 적용
  const getBarColor = (index: number) => {
    const colors = [
      '#7DD3FC', // 2016 
      '#7DD3FC', // 2017
      '#7DD3FC', // 2018 
      '#7DD3FC', // 2019 (기준이 되는 밝은 파란색)
      '#60A5FA', // 2020 (서서히 진해짐)
      '#3B82F6', // 2021
      '#2563EB', // 2022
      '#1D4ED8', // 2023
      '#1D4ED8', // 2024 (2023년과 동일)
      '#1D4ED8'  // 2025 (2023년과 동일)
    ];
    return colors[index] || '#3B82F6';
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2 md:px-0 mb-20 animate-fade-in-up">
      <div className="relative w-full bg-white rounded-3xl p-6 md:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-gray-100">
        
        {/* Chart Area */}
        <div className="relative h-[400px] w-full mt-10" ref={containerRef}>
          
          {/* SVG Line Overlay */}
          {points.length > 0 && (
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-20" 
              style={{ overflow: 'visible' }}
            >
              {/* Line */}
              <motion.path
                d={createPath(points)}
                fill="none"
                stroke="#60A5FA" // 꺾은선 색상
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
              />
              
              {/* Connecting Dots */}
              {points.map((pt, i) => (
                <motion.circle
                  key={`dot-${i}`}
                  cx={pt.x}
                  cy={pt.y}
                  r="5"
                  fill="#E0F2FE"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: 0.6 + (i * 0.1), type: "spring" }}
                  style={{ filter: 'drop-shadow(0px 2px 5px rgba(59,130,246,0.5))' }}
                />
              ))}
            </svg>
          )}

          {/* Bars Container */}
          <div className="absolute inset-0 flex justify-between items-end z-10" style={{ paddingLeft: chartWidth > 768 ? '40px' : '20px', paddingRight: chartWidth > 768 ? '40px' : '20px' }}>
            {salesData.map((data, index) => {
              const heightPercent = (data.value / maxVal) * 100;
              const isLast = index === salesData.length - 1;
              const pt = points[index];
              const barColor = getBarColor(index);
              
              return (
                <div key={data.year} className="flex flex-col items-center justify-end group relative w-[30px] md:w-[46px] mx-[-15px] md:mx-[-23px] h-full pb-[10px]">
                  
                  {/* Line Graph Label (Value) */}
                  {pt && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: 0.8 + (index * 0.1) }}
                      className={`absolute whitespace-nowrap font-bold transition-all duration-300 z-30 ${isLast ? 'text-[#1E3A8A] text-lg md:text-2xl drop-shadow-sm' : 'text-[#1E3A8A] text-sm md:text-[15px]'}`}
                      style={{ 
                        bottom: `${400 - pt.y + 15}px`, 
                      }}
                    >
                      {data.label}
                    </motion.div>
                  )}

                  {/* 1. 고정된 투명 유리관 (Outer Glass Cylinder) - 각 연도별로 수면보다 약간만 높게 설정하여 꺾은선 그래프를 침범하지 않음 */}
                  <div className="absolute bottom-0 mb-[10px] w-full rounded-b-[10px]" style={{
                    height: `calc(${heightPercent}% + 25px)`, // 물 높이보다 25px 정도만 빈 공간을 둠
                    // 완전히 투명한 유리에 빛 반사만 구현
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.0) 20%, rgba(255,255,255,0.0) 80%, rgba(0,0,0,0.1) 100%)',
                    boxShadow: 'inset 4px 0 6px rgba(255,255,255,0.8), inset -4px 0 8px rgba(0,0,0,0.2), 5px 5px 15px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(255,255,255,0.5)',
                    borderTop: 'none',
                    zIndex: 20, // 물보다 앞에 위치하여 유리의 질감이 덮이도록 함
                    pointerEvents: 'none'
                  }}>
                    {/* 중앙 하이라이트 라인 */}
                    <div className="absolute top-0 left-[25%] w-[12%] h-full bg-gradient-to-b from-white/60 to-transparent rounded-full blur-[1px]"></div>
                    
                    {/* 유리 뚜껑 */}
                    <div 
                      className="absolute top-0 left-0 w-full h-[12px] md:h-[18px] -mt-[6px] md:-mt-[9px] rounded-[50%]"
                      style={{ 
                        background: 'rgba(255,255,255,0.2)',
                        boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.8)'
                      }}
                    ></div>
                    {/* 유리 바닥 */}
                    <div 
                      className="absolute bottom-0 left-0 w-full h-[12px] md:h-[18px] -mb-[6px] md:-mb-[9px] rounded-[50%]"
                      style={{ 
                        boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    ></div>
                  </div>

                  {/* 2. 차오르는 액체 (Inner Water) */}
                  <motion.div
                    className="absolute bottom-[10px] w-full rounded-b-[10px] z-10 transition-all duration-300 group-hover:brightness-110"
                    style={{ 
                      // 액체의 색상
                      background: `linear-gradient(90deg, ${barColor}dd 0%, ${barColor} 50%, ${barColor}aa 100%)`,
                      boxShadow: 'inset -2px 0 8px rgba(0,0,0,0.3)'
                    }}
                    // 사용자 요청: 2021년부터 애니메이션 효과 적용 (2020년까지는 이미 채워진 상태)
                    initial={{ height: data.year >= 2021 ? 0 : `calc(${heightPercent}% - 10px)` }}
                    whileInView={{ height: `calc(${heightPercent}% - 10px)` }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: data.year >= 2021 ? 1.5 : 0, 
                      // 2021년(index 5)부터 딜레이 시작
                      delay: data.year >= 2021 ? (index - 5) * 0.15 + 0.3 : 0, 
                      type: "spring", 
                      bounce: 0.2 
                    }}
                  >
                    {/* 출렁이는 수면 (찰랑거리는 효과를 위해 약간의 애니메이션 추가 가능) */}
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-[12px] md:h-[18px] -mt-[6px] md:-mt-[9px] rounded-[50%]"
                      style={{ 
                        background: `linear-gradient(135deg, rgba(255,255,255,0.7) 0%, ${barColor} 50%, rgba(0,0,0,0.3) 100%)`,
                        boxShadow: `inset 0 1px 3px rgba(255,255,255,0.8), 0 4px 6px ${barColor}88`
                      }}
                    >
                      {/* 수면 하이라이트 */}
                      <div className="absolute inset-[2px] rounded-[50%] bg-white/40 blur-[1px]"></div>
                    </motion.div>
                  </motion.div>

                  {/* X-axis Label (Year) */}
                  <div className="absolute -bottom-7 font-bold text-gray-700 text-xs md:text-[14px] tracking-tight">
                    {data.year}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
