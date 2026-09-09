const mysql = require('mysql2/promise');

async function updateDb() {
  const pool = mysql.createPool({
    host: 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com',
    port: 4000,
    user: '34mGcDTA8bbMoj7.root',
    password: '3h8a12Y8gOr6fbVj',
    database: 'dasan_homepage',
    ssl: { rejectUnauthorized: false }
  });

  const [rows] = await pool.execute('SELECT page_key, content FROM admin_contents WHERE page_key = "about/ir/financial" OR page_key = "en/about/ir/financial"');
  
  if (rows.length === 0) {
    console.log('No rows found!');
  } else {
    for (const row of rows) {
      console.log('Updating:', row.page_key);
      const isEn = row.page_key === 'en/about/ir/financial';
      
      const lines = row.content.split('\n');
      // The format in the DB is:
      // lines[0]: title
      // lines[1]: desc
      // lines[2]: financialHeaders
      // lines[3]: salesRow
      // lines[4]: profitRow
      // lines[5]: rdRow
      // lines[6..17]: consolidatedBS (12 rows)
      // lines[18..28]: separateBS (11 rows)
      // lines[29..32]: consolidatedIS (4 rows)
      // lines[33..36]: separateIS (4 rows)

      if (lines.length >= 37) {
        lines[3] = isEn ? 'Sales | 79,275 | 92,734 | 110,191' : '매출액 | 79,275 | 92,734 | 110,191';
        lines[4] = isEn ? 'Operating Profit | 2,389 | 6,068 | 338' : '영업이익 | 2,389 | 6,068 | 338';
        
        const conBS = isEn ? [
          'Current Assets | 42,060 | 49,466 | 67,118',
          'Non-current Assets | 31,197 | 38,595 | 43,297',
          'Total Assets | 73,257 | 88,061 | 110,415',
          'Current Liabilities | 39,071 | 42,281 | 61,928',
          'Non-current Liabilities | 11,223 | 14,582 | 12,099',
          'Total Liabilities | 50,294 | 56,863 | 74,028',
          'Capital Stock | 1,120 | 1,120 | 1,120',
          'Capital Surplus | 3,583 | 3,583 | 3,583',
          'Other Capital | -7,762 | -7,771 | -7,776',
          'Retained Earnings | 26,152 | 34,248 | 39,645',
          'Non-controlling Interests | -131 | 17 | -185',
          'Total Equity | 22,962 | 31,198 | 36,388'
        ] : [
          '유동자산 | 42,060 | 49,466 | 67,118',
          '비유동자산 | 31,197 | 38,595 | 43,297',
          '자산총계 | 73,257 | 88,061 | 110,415',
          '유동부채 | 39,071 | 42,281 | 61,928',
          '비유동부채 | 11,223 | 14,582 | 12,099',
          '부채총계 | 50,294 | 56,863 | 74,028',
          '자본금 | 1,120 | 1,120 | 1,120',
          '자본잉여금 | 3,583 | 3,583 | 3,583',
          '기타자본 | -7,762 | -7,771 | -7,776',
          '이익잉여금 | 26,152 | 34,248 | 39,645',
          '비지배지분 | -131 | 17 | -185',
          '자본총계 | 22,962 | 31,198 | 36,388'
        ];
        
        for (let i = 0; i < 12; i++) {
          lines[6 + i] = conBS[i];
        }

        const sepBS = isEn ? [
          'Current Assets | 41,899 | 49,031 | 65,212',
          'Non-current Assets | 31,032 | 38,621 | 45,426',
          'Total Assets | 72,931 | 87,652 | 110,637',
          'Current Liabilities | 38,309 | 41,738 | 61,197',
          'Non-current Liabilities | 11,223 | 14,582 | 11,887',
          'Total Liabilities | 49,531 | 56,320 | 73,084',
          'Capital Stock | 1,120 | 1,120 | 1,120',
          'Capital Surplus | 3,583 | 3,583 | 3,583',
          'Other Capital | -7,766 | -7,766 | -7,766',
          'Retained Earnings | 26,462 | 34,395 | 40,616',
          'Total Equity | 23,400 | 31,333 | 37,554'
        ] : [
          '유동자산 | 41,899 | 49,031 | 65,212',
          '비유동자산 | 31,032 | 38,621 | 45,426',
          '자산총계 | 72,931 | 87,652 | 110,637',
          '유동부채 | 38,309 | 41,738 | 61,197',
          '비유동부채 | 11,223 | 14,582 | 11,887',
          '부채총계 | 49,531 | 56,320 | 73,084',
          '자본금 | 1,120 | 1,120 | 1,120',
          '자본잉여금 | 3,583 | 3,583 | 3,583',
          '기타자본 | -7,766 | -7,766 | -7,766',
          '이익잉여금 | 26,462 | 34,395 | 40,616',
          '자본총계 | 23,400 | 31,333 | 37,554'
        ];

        for (let i = 0; i < 11; i++) {
          lines[18 + i] = sepBS[i];
        }

        const conIS = isEn ? [
          'Sales | 80,027 | 93,817 | 110,191',
          'Operating Profit | 1,867 | 6,161 | 338',
          'Income before Tax | 46 | 8,247 | 3,238',
          'Net Income | 1,815 | 8,035 | 3,690'
        ] : [
          '매출액 | 80,027 | 93,817 | 110,191',
          '영업이익 | 1,867 | 6,161 | 338',
          '법인세차감전순이익 | 46 | 8,247 | 3,238',
          '당기순이익 | 1,815 | 8,035 | 3,690'
        ];

        for (let i = 0; i < 4; i++) {
          lines[29 + i] = conIS[i];
        }

        const sepIS = isEn ? [
          'Sales | 79,275 | 92,734 | 106,877',
          'Operating Profit | 2,389 | 6,068 | 1,399',
          'Income before Tax | 547 | 8,150 | 4,547',
          'Net Income | 2,316 | 7,929 | 4,937'
        ] : [
          '매출액 | 79,275 | 92,734 | 106,877',
          '영업이익 | 2,389 | 6,068 | 1,399',
          '법인세차감전순이익 | 547 | 8,150 | 4,547',
          '당기순이익 | 2,316 | 7,929 | 4,937'
        ];

        for (let i = 0; i < 4; i++) {
          lines[33 + i] = sepIS[i];
        }

        const newContent = lines.join('\n');
        await pool.execute('UPDATE admin_contents SET content = ? WHERE page_key = ?', [newContent, row.page_key]);
        console.log('Successfully updated:', row.page_key);
      } else {
        console.log('Lines length too small for', row.page_key, ':', lines.length);
      }
    }
  }

  pool.end();
}
updateDb();
