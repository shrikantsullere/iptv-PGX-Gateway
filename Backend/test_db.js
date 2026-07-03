const prisma = require('./src/utils/prismaClient');

async function check() {
  const tx = await prisma.transactions.findMany();
  const rev = await prisma.revenues.findMany();
  console.log("Tx count:", tx.length);
  console.log("Revenues:", rev);
  await prisma.$disconnect();
}
check();
