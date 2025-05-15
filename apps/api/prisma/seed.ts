import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await hash('YuGate', 10);

  await prisma.admins.upsert({
    create: {
      login: 'yugate@gmail.com',
      password: hashedPassword,
    },
    update: {},
    where: { login: 'yugate@gmail.com' },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
