import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.video.upsert({
    where: { id: 1 },
    update: {},
    create: {
      namePublication: 'My morning',
      linkVideo: 'http://locolhost:3000/morning',
      setTag: 'morning',
      authorPublication: 'Vlad',
      countLike: 0,
      comments:{
        create: [
          {
            text: 'This is video is good.',
            authorComment: 'Alex'
          }
        ]
      }
    }
  });
  await prisma.video.upsert({
    where: { id: 2 },
    update: {},
    create: {
      namePublication: 'My workday',
      linkVideo: 'http://locolhost:3000/workday',
      setTag: 'workday',
      authorPublication: 'Tim',
      countLike: 0,
      comments:{
        create: [
          {
            text: 'This is video is good.',
            authorComment: 'Sveta'
          },
          {
            text: 'This is video is interesting.',
            authorComment: 'Alex'
          }
        ]
      }
    }
  });

  console.info('🤘️ Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
