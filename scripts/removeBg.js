const fs = require('fs');
const path = require('path');
const { removeBackground } = require('@imgly/background-removal-node');
const sharp = require('sharp');

async function processImage(inputPath) {
  try {
    const buffer = fs.readFileSync(inputPath);
    // Determine mime type based on extension
    const ext = path.extname(inputPath).toLowerCase();
    let mime = 'image/png';
    if (ext === '.jpg' || ext === '.jpeg') mime = 'image/jpeg';
    if (ext === '.webp') mime = 'image/webp';

    const blob = new Blob([buffer], { type: mime });
    const resultBlob = await removeBackground(blob);
    const resultBuffer = Buffer.from(await resultBlob.arrayBuffer());

    const processedBuffer = await sharp(resultBuffer)
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .png()
      .toBuffer();
      
    fs.writeFileSync(inputPath, processedBuffer);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

const inputPath = process.argv[2];
if (inputPath) {
  processImage(inputPath);
} else {
  console.error("No input path provided");
  process.exit(1);
}
