const fs = require('fs');

const products = [
"트윈엑트 정", // updated typo
"디스포지 정",
"세비텐션 정", // wait, earlier we had 세베텐션 정. let me use the user's string for now
"뉴코잘탄 정",
"프리텐션 정",
"프리텐션플러스 정",
"뉴딜렌 정",
"크레로우 정",
"리토아틴 정",
"브이토젯 정",
"조코토린 정",
"자누글립 정",
"자누믹스 정",
"엑시다졸 정",
"파라베졸 정",
"탐스올 서방정",
"뉴라조신 정",
"올페나신 정",
"유프베린 정",
"뉴타미가 서방정",
"두타프렌 정",
"디멘콜린 정",
"디멘도네 정",
"메만빅 정",
"디멘골린 정",
"세로세틴 캡슐",
"쿠아핀 정",
"가바티론 캡슐",
"큐로리카 캡슐",
"에스클러 캡슐",
"픽시마 캡슐",
"리클래신 정",
"하이레보 정"
];

let csv = 'name,content\n';
for (const p of products) {
  csv += `${p},\n`;
}

fs.writeFileSync('C:/Users/송주섭-PC/.gemini/antigravity/brain/928294be-f547-4dd3-8c66-a3a54aa34bb9/content_update.csv', csv);
