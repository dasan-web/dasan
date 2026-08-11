const xlsx = require('xlsx');

const workbook = xlsx.readFile('의약품_상세정보_모음집(데이터마이그레이션)_20260810.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet);

const names = [
"트윈엑트 정", "디스포지 정", "세비텐션 정", "뉴코잘탄 정", "프리텐션 정",
"프리텐션플러스 정", "뉴딜렌 정", "크레로우 정", "리토아틴 정", "브이토젯 정",
"조코토린 정", "자누글립 정", "자누믹스 정", "엑시다졸 정", "파라베졸 정",
"탐스올 서방정", "뉴라조신 정", "올페나신 정", "유프베린 정", "뉴타미가 서방정",
"두타프렌 정", "디멘콜린 정", "디멘도네 정", "메만빅 정", "디멘골린 정",
"세로세틴 캡슐", "쿠아핀 정", "가바티론 캡슐", "큐로리카 캡슐", "에스클러 캡슐",
"픽시마 캡슐", "리클래신 정", "하이레보 정"
];

const matches = data.filter(r => names.includes(r['제품명']) || names.includes(r['제품명'].replace('트윈맥스', '트윈엑트')));
console.log('Matches found in Excel:', matches.length);
if (matches.length > 0) {
    console.log(matches.map(m => `${m['제품명']}: ${m['함량']}`));
} else {
    // try partial matching
    const partial = data.filter(r => r['제품명'] && names.some(n => r['제품명'].includes(n.split(' ')[0])));
    console.log('Partial matches found in Excel:', partial.length);
    console.log(partial.map(m => `${m['제품명']}: ${m['함량']}`));
}
