const prisma = require('./src/utils/prismaClient');
async function clear() {
    await prisma.gateway_fees.deleteMany({});
    await prisma.processor_fees.deleteMany({});
    await prisma.fee_rules.deleteMany({});
    console.log('Deleted all dummy fee data');
    await prisma.$disconnect();
}
clear();
