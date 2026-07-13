const fs = require('fs');
const path = require('path');

const formPath = path.join(__dirname, '..', 'src', 'components', 'ContactForm.tsx');
let content = fs.readFileSync(formPath, 'utf8');

// Fix 61: setVerificationError('{isEnglish ? 'Email Address' : '이메일 주소'}를 입력해주세요.');
content = content.replace(
  "setVerificationError('{isEnglish ? \\'Email Address\\' : \\'이메일 주소\\'}를 입력해주세요.');",
  "setVerificationError(isEnglish ? 'Please enter your email address.' : '이메일 주소를 입력해주세요.');"
);

// Fix 118: ...담당자가 신속히 {isEnglish ? 'Confirm' : '확인'}하여 연락 드리겠습니다.',
content = content.replace(
  "다산제약의 제품에 대해 궁금한 사항을 남겨주시면, 담당자가 신속히 {isEnglish ? 'Confirm' : '확인'}하여 연락 드리겠습니다.",
  "다산제약의 제품에 대해 궁금한 사항을 남겨주시면, 담당자가 신속히 확인하여 연락 드리겠습니다."
);

// Fix 119: ...제품 제휴 관련 {isEnglish ? 'Inquiry Title' : '문의 제목'}을 입력해주세요.',
content = content.replace(
  "제품명 또는 제품 제휴 관련 {isEnglish ? 'Inquiry Title' : '문의 제목'}을 입력해주세요.",
  "제품명 또는 제품 제휴 관련 문의 제목을 입력해주세요."
);

// Fix 363: ... (verificationSent ? '{isEnglish ? 'Resend' : '재발송'}' : '인증번호 발송')
content = content.replace(
  "(verificationSent ? '{isEnglish ? \\'Resend\\' : \\'재발송\\'}' : '인증번호 발송')",
  "(verificationSent ? (isEnglish ? 'Resend' : '재발송') : (isEnglish ? 'Send Code' : '인증번호 발송'))"
);

// Fix other broken things that I might have missed
content = content.replace(
  "{isEmailVerified ? '인증완료' : (verifying && !verificationSent ? '발송중...' :",
  "{isEmailVerified ? (isEnglish ? 'Verified' : '인증완료') : (verifying && !verificationSent ? (isEnglish ? 'Sending...' : '발송중...') :"
);

fs.writeFileSync(formPath, content);
console.log('Fixed ContactForm.tsx syntax errors!');
