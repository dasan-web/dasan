const fs = require('fs');
const path = require('path');

const formPath = path.join(__dirname, '..', 'src', 'components', 'ContactForm.tsx');
let content = fs.readFileSync(formPath, 'utf8');

if (!content.includes('usePathname')) {
  content = content.replace("import { Send, CheckCircle, AlertCircle } from 'lucide-react';", "import { Send, CheckCircle, AlertCircle } from 'lucide-react';\nimport { usePathname } from 'next/navigation';");
}

if (!content.includes('const isEnglish')) {
  const funcStart = content.indexOf('export default function ContactForm');
  const bodyStart = content.indexOf('{', funcStart) + 1;
  content = content.slice(0, bodyStart) + `\n  const pathname = usePathname();\n  const isEnglish = pathname?.startsWith('/en');\n` + content.slice(bodyStart);
}

// Map the static texts for ContactForm
const replacements = [
  // config objects
  {
    find: "'다산제약의 제품에 대해 궁금한 사항을 남겨주시면, 담당자가 신속히 확인하여 연락 드리겠습니다.'",
    replace: "isEnglish ? 'If you leave any questions about Dasan Pharmaceutical\\'s products, the person in charge will quickly check and contact you.' : '다산제약의 제품에 대해 궁금한 사항을 남겨주시면, 담당자가 신속히 확인하여 연락 드리겠습니다.'"
  },
  {
    find: "'제품명 또는 제품 제휴 관련 문의 제목을 입력해주세요.'",
    replace: "isEnglish ? 'Please enter the title for product or partnership inquiry.' : '제품명 또는 제품 제휴 관련 문의 제목을 입력해주세요.'"
  },
  {
    find: "'다산제약의 영업/구매 제휴 및 비즈니스 관련 문의를 남겨주시면, 담당 부서에서 신속히 안내 드리겠습니다.'",
    replace: "isEnglish ? 'If you leave an inquiry regarding Dasan Pharmaceutical\\'s sales/purchase partnership and business, the relevant department will guide you promptly.' : '다산제약의 영업/구매 제휴 및 비즈니스 관련 문의를 남겨주시면, 담당 부서에서 신속히 안내 드리겠습니다.'"
  },
  {
    find: "'비즈니스 협력 또는 영업 관련 문의 제목을 입력해주세요.'",
    replace: "isEnglish ? 'Please enter the title for business cooperation or sales inquiry.' : '비즈니스 협력 또는 영업 관련 문의 제목을 입력해주세요.'"
  },
  {
    find: "다산제약은 윤리경영을 실천하고 있습니다. 업무수행과 관련하여 부패 행위나 부조리한 사실이 있는 경우 익명으로 안전하게 제보해 주시기 바랍니다.",
    replace: "{isEnglish ? 'Dasan Pharmaceutical practices ethical management. If there is any corruption or absurdity related to work performance, please report it safely and anonymously.' : '다산제약은 윤리경영을 실천하고 있습니다. 업무수행과 관련하여 부패 행위나 부조리한 사실이 있는 경우 익명으로 안전하게 제보해 주시기 바랍니다.'}"
  },
  {
    find: "제보자의 신원 및 인적사항은 관련 법령에 따라 철저히 비밀이 보장됩니다.",
    replace: "{isEnglish ? 'The identity and personal information of the informant will be kept strictly confidential in accordance with relevant laws.' : '제보자의 신원 및 인적사항은 관련 법령에 따라 철저히 비밀이 보장됩니다.'}"
  },
  {
    find: "'부패 행위 제보 또는 부조리 신고 제목을 입력해주세요.'",
    replace: "isEnglish ? 'Please enter the title for corruption or absurdity report.' : '부패 행위 제보 또는 부조리 신고 제목을 입력해주세요.'"
  },
  // Form fields
  { find: "성함 (회사명)", replace: "{isEnglish ? 'Name (Company Name)' : '성함 (회사명)'}" },
  { find: "이름 또는 회사명을 입력해주세요", replace: "{isEnglish ? 'Please enter your name or company name' : '이름 또는 회사명을 입력해주세요'}" },
  { find: "이메일 주소", replace: "{isEnglish ? 'Email Address' : '이메일 주소'}" },
  { find: "회신 받으실 정확한 이메일 주소를 입력해주세요", replace: "{isEnglish ? 'Please enter an accurate email address to receive replies' : '회신 받으실 정확한 이메일 주소를 입력해주세요'}" },
  { find: "연락처", replace: "{isEnglish ? 'Contact Number' : '연락처'}" },
  { find: "'-' 없이 숫자만 입력해주세요", replace: "{isEnglish ? 'Please enter numbers only without \\'-\\'' : '\\'-\\' 없이 숫자만 입력해주세요'}" },
  { find: "문의 제목", replace: "{isEnglish ? 'Inquiry Title' : '문의 제목'}" },
  { find: "문의 내용", replace: "{isEnglish ? 'Inquiry Content' : '문의 내용'}" },
  { find: "문의하실 내용을 상세히 적어주시면 더 정확한 답변이 가능합니다. (최대 1000자)", replace: "{isEnglish ? 'If you write your inquiry in detail, we can provide a more accurate response. (Max 1000 chars)' : '문의하실 내용을 상세히 적어주시면 더 정확한 답변이 가능합니다. (최대 1000자)'}" },
  { find: "문의글 비밀번호 (4자리)", replace: "{isEnglish ? 'Inquiry Password (4 digits)' : '문의글 비밀번호 (4자리)'}" },
  { find: "추후 문의글 조회 시 사용할 숫자 4자리를 입력해주세요", replace: "{isEnglish ? 'Please enter 4 digits to use for viewing the inquiry later' : '추후 문의글 조회 시 사용할 숫자 4자리를 입력해주세요'}" },
  { find: "개인정보 수집 및 이용 동의", replace: "{isEnglish ? 'Consent to Collection and Use of Personal Information' : '개인정보 수집 및 이용 동의'}" },
  { find: "동의합니다", replace: "{isEnglish ? 'I agree' : '동의합니다'}" },
  { find: "문의 접수하기", replace: "{isEnglish ? 'Submit Inquiry' : '문의 접수하기'}" },
  { find: "접수 중...", replace: "{isEnglish ? 'Submitting...' : '접수 중...'}" },
  { find: "이메일 인증", replace: "{isEnglish ? 'Email Verification' : '이메일 인증'}" },
  { find: "인증 완료", replace: "{isEnglish ? 'Verified' : '인증 완료'}" },
  { find: "인증번호 받기", replace: "{isEnglish ? 'Get Code' : '인증번호 받기'}" },
  { find: "재발송", replace: "{isEnglish ? 'Resend' : '재발송'}" },
  { find: "이메일로 전송된 6자리 숫자를 입력하세요", replace: "{isEnglish ? 'Enter the 6-digit number sent to your email' : '이메일로 전송된 6자리 숫자를 입력하세요'}" },
  { find: "확인", replace: "{isEnglish ? 'Confirm' : '확인'}" },
  { find: "필수 입력 항목을 모두 채워주세요.", replace: "{isEnglish ? 'Please fill in all required fields.' : '필수 입력 항목을 모두 채워주세요.'}" },
  { find: "비밀번호는 숫자 4자리여야 합니다.", replace: "{isEnglish ? 'The password must be 4 digits.' : '비밀번호는 숫자 4자리여야 합니다.'}" },
  { find: "자동가입방지(reCAPTCHA) 인증을 완료해주세요.", replace: "{isEnglish ? 'Please complete the reCAPTCHA verification.' : '자동가입방지(reCAPTCHA) 인증을 완료해주세요.'}" },
  { find: "이메일 인증을 완료해주세요.", replace: "{isEnglish ? 'Please complete email verification.' : '이메일 인증을 완료해주세요.'}" },
  { find: "문의가 성공적으로 접수되었습니다. 담당자 확인 후 기재하신 이메일로 답변을 드리겠습니다.", replace: "{isEnglish ? 'Inquiry submitted successfully. We will reply to your email after review.' : '문의가 성공적으로 접수되었습니다. 담당자 확인 후 기재하신 이메일로 답변을 드리겠습니다.'}" },
  { find: "오류가 발생했습니다. 잠시 후 다시 시도해주세요.", replace: "{isEnglish ? 'An error occurred. Please try again later.' : '오류가 발생했습니다. 잠시 후 다시 시도해주세요.'}" },
  { find: "개인정보 수집 및 이용에 동의해주세요.", replace: "{isEnglish ? 'Please agree to the collection and use of personal information.' : '개인정보 수집 및 이용에 동의해주세요.'}" }
];

for (const rep of replacements) {
  content = content.replace(rep.find, rep.replace);
}

fs.writeFileSync(formPath, content);
console.log('ContactForm updated!');
