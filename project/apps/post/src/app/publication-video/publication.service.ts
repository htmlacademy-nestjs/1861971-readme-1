import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

import { BlogVideoRepository } from '../blog-video/blog-video.repository';
import { CreateVideoDto } from './dto/creat-video.dto';
import { BlogVideoEntity } from '../blog-video/blog-video-entity';
import { ValuePublication } from './publication.enum';
import {Video} from '@project/shared-types';
import {castingToLowercase, removDuplicates} from '@project/util-core';

@Injectable()
export class PublicationService {
  constructor(
    private readonly blogVideoRepository: BlogVideoRepository,
  ){}

  public async create(dto: CreateVideoDto) {
    let updateVideo: Video
    const {setTag} = dto

    if(setTag) {
    const returnVideoWithTagsListToLowercase = castingToLowercase<Video>(dto)
    updateVideo = removDuplicates (returnVideoWithTagsListToLowercase)
    }

    const videoEntity = new BlogVideoEntity(updateVideo ?? dto)

    return await this.blogVideoRepository
      .create(videoEntity);
  }

  public async show(id: number) {
    const existVideo = await this.blogVideoRepository
      .findById(id);

    if (! existVideo) {
      throw new NotFoundException(ValuePublication.VideoNotFound);
    }

    return existVideo
  }

  public async delete(id: number) {
    const informationDeleteVideo = await this.blogVideoRepository.destroy(id);

    return informationDeleteVideo
}

public async update(id: number, dataVideo: Video) {
  const videoEntity =  new BlogVideoEntity(dataVideo);

  const editedVideo = await this.blogVideoRepository
    .update(id, null, videoEntity);

  if (! editedVideo) {
    throw new ConflictException(ValuePublication.VideoNotFound);
  }

  return editedVideo
}
}
