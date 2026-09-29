import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '@/lib/db';
import { decryptSession } from '@/lib/auth';
import nodemailer from 'nodemailer';
import { getBaseOrigin, generateSecureDownloadLink, renderAttachmentEmailRow } from '@/lib/secureLink';

// Helper function to verify admin authentication
async function checkAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('dasan-admin-session')?.value;
  const session = token ? decryptSession(token) : null;

  if (!session || !session.expiresAt || Date.now() > session.expiresAt) {
    return { error: '인증 세션이 만료되었습니다. 다시 로그인해주세요.', status: 401 };
  }
  return { user: session };
}

export async function POST(request: Request) {
  const auth = await checkAdminAuth();
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { id, targetEmail } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: '재발송할 문의/지원서 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const rows = await query('SELECT * FROM inquiries WHERE id = ?', [id]);
    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: '해당 내역을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const inquiry = rows[0];
    const { name, email, phone, subject, content, file_url, file_name, created_at } = inquiry;

    const isCareer = subject.startsWith('[상시 채용지원]');
    const isCorruption = subject.startsWith('[부패신고 문의]');
    const isSales = subject.startsWith('[영업 문의]') || subject.startsWith('[1:1 문의]');

    // Determine default recipients if not custom specified
    let recipients = targetEmail?.trim();
    if (!recipients) {
      if (isCareer || isCorruption) {
        recipients = 'insa@dspharm.com, jssong@dspharm.com';
      } else if (isSales) {
        recipients = 'dssale1996@dspharm.com, jssong@dspharm.com';
      } else {
        recipients = 'jssong@dspharm.com';
      }
    }

    const smtpUser = process.env.SMTP_USER || 'admin@dspharm.com';
    const smtpPass = process.env.SMTP_PASSWORD || '*UZyO0Ku51g(CrByzE4}';

    if (!smtpPass) {
      return NextResponse.json(
        { error: 'SMTP 비밀번호 설정이 누락되었습니다.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.mailplug.co.kr',
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    let fileAttachmentHtml = '';
    if (file_url) {
      const origin = getBaseOrigin(request);
      const secureDownloadUrl = generateSecureDownloadLink(
        origin,
        file_url,
        file_name || '첨부파일',
        30
      );
      fileAttachmentHtml = renderAttachmentEmailRow(
        secureDownloadUrl,
        file_name || '첨부파일',
        new Date(),
        30
      );
    }

    const mailTitle = isCareer
      ? `[다산제약 채용] [재발송] ${subject}`
      : `[문의 접수] [재발송] ${subject}`;

    const fromTitle = isCareer ? '다산제약 채용시스템' : '다산제약 홈페이지';

    await transporter.sendMail({
      from: `"${fromTitle}" <${smtpUser}>`,
      replyTo: email ? `"${name}" <${email}>` : undefined,
      to: recipients,
      subject: mailTitle,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 650px; border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px;">
          <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; color: #047857; padding: 10px 14px; border-radius: 8px; font-weight: bold; margin-bottom: 18px; font-size: 13px;">
            📢 본 메일은 관리자 대시보드에서 수동 재발송된 알림 메일입니다.
          </div>
          <h2 style="color: #047857; border-bottom: 2px solid #047857; padding-bottom: 12px; margin-top: 0;">
            ${isCareer ? '상시 입사지원서 접수 안내 (재발송)' : '고객 문의 접수 안내 (재발송)'}
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="width: 130px; font-weight: bold; padding: 8px 0; color: #475569;">작성자/지원자:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px 0; color: #475569;">연락처:</td>
              <td style="padding: 8px 0; color: #0f172a;">${phone || '미기재'}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px 0; color: #475569;">이메일:</td>
              <td style="padding: 8px 0; color: #0f172a;">${email || '미기재'}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px 0; color: #475569;">제목:</td>
              <td style="padding: 8px 0; color: #1565c0; font-weight: bold;">${subject}</td>
            </tr>
            ${fileAttachmentHtml}
            <tr>
              <td style="font-weight: bold; padding: 12px 0 6px; color: #475569; vertical-align: top;" colspan="2">
                ${isCareer ? '자기소개 및 주요 경력 / 내용:' : '문의 내용:'}
              </td>
            </tr>
            <tr>
              <td colspan="2" style="background-color: #f8fafc; padding: 16px; border-radius: 8px; white-space: pre-wrap; color: #334155; font-size: 14px; border: 1px solid #e2e8f0;">${content || '(내용 없음)'}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            • 원 접수 일시: ${new Date(created_at).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}<br/>
            • 재발송 수신처: ${recipients}<br/>
            • 본 메일은 다산제약 공식 웹사이트 관리자 대시보드를 통해 발송되었습니다.
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: '메일이 성공적으로 재발송되었습니다.',
      recipients,
    });
  } catch (error: any) {
    console.error('Email resend error:', error);
    return NextResponse.json(
      { error: '메일 재발송 중 오류가 발생했습니다: ' + (error.message || '알 수 없는 오류') },
      { status: 500 }
    );
  }
}
