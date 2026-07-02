const prisma = require('./src/utils/prismaClient');
async function clear() {
    await prisma.platform_settings.deleteMany({});
    console.log('Cleared dummy settings.');
    await prisma.$disconnect();
}
clear();
