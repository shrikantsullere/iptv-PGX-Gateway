const prisma = require('./src/utils/prismaClient');
async function clear() {
    await prisma.broadcast_notifications.deleteMany({});
    console.log('Cleared all dummy broadcast notifications.');
    await prisma.$disconnect();
}
clear();
