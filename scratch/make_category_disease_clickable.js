const fs = require('fs');
let code = fs.readFileSync('src/app/management/dashboard/[[...slug]]/page.tsx', 'utf8');

const targetCategory = `<td className="px-5 py-4 font-bold text-white">{p.category}</td>`;
const replacementCategory = `<td className="px-5 py-4 font-bold text-white">
                                {currentUser?.role !== 'viewer' ? (
                                  <span 
                                    className="cursor-pointer hover:underline transition-colors"
                                    onClick={() => openEditModal(p, 'pipeline')}
                                  >
                                    {p.category}
                                  </span>
                                ) : (
                                  p.category
                                )}
                              </td>`;

const targetDisease = `<td className="px-5 py-4 text-gray-300 font-medium">
                                {hideProjectName && currentUser?.role !== 'viewer' ? (
                                  <span 
                                    className="cursor-pointer hover:underline text-white font-bold transition-colors"
                                    onClick={() => openEditModal(p, 'pipeline')}
                                  >
                                    {p.disease}
                                  </span>
                                ) : (
                                  p.disease
                                )}
                              </td>`;

const replacementDisease = `<td className="px-5 py-4 text-gray-300 font-medium">
                                {currentUser?.role !== 'viewer' ? (
                                  <span 
                                    className="cursor-pointer hover:underline text-white font-bold transition-colors"
                                    onClick={() => openEditModal(p, 'pipeline')}
                                  >
                                    {p.disease}
                                  </span>
                                ) : (
                                  p.disease
                                )}
                              </td>`;

const targetCategoryCRLF = targetCategory.replace(/\n/g, '\r\n');
const replacementCategoryCRLF = replacementCategory.replace(/\n/g, '\r\n');
const targetDiseaseCRLF = targetDisease.replace(/\n/g, '\r\n');
const replacementDiseaseCRLF = replacementDisease.replace(/\n/g, '\r\n');

if (code.includes(targetCategoryCRLF)) {
  code = code.replace(targetCategoryCRLF, replacementCategoryCRLF);
  code = code.replace(targetDiseaseCRLF, replacementDiseaseCRLF);
  fs.writeFileSync('src/app/management/dashboard/[[...slug]]/page.tsx', code, 'utf8');
  console.log('SUCCESSFULLY_MADE_CLICKABLE_CRLF');
} else if (code.includes(targetCategory)) {
  code = code.replace(targetCategory, replacementCategory);
  code = code.replace(targetDisease, replacementDisease);
  fs.writeFileSync('src/app/management/dashboard/[[...slug]]/page.tsx', code, 'utf8');
  console.log('SUCCESSFULLY_MADE_CLICKABLE_LF');
} else {
  console.log('TARGET_NOT_FOUND');
}
