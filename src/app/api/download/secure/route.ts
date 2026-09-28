import { NextResponse } from 'next/server';
import { verifySecureDownloadToken } from '@/lib/secureLink';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return new NextResponse(renderExpiredHtml('다운로드 토큰이 누락되었습니다.'), {
        status: 400,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    const result = verifySecureDownloadToken(token);

    if ('error' in result) {
      return new NextResponse(renderExpiredHtml(result.error), {
        status: 410, // 410 Gone
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    const { url, name } = result;

    // Fetch original file from storage
    const fileRes = await fetch(url);
    if (!fileRes.ok) {
      return new NextResponse(renderExpiredHtml('파일을 불러올 수 없습니다. 원본 파일이 존재하지 않거나 이동되었을 수 있습니다.'), {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    const arrayBuffer = await fileRes.arrayBuffer();
    const contentType = fileRes.headers.get('content-type') || 'application/octet-stream';

    // Encode filename for Content-Disposition header
    const encodedName = encodeURIComponent(name);

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${encodedName}"; filename*=UTF-8''${encodedName}`,
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (err: any) {
    console.error('Secure download error:', err);
    return new NextResponse(renderExpiredHtml('파일을 다운로드하는 중 시스템 오류가 발생했습니다.'), {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
}

function renderExpiredHtml(message: string) {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <title>첨부파일 보안 안내 - 다산제약</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif;
      background: #090f1d;
      color: #f8fafc;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .card {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      max-width: 480px;
      width: 100%;
      padding: 40px 32px;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
    }
    .badge-icon {
      width: 64px;
      height: 64px;
      background: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.25);
      color: #f87171;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      margin-bottom: 24px;
    }
    h1 {
      font-size: 20px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 12px;
      letter-spacing: -0.02em;
    }
    .msg {
      font-size: 14px;
      color: #94a3b8;
      line-height: 1.6;
      margin-bottom: 28px;
    }
    .notice-box {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 16px;
      font-size: 12px;
      color: #cbd5e1;
      text-align: left;
      line-height: 1.6;
    }
    .notice-box strong {
      color: #38bdf8;
    }
    .footer {
      margin-top: 24px;
      font-size: 11px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge-icon">🔒</div>
    <h1>첨부파일 다운로드 만료 안내</h1>
    <p class="msg">
      ${message}<br/>
      개인정보 보호 및 사내 보안 규정에 따라 <strong>메일 발송 30일 경과 후</strong> 외부 다운로드 링크가 자동으로 비활성화되었습니다.
    </p>
    <div class="notice-box">
      <strong>🏢 다산제약 사내 담당자 안내</strong><br/>
      본 서류의 원본은 <strong>관리자 대시보드</strong>에 영구 보관되어 있습니다. 파일 열람이 필요하신 경우 관리자 시스템에 로그인하여 다운로드하시기 바랍니다.
    </div>
    <div class="footer">
      Dasan Pharmaceutical Co., Ltd. Security Protection
    </div>
  </div>
</body>
</html>`;
}
