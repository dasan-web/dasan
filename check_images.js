const fs = require('fs');
const path = require('path');
const dir = 'c:/Share/DASAN/public/extracted_media/ppt/media';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
files.forEach(f => {
  const buf = fs.readFileSync(path.join(dir, f));
  if(buf.length > 24) {
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    console.log(`${f}: ${width}x${height} (${buf.length} bytes)`);
  }
});
