import { Injectable } from '@nestjs/common';

import { CRUDRepository } from '@project/util/util-types';
import {
  Text,
  Parameter
 } from '@project/shared-types';
import { BlogTextEntity } from './blog-text-entity';
import { PrismaService } from '../prisma/prisma.service';
import { defaultValues } from '@project/shared-types';

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
      take: defaultValues.countSearch
    })

    return textList
  }

  public async find(parameter: Parameter): Promise<Text[] | []> {
    const {count, user, typeSort} = parameter;

    const textList = this.prisma.text.findMany({
      take: Number(count)
    })

      return textList;
  }

  /*
  public async addLike(parameter: ParameterLike): Promise<Text> {
    const {nameUser, idPublication} = parameter;
    let dataText: Text

    const existUser = this.repositoryLike
      .find((element) => {
        if(element.nameUser === nameUser && element.idPublication === idPublication){
          return element
        }
      });

      if(existUser) {
        dataText = await this.findById(idPublication);
        dataText.countLike = dataText.countLike - defaultValues.one;

        const index = this.repositoryText.findIndex((element) => element.id === idPublication);
        this.repositoryText = [
          ...this.repositoryText.slice(defaultValues.zero, index),
          dataText,
          ...this.repositoryText.slice(index + 1),
        ];

        return dataText
      }

    dataText = await this.findById(idPublication);

    if(! dataText) {
      return null
    }

    const changeText = {
      ... dataText,
      countLike: dataText.countLike + defaultValues.one
    }

    const index = this.repositoryText.findIndex((element) => element.id === idPublication);
      this.repositoryText = [
        ...this.repositoryText.slice(defaultValues.zero, index),
        changeText,
        ...this.repositoryText.slice(index + 1),
      ];

    this.repositoryLike.push({
      nameUser,
      idPublication
    })

    return changeText
  }

  public async addComment(parameter: ParameterComment): Promise<Text> {
    const {idComment, idPublication} = parameter;

    const dataText = await this.findById(idPublication);

    if(! dataText) {
      return null
    }

    dataText.countComments.push(idComment)

    const changeText = {
      ... dataText,
      countComments: dataText.countComments
    }

    const index = this.repositoryText.findIndex((element) => element.id === idPublication);
      this.repositoryText = [
        ...this.repositoryText.slice(defaultValues.zero, index),
        changeText,
        ...this.repositoryText.slice(index + 1),
      ];

    return changeText
  }

  public async deleteComment(idList: string[]): Promise<boolean> {
    let indicator = false;
    let indexId: number

    idList.forEach((value) => {

      const index = this.repositoryText
      .findIndex(({countComments}) => {
        const element = countComments.find((id) => id === value)
        return element === value
      });

      if(index !== -1) {
      indexId = this.repositoryText[index].countComments
      .findIndex((id) => id === value)
      }

      if(index !== -1) {
        this.repositoryText[index].countComments = [
          ...this.repositoryText[index].countComments.slice(0,indexId),
          ...this.repositoryText[index].countComments.slice(indexId + 1)
        ]

        indicator = true
      }
    })

    return indicator
  }
    */
}
