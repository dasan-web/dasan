const xlsx = require('xlsx');

const workbook = xlsx.readFile('C:/Share/DASAN/의약품_상세정보_모음집(데이터마이그레이션)_20260810.xlsx');
const sheet_name_list = workbook.SheetNames;
const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

console.log(xlData.slice(0, 3)); // Print first 3 rows
