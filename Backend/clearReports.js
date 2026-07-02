const prisma = require('./src/utils/prismaClient');
async function clear() {
    await prisma.reports.deleteMany({});
    console.log('Deleted all dummy reports data');
    await prisma.$disconnect();
}
clear();
