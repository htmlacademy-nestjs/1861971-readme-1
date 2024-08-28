import { Injectable } from '@nestjs/common';

import {CRUDRepository} from '@project/util/util-types';
import {
  Link,
  Parameter
 } from '@project/shared-types';
import { BlogLinkEntity } from './blog-link-entity';
import { PrismaService } from '../prisma/prisma.service';

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
    const {count, user, typeSort} = parameter;

    const linkList = this.prisma.link.findMany({
      take: Number(count)
    })

    return linkList;
  }
/*
  public async addLike(parameter: ParameterLike): Promise<Link> {
    const {nameUser, idPublication} = parameter;
    let dataLink: Link

    const existUser = this.repositoryLike
      .find((element) => {
        if(element.nameUser === nameUser && element.idPublication === idPublication){
          return element
        }
      });

      if(existUser) {
        dataLink = await this.findById(idPublication);
        dataLink.countLike = dataLink.countLike - defaultValues.one;

        const index = this.repositoryLink.findIndex((element) => element.id === idPublication);
        this.repositoryLink = [
          ...this.repositoryLink.slice(defaultValues.zero, index),
          dataLink,
          ...this.repositoryLink.slice(index + 1),
        ];

        return dataLink
      }

    dataLink = await this.findById(idPublication);

    if(! dataLink) {
      return null
    }

    const changeLink = {
      ... dataLink,
      countLike: dataLink.countLike + defaultValues.one
    }

    const index = this.repositoryLink.findIndex((element) => element.id === idPublication);
      this.repositoryLink = [
        ...this.repositoryLink.slice(defaultValues.zero, index),
        changeLink,
        ...this.repositoryLink.slice(index + 1),
      ];

    this.repositoryLike.push({
      nameUser,
      idPublication
    })

    return changeLink
  }

  public async addComment(parameter: ParameterComment): Promise<Link> {
    const {idComment, idPublication} = parameter;

    const dataLink = await this.findById(idPublication);

    if(! dataLink) {
      return null
    }

    dataLink.countComments.push(idComment)

    const changeLink = {
      ... dataLink,
      countComments: dataLink.countComments
    }

    const index = this.repositoryLink.findIndex((element) => element.id === idPublication);
      this.repositoryLink = [
        ...this.repositoryLink.slice(defaultValues.zero, index),
        changeLink,
        ...this.repositoryLink.slice(index + 1),
      ];

    return changeLink
  }

  public async deleteComment(idList: string[]): Promise<boolean> {
    let indicator = false;
    let indexId: number

    idList.forEach((value) => {

      const index = this.repositoryLink
      .findIndex(({countComments}) => {
        const element = countComments.find((id) => id === value)
        return element === value
      });

      if(index !== -1) {
      indexId = this.repositoryLink[index].countComments
      .findIndex((id) => id === value)
      }

      if(index !== -1) {
        this.repositoryLink[index].countComments = [
          ...this.repositoryLink[index].countComments.slice(0,indexId),
          ...this.repositoryLink[index].countComments.slice(indexId + 1)
        ]

        indicator = true
      }
    })

    return indicator
  }
    */
}
