import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import nodemailer from 'nodemailer';
import { getBaseOrigin, generateSecureDownloadLink, renderAttachmentEmailRow } from '@/lib/secureLink';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      role = '생산직',
      careerType = '신입',
      location = '무관',
      memo = '',
      file_url = null,
      file_name = null,
      recaptchaToken,
    } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: '성명, 이메일, 연락처는 필수 입력 항목입니다.' },
        { status: 400 }
      );
    }

    if (!recaptchaToken) {
      return NextResponse.json(
        { error: '자동가입 방지 체크(reCAPTCHA)가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token with Google
    const secretKey = '6LdRVT0tAAAAAIydIJLhsveG1wiGGncrpetxPN7z';
    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${recaptchaToken}`,
    });
    const verifyData = await verifyRes.json();
    
    if (!verifyData.success) {
      return NextResponse.json(
        { error: 'reCAPTCHA 인증에 실패했습니다. 다시 시도해주세요.' },
        { status: 400 }
      );
    }

    const subject = `[상시 채용지원] [${role}] ${name} (${careerType})`;
    const content = `
[상시 인재풀 입사지원서]
- 지원 직무: ${role}
- 경력 구분: ${careerType}
- 지원자 성명: ${name}
- 연락처: ${phone}
- 이메일: ${email}
- 희망 근무지: ${location}
- 첨부 서류: ${file_name ? `${file_name}` : '미첨부'}

[자기소개 및 주요 경력]
${memo || '내용 없음'}
    `.trim();

    // Insert into inquiries table for unified admin dashboard management
    const insertSql = `
      INSERT INTO inquiries (name, email, phone, subject, content, password, file_url, file_name)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await query(insertSql, [
      name,
      email,
      phone,
      subject,
      content,
      null, // no password
      file_url || null,
      file_name || null,
    ]);

    // Send email notification to HR (insa@dspharm.com)
    try {
      const origin = getBaseOrigin(request);
      const secureDownloadUrl = file_url
        ? generateSecureDownloadLink(origin, file_url, file_name || '이력서첨부파일', 30)
        : null;

      const smtpUser = process.env.SMTP_USER || 'admin@dspharm.com';
      const smtpPass = process.env.SMTP_PASSWORD || '*UZyO0Ku51g(CrByzE4}';

      const transporter = nodemailer.createTransport({
        host: 'smtp.mailplug.co.kr',
        port: 465,
        secure: true,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
      });

      const fileAttachmentHtml = secureDownloadUrl
        ? renderAttachmentEmailRow(secureDownloadUrl, file_name || '이력서첨부파일', new Date(), 30)
        : '';

      // 1. HR 담당자 알림 메일 발송
      await transporter.sendMail({
        from: `"다산제약 채용시스템" <${smtpUser}>`,
        replyTo: email ? `"${name}" <${email}>` : undefined,
        to: ['insa@dspharm.com', 'jssong@dspharm.com'],
        subject: `[다산제약 채용] ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 650px; border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px;">
            <h2 style="color: #047857; border-bottom: 2px solid #047857; padding-bottom: 12px; margin-top: 0;">새로운 상시 입사지원서가 접수되었습니다.</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="width: 130px; font-weight: bold; padding: 8px 0; color: #475569;">지원 부문:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #0f172a;">${role} (${careerType})</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; color: #475569;">지원자 성명:</td>
                <td style="padding: 8px 0; color: #0f172a;">${name}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; color: #475569;">연락처:</td>
                <td style="padding: 8px 0; color: #0f172a;">${phone}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; color: #475569;">이메일:</td>
                <td style="padding: 8px 0; color: #0f172a;">${email}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; color: #475569;">희망 근무지:</td>
                <td style="padding: 8px 0; color: #0f172a;">${location}</td>
              </tr>
              ${fileAttachmentHtml}
              <tr>
                <td style="font-weight: bold; padding: 12px 0 6px; color: #475569; vertical-align: top;" colspan="2">자기소개 및 주요 경력:</td>
              </tr>
              <tr>
                <td colspan="2" style="background-color: #f8fafc; padding: 16px; border-radius: 8px; white-space: pre-wrap; color: #334155; font-size: 14px; border: 1px solid #e2e8f0;">${memo || '(기재 내용 없음)'}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
              본 메일은 다산제약 공식 웹사이트 인재채용 상시 접수 시스템을 통해 발송되었습니다.
            </div>
          </div>
        `,
      });
      console.log('HR notification email sent successfully to insa@dspharm.com, jssong@dspharm.com');

      // 2. 지원자 본인 접수 확인 메일 발송
      if (email && email.includes('@')) {
        await transporter.sendMail({
          from: `"다산제약 채용시스템" <${smtpUser}>`,
          to: email.trim(),
          subject: `[다산제약] 상시 인재풀 입사지원서가 정상적으로 접수되었습니다.`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 650px; border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px;">
              <h2 style="color: #047857; border-bottom: 2px solid #047857; padding-bottom: 12px; margin-top: 0;">상시 인재풀 입사지원 접수 완료</h2>
              <p style="font-size: 15px; color: #1e293b;">안녕하세요, <strong>${name}</strong>님.</p>
              <p style="font-size: 14px; color: #475569;">
                다산제약 상시 인재풀에 소중한 지원서를 등록해 주셔서 감사드립니다.<br/>
                제출해주신 지원서는 인재 데이터베이스에 안전하게 보관되며, 해당 직무의 채용 소요 발생 시 최우선으로 검토하여 기재해주신 연락처로 개별 안내를 드리겠습니다.
              </p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;">
                <tr>
                  <td style="width: 120px; font-weight: bold; padding: 8px 0; color: #64748b;">지원 부문:</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #0f172a;">${role} (${careerType})</td>
                </tr>
                <tr>
                  <td style="width: 120px; font-weight: bold; padding: 8px 0; color: #64748b;">희망 근무지:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${location}</td>
                </tr>
                <tr>
                  <td style="width: 120px; font-weight: bold; padding: 8px 0; color: #64748b;">접수 일시:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</td>
                </tr>
              </table>
              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
                본 메일은 발신전용 메일이며 회신되지 않습니다. 채용 관련 문의는 <strong>insa@dspharm.com</strong>으로 문의해 주시기 바랍니다.
              </div>
            </div>
          `,
        });
        console.log(`Applicant confirmation email sent successfully to ${email}`);
      }
    } catch (emailErr) {
      console.error('Career application notification email sending failed:', emailErr);
    }

    return NextResponse.json({
      success: true,
      message: '지원서가 정상적으로 접수되었습니다.',
    });
  } catch (error: any) {
    console.error('Career application submission error:', error);
    return NextResponse.json(
      { error: '지원서 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
