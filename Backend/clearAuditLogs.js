const prisma = require('./src/utils/prismaClient');
async function clear() {
    await prisma.audit_logs.deleteMany({});
    
    // Seed some audit logs
    await prisma.audit_logs.createMany({
        data: [
            {
                actionType: 'Security',
                description: 'Disabled Merchant Account (MER-1092)',
                administratorId: 'admin_1',
                administratorEmail: 'superadmin@pgx.com',
                ipAddress: '192.168.1.1',
                metadata: '{"merchantId": "MER-1092"}',
                timestamp: new Date(Date.now() - 10 * 60 * 1000) // 10 mins ago
            },
            {
                actionType: 'Config',
                description: 'Updated Global API Rate Limit',
                administratorId: 'admin_2',
                administratorEmail: 'devops@pgx.com',
                ipAddress: '10.0.0.4',
                metadata: '{"limit": 1000}',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
            },
            {
                actionType: 'Operation',
                description: 'Approved White-Label Domain',
                administratorId: 'admin_3',
                administratorEmail: 'support@pgx.com',
                ipAddress: '192.168.1.5',
                metadata: '{"domain": "pay.test.com"}',
                timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
            },
            {
                actionType: 'Access',
                description: 'Admin Login',
                administratorId: 'admin_1',
                administratorEmail: 'superadmin@pgx.com',
                ipAddress: '192.168.1.1',
                metadata: '{}',
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
            }
        ]
    });

    console.log('Cleared and seeded dummy audit logs.');
    await prisma.$disconnect();
}
clear();
