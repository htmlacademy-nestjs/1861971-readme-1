import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

import { BlogTextRepository } from '../blog-text/blog-text.repository';
import { CreateTextDto } from './dto/creat-text.dto';
import { BlogTextEntity } from '../blog-text/blog-text-entity';
import { ValuePublicationText } from './publication.enum';
import {Text} from '@project/shared-types';
import {castingToLowercase, removDuplicates} from '@project/util-core';

@Injectable()
export class PublicationTextService {
  constructor(
    private readonly blogTextRepository: BlogTextRepository
  ){}

  public async create(dto: CreateTextDto) {
    let updateText: Text
    const {setTag} = dto

    if(setTag) {
    const returnTextWithTagsListToLowercase = castingToLowercase<Text>(dto)
    updateText = removDuplicates (returnTextWithTagsListToLowercase)
    }

    const textEntity = new BlogTextEntity(updateText ?? dto)

    return await this.blogTextRepository
      .create(textEntity);
  }

  public async show(id: number) {
    const existText = await this.blogTextRepository
      .findById(id);

    if (! existText) {
      throw new NotFoundException(ValuePublicationText.TextNotFound);
    }

    return existText
  }

  public async delete(id: number) {
    const informationDeleteText = await this.blogTextRepository.destroy(id);

    return informationDeleteText
}

public async update(id: number, dataText: Text) {
  const textEntity =  new BlogTextEntity(dataText);

  const editedText = await this.blogTextRepository
    .update(id, null, textEntity);

  if (! editedText) {
    throw new ConflictException(ValuePublicationText.TextNotFound);
  }

  return editedText
}
}
