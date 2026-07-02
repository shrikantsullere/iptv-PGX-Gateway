const prisma = require('./src/utils/prismaClient');
async function main() {
    try {
        const count = await prisma.merchants.count();
        console.log("Connected successfully! Merchants count:", count);
    } catch (e) {
        console.error("Connection failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
