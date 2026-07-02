const prisma = require('./src/utils/prismaClient');
const bcrypt = require('bcryptjs');

async function main() {
    try {
        console.log("Seeding database with default users...");
        
        const passwordHash = await bcrypt.hash('admin123', 10);
        
        const users = [
            {
                name: 'System Admin',
                email: 'superadmin@pgx.com',
                password: passwordHash,
                role: 'Super Admin'
            },
            {
                name: 'Test Merchant',
                email: 'merchant@pgx.com',
                password: passwordHash,
                role: 'Merchant'
            },
            {
                name: 'Playground Player',
                email: 'user@pgx.com',
                password: passwordHash,
                role: 'User'
            }
        ];

        for (const user of users) {
            const existingUser = await prisma.users.findUnique({
                where: { email: user.email }
            });
            if (!existingUser) {
                await prisma.users.create({ data: user });
                console.log(`Created user: ${user.email}`);
            } else {
                console.log(`User already exists: ${user.email}`);
            }
        }
        
        console.log("Seeding completed successfully!");
    } catch (e) {
        console.error("Error during seeding:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
