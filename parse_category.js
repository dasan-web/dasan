const xlsx = require('xlsx');

const wb = xlsx.readFile('C:/Share/DASAN/Product Category_260728.xlsx');
const sheet = wb.Sheets[wb.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet);

console.log("Total rows:", data.length);
data.forEach((row, idx) => {
  const name = row['__EMPTY_2'];
  const content = row['__EMPTY_4'];
  if (name && content && name !== '제품명') {
    console.log(`${idx}: ${name} -> ${content}`);
  }
});
