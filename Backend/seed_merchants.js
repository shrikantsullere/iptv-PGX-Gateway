const prisma = require('./src/utils/prismaClient');

async function main() { 
  const count = await prisma.merchants.count(); 
  console.log('Merchant count:', count); 
  
  if (count === 0) {
      console.log('Seeding merchants...');
      await prisma.merchants.createMany({
          data: [
            { merchantId: 'MER-1092', companyName: 'Acme Corp', email: 'acme@test.com', phone: '123', subscriptionPlan: 'Enterprise', revenue: 24500000, status: 'Active', country: 'US', website: 'acme.com', apiKey: 'key1', createdAt: new Date(), updatedAt: new Date() },
            { merchantId: 'MER-1093', companyName: 'Global Trade Inc', email: 'global@test.com', phone: '123', subscriptionPlan: 'Pro', revenue: 8940000, status: 'Active', country: 'UK', website: 'global.com', apiKey: 'key2', createdAt: new Date(), updatedAt: new Date() },
            { merchantId: 'MER-1094', companyName: 'TechVentures LLC', email: 'tech@test.com', phone: '123', subscriptionPlan: 'Enterprise', revenue: 41200000, status: 'Active', country: 'US', website: 'tech.com', apiKey: 'key3', createdAt: new Date(), updatedAt: new Date() },
            { merchantId: 'MER-1095', companyName: 'Digital Goods Co', email: 'digital@test.com', phone: '123', subscriptionPlan: 'Starter', revenue: 1220000, status: 'Active', country: 'US', website: 'digital.com', apiKey: 'key4', createdAt: new Date(), updatedAt: new Date() },
            { merchantId: 'MER-1096', companyName: 'StreamBox Inc', email: 'stream@test.com', phone: '123', subscriptionPlan: 'Pro', revenue: 13480000, status: 'Active', country: 'US', website: 'stream.com', apiKey: 'key5', createdAt: new Date(), updatedAt: new Date() },
            { merchantId: 'MER-1097', companyName: 'Novo Payments', email: 'novo@test.com', phone: '123', subscriptionPlan: 'Enterprise', revenue: 89020000, status: 'Active', country: 'US', website: 'novo.com', apiKey: 'key6', createdAt: new Date(), updatedAt: new Date() }
          ]
      });
      console.log('Seeded merchants.');
  }
} 
main().catch(console.error).finally(() => prisma.$disconnect());
