import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

import { BlogLinkMemoryRepository } from '../blog-link/blog-link-memory-repository';
import { BlogCommentMemoryRepository } from '../blog-comment/blog-comment-memory-repository';
import { CreateLinkDto } from './dto/creat-link.dto';
import { BlogLinkEntity } from '../blog-link/blog-photo-entity';
import { ValuePublicationLink } from './publication.enum';
import {Link} from '@project/shared-types'

@Injectable()
export class PublicationLinkService {
  constructor(
    private readonly blogLinkMemoryRepository: BlogLinkMemoryRepository,
    private readonly blogCommentMemoryRepository: BlogCommentMemoryRepository
  ){}

  public async create(dto: CreateLinkDto) {

    const linkEntity = await new BlogLinkEntity(dto)

    return this.blogLinkMemoryRepository
      .create(linkEntity);
  }

  public async show(id: string) {
    const existLink = await this.blogLinkMemoryRepository
      .findById(id);

    if (! existLink) {
      throw new NotFoundException(ValuePublicationLink.LinkNotFound);
    }

    return existLink
  }

  public async delete(id: string) {
    const idList = await this.blogLinkMemoryRepository.destroy(id);
    await this.blogCommentMemoryRepository.destroy(idList);
  }

public async update(dataLink: Link) {
  const editedLink = await this.blogLinkMemoryRepository
    .update(null, null, dataLink);

  if (! editedLink) {
    throw new ConflictException(ValuePublicationLink.LinkNotFound);
  }

  return editedLink
}
}
