const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const page = await prisma.page.findFirst({ where: { slug: 'about/intro' } });
  console.log(page.content);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
