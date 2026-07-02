const prisma = require('./src/utils/prismaClient');
async function clear() {
    await prisma.subscription_plans.deleteMany({});
    console.log('Deleted all dummy subscription plans data');
    await prisma.$disconnect();
}
clear();
