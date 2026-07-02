const prisma = require('./src/utils/prismaClient');
async function clear() {
    await prisma.roles.deleteMany({});
    console.log('Cleared dummy roles.');
    await prisma.$disconnect();
}
clear();
