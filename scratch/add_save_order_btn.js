const fs = require('fs');
let code = fs.readFileSync('src/app/management/dashboard/[[...slug]]/page.tsx', 'utf8');

const target = `onClick={openCategoryManager}`;

const replacement = `onClick={handleSavePipelineOrder}
                             disabled={!isPipelineOrderChanged || isSavingPipelineOrder}
                             className={\`inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm \${
                               isPipelineOrderChanged
                                 ? 'bg-amber-500 hover:bg-amber-600 text-white cursor-pointer animate-pulse shadow-amber-500/20'
                                 : 'bg-white/10 text-gray-400 border border-white/10 cursor-not-allowed opacity-60'
                             }\`}
                           >
                             <Save size={14} />
                             <span>{isSavingPipelineOrder ? '저장 중...' : '순서 저장'}</span>
                           </button>
                           <button
                             onClick={openCategoryManager}`;

const targetCRLF = target.replace(/\n/g, '\r\n');
const replacementCRLF = replacement.replace(/\n/g, '\r\n');

if (code.includes(targetCRLF)) {
  code = code.replace(targetCRLF, replacementCRLF);
  fs.writeFileSync('src/app/management/dashboard/[[...slug]]/page.tsx', code, 'utf8');
  console.log('SUCCESSFULLY_ADDED_SAVE_ORDER_BTN');
} else {
  console.log('TARGET_NOT_FOUND');
}
