const prisma = require('./src/utils/prismaClient');

async function main() {
    try {
        console.log("Seeding dashboard metrics...");
        
        await prisma.dashboard_metrics.create({
            data: {
                totalGatewayRevenue: 1250000,
                todayVolume: 45200,
                activeMerchants: 156,
                failedTransactionRate: 2,
                systemStatus: 'Operational',
                lastUpdated: new Date()
            }
        });

        await prisma.processor_monitors.create({
            data: {
                processorName: 'PGX Routing',
                status: 'Active',
                pingMs: 45,
                loadPercentage: 35,
                successRate: 99,
                lastCheckedAt: new Date(),
                createdAt: new Date()
            }
        });

        // Add monthly revenue history for charts
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        for (let i = 0; i < months.length; i++) {
            await prisma.monthly_revenue_history.create({
                data: {
                    month: months[i],
                    year: 2026,
                    revenueAmount: 100000 + (i * 20000),
                    createdAt: new Date()
                }
            });
        }

        console.log("Dashboard seeding completed successfully!");
    } catch (e) {
        console.error("Error during seeding:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
