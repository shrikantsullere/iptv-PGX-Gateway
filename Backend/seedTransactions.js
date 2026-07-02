const prisma = require('./src/utils/prismaClient');

async function main() {
    try {
        console.log("Seeding database with default transactions...");
        
        const transactions = [
            {
                merchantId: 'm-1001',
                merchantName: 'Test Merchant',
                customerName: 'John Doe',
                customerEmail: 'john@example.com',
                amount: 150000,
                currency: 'USD',
                processor: 'PGX Routing',
                gatewayFee: 1500,
                transactionHash: '0xabc123...',
                walletAddress: '0xdef456...',
                status: 'Completed',
                paymentMethod: 'Crypto',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                merchantId: 'm-1002',
                merchantName: 'Global Store',
                customerName: 'Jane Smith',
                customerEmail: 'jane@example.com',
                amount: 25000,
                currency: 'EUR',
                processor: 'Direct API',
                gatewayFee: 250,
                transactionHash: '0x789ghi...',
                walletAddress: '0x123jkl...',
                status: 'Pending',
                paymentMethod: 'Credit Card',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                merchantId: 'm-1003',
                merchantName: 'Crypto Gaming',
                customerName: 'Mike Johnson',
                customerEmail: 'mike@example.com',
                amount: 5000,
                currency: 'USDT',
                processor: 'PGX Routing',
                gatewayFee: 50,
                transactionHash: '0x456mno...',
                walletAddress: '0x789pqr...',
                status: 'Failed',
                paymentMethod: 'Crypto',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                merchantId: 'm-1001',
                merchantName: 'Test Merchant',
                customerName: 'Alice Williams',
                customerEmail: 'alice@example.com',
                amount: 75000,
                currency: 'USD',
                processor: 'Backup Engine',
                gatewayFee: 750,
                transactionHash: '0x999zzz...',
                walletAddress: '0x888yyy...',
                status: 'Completed',
                paymentMethod: 'Bank Transfer',
                createdAt: new Date(Date.now() - 86400000), // 1 day ago
                updatedAt: new Date(Date.now() - 86400000)
            }
        ];

        for (const tx of transactions) {
            await prisma.transactions.create({ data: tx });
            console.log(`Created transaction for ${tx.customerName}`);
        }
        
        console.log("Transactions seeding completed successfully!");
    } catch (e) {
        console.error("Error during transaction seeding:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
