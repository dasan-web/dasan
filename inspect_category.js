const xlsx = require('xlsx');
const fs = require('fs');

try {
  const wb = xlsx.readFile('C:/Share/DASAN/Product Category_260728.xlsx');
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);
  
  // Just print the first 10 rows to see the structure of this file
  console.log("Columns:", Object.keys(data[0] || {}));
  console.log(JSON.stringify(data.slice(0, 5), null, 2));

} catch (err) {
  console.error("Error reading file:", err);
}
