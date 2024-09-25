import { Injectable } from '@nestjs/common';

import {CRUDRepository} from '@project/util/util-types';
import {
  Quote,
  Parameter,
  VideoState,
  TypeSort
} from '@project/shared-types';
import { BlogQuoteEntity } from './blog-quote-entity';
import { PrismaService } from '../prisma/prisma.service';
import { ParameterLike, defaultValues } from '@project/shared-types';

let skip = 0;
const SORT = 'desc';

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
      },
      include: {
        comments: true
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
    const {limit, idAuthPublication, typeSort, nameTag} = parameter;

    const quoteList = await this.prisma.quote.findMany({
      where: {
        state: {
          contains: VideoState.Published
        },
        idAuthorPublication: idAuthPublication ? {contains: idAuthPublication} : undefined,
        setTag: nameTag ? {has: nameTag} : undefined
      },
      orderBy: {
        datePublication: typeSort === TypeSort.DatePublication ? SORT : undefined,
        countLike: typeSort === TypeSort.Like ? SORT : undefined,
        comments: typeSort === TypeSort.Discussed ? {_count: SORT} : undefined
      },
      include: {
        comments: true
      },
      skip: skip,
      take: limit,
    })

    if(typeSort === TypeSort.Like) {
      (await quoteList).sort((a, b) => b.countLike.length - a.countLike.length)
    }

    if(typeSort === TypeSort.Discussed) {
      (await quoteList).sort((a, b) => b.comments.length - a.comments.length)
    }

    skip += limit;

    return quoteList;
  }

  public async draftsList({limit, idAuthor}: {limit: number, idAuthor: string}): Promise<Quote[] | []> {
    const quotesList = await this.prisma.quote.findMany({
      where: {
        idAuthorPublication: {
          contains: idAuthor
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

    return quotesList
  }

  public async addLike(parameter: ParameterLike): Promise<Quote> {
    const {idUser, idPublication} = parameter;

    const quote = await this.prisma.quote.findFirst({
      where: {
        id: idPublication
      }
      })

      if (! quote) {
        return null
      }

      if(!quote.countLike.includes(idUser)) {
        quote.countLike.push(idUser)
      } else {
        const index = quote.countLike.findIndex((element) => element === idUser)

        quote.countLike = [
          ...quote.countLike.slice(0, index),
          ...quote.countLike.slice(index+1)
        ]
      }

      const updeteQuote = await this.prisma.quote.update({
        where: {
          id: idPublication
        },
        data: {
          countLike: quote.countLike
        },
        include: {
          comments: true
        }
      })

      return updeteQuote
  }

  public async repost(idPublication: string, idUser: string): Promise<Quote | null> {
    let publication = null;
    let idComments = [];

    publication = await this.prisma.quote.findFirst({
      where: {
        idAuthorPublication: {
          search: idUser
        },
        originolId: {
          search: idPublication
        }
      },
      include: {
        comments: true
      }
    })

    if(publication){
      return publication
    }

    publication = await this.findById(Number(idPublication))

    if(!publication) {
      return publication
    }

    const newPublication = {
      ...publication,
      idAuthorPublication: idUser,
      dateCreation: publication.datePublication,
      originolAuthor: publication.idAuthorPublication,
      repost: defaultValues.repost,
      originolId: String(publication.id)
    }

    delete newPublication.id

    if(newPublication.comments.length !== 0) {
      newPublication.comments.forEach(({id}) => {
        idComments.push({id})
      });
    }else{
      idComments = newPublication.comments
    }

    publication = await this.prisma.quote.create({
      data: {
        ...newPublication,
        comments: {
        connect: idComments
      }
    },
    include: {
      comments: true
    }
    })

    return publication
  }
}
