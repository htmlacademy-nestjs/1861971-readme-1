import { Injectable } from '@nestjs/common';

import {CRUDRepository} from '@project/util/util-types';
import {
  Quote,
  Parameter
} from '@project/shared-types';
import { BlogQuoteEntity } from './blog-quote-entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogQuoteRepository implements CRUDRepository<BlogQuoteEntity, number, Quote> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogQuoteEntity): Promise<Quote> {
    const dataQuote = { ...item.toObject()};
    const creatNewQuote = await this.prisma.quote.create({
      data: {
        ...dataQuote,
        comments: {
          connect: []
        }
      },
      include: {
        comments: true
      }
    })

    return creatNewQuote;
  }

  public async findById(quoteId: number): Promise<Quote | null> {
    const existQuote = await this.prisma.quote.findUnique({
      where: {
        id: quoteId
      },
      include: {
        comments: true
      }
    })

    if (existQuote) {
      return existQuote;
    }

    return null;
  }

  public async destroy(quoteId: number): Promise<Quote> {
    const informationDeleteQuote = await this.prisma.quote.delete({
      where: {
        id: quoteId
      }
    })

    return informationDeleteQuote
  }

  public async update(quoteId: number, _passwordHash, data: BlogQuoteEntity): Promise<Quote> {
    const dataQuote = data.toObject();
    const updateOldQuote = await this.prisma.quote.update({
      where: {
        id: quoteId
      },
      data: {
        ...dataQuote
      },
      include: {
        comments: true
      }
    })

      if (! updateOldQuote) {
        return null
      }

      return updateOldQuote
  }

  public async find(parameter: Parameter): Promise<Quote[] | []> {
    const {count, user, typeSort} = parameter;

    const quoteList = this.prisma.quote.findMany({
      take: Number(count)
    })

    return quoteList;
  }
/*
  public async addLike(parameter: ParameterLike): Promise<Quote> {
    const {nameUser, idPublication} = parameter;
    let dataQuote: Quote

    const existUser = this.repositoryLike
      .find((element) => {
        if(element.nameUser === nameUser && element.idPublication === idPublication){
          return element
        }
      });

      if(existUser) {
        dataQuote = await this.findById(idPublication);
        dataQuote.countLike = dataQuote.countLike - defaultValues.one;

        const index = this.repositoryQuote.findIndex((element) => element.id === idPublication);
        this.repositoryQuote = [
          ...this.repositoryQuote.slice(defaultValues.zero, index),
          dataQuote,
          ...this.repositoryQuote.slice(index + 1),
        ];

        return dataQuote
      }

    dataQuote = await this.findById(idPublication);

    if(! dataQuote) {
      return null
    }

    const changeQuote = {
      ... dataQuote,
      countLike: dataQuote.countLike + defaultValues.one
    }

    const index = this.repositoryQuote.findIndex((element) => element.id === idPublication);
      this.repositoryQuote = [
        ...this.repositoryQuote.slice(defaultValues.zero, index),
        changeQuote,
        ...this.repositoryQuote.slice(index + 1),
      ];

    this.repositoryLike.push({
      nameUser,
      idPublication
    })

    return changeQuote
  }

  public async addComment(parameter: ParameterComment): Promise<Quote> {
    const {idComment, idPublication} = parameter;

    const dataQuote = await this.findById(idPublication);

    if(! dataQuote) {
      return null
    }

    dataQuote.countComments.push(idComment)

    const changeQuote = {
      ... dataQuote,
      countComments: dataQuote.countComments
    }

    const index = this.repositoryQuote.findIndex((element) => element.id === idPublication);
      this.repositoryQuote = [
        ...this.repositoryQuote.slice(defaultValues.zero, index),
        changeQuote,
        ...this.repositoryQuote.slice(index + 1),
      ];

    return changeQuote
  }

  public async deleteComment(idList: string[]): Promise<boolean> {
    let indicator = false;
    let indexId: number

    idList.forEach((value) => {

      const index = this.repositoryQuote
      .findIndex(({countComments}) => {
        const element = countComments.find((id) => id === value)
        return element === value
      });

      if(index !== -1) {
      indexId = this.repositoryQuote[index].countComments
      .findIndex((id) => id === value)
      }

      if(index !== -1) {
        this.repositoryQuote[index].countComments = [
          ...this.repositoryQuote[index].countComments.slice(0,indexId),
          ...this.repositoryQuote[index].countComments.slice(indexId + 1)
        ]

        indicator = true
      }
    })

    return indicator
  }
    */
}
