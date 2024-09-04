import { Injectable } from '@nestjs/common';

import {CRUDRepository} from '@project/util/util-types';
import {
  Link,
  Parameter,
  VideoState,
  TypeSort
 } from '@project/shared-types';
import { BlogLinkEntity } from './blog-link-entity';
import { PrismaService } from '../prisma/prisma.service';
import { ParameterLike } from '@project/shared-types';

let skip = 0;

@Injectable()
export class BlogLinkRepository implements CRUDRepository<BlogLinkEntity, number, Link> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogLinkEntity): Promise<Link> {
    const dataLink = { ...item.toObject()};
    const creatNewLink = await this.prisma.link.create({
      data: {
        ...dataLink,
        comments: {
          connect: []
        }
      },
      include: {
        comments: true
      }
    })

    return creatNewLink;
  }

  public async findById(linkId: number): Promise<Link | null> {
    const existLink = await this.prisma.link.findUnique({
      where: {
        id: linkId
      },
      include: {
        comments: true
      }
    })

    if (existLink) {
      return existLink;
    }

    return null;
  }

  public async destroy(linkId: number): Promise<Link> {
    const informationDeleteLink = await this.prisma.link.delete({
      where: {
        id: linkId
      },
      include: {
        comments: true
      }
    })

    return informationDeleteLink
  }

  public async update(linkId: number, _passwordHash, data: BlogLinkEntity): Promise<Link> {
    const dataLink = data.toObject();
    const updateOldLink = await this.prisma.link.update({
      where: {
        id: linkId
      },
      data: {
        ...dataLink
      },
      include: {
        comments: true
      }
    })

      if (! updateOldLink) {
        return null
      }

      return updateOldLink
  }

  public async find(parameter: Parameter): Promise<Link[]> {
    const {limit, authPublication, typeSort, nameTag} = parameter;

    const linkList = await this.prisma.link.findMany({
      where: {
        state: {
          contains: VideoState.Published
        },
        OR: [
          {
            authorLink: {
              contains: authPublication,
            },
          },
          {
            authorLink: {
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
      (await linkList).sort((a, b) => b.countLike.length - a.countLike.length)
    }

    if(typeSort === TypeSort.Discussed) {
      (await linkList).sort((a, b) => b.comments.length - a.comments.length)
    }

    skip += limit;

    return linkList;
  }

  public async draftsList({limit, author}: {limit: number, author: string}): Promise<Link[] | []> {
    const linksList = await this.prisma.link.findMany({
      where: {
        authorLink: {
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

    return linksList
  }

  public async addLike(parameter: ParameterLike): Promise<Link> {
    const {idUser, idPublication} = parameter;

    const link = await this.prisma.link.findFirst({
      where: {
        id: idPublication
      }
      })

      if (! link) {
        return null
      }

      if(!link.countLike.includes(idUser)) {
        link.countLike.push(idUser)
      } else {
        const index = link.countLike.findIndex((element) => element === idUser)

        link.countLike = [
          ...link.countLike.slice(0, index),
          ...link.countLike.slice(index+1)
        ]
      }

      const updeteLink = await this.prisma.link.update({
        where: {
          id: idPublication
        },
        data: {
          countLike: link.countLike
        },
        include: {
          comments: true
        }
      })

      return updeteLink
  }
}
