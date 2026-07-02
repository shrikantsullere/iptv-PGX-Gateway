const prisma = require('./src/utils/prismaClient');
async function clear() {
    await prisma.transactions.deleteMany({});
    console.log('Deleted all dummy transactions');
    await prisma.$disconnect();
}
clear();
