const fs = require('fs');

const filePath = 'c:/Share/DASAN/src/app/management/dashboard/[[...slug]]/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Also target div tags
const regex = /<(p|div)\s+className="([^"]+)"\s*>\{\s*([^}]+)\s*\}<\/(p|div)>/g;

content = content.replace(regex, (match, tagOpen, className, variable, tagClose) => {
    // Only target variables that look like text content, ignore numbers/dashboard stats
    if (variable.includes('dashboardStats') || variable.includes('inq.content ||')) {
        return match;
    }
    
    // Create the tailwind arbitrary variants for the inner div
    let tw = className.split(' ').map(c => `[&_p]:${c}`).join(' ');
    tw += ' [&_h4]:font-bold [&_strong]:font-bold [&_ul]:list-disc [&_ul]:pl-4';

    // Build the replacement
    const varCheck = variable.trim().startsWith('(') ? variable.trim() : `(${variable.trim()})`;

    return `{String${varCheck}.includes('<p') || String${varCheck}.includes('<h') ? (
  <div dangerouslySetInnerHTML={{__html: ${variable.trim()}}} className="${tw}" />
) : (
  <${tagOpen} className="${className}">{${variable.trim()}}</${tagClose}>
)}`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done');
