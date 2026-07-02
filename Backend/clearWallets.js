const prisma = require('./src/utils/prismaClient');
async function clear() {
    await prisma.wallets.deleteMany({});
    console.log('Deleted all dummy wallets');
    await prisma.$disconnect();
}
clear();
