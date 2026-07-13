const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'lib', 'navigation.ts');
let content = fs.readFileSync(targetFile, 'utf8');

// Add enName to interfaces
content = content.replace('export interface SubMenu {', 'export interface SubMenu {\n  enName?: string;');
content = content.replace('export interface MajorMenu {', 'export interface MajorMenu {\n  enName?: string;');
content = content.replace('export interface GrandMenu {', 'export interface GrandMenu {\n  enName?: string;');

// Replace Korean names with enNames
const translations = {
  '회사소개': 'Company Overview',
  '기업개요': 'Company Info',
  '사업영역': 'Business Area',
  '연혁': 'History',
  'CI': 'CI',
  '공장 및 연구소': 'Facilities',
  '찾아오시는 길': 'Location',
  'ESG': 'ESG',
  '지속가능경영': 'Sustainability',
  '환경경영방침': 'Environmental Policy',
  '안전보건경영방침': 'Health & Safety Policy',
  '부패방지방침': 'Anti-Corruption Policy',
  '윤리강령': 'Code of Ethics',
  'IR': 'IR',
  '공시정보': 'Public Announcement',
  '재무정보': 'Financial Info',
  'IR News': 'IR News',
  'Innovation': 'Innovation',
  '연구소 소개': 'R&D Center Intro',
  '연구 활동': 'R&D Activities',
  '파이프라인': 'Pipeline',
  '완제의약품': 'Finished Products',
  '제품검색': 'Product Search',
  '제품소식': 'Product News',
  'API': 'API',
  '원료의약품(API)': 'API',
  '원료의약품 중간체': 'API Intermediates',
  'CDMO': 'CDMO',
  '서비스 품질': 'Service Quality',
  '특장점': 'Advantages',
  '물류': 'Logistics',
  '뉴스룸': 'Newsroom',
  '보도자료': 'Press Release',
  '홍보자료실': 'PR Materials',
  '채용정보': 'Careers',
  '인재상': 'Ideal Candidate',
  '채용절차': 'Hiring Process',
  '채용공고': 'Job Openings',
  '고객센터': 'Customer Service',
  '제품 문의': 'Product Inquiry',
  '영업 문의': 'Sales Inquiry',
  '부패신고 문의(익명)': 'Report Corruption (Anonymous)',
  '문의 확인': 'Check Inquiry'
};

for (const [kr, en] of Object.entries(translations)) {
  const regex = new RegExp(`name: '${kr.replace(/[.*+?^$\\{\\}()|[\\]\\\\]/g, '\\\\$&')}'`, 'g');
  content = content.replace(regex, `name: '${kr}', enName: '${en}'`);
}

fs.writeFileSync(targetFile, content);
console.log('navigation.ts patched with enNames.');
