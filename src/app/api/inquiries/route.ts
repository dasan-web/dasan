import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '@/lib/db';
import { decryptSession } from '@/lib/auth';
import nodemailer from 'nodemailer';

// Helper function to verify user role
async function checkAuth(allowedRoles: string[]) {
  const cookieStore = await cookies();
  const token = cookieStore.get('dasan-admin-session')?.value;
  const session = token ? decryptSession(token) : null;

  if (!session || !session.expiresAt || Date.now() > session.expiresAt) {
    return { error: '인증 세션이 만료되었습니다. 다시 로그인해주세요.', status: 401 };
  }

  if (!allowedRoles.includes(session.role)) {
    return { error: `이 작업을 수행할 권한이 없습니다.`, status: 403 };
  }

  return { session };
}

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, content, inquiryType, password } = await request.json();

    if (!name || !email || !subject || !content) {
      return NextResponse.json(
        { error: '이름, 이메일, 제목, 내용은 필수 입력 사항입니다.' },
        { status: 400 }
      );
    }

    let typePrefix = '[1:1 문의]';
    if (inquiryType === 'product') {
      typePrefix = '[제품 문의]';
    } else if (inquiryType === 'sales') {
      typePrefix = '[영업 문의]';
    } else if (inquiryType === 'corruption') {
      typePrefix = '[부패신고 문의]';
    }

    const prefixedSubject = `${typePrefix} ${subject}`;

    if (inquiryType === 'corruption' && !password) {
      return NextResponse.json(
        { error: '비밀번호는 필수 입력 사항입니다.' },
        { status: 400 }
      );
    }

    let hashedPassword = null;
    if (password) {
      const crypto = require('crypto');
      hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    }

    const insertSql = `
      INSERT INTO inquiries (name, email, phone, subject, content, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const result = await query(insertSql, [name, email, phone || null, prefixedSubject, content, hashedPassword]);

    // Send email notification dynamically based on SMTP configurations
    try {
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
        `,
      });
      console.log('Email sent successfully via Mailplug to jssong@dspharm.com');
    } catch (mailErr) {
      // Log the mail error but don't fail the API call since the data has already been saved to the DB.
      console.error('Mailplug SMTP send failed:', mailErr);
    }

    return NextResponse.json({
      message: '문의사항이 성공적으로 등록되었습니다.',
      id: result.insertId,
    });
  } catch (err: any) {
    console.error('API Inquiry submission error:', err);
    return NextResponse.json(
      { error: '서버 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const admin = searchParams.get('admin');
    const password = searchParams.get('password');

    if (admin === 'true') {
      const auth = await checkAuth(['super_admin', 'editor', 'viewer']);
      if (auth.error) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
      }

      // Admin request: return all fields including content
      const selectSql = `
        SELECT id, name, email, phone, subject, content, created_at
        FROM inquiries
        ORDER BY created_at DESC
      `;
      const inquiries = await query(selectSql);
      return NextResponse.json(inquiries);
    }

    if (!email) {
      return NextResponse.json(
        { error: '이메일 주소를 입력해 주세요.' },
        { status: 400 }
      );
    }

    if (email === 'anonymous@dspharm.com') {
      if (!password) {
        return NextResponse.json(
          { error: '익명 문의 조회를 위해 비밀번호를 입력해 주세요.' },
          { status: 400 }
        );
      }
      const crypto = require('crypto');
      const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
      
      const selectSql = `
        SELECT id, name, email, phone, subject, content, created_at
        FROM inquiries
        WHERE email = ? AND password = ?
        ORDER BY created_at DESC
      `;
      const inquiries = await query(selectSql, [email, hashedPassword]);
      return NextResponse.json(inquiries);
    } else {
      const selectSql = `
        SELECT id, name, email, phone, subject, content, created_at
        FROM inquiries
        WHERE email = ?
        ORDER BY created_at DESC
      `;
      const inquiries = await query(selectSql, [email]);
      return NextResponse.json(inquiries);
    }
  } catch (err: any) {
    console.error('API Inquiry fetch error:', err);
    return NextResponse.json(
      { error: '문의 내역을 조회하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const auth = await checkAuth(['super_admin']);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: '삭제할 문의사항의 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    await query('DELETE FROM inquiries WHERE id = ?', [id]);
    return NextResponse.json({ message: '문의사항이 성공적으로 삭제되었습니다.' });
  } catch (err: any) {
    console.error('API Inquiry delete error:', err);
    return NextResponse.json(
      { error: '문의사항 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
