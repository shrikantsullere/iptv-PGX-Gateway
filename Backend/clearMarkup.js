const prisma = require('./src/utils/prismaClient');
async function clear() {
    await prisma.markup_rules.deleteMany({});
    
    const rules = [
      { type: 'Crypto Transactions', base: 190, markup: 150, total: 340, status: 'Active' },
      { type: 'Fiat - International', base: 290, markup: 80, total: 370, status: 'Active' },
      { type: 'Fiat - Domestic', base: 220, markup: 50, total: 270, status: 'Active' },
      { type: 'High Risk Merchants', base: 350, markup: 200, total: 550, status: 'Active' },
      { type: 'Chargebacks', base: 1500, markup: 500, total: 2000, status: 'Active' }
    ];

    await prisma.markup_rules.createMany({
        data: rules.map(r => ({
            transactionType: r.type,
            processorBase: r.base,
            gatewayMarkup: r.markup,
            totalFee: r.total,
            status: r.status,
            createdBy: 'System',
            createdAt: new Date(),
            updatedAt: new Date()
        }))
    });

    console.log('Cleared and seeded markup rules.');
    await prisma.$disconnect();
}
clear();
