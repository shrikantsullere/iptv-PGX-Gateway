const prisma = require('./src/utils/prismaClient');
const bcrypt = require('bcryptjs');

async function seed() {
    const hashed = await bcrypt.hash('password123', 10);
    await prisma.users.upsert({
        where: { email: 'user@pgx.com' },
        update: {},
        create: {
            name: 'PGX User',
            email: 'user@pgx.com',
            password: hashed,
            role: 'User'
        }
    });
    console.log('Seeded PGX user');
}

seed().catch(console.error).finally(() => prisma.$disconnect());
