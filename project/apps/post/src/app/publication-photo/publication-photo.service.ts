import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

import { BlogPhotoRepository } from '../blog-photo/blog-photo.repository';
import { CreatePhotoDto } from './dto/creat-photo.dto';
import { BlogPhotoEntity } from '../blog-photo/blog-photo-entity';
import { ValuePublicationPhoto } from './publication.enum';
import {Photo} from '@project/shared-types';

@Injectable()
export class PublicationPhotoService {
  constructor(
    private readonly blogPhotoRepository: BlogPhotoRepository
  ){}

  public async create(dto: CreatePhotoDto) {

    const photoEntity = new BlogPhotoEntity(dto)

    return this.blogPhotoRepository
      .create(photoEntity);
  }

  public async show(id: number) {
    const existPhoto = await this.blogPhotoRepository
      .findById(id);

    if (! existPhoto) {
      throw new NotFoundException(ValuePublicationPhoto.PhotoNotFound);
    }

    return existPhoto
  }

  public async delete(id: number) {
    const informationDeletePhoto = await this.blogPhotoRepository.destroy(id);

    return informationDeletePhoto
}

public async update(id: number, dataPhoto: Photo) {
  const photoEntity =  new BlogPhotoEntity(dataPhoto);

  const editedPhoto = await this.blogPhotoRepository
    .update(id, null, photoEntity);

  if (! photoEntity) {
    throw new ConflictException(ValuePublicationPhoto.PhotoNotFound);
  }

  return editedPhoto
}
}
