const fs = require('fs');
let code = fs.readFileSync('src/app/management/dashboard/[[...slug]]/page.tsx', 'utf8');

const targetHead = `<tr>
                          <th className="px-5 py-4 w-[20%]">분류</th>`;

const replacementHead = `<tr>
                          <th className="px-3 py-4 w-[40px] text-center">순서</th>
                          <th className="px-5 py-4 w-[18%]">분류</th>`;

const targetRow = `pipelines.map(p => (
                            <tr key={p.id} className="hover:bg-white/[0.02] border-b border-white/5 last:border-0 transition-colors">
                              <td className="px-5 py-4 font-bold text-white">{p.category}</td>`;

const replacementRow = `pipelines.map((p, idx) => (
                            <tr 
                              key={p.id} 
                              draggable={currentUser?.role !== 'viewer'}
                              onDragStart={(e) => handlePipelineDragStart(e, idx)}
                              onDragOver={(e) => handlePipelineDragOver(e, idx)}
                              onDragEnd={handlePipelineDragEnd}
                              className={\`hover:bg-white/[0.04] border-b border-white/5 last:border-0 transition-colors select-none \${
                                draggedPipelineIndex === idx ? 'bg-brand-green/20 opacity-60 border-brand-green/50' : ''
                              }\`}
                            >
                              <td className="px-3 py-4 text-center cursor-grab active:cursor-grabbing text-gray-500">
                                <GripVertical size={16} className="mx-auto text-gray-400 hover:text-white" />
                              </td>
                              <td className="px-5 py-4 font-bold text-white">{p.category}</td>`;

const targetHeadCRLF = targetHead.replace(/\n/g, '\r\n');
const replacementHeadCRLF = replacementHead.replace(/\n/g, '\r\n');
const targetRowCRLF = targetRow.replace(/\n/g, '\r\n');
const replacementRowCRLF = replacementRow.replace(/\n/g, '\r\n');

if (code.includes(targetHeadCRLF)) {
  code = code.replace(targetHeadCRLF, replacementHeadCRLF);
  code = code.replace(targetRowCRLF, replacementRowCRLF);
  fs.writeFileSync('src/app/management/dashboard/[[...slug]]/page.tsx', code, 'utf8');
  console.log('SUCCESSFULLY_UPDATED_TABLE_CRLF');
} else if (code.includes(targetHead)) {
  code = code.replace(targetHead, replacementHead);
  code = code.replace(targetRow, replacementRow);
  fs.writeFileSync('src/app/management/dashboard/[[...slug]]/page.tsx', code, 'utf8');
  console.log('SUCCESSFULLY_UPDATED_TABLE_LF');
} else {
  console.log('TARGET_HEAD_NOT_FOUND');
}
