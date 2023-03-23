import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

const prisma = new PrismaClient();
async function main() {
  //username: danspro , password: mypassWORD12@
  const hashPassword = await argon.hash('mypassWORD12@');
  await prisma.user.upsert({
    where: {
      email: 'danspro@gmail.com',
    },
    create: {
      username: 'danspro',
      name: 'danspro',
      email: 'danspro@gmail.com',
      password: hashPassword,
    },
    update: {
      username: 'danspro',
      name: 'danspro',
      email: 'danspro@gmail.com',
      password: hashPassword,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
