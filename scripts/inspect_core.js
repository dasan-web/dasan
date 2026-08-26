const fs = require('fs');
const html = fs.readFileSync('c:/Share/DASAN/Main_20260824.html', 'utf8');
const coreMatch = html.match(/id="core-tech"[\s\S]*?<\/section>/);
if (coreMatch) {
  fs.writeFileSync('c:/Share/DASAN/scripts/core_section.html', coreMatch[0], 'utf8');
  console.log('Saved core_section.html, length:', coreMatch[0].length);
}
