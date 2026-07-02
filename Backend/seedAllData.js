const prisma = require('./src/utils/prismaClient');

async function main() {
    try {
        console.log("Seeding merchants and wallets...");
        
        const merchants = [
            {
                companyName: 'Test Merchant Inc.',
                email: 'merchant@pgx.com',
                phone: '+1234567890',
                subscriptionPlan: 'Enterprise',
                revenue: 500000,
                status: 'Active',
                country: 'USA',
                website: 'https://testmerchant.com',
                apiKey: 'sk_test_123456789',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        for (const m of merchants) {
            await prisma.merchants.create({ data: m });
        }
        
        const wallets = [
            {
                walletName: 'Main BTC Wallet',
                walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
                walletType: 'Cold Storage',
                network: 'Bitcoin',
                balanceUSD: 105000,
                balanceCrypto: 35000,
                assetSymbol: 'BTC',
                status: 'Active',
                lastTransactionAt: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];
        
        for (const w of wallets) {
            await prisma.wallets.create({ data: w });
        }

        console.log("Seeding completed successfully!");
    } catch (e) {
        console.error("Error during seeding:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
