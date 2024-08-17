import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

import { BlogQuoteMemoryRepository } from '../blog-quote/blog-quote-memory-repository';
import { BlogCommentRepository } from '../blog-comment/blog-comment.repository';
import { CreateQuoteDto } from './dto/creat-quote.dto';
import { BlogQuoteEntity } from '../blog-quote/blog-quote-entity';
import { ValuePublicationQuote } from './publication.enum';
import {Quote} from '@project/shared-types';

@Injectable()
export class PublicationQuoteService {
  constructor(
    private readonly blogQuoteMemoryRepository: BlogQuoteMemoryRepository,
    private readonly blogCommentRepository: BlogCommentRepository
  ){}

  public async create(dto: CreateQuoteDto) {

    const quoteEntity = await new BlogQuoteEntity(dto)

    return this.blogQuoteMemoryRepository
      .create(quoteEntity);
  }

  public async show(id: string) {
    const existQuote = await this.blogQuoteMemoryRepository
      .findById(id);

    if (! existQuote) {
      throw new NotFoundException(ValuePublicationQuote.QuoteNotFound);
    }

    return existQuote
  }

  public async delete(id: string) {
    await this.blogQuoteMemoryRepository.destroy(id);
  }

public async update(dataText: Quote) {
  const editedQuote = await this.blogQuoteMemoryRepository
    .update(null, null, dataText);

  if (! editedQuote) {
    throw new ConflictException(ValuePublicationQuote.QuoteNotFound);
  }

  return editedQuote
}
}
