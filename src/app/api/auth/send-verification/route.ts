import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: '이메일 주소를 입력해주세요.' }, { status: 400 });
    }

    // Generate 6-digit random code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store in database
    const insertSql = `
      INSERT INTO email_verifications (email, code, expires_at)
      VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 5 MINUTE))
    `;
    await query(insertSql, [email, code]);

    // Send email using SMTP
    const smtpUser = process.env.SMTP_USER || 'insa@dspharm.com';
    const smtpPass = process.env.SMTP_PASSWORD || '@dasan5206';

    const transporter = nodemailer.createTransport({
      host: 'smtp.mailplug.co.kr',
      port: 465,
      secure: true, // true for port 465 (SSL)
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"다산제약" <${smtpUser}>`,
      to: email,
      subject: `[다산제약] 문의 접수 이메일 인증번호 안내`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #2e7d32; border-bottom: 2px solid #2e7d32; padding-bottom: 10px;">이메일 인증번호 안내</h2>
          <p>안녕하세요.</p>
          <p>다산제약 문의 접수를 위한 이메일 인증번호입니다.</p>
          <div style="margin: 20px 0; padding: 20px; background-color: #f8f9fa; border-radius: 5px; text-align: center;">
            <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #333;">${code}</span>
          </div>
          <p style="color: #666; font-size: 14px;">본 인증번호는 5분 동안만 유효합니다.<br/>해당 인증번호를 입력 화면에 기입해 주세요.</p>
          <p style="margin-top: 30px; font-size: 12px; color: #999;">본 메일은 발신전용이며, 회신되지 않습니다.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: '인증번호가 발송되었습니다.' });
  } catch (error: any) {
    console.error('Failed to send verification email:', error);
    return NextResponse.json({ error: '인증번호 발송에 실패했습니다. 이메일 주소를 다시 확인해주세요.' }, { status: 500 });
  }
}
