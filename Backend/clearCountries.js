const prisma = require('./src/utils/prismaClient');
async function clear() {
    await prisma.countries.deleteMany({});
    console.log('Deleted all dummy countries data');
    await prisma.$disconnect();
}
clear();
