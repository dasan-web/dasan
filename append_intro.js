const mysql = require('mysql2/promise');

async function run() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ektks0518!',
    database: 'dasan_homepage'
  });
  
  const [rows] = await connection.execute("SELECT content FROM admin_contents WHERE page_key='about/intro'");
  if (rows.length > 0) {
    let content = rows[0].content;
    
    // Check if it already has the signature to avoid duplicates
    if (!content.includes('류형선') && !content.includes('柳亭善')) {
      // Append the HTML signature
      const signatureHtml = `\n\n<div style="text-align: right; margin-top: 4rem; display: flex; justify-content: flex-end; align-items: flex-end; gap: 1rem;">
  <span style="color: #6b7280; font-weight: 500; font-size: 15px; padding-bottom: 0.25rem;">다산제약 대표이사</span>
  <span style="color: #1f2937; font-weight: 900; font-size: 36px; letter-spacing: 0.1em; font-family: serif;">류형선</span>
</div>`;
      
      // We need to convert existing plain text to HTML first to ensure proper rendering in the RichTextEditor
      let parts = content.split('|');
      let title = parts[0];
      let body = parts.slice(1).join('|');
      
      if (!body.includes('<p') && !body.includes('<div')) {
        // Wrap plain text in paragraphs
        body = body.split('\n').filter(line => line.trim()).map(line => `<p>${line.trim()}</p>`).join('\n');
      }
      
      const newContent = `${title}|${body}${signatureHtml}`;
      
      await connection.execute("UPDATE admin_contents SET content = ? WHERE page_key = 'about/intro'", [newContent]);
      console.log('Successfully updated the database content with the CEO signature.');
    } else {
      console.log('Signature already exists in the content.');
    }
  }
  
  await connection.end();
}
run().catch(console.error);
