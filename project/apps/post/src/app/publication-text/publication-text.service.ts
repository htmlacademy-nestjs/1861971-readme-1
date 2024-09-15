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

  public async create(dto: CreateTextDto, idUser: string) {
    const text = {
      ...dto,
      idAuthorPublication: idUser
    }

    let updateText: Text
    const {setTag} = dto

    if(setTag) {
    const returnTextWithTagsListToLowercase = castingToLowercase<Text>(text)
    updateText = removDuplicates (returnTextWithTagsListToLowercase)
    }

    const textEntity = new BlogTextEntity(updateText ?? text)

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

public async addRepost(idPublication: string, idUser: string) {
  const publication = await this.blogTextRepository.repost(idPublication, idUser);

  if (! publication) {
    throw new NotFoundException(ValuePublicationText.TextNotFoundFoRepost);
  }

  return publication
}
}
