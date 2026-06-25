import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '@/lib/db';
import { decryptSession } from '@/lib/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('dasan-admin-session')?.value;
    const session = token ? decryptSession(token) : null;

    if (!session || !session.expiresAt || Date.now() > session.expiresAt) {
      return NextResponse.json(
        { error: '인증 세션이 만료되었습니다. 다시 로그인해주세요.' },
        { status: 401 }
      );
    }

    // 1. Today's visitors (unique IP)
    const todayRes = await query(
      'SELECT COUNT(DISTINCT ip) AS count FROM visitor_logs WHERE DATE(created_at) = CURDATE()'
    );
    const todayCount = todayRes[0]?.count || 0;

    // 2. Yesterday's visitors
    const yesterdayRes = await query(
      'SELECT COUNT(DISTINCT ip) AS count FROM visitor_logs WHERE DATE(created_at) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)'
    );
    const yesterdayCount = yesterdayRes[0]?.count || 0;

    // 3. Total cumulative visitors (unique IP)
    const totalRes = await query('SELECT COUNT(DISTINCT ip) AS count FROM visitor_logs');
    const totalCount = totalRes[0]?.count || 0;

    // 4. Weekly stats (last 7 days unique visitor count per day)
    const weeklyRes = await query(`
      SELECT DATE_FORMAT(MIN(created_at), '%m/%d') as visit_date, COUNT(DISTINCT ip) as count
      FROM visitor_logs
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) ASC
    `);

    // 5. Popular category page views (all-time aggregate by prefix)
    const categoryRes = await query(`
      SELECT 
        SUM(CASE WHEN page LIKE '/business%' THEN 1 ELSE 0 END) as business_pv,
        SUM(CASE WHEN page LIKE '/about%' THEN 1 ELSE 0 END) as about_pv,
        SUM(CASE WHEN page LIKE '/rd%' THEN 1 ELSE 0 END) as rd_pv,
        SUM(CASE WHEN page LIKE '/contact%' THEN 1 ELSE 0 END) as contact_pv,
        SUM(CASE WHEN page = '/' THEN 1 ELSE 0 END) as main_pv
      FROM visitor_logs
    `);

    const businessPv = Number(categoryRes[0]?.business_pv || 0);
    const aboutPv = Number(categoryRes[0]?.about_pv || 0);
    const rdPv = Number(categoryRes[0]?.rd_pv || 0);
    const contactPv = Number(categoryRes[0]?.contact_pv || 0);
    const mainPv = Number(categoryRes[0]?.main_pv || 0);
    const totalPv = businessPv + aboutPv + rdPv + contactPv + mainPv || 1;

    // 6. Recent visitor logs (latest 5 logs)
    const recentLogs = await query(`
      SELECT ip, device, page, DATE_FORMAT(created_at, '%H:%i:%s') as time
      FROM visitor_logs
      ORDER BY created_at DESC
      LIMIT 5
    `);

    // 7. Unique visitors list (grouped by date, showing count of unique visitors and list of IPs)
    const uniqueVisitors = await query(`
      SELECT 
        DATE_FORMAT(MIN(created_at), '%Y-%m-%d') as visit_date, 
        COUNT(DISTINCT ip) as visitor_count,
        GROUP_CONCAT(DISTINCT ip ORDER BY created_at DESC SEPARATOR ', ') as ips,
        GROUP_CONCAT(DISTINCT CASE WHEN device LIKE '%Mobile%' OR device LIKE '%iPhone%' OR device LIKE '%Android%' THEN ip ELSE NULL END ORDER BY created_at DESC SEPARATOR ', ') as mobile_ips,
        GROUP_CONCAT(DISTINCT CASE WHEN NOT (device LIKE '%Mobile%' OR device LIKE '%iPhone%' OR device LIKE '%Android%') THEN ip ELSE NULL END ORDER BY created_at DESC SEPARATOR ', ') as pc_ips
      FROM visitor_logs
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) DESC
    `);

    return NextResponse.json({
      todayCount,
      yesterdayCount,
      totalCount,
      weeklyStats: weeklyRes,
      categoryStats: {
        business: { pv: businessPv, share: `${Math.round((businessPv / totalPv) * 100)}%` },
        about: { pv: aboutPv, share: `${Math.round((aboutPv / totalPv) * 100)}%` },
        rd: { pv: rdPv, share: `${Math.round((rdPv / totalPv) * 100)}%` },
        contact: { pv: contactPv, share: `${Math.round((contactPv / totalPv) * 100)}%` },
        main: { pv: mainPv, share: `${Math.round((mainPv / totalPv) * 100)}%` }
      },
      recentLogs,
      uniqueVisitors
    });
  } catch (err: any) {
    console.error('API Admin Stats Error:', err);
    return NextResponse.json({ error: 'Failed to fetch admin stats' }, { status: 500 });
  }
}
