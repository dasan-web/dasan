const fs = require('fs');
const path = require('path');

const applyTranslationToContactForm = () => {
  const filePath = path.join(__dirname, '..', 'src', 'components', 'ContactForm.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // Translate status messages in the code
  content = content.replace(
    /setVerificationError\('인증 시간이 만료되었습니다\. 다시 시도해주세요\.'\);/,
    "setVerificationError(isEnglish ? 'Verification time expired. Please try again.' : '인증 시간이 만료되었습니다. 다시 시도해주세요.');"
  );
  
  content = content.replace(
    /setMessage\('성공적으로 접수되었습니다\.'\);/,
    "setMessage(isEnglish ? 'Successfully submitted.' : '성공적으로 접수되었습니다.');"
  );
  content = content.replace(
    /setMessage\('오류가 발생했습니다\. 다시 시도해주세요\.'\);/,
    "setMessage(isEnglish ? 'An error occurred. Please try again.' : '오류가 발생했습니다. 다시 시도해주세요.');"
  );
  content = content.replace(
    /setMessage\('자동 가입 방지 인증을 완료해주세요\.'\);/,
    "setMessage(isEnglish ? 'Please complete the reCAPTCHA verification.' : '자동 가입 방지 인증을 완료해주세요.');"
  );
  content = content.replace(
    /setMessage\('이메일 인증을 완료해주세요\.'\);/,
    "setMessage(isEnglish ? 'Please complete email verification.' : '이메일 인증을 완료해주세요.');"
  );
  content = content.replace(
    /setVerificationError\('이메일 전송에 실패했습니다\.'\);/,
    "setVerificationError(isEnglish ? 'Failed to send email.' : '이메일 전송에 실패했습니다.');"
  );
  content = content.replace(
    /setVerificationError\('잘못된 인증번호입니다\.'\);/,
    "setVerificationError(isEnglish ? 'Invalid verification code.' : '잘못된 인증번호입니다.');"
  );

  // Translate labels and placeholders
  content = content.replace(
    /<label htmlFor="name" className="block text-\[11px\] md:text-xs font-black text-gray-900 mb-2 tracking-wide uppercase">이름 <span className="text-brand-green">\*<\/span><\/label>/g,
    '<label htmlFor="name" className="block text-[11px] md:text-xs font-black text-gray-900 mb-2 tracking-wide uppercase">{isEnglish ? "Name" : "이름"} <span className="text-brand-green">*</span></label>'
  );
  content = content.replace(
    /placeholder="홍길동"/g,
    'placeholder={isEnglish ? "John Doe" : "홍길동"}'
  );
  content = content.replace(
    /<label htmlFor="subject" className="block text-\[11px\] md:text-xs font-black text-gray-900 mb-2 tracking-wide uppercase">문의 제목 <span className="text-brand-green">\*<\/span><\/label>/g,
    '<label htmlFor="subject" className="block text-[11px] md:text-xs font-black text-gray-900 mb-2 tracking-wide uppercase">{isEnglish ? "Inquiry Subject" : "문의 제목"} <span className="text-brand-green">*</span></label>'
  );
  
  content = content.replace(
    /<label htmlFor="phone" className="block text-\[11px\] md:text-xs font-black text-gray-900 mb-2 tracking-wide uppercase">연락처 \(CONTACT NUMBER\)<\/label>/g,
    '<label htmlFor="phone" className="block text-[11px] md:text-xs font-black text-gray-900 mb-2 tracking-wide uppercase">{isEnglish ? "Contact Number" : "연락처 (CONTACT NUMBER)"}</label>'
  );
  content = content.replace(
    /<label htmlFor="email" className="block text-\[11px\] md:text-xs font-black text-gray-900 mb-2 tracking-wide uppercase">이메일 주소 <span className="text-brand-green">\*<\/span><\/label>/g,
    '<label htmlFor="email" className="block text-[11px] md:text-xs font-black text-gray-900 mb-2 tracking-wide uppercase">{isEnglish ? "Email Address" : "이메일 주소"} <span className="text-brand-green">*</span></label>'
  );
  
  content = content.replace(
    /placeholder="상세한 문의 사항을 남겨주시면 정성껏 답변 드리겠습니다\."/g,
    'placeholder={isEnglish ? "Please leave detailed inquiries and we will answer you sincerely." : "상세한 문의 사항을 남겨주시면 정성껏 답변 드리겠습니다."}'
  );
  
  // Agreement texts
  content = content.replace(
    /<span className="text-\[11px\] font-semibold">개인정보 수집 및 이용에 I agree\.<\/span>/g,
    '<span className="text-[11px] font-semibold">{isEnglish ? "I agree to the collection and use of personal information." : "개인정보 수집 및 이용에 동의합니다."}</span>'
  );
  content = content.replace(
    /\(필수\) 다산제약은 문의 접수 및 답변 처리를 목적으로 이름, 이메일, 연락처 정보를 수집합니다\./g,
    '{isEnglish ? "(Required) Dasan Pharmaceutical collects name, email, and contact information for the purpose of receiving inquiries and processing answers." : "(필수) 다산제약은 문의 접수 및 답변 처리를 목적으로 이름, 이메일, 연락처 정보를 수집합니다."}'
  );
  
  // Password for inquiry check
  content = content.replace(
    /<label htmlFor="password" className="block text-\[11px\] md:text-xs font-black text-gray-900 mb-2 tracking-wide uppercase">조회용 비밀번호 <span className="text-brand-green">\*<\/span><\/label>/g,
    '<label htmlFor="password" className="block text-[11px] md:text-xs font-black text-gray-900 mb-2 tracking-wide uppercase">{isEnglish ? "Password for lookup" : "조회용 비밀번호"} <span className="text-brand-green">*</span></label>'
  );
  content = content.replace(
    /placeholder="비밀번호 입력 \(추후 조회 시 필요\)"/g,
    'placeholder={isEnglish ? "Enter password (required for future lookup)" : "비밀번호 입력 (추후 조회 시 필요)"}'
  );
  content = content.replace(
    /\* 익명 문의 조회를 위해 반드시 기억해 주세요\./g,
    '{isEnglish ? "* Please remember this to check your anonymous inquiry." : "* 익명 문의 조회를 위해 반드시 기억해 주세요."}'
  );
  
  // Button text
  content = content.replace(
    /\{loading \? '처리 중\.\.\.' : '문의 접수하기'\}/g,
    "{loading ? (isEnglish ? 'Processing...' : '처리 중...') : (isEnglish ? 'Submit Inquiry' : '문의 접수하기')}"
  );

  // Recaptcha hl prop
  if (content.includes('<ReCAPTCHA')) {
    if (!content.includes('hl={isEnglish ? "en" : "ko"}')) {
      content = content.replace(
        /<ReCAPTCHA\s*ref=\{recaptchaRef\}/g,
        '<ReCAPTCHA\n                        hl={isEnglish ? "en" : "ko"}\n                        ref={recaptchaRef}'
      );
    }
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
};

const applyTranslationToInquiryPages = () => {
  const pages = [
    { path: 'page.tsx', titleEn: 'Product Inquiry', majorEn: 'Customer Service' },
    { path: 'sales/page.tsx', titleEn: 'Sales Inquiry', majorEn: 'Customer Service' },
    { path: 'corruption/page.tsx', titleEn: 'Corruption Report (Anonymous)', majorEn: 'Customer Service' },
    { path: 'check/page.tsx', titleEn: 'Check Inquiry', majorEn: 'Customer Service' }
  ];
  
  for (const page of pages) {
    const filePath = path.join(__dirname, '..', 'src', 'app', 'en', 'contact', 'inquiry', page.path);
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    content = content.replace(
      /const activeMajor = '고객센터';/g,
      `const activeMajor = '${page.majorEn}';`
    );
    
    // Some pages might have `const activeTitle = '...';` mapped to Korean
    content = content.replace(
      /const activeTitle = '제품 문의';/g,
      `const activeTitle = 'Product Inquiry';`
    );
    content = content.replace(
      /const activeTitle = '영업 문의';/g,
      `const activeTitle = 'Sales Inquiry';`
    );
    content = content.replace(
      /const activeTitle = '부패신고 문의\(익명\)';/g,
      `const activeTitle = 'Corruption Report (Anonymous)';`
    );
    content = content.replace(
      /const activeTitle = '문의 확인';/g,
      `const activeTitle = 'Check Inquiry';`
    );

    // Update grandContact?.name similarly to page.tsx
    content = content.replace(
      /\{grandContact\?\.name\}/g,
      '{grandContact?.enName || grandContact?.name}'
    );
    content = content.replace(
      /\{major\.name\}/g,
      '{major.enName || major.name}'
    );
    content = content.replace(
      /\{sub\.name\}(\s*<\/Link>)/g,
      '{sub.enName || sub.name}$1'
    );

    fs.writeFileSync(filePath, content, 'utf8');
  }
};

applyTranslationToContactForm();
applyTranslationToInquiryPages();
console.log('Finished translating inquiry forms and pages!');
