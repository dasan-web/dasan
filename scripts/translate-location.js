const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'LocationMapSection.tsx');
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('usePathname')) {
  content = content.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport { usePathname } from 'next/navigation';");
}

if (!content.includes('const isEnglish')) {
  const compStart = content.indexOf('export default function LocationMapSection');
  const bodyStart = content.indexOf('{', compStart) + 1;
  content = content.slice(0, bodyStart) + `\n  const pathname = usePathname();\n  const isEnglish = pathname?.startsWith('/en');\n` + content.slice(bodyStart);
}

// Map the english texts for locations
const englishLocationsObj = `
  const enLocations = [
    {
      id: 'seoul',
      name: 'Seoul Headquarters',
      subName: 'Management, Overseas Sales, Marketing Strategy Dept.',
      lat: 37.5186,
      lng: 126.8906,
      placeName: 'Dasan Pharmaceutical Seoul Headquarters',
      address: '#1302, Woori Venture Town II, 70 Seonyu-ro, Yeongdeungpo-gu, Seoul',
      tel: '02-2627-5300',
      subway: [
        '8 mins walk from Exit 3, Mullae Stn, Line 2',
        '10 mins walk from Exit 6, Yeongdeungpo-gu Office Stn, Lines 2/5'
      ],
      bus: [
        'Get off at Woori Venture Town stop',
        'Branch 6625, 6640A / Village Yeongdeungpo05'
      ]
    },
    {
      id: 'suwon',
      name: 'Suwon R&D Center',
      subName: 'DDS Formulation R&D, Organic Synthesis R&D',
      lat: 37.266205,
      lng: 127.054366,
      placeName: 'Dasan Pharmaceutical Suwon R&D Center',
      address: '#306, Innoplex Bldg 3, 304 Sinwon-ro, Yeongtong-gu, Suwon-si, Gyeonggi-do',
      tel: '031-546-8200',
      subway: [
        'Transfer to city bus after getting off at Yeongtong Stn or Cheongmyeong Stn (Suin-Bundang Line)',
        '15 mins walk from Exit 4, Mangpo Stn (Suin-Bundang Line) (or transfer to bus)'
      ],
      bus: [
        'Get off at Innoplex stop',
        'General 62-1, 82-1, 99 / Village 55'
      ]
    },
    {
      id: 'asan1',
      name: 'Asan Plant 1',
      subName: 'Finished Products Production Center',
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
      subName: 'State-of-the-art Smart Packaging & Mass Production Line',
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
    }
  ];
`;

if (!content.includes('const enLocations')) {
  content = content.replace('let displayLocations = locations;', englishLocationsObj + '\n  let displayLocations = isEnglish ? enLocations : locations;');
}

content = content.replace('<span>이전페이지로 가기</span>', '<span>{isEnglish ? "Go back" : "이전페이지로 가기"}</span>');
content = content.replace('{activeLoc.placeName} 오시는 길', '{activeLoc.placeName} {isEnglish ? "Directions" : "오시는 길"}');
content = content.replace('대표번호: {activeLoc.tel}', '{isEnglish ? "Main Number" : "대표번호"}: {activeLoc.tel}');
content = content.replace('지하철/철도 이용 시', '{isEnglish ? "By Subway/Train" : "지하철/철도 이용 시"}');
content = content.replace('버스 이용 시', '{isEnglish ? "By Bus" : "버스 이용 시"}');

fs.writeFileSync(filePath, content);
console.log('Location Map Section patched!');
