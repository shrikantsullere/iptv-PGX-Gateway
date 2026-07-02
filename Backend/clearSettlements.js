const prisma = require('./src/utils/prismaClient');
async function clear() {
    await prisma.settlements.deleteMany({});
    console.log('Deleted all dummy settlements');
    await prisma.$disconnect();
}
clear();
