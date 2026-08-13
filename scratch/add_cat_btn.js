const fs = require('fs');
let code = fs.readFileSync('src/app/management/dashboard/[[...slug]]/page.tsx', 'utf8');

const target = `{currentSubPath === 'rd/pipeline' && (
                       <button
                         onClick={openPhaseManager}`;

const replacement = `{currentSubPath === 'rd/pipeline' && (
                        <>
                          <button
                            onClick={openCategoryManager}
                            className="inline-flex items-center space-x-1.5 bg-[#2E7D32] hover:bg-[#1b5e20] text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer shadow-sm"
                          >
                            <Layers size={14} />
                            <span>분류 설정</span>
                          </button>
                          <button
                            onClick={openPhaseManager}`;

const closingTarget = `<span>단계 설정</span>
                       </button>
                     )}`;

const closingReplacement = `<span>단계 설정</span>
                          </button>
                        </>
                      )}`;

// Handle both \r\n and \n
const targetCRLF = target.replace(/\n/g, '\r\n');
const closingTargetCRLF = closingTarget.replace(/\n/g, '\r\n');
const replacementCRLF = replacement.replace(/\n/g, '\r\n');
const closingReplacementCRLF = closingReplacement.replace(/\n/g, '\r\n');

if (code.includes(targetCRLF)) {
  code = code.replace(targetCRLF, replacementCRLF);
  code = code.replace(closingTargetCRLF, closingReplacementCRLF);
  fs.writeFileSync('src/app/management/dashboard/[[...slug]]/page.tsx', code, 'utf8');
  console.log('SUCCESSFULLY_UPDATED_BUTTON_CRLF');
} else if (code.includes(target)) {
  code = code.replace(target, replacement);
  code = code.replace(closingTarget, closingReplacement);
  fs.writeFileSync('src/app/management/dashboard/[[...slug]]/page.tsx', code, 'utf8');
  console.log('SUCCESSFULLY_UPDATED_BUTTON_LF');
} else {
  console.log('TARGET_NOT_FOUND');
}
