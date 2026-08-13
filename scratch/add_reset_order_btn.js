const fs = require('fs');
let code = fs.readFileSync('src/app/management/dashboard/[[...slug]]/page.tsx', 'utf8');

// 1. Add RotateCcw to lucide-react import
code = code.replace(
  "CheckCircle, ShieldCheck, Truck, Layers",
  "CheckCircle, ShieldCheck, Truck, Layers, RotateCcw"
);

// 2. Add handleResetPipelineOrder handler
const handlerTarget = `const handleSavePipelineOrder = async () => {`;
const handlerAddition = `const handleResetPipelineOrder = async () => {
    await fetchPipelines();
    setIsPipelineOrderChanged(false);
  };

  const handleSavePipelineOrder = async () => {`;

const handlerTargetCRLF = handlerTarget.replace(/\n/g, '\r\n');
const handlerAdditionCRLF = handlerAddition.replace(/\n/g, '\r\n');

if (code.includes(handlerTargetCRLF)) {
  code = code.replace(handlerTargetCRLF, handlerAdditionCRLF);
} else if (code.includes(handlerTarget)) {
  code = code.replace(handlerTarget, handlerAddition);
}

// 3. Add [ 순서 초기화 ] button next to [ 순서 저장 ]
const btnTarget = `onClick={handleSavePipelineOrder}`;
const btnAddition = `onClick={handleResetPipelineOrder}
                             disabled={!isPipelineOrderChanged}
                             className={\`inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all shadow-sm \${
                               isPipelineOrderChanged
                                 ? 'bg-gray-700 hover:bg-gray-600 text-white cursor-pointer border border-white/20'
                                 : 'bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed opacity-40'
                             }\`}
                             title="저장 전 기존 순서로 되돌리기"
                           >
                             <RotateCcw size={14} />
                             <span>순서 초기화</span>
                           </button>
                           <button
                             onClick={handleSavePipelineOrder}`;

const btnTargetCRLF = btnTarget.replace(/\n/g, '\r\n');
const btnAdditionCRLF = btnAddition.replace(/\n/g, '\r\n');

if (code.includes(btnTargetCRLF)) {
  code = code.replace(btnTargetCRLF, btnAdditionCRLF);
  fs.writeFileSync('src/app/management/dashboard/[[...slug]]/page.tsx', code, 'utf8');
  console.log('SUCCESSFULLY_ADDED_RESET_ORDER_BTN_CRLF');
} else if (code.includes(btnTarget)) {
  code = code.replace(btnTarget, btnAddition);
  fs.writeFileSync('src/app/management/dashboard/[[...slug]]/page.tsx', code, 'utf8');
  console.log('SUCCESSFULLY_ADDED_RESET_ORDER_BTN_LF');
} else {
  console.log('BTN_TARGET_NOT_FOUND');
}
