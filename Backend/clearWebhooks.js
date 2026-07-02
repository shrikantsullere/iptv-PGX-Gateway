const prisma = require('./src/utils/prismaClient');
async function clear() {
    await prisma.webhook_endpoints.deleteMany({});
    await prisma.webhook_deliveries.deleteMany({});
    console.log('Deleted all dummy webhooks data');
    await prisma.$disconnect();
}
clear();
