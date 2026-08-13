const fs = require('fs');
const code = fs.readFileSync('src/app/management/dashboard/[[...slug]]/page.tsx', 'utf8');
const idx = code.indexOf('openPhaseManager');
console.log(JSON.stringify(code.substring(idx - 100, idx + 200)));
