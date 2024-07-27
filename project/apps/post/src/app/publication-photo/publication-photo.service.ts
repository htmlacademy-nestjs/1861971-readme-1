import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

import { BlogPhotoMemoryRepository } from '../blog-photo/blog-photo-memory-repository';
import { BlogCommentMemoryRepository } from '../blog-comment/blog-comment-memory-repository';
import { CreatePhotoDto } from './dto/creat-photo.dto';
import { BlogPhotoEntity } from '../blog-photo/blog-photo-entity';
import { ValuePublicationPhoto } from './publication.enum';
import {Photo} from '@project/shared-types';

@Injectable()
export class PublicationPhotoService {
  constructor(
    private readonly blogPhotoMemoryRepository: BlogPhotoMemoryRepository,
    private readonly blogCommentMemoryRepository: BlogCommentMemoryRepository
  ){}

  public async create(dto: CreatePhotoDto) {

    const photoEntity = await new BlogPhotoEntity(dto)

    return this.blogPhotoMemoryRepository
      .create(photoEntity);
  }

  public async show(id: string) {
    const existPhoto = await this.blogPhotoMemoryRepository
      .findById(id);

    if (! existPhoto) {
      throw new NotFoundException(ValuePublicationPhoto.PhotoNotFound);
    }

    return existPhoto
  }

  public async delete(id: string) {
    const idList = await this.blogPhotoMemoryRepository.destroy(id);
    await this.blogCommentMemoryRepository.destroy(idList);
  }

public async update(dataText: Photo) {
  const editedPhoto = await this.blogPhotoMemoryRepository
    .update(null, null, dataText);

  if (! editedPhoto) {
    throw new ConflictException(ValuePublicationPhoto.PhotoNotFound);
  }

  return editedPhoto
}
}
