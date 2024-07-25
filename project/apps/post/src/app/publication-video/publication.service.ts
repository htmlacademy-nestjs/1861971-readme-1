import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

import { BlogVideoMemoryRepository } from '../blog-video/blog-video-memory-repository';
import { BlogCommentMemoryRepository } from '../blog-comment/blog-comment-memory-repository';
import { CreateVideoDto } from './dto/creat-video.dto';
import { BlogVideoEntity } from '../blog-video/blog-video-entity';
import { ValuePublication } from './publication.enum';
import {Video} from '@project/shared-types';

@Injectable()
export class PublicationService {
  constructor(
    private readonly blogVideoMemoryRepository: BlogVideoMemoryRepository,
    private readonly blogCommentMemoryRepository: BlogCommentMemoryRepository
  ){}

  public async create(dto: CreateVideoDto) {

    const videoEntity = await new BlogVideoEntity(dto)

    return this.blogVideoMemoryRepository
      .create(videoEntity);
  }

  public async show(id: string) {
    const existVideo = await this.blogVideoMemoryRepository
      .findById(id);

    if (! existVideo) {
      throw new NotFoundException(ValuePublication.VideoNotFound);
    }

    return existVideo
  }

  public async delete(id: string) {
    const idList = await this.blogVideoMemoryRepository.destroy(id);
    await this.blogCommentMemoryRepository.destroy(idList);
}

public async update(dataVideo: Video) {
  const editedVideo = await this.blogVideoMemoryRepository
    .update(null, null, dataVideo);

  if (! editedVideo) {
    throw new ConflictException(ValuePublication.VideoNotFound);
  }

  return editedVideo
}
}
