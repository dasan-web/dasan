const nodemailer = require('nodemailer');

async function testSMTP(user, pass) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailplug.co.kr',
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: pass
    }
  });

  try {
    await transporter.verify();
    console.log(`Success logging in as ${user}`);
    
    // If user is admin, try sending a test email to jssong@dspharm.com
    if (user === 'admin@dspharm.com' || user === 'insa@dspharm.com') {
      await transporter.sendMail({
        from: `"${user}" <${user}>`,
        to: 'jssong@dspharm.com',
        subject: '[다산제약] 시스템 테스트 메일',
        text: '이메일 발송 테스트입니다. 인증번호: 123456'
      });
      console.log(`Successfully sent test email from ${user} to jssong@dspharm.com`);
    }
    
  } catch (err) {
    console.log(`Error logging in as ${user}: ${err.message}`);
  }
}

async function run() {
  console.log('Testing admin@dspharm.com...');
  await testSMTP('admin@dspharm.com', '2a8R8-lqU{O{xnz+9Lh3');
  
  console.log('\\nTesting insa@dspharm.com...');
  await testSMTP('insa@dspharm.com', 'dasan337!');
}

run();
