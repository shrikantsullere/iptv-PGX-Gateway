const prisma = require('./src/utils/prismaClient');
async function clear() {
    await prisma.support_tickets.deleteMany({});
    
    // Seed some tickets
    await prisma.support_tickets.createMany({
        data: [
            {
                merchantId: 'merch_101',
                merchantName: 'Acme Digital',
                subject: 'API Rate Limit Increase',
                description: 'We need to increase our rate limit for Black Friday.',
                status: 'Open',
                priority: 'High',
                assignedTo: 'Unassigned',
                lastUpdated: new Date(Date.now() - 10 * 60 * 1000), // 10 mins ago
                createdAt: new Date(Date.now() - 12 * 60 * 1000)
            },
            {
                merchantId: 'merch_102',
                merchantName: 'Global Tech',
                subject: 'Failed Settlement (Bank Error)',
                description: 'Our last settlement failed due to some bank issue.',
                status: 'In Progress',
                priority: 'Critical',
                assignedTo: 'Admin',
                lastUpdated: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
                createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
            },
            {
                merchantId: 'merch_103',
                merchantName: 'Web3 Gaming',
                subject: 'Custom Domain SSL Pending',
                description: 'When will our SSL be ready?',
                status: 'Resolved',
                priority: 'Medium',
                assignedTo: 'Admin',
                lastUpdated: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
                createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000)
            }
        ]
    });

    console.log('Cleared and seeded dummy support tickets.');
    await prisma.$disconnect();
}
clear();
