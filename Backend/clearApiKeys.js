const prisma = require('./src/utils/prismaClient');
async function clear() {
    await prisma.api_keys.deleteMany({});
    console.log('Deleted all dummy api keys data');
    await prisma.$disconnect();
}
clear();
