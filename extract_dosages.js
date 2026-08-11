const xlsx = require('xlsx');

const wb = xlsx.readFile('C:/Share/DASAN/Product Category_260728.xlsx');
const sheet = wb.Sheets[wb.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet);

const productDosages = {};
let currentProductName = null;

data.forEach((row) => {
  const name = row['__EMPTY_2'];
  const dosage = row['__EMPTY_4'];
  
  if (name && name !== '제품명') {
    currentProductName = name.trim();
  }
  
  if (currentProductName && dosage && dosage !== '함량') {
    if (!productDosages[currentProductName]) {
      productDosages[currentProductName] = [];
    }
    const cleanDosage = String(dosage).trim();
    if (!productDosages[currentProductName].includes(cleanDosage)) {
      productDosages[currentProductName].push(cleanDosage);
    }
  }
});

console.log(JSON.stringify(productDosages, null, 2));
