const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.join(__dirname, '../.env.local');
let smtpUser = 'insa@dspharm.com';
let smtpPass = '@dasan5206';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const parts = trimmed.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim();
        if (key === 'SMTP_USER') smtpUser = value;
        if (key === 'SMTP_PASSWORD') smtpPass = value;
      }
    }
  });
}

console.log('Using SMTP User:', smtpUser);

const transporter = nodemailer.createTransport({
  host: 'smtp.mailplug.co.kr',
  port: 465,
  secure: true, // true for port 465 (SSL)
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

const name = '홍길동(외부테스트)';
const email = 'testuser@naver.com';
const phone = '010-1234-5678';
const prefixedSubject = '[제품 문의] 제품 단가 및 발주 문의 테스트';
const content = '제품 발주 및 견적 문의에 대한 테스트 본문 내용입니다.';

const mailOptions = {
  from: `"다산제약 홈페이지" <${smtpUser}>`,
  replyTo: `"${name}" <${email}>`,
  to: 'jssong@dspharm.com',
  subject: `[문의 접수] ${prefixedSubject}`,
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
      <h2 style="color: #2e7d32; border-bottom: 2px solid #2e7d32; padding-bottom: 10px;">새로운 문의가 접수되었습니다.</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="width: 120px; font-weight: bold; padding: 8px 0;">작성자:</td>
          <td style="padding: 8px 0;">${name}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 8px 0;">이메일:</td>
          <td style="padding: 8px 0;">${email}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 8px 0;">연락처:</td>
          <td style="padding: 8px 0;">${phone || '미기재'}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 8px 0;">제목:</td>
          <td style="padding: 8px 0; font-weight: bold; color: #1565c0;">${prefixedSubject}</td>
        </tr>
      </table>
      <div style="margin-top: 20px; background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #2e7d32; white-space: pre-wrap;">
        ${content}
      </div>
      <p style="margin-top: 25px; font-size: 11px; color: #999; text-align: center;">이 메일은 다산제약 홈페이지 시스템에서 자동으로 발송되었습니다.</p>
    </div>
  `
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Mail Send Error:', error);
  } else {
    console.log('Mail Send Success:', info);
  }
});
