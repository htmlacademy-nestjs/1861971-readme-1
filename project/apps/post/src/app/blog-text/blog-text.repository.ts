import { Injectable } from '@nestjs/common';

import { CRUDRepository } from '@project/util/util-types';
import {
  Text,
  Parameter,
  VideoState,
  TypeSort
 } from '@project/shared-types';
import { BlogTextEntity } from './blog-text-entity';
import { PrismaService } from '../prisma/prisma.service';
import { defaultValues, ParameterLike } from '@project/shared-types';

let skip = 0;

@Injectable()
export class BlogTextRepository implements CRUDRepository<BlogTextEntity, number, Text> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogTextEntity): Promise<Text> {
    const dataText = { ...item.toObject()};
    const creatNewText = await this.prisma.text.create({
      data: {
        ...dataText,
        comments: {
          connect: []
        }
      },
      include: {
        comments: true
      }
    })

    return creatNewText;
  }

  public async findById(textId: number): Promise<Text | null> {
    const existText = await this.prisma.text.findUnique({
      where: {
        id: textId
      },
      include: {
        comments: true
      }
    })

    if (existText) {
      return existText;
    }

    return null;
  }

  public async destroy(textId: number): Promise<Text> {
    const informationDeleteText = await this.prisma.text.delete({
      where: {
        id: textId
      },
      include: {
        comments: true
      }
    })

    return informationDeleteText
  }

  public async update(textId: number, _passwordHash, data: BlogTextEntity): Promise<Text> {
    const dataText = data.toObject();
    const updateOldText = await this.prisma.text.update({
      where: {
        id: textId
      },
      data: {
        ...dataText
      },
      include: {
        comments: true
      }
    })

      if (! updateOldText) {
        return null
      }

      return updateOldText
  }

  public async findByWord(word: string): Promise<Text[] | []> {
    const textList = await this.prisma.text.findMany({
      where: {
        namePublication: {
          search: word
        },
      },
      take: defaultValues.countSearch,
      include: {
        comments: true
      }
    })

    return textList
  }

  public async find(parameter: Parameter): Promise<Text[] | []> {
    const {limit, authPublication, typeSort, nameTag} = parameter;

    const textsList = await this.prisma.text.findMany({
      where: {
        state: {
          contains: VideoState.Published
        },
        OR: [
          {
            authorPublication: {
              contains: authPublication,
            },
          },
          {
            authorPublication: {
              not: authPublication
            }
          }
        ],
        setTag: {
          has: nameTag
        }
      },
      include: {
        comments: true
      },
      orderBy: [
        {
          datePublication: 'desc'
        }
      ],
      skip: skip,
      take: limit,
    })

    if(typeSort === TypeSort.Like) {
      (await textsList).sort((a, b) => b.countLike.length - a.countLike.length)
    }

    if(typeSort === TypeSort.Discussed) {
      (await textsList).sort((a, b) => b.comments.length - a.comments.length)
    }

    skip += limit;

    return textsList;
  }

  public async draftsList({limit, author}: {limit: number, author: string}): Promise<Text[] | []> {
    const textsList = await this.prisma.text.findMany({
      where: {
        authorPublication: {
          contains: author
        },
        state: {
          contains: VideoState.Draft
        }
      },
      include: {
        comments: true
      },
      orderBy: [
        {
          datePublication: 'desc'
        }
      ],
      skip: skip,
      take: limit,
    })

    skip += limit;

    return textsList
  }

  public async addLike(parameter: ParameterLike): Promise<Text> {
    const {idUser, idPublication} = parameter;

    const text = await this.prisma.text.findFirst({
      where: {
        id: idPublication
      }
      })

      if (! text) {
        return null
      }

      if(!text.countLike.includes(idUser)) {
        text.countLike.push(idUser)
      } else {
        const index = text.countLike.findIndex((element) => element === idUser)

        text.countLike = [
          ...text.countLike.slice(0, index),
          ...text.countLike.slice(index+1)
        ]
      }

      const updeteText = await this.prisma.text.update({
        where: {
          id: idPublication
        },
        data: {
          countLike: text.countLike
        },
        include: {
          comments: true
        }
      })

      return updeteText
  }
}
