import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

import { BlogTextMemoryRepository } from '../blog-text/blog-text-memory-repository';
import { BlogCommentMemoryRepository } from '../blog-comment/blog-comment-memory-repository';
import { CreateTextDto } from './dto/creat-text.dto';
import { BlogTextEntity } from '../blog-text/blog-text-entity';
import { ValuePublicationText } from './publication.enum';
import {Text} from '@project/shared-types';

@Injectable()
export class PublicationTextService {
  constructor(
    private readonly blogTextMemoryRepository: BlogTextMemoryRepository,
    private readonly blogCommentMemoryRepository: BlogCommentMemoryRepository
  ){}

  public async create(dto: CreateTextDto) {

    const textEntity = await new BlogTextEntity(dto)

    return this.blogTextMemoryRepository
      .create(textEntity);
  }

  public async show(id: string) {
    const existText = await this.blogTextMemoryRepository
      .findById(id);

    if (! existText) {
      throw new NotFoundException(ValuePublicationText.TextNotFound);
    }

    return existText
  }

  public async delete(id: string) {
    const idList = await this.blogTextMemoryRepository.destroy(id);
    await this.blogCommentMemoryRepository.destroy(idList);
}

public async update(dataText: Text) {
  const editedText = await this.blogTextMemoryRepository
    .update(null, null, dataText);

  if (! editedText) {
    throw new ConflictException(ValuePublicationText.TextNotFound);
  }

  return editedText
}
}
