import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

import { BlogQuoteRepository } from '../blog-quote/blog-quote.repository';
import { CreateQuoteDto } from './dto/creat-quote.dto';
import { BlogQuoteEntity } from '../blog-quote/blog-quote-entity';
import { ValuePublicationQuote } from './publication.enum';
import {Quote} from '@project/shared-types';
import {castingToLowercase, removDuplicates} from '@project/util-core';

@Injectable()
export class PublicationQuoteService {
  constructor(
    private readonly blogQuoteRepository: BlogQuoteRepository
  ){}

  public async create(dto: CreateQuoteDto) {
    let updateQuote: Quote
    const {setTag} = dto

    if(setTag) {
    const returnQuoteWithTagsListToLowercase = castingToLowercase<Quote>(dto)
    updateQuote = removDuplicates (returnQuoteWithTagsListToLowercase)
    }

    const quoteEntity = new BlogQuoteEntity(updateQuote ?? dto)

    return await this.blogQuoteRepository
      .create(quoteEntity);
  }

  public async show(id: number) {
    const existQuote = await this.blogQuoteRepository
      .findById(id);

    if (! existQuote) {
      throw new NotFoundException(ValuePublicationQuote.QuoteNotFound);
    }

    return existQuote
  }

  public async delete(id: number) {
    const informationDeleteQuote = await this.blogQuoteRepository.destroy(id);

    return informationDeleteQuote
}

public async update(id: number, dataQuote: Quote) {
  const quoteEntity =  new BlogQuoteEntity(dataQuote);

  const editedQuote = await this.blogQuoteRepository
    .update(id, null, quoteEntity);

  if (! editedQuote) {
    throw new ConflictException(ValuePublicationQuote.QuoteNotFound);
  }

  return editedQuote
}
}
