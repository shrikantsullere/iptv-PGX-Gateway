const prisma = require('./src/utils/prismaClient');
async function clear() {
    await prisma.revenues.deleteMany({});
    console.log('Deleted all dummy revenues');
    await prisma.$disconnect();
}
clear();
