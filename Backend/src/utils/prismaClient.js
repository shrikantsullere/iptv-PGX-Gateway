const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

const adapter = new PrismaMariaDb({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'pgx_gateway',
    connectionLimit: 100
});

const prisma = new PrismaClient({ adapter });

// Handle nodemon restarts and application termination gracefully to prevent database connection leaks
async function gracefulShutdown() {
    try {
        await prisma.$disconnect();
    } catch (err) {
        console.error('Error during database disconnection:', err);
    }
}

process.once('SIGUSR2', async () => {
    await gracefulShutdown();
    process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', async () => {
    await gracefulShutdown();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await gracefulShutdown();
    process.exit(0);
});

module.exports = prisma;
