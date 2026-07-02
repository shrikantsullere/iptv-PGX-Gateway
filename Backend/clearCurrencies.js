const prisma = require('./src/utils/prismaClient');
async function clear() {
    await prisma.currencies.deleteMany({});
    console.log('Deleted all dummy currencies data');
    await prisma.$disconnect();
}
clear();
