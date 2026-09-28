import crypto from 'crypto';

const SECRET = process.env.DB_PASSWORD || 'dasan-secure-file-download-secret-key-32';
const key = crypto.createHash('sha256').update(SECRET).digest();

export interface SecureDownloadPayload {
  url: string;
  name: string;
  expiresAt: number; // timestamp in ms
}

/**
 * Get base origin from request headers
 */
export function getBaseOrigin(request: Request): string {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  const proto = request.headers.get('x-forwarded-proto') || 'http';
  if (host) {
    return `${proto}://${host}`;
  }
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

/**
 * Generate a 30-day security expiring download link
 */
export function generateSecureDownloadLink(
  origin: string,
  fileUrl: string,
  fileName: string,
  days = 30
): string {
  const expiresAt = Date.now() + days * 24 * 60 * 60 * 1000;
  const payload: SecureDownloadPayload = {
    url: fileUrl,
    name: fileName,
    expiresAt,
  };

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(JSON.stringify(payload), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const token = `${iv.toString('hex')}_${encrypted}`;

  return `${origin}/api/download/secure?token=${token}`;
}

/**
 * Verify token and check expiration
 */
export function verifySecureDownloadToken(token: string): SecureDownloadPayload | { error: string } {
  try {
    if (!token || !token.includes('_')) {
      return { error: '유효하지 않은 다운로드 링크입니다.' };
    }
    const [ivHex, encryptedHex] = token.split('_');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    const payload: SecureDownloadPayload = JSON.parse(decrypted);

    if (Date.now() > payload.expiresAt) {
      return { error: '다운로드 유효기간(30일)이 만료된 보안 링크입니다.' };
    }

    return payload;
  } catch (err) {
    return { error: '다운로드 링크 검증에 실패했습니다.' };
  }
}

/**
 * Format a date range string for Korea timezone (Asia/Seoul)
 */
export function formatExpiryPeriod(startDate: Date = new Date(), days = 30) {
  const endDate = new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000);

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\. /g, '.').replace(/\.$/, '');
  };

  const formatDateTime = (d: Date) => {
    return d.toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return {
    startStr: formatDate(startDate),
    endStr: formatDate(endDate),
    endDateTimeStr: formatDateTime(endDate),
    periodStr: `${formatDate(startDate)} ~ ${formatDate(endDate)} (${days}일간)`,
  };
}

/**
 * Render email HTML table row for secure attachment with clear 30-day validity explanation
 */
export function renderAttachmentEmailRow(
  secureDownloadUrl: string,
  fileName: string,
  sendDate: Date = new Date(),
  days = 30
): string {
  const { startStr, endStr, endDateTimeStr } = formatExpiryPeriod(sendDate, days);
  const displayName = fileName || '첨부파일';

  return `
    <tr>
      <td style="font-weight: bold; padding: 12px 0 6px; color: #475569; vertical-align: top; width: 130px;">첨부파일:</td>
      <td style="padding: 10px 0;">
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px;">
          <div style="margin-bottom: 10px;">
            <a href="${secureDownloadUrl}" target="_blank" style="display: inline-block; background-color: #047857; color: #ffffff !important; text-decoration: none; font-weight: bold; font-size: 13px; padding: 9px 18px; border-radius: 7px;">
              📎 ${displayName} 다운로드
            </a>
          </div>
          <div style="background-color: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px; padding: 12px 14px; font-size: 12px; line-height: 1.6; color: #9f1239;">
            <div style="color: #be123c; font-size: 12px; font-weight: 600; margin-bottom: 6px;">
              • 다운로드 가능 기간: <span style="background-color: #ffe4e6; padding: 2px 6px; border-radius: 4px;">${startStr} ~ ${endStr} (${days}일간)</span><br/>
              • 링크 만료 예정 일시: ${endDateTimeStr} 까지
            </div>
            <div style="border-top: 1px dashed #fecdd3; padding-top: 6px; color: #475569; font-size: 11px; line-height: 1.5;">
              ※ 개인정보 보호 및 사내 보안 규정에 따라 <strong>메일 발송 시점부터 30일 경과 시 외부 다운로드 링크가 자동 만료</strong>됩니다.<br/>
              ※ 30일 이후 원본 파일 열람이 필요한 사내 담당자는 <strong>[관리자 대시보드]</strong>에 로그인하여 영구 보관된 원본 서류를 언제든지 확인 및 다운로드하실 수 있습니다.
            </div>
          </div>
        </div>
      </td>
    </tr>
  `;
}

