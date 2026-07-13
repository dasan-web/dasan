const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'JobList.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Update parseJobContent signature
content = content.replace(
  'const parseJobContent = (item: NewsItem): JobParsed => {',
  'const parseJobContent = (item: NewsItem, isEnglish: boolean = false): JobParsed => {'
);

// We need to pass isEnglish when calling parseJobContent
// It is called in render: `const parsedJobs = jobs.map(parseJobContent);`
content = content.replace(
  'const parsedJobs = jobs.map(parseJobContent);',
  'const parsedJobs = jobs.map(j => parseJobContent(j, isEnglish));'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed JobList.tsx isEnglish reference!');
