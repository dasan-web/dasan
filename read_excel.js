const xlsx = require('xlsx');

const workbook = xlsx.readFile('의약품_상세정보_모음집(데이터마이그레이션)_20260810.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet);
console.log(JSON.stringify(data.slice(0, 5), null, 2));
