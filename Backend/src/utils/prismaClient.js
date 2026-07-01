const { PrismaClient } = require('@prisma/client');
const mariadb = require('mariadb');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

// Pass connection string directly to avoid fallback to OS username 'pcc'
const connectionString = process.env.DATABASE_URL 
    ? process.env.DATABASE_URL.replace('mysql://', 'mariadb://').replace(':@', '@').replace('localhost', '127.0.0.1')
    : 'mariadb://root@127.0.0.1:3306/pgx_gateway?connectionLimit=10';

const pool = mariadb.createPool(connectionString);

const adapter = new PrismaMariaDb(pool);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
