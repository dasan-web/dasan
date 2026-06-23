const fs = require('fs');

const filePath = "c:/Share/DASAN/src/app/management/dashboard/[[...slug]]/page.tsx";
try {
  const bytes = fs.readFileSync(filePath);
  // Decode using utf-8 with a fallback that replaces invalid bytes
  const decoder = new TextDecoder('utf-8', { fatal: false });
  const text = decoder.decode(bytes);
  fs.writeFileSync(filePath, text, 'utf8');
  console.log("File repaired successfully!");
} catch (e) {
  console.error("Error repairing file:", e);
}
