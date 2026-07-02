const prisma = require('./src/utils/prismaClient');

async function seedProcessorData() {
    await prisma.processor_dashboard.deleteMany({});
    await prisma.processor_metrics.deleteMany({});
    await prisma.processor_monitors.deleteMany({});
    
    // Seed Dashboard Summary
    await prisma.processor_dashboard.create({
        data: {
            total24hVolume: 12400000,
            activeNodes: 45,
            totalNodes: 45,
            approvalRate: 94,
            criticalAlerts: 0,
            generatedAt: new Date()
        }
    });

    // Seed Volume Analytics
    const volumeData = [
      { time: '00:00', stripe: 4000, moonpay: 2400, coinbase: 2400 },
      { time: '04:00', stripe: 3000, moonpay: 1398, coinbase: 2210 },
      { time: '08:00', stripe: 2000, moonpay: 9800, coinbase: 2290 },
      { time: '12:00', stripe: 2780, moonpay: 3908, coinbase: 2000 },
      { time: '16:00', stripe: 1890, moonpay: 4800, coinbase: 2181 },
      { time: '20:00', stripe: 2390, moonpay: 3800, coinbase: 2500 },
      { time: '24:00', stripe: 3490, moonpay: 4300, coinbase: 2100 },
    ];
    
    for (const v of volumeData) {
        await prisma.processor_metrics.create({
            data: {
                processorName: 'Stripe',
                transactionVolume: v.stripe,
                successRate: 99,
                chargebackRate: 1,
                refundRate: 1,
                reportingPeriod: v.time,
                createdAt: new Date()
            }
        });
        
        await prisma.processor_metrics.create({
            data: {
                processorName: 'MoonPay',
                transactionVolume: v.moonpay,
                successRate: 94,
                chargebackRate: 2,
                refundRate: 1,
                reportingPeriod: v.time,
                createdAt: new Date()
            }
        });
        
        await prisma.processor_metrics.create({
            data: {
                processorName: 'Coinbase',
                transactionVolume: v.coinbase,
                successRate: 88,
                chargebackRate: 3,
                refundRate: 2,
                reportingPeriod: v.time,
                createdAt: new Date()
            }
        });
    }

    // Seed Processor Nodes
    const nodes = [
      { name: 'Stripe Gateway EU', status: 'Operational', uptime: 99.99, latency: 45, successRate: 98 },
      { name: 'Stripe Gateway US', status: 'Operational', uptime: 99.99, latency: 32, successRate: 99 },
      { name: 'MoonPay Crypto', status: 'Operational', uptime: 99.95, latency: 120, successRate: 94 },
      { name: 'Coinbase Commerce', status: 'Degraded', uptime: 98.50, latency: 450, successRate: 88 },
      { name: 'LocalGate Asia', status: 'Operational', uptime: 99.90, latency: 85, successRate: 96 },
    ];
    
    for (const n of nodes) {
        await prisma.processor_monitors.create({
            data: {
                processorName: n.name,
                status: n.status,
                pingMs: n.latency,
                loadPercentage: 50,
                successRate: n.successRate,
                lastCheckedAt: new Date(),
                createdAt: new Date()
            }
        });
    }

    console.log('Processor data seeded.');
    await prisma.$disconnect();
}

seedProcessorData();
