const prisma = require('./src/utils/prismaClient');
async function clear() {
    await prisma.white_label_requests.deleteMany({});
    
    // Seed one pending request so user can test the approve/reject buttons
    await prisma.white_label_requests.create({
        data: {
            merchantId: 'merch_123',
            merchantName: 'Acme Digital Enterprise',
            requestedDomain: 'pay.acmedigital.com',
            sslStatus: 'Provisioning',
            approvalStatus: 'PENDING REVIEW',
            notes: 'Requested custom domain for checkout',
            requestedAt: new Date()
        }
    });

    console.log('Cleared white label requests and seeded one pending review request.');
    await prisma.$disconnect();
}
clear();
