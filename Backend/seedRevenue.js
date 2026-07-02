const prisma = require('./src/utils/prismaClient');

async function main() {
    try {
        console.log("Seeding real revenues data...");
        
        // Months for growth chart (1-12 as strings since schema expects String)
        const months = ['1', '2', '3', '4', '5', '6'];
        
        for (let i = 0; i < months.length; i++) {
            await prisma.revenues.create({
                data: {
                    processingVolume: 400000 + (i * 50000),
                    gatewayFeeRevenue: 4000 + (i * 500),
                    subscriptionRevenue: 1000 + (i * 100),
                    pendingSettlements: 5000,
                    totalRevenue: 5000 + (i * 600),
                    month: months[i],
                    year: 2026,
                    generatedAt: new Date()
                }
            });
            console.log(`Created revenue for month ${months[i]}`);
        }

        console.log("Revenue seeding completed successfully!");
    } catch (e) {
        console.error("Error during revenue seeding:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
