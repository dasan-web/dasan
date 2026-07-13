const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'ProductSearch.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Map dictionary
const efficacyMap = `
const efficacyDict: Record<string, string> = {
  "동맥경화용제": "Anti-arteriosclerotic",
  "기타의화학요법제": "Other Chemotherapeutics",
  "해열,진통,소염제": "Antipyretic, Analgesic, Anti-inflammatory",
  "혈압강하제": "Antihypertensive",
  "소화성궤양용제": "Peptic Ulcer Agents",
  "기타의순환계용약": "Other Cardiovascular Agents",
  "당뇨병용제": "Antidiabetics",
  "혈관확장제": "Vasodilators",
  "정신신경용제": "Psychotropics",
  "기타의중추신경용약": "Other Central Nervous System Agents",
  "주로그람양성,음성균,리케치아,비루스에작용하는것": "Antibiotics (Gram+/-, Rickettsia, Virus)",
  "주로그람양성,음성균에작용하는것": "Antibiotics (Gram+/-)",
  "최면진정제": "Hypnotics & Sedatives",
  "해열.진통.소염제": "Antipyretic, Analgesic, Anti-inflammatory",
  "항히스타민제": "Antihistamines",
  "간장질환용제": "Hepatic Protectants",
  "소화기관용약": "Gastrointestinal Agents",
  "진해거담제": "Antitussives & Expectorants",
  "이비과용제": "Otorhinolaryngologicals",
  "기타의소화기관용약": "Other Gastrointestinal Agents",
  "항악성종양제": "Antineoplastics",
  "혈액응고저지제": "Anticoagulants",
  "안과용제": "Ophthalmics",
  "호흡기관용약": "Respiratory Agents",
  "치과구강용약": "Dental & Oral Agents",
  "비타민제": "Vitamins",
  "기타의비타민제": "Other Vitamins",
  "혼합비타민제(비타민AD혼합제제제외)": "Mixed Vitamins",
  "따로분류되지않는대사성의약품": "Other Metabolic Agents"
};

const translateEfficacy = (koText: string, isEng: boolean) => {
  if (!isEng || !koText) return koText;
  return efficacyDict[koText.trim()] || koText;
};
`;

if (!content.includes('const efficacyDict')) {
  const funcStart = content.indexOf('export default function ProductSearch() {');
  content = content.slice(0, funcStart) + efficacyMap + '\n' + content.slice(funcStart);
}

// Replace the {product.efficacy} display
content = content.replace(/>\s*\{product\.efficacy\}\s*<\//g, ">{translateEfficacy(product.efficacy, isEnglish)}</");
content = content.replace(
  "{selectedProduct.efficacy || '등록된 정보가 없습니다.'}", 
  "translateEfficacy(selectedProduct.efficacy, isEnglish) || (isEnglish ? 'No information registered.' : '등록된 정보가 없습니다.')"
);

fs.writeFileSync(filePath, content);
console.log('Efficacy translated!');
