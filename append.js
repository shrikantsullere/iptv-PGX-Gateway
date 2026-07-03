const fs = require('fs');
const path = require('path');
const schemaPath = path.join(__dirname, 'Backend', 'prisma', 'schema.prisma');
let content = fs.readFileSync(schemaPath, 'utf8');

content += `
model Deposits {
  depositId String @id @default(uuid())
  asset String
  network String
  amount Float
  status String
  merchantId String
  createdAt DateTime @default(now())
}
`;

fs.writeFileSync(schemaPath, content);
console.log('Appended Deposits to schema');
