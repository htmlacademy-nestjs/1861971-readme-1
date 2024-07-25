import { Injectable } from '@nestjs/common';

import {CRUDRepository} from '@project/util/util-types';
import {
  Quote,
  Parameter,
  defaultValues,
  ParameterLike,
  DataUser,
  ParameterComment
} from '@project/shared-types';
import { BlogQuoteEntity } from './blog-quote-entity';

@Injectable()
export class BlogQuoteMemoryRepository implements CRUDRepository<BlogQuoteEntity, string, Quote> {
  private repositoryQuote: Quote[] = [];
  private repositoryLike: DataUser[] = [];

  public async create(item: BlogQuoteEntity): Promise<Quote> {
    const dataQuote = { ...item.toObject()};
    this.repositoryQuote.push(dataQuote);

    return dataQuote;
  }

  public async findById(id: string): Promise<Quote> {
    const existQuote = this.repositoryQuote.find((element) => element.id === id);

    if (existQuote) {
      return existQuote;
    }

    return null;
  }

  public async destroy(id: string): Promise<string[]> {
    const index = this.repositoryQuote.findIndex((element) => element.id === id);
    const idList = this.repositoryQuote[index].countComments;

    this.repositoryQuote = [
      ...this.repositoryQuote.slice(0, index),
      ...this.repositoryQuote.slice(index + 1),
    ];

    return idList
  }

  public async update(_id, _passwordHash, data: Quote): Promise<Quote> {
    const existQuote = this.repositoryQuote
      .find((element) => element.id === data.id);

      if (! existQuote) {
        return null
      }

      const editedQuote = {
        ...data,
        dateCreation: existQuote.dateCreation,
        datePublication: new Date().toISOString(),
        state: existQuote.state,
        originolAuthor: existQuote.originolAuthor,
        repost: existQuote.repost,
        originolId: existQuote.originolId
      }

      const index = this.repositoryQuote.findIndex((element) => element.id === data.id);
      this.repositoryQuote = [
        ...this.repositoryQuote.slice(0, index),
        editedQuote,
        ...this.repositoryQuote.slice(index + 1),
      ];

      return editedQuote
  }

  public async find(parameter: Parameter): Promise<Quote[]> {
    const {count, user} = parameter;

    const quoteList: Quote[] = []
    const limit = count ?? defaultValues.count;
    const nameUser = user ?? false;

    if(nameUser) {
      this.repositoryQuote.forEach((element) => {
      if(element.authorQuote === user) {
        quoteList.push(element)
      }
    })}

    if(! nameUser){
      for(const element of this.repositoryQuote){ quoteList.push(element); }
    }

    quoteList.slice(defaultValues.zero, Number(limit))

    return quoteList;
  }

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
}
