import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

import { BlogLinkRepository } from '../blog-link/blog-link.repository';
import { CreateLinkDto } from './dto/creat-link.dto';
import { BlogLinkEntity } from '../blog-link/blog-photo-entity';
import { ValuePublicationLink } from './publication.enum';
import {Link} from '@project/shared-types'

@Injectable()
export class PublicationLinkService {
  constructor(
    private readonly blogLinkRepository: BlogLinkRepository
  ){}

  public async create(dto: CreateLinkDto) {

    const linkEntity = new BlogLinkEntity(dto)

    return this.blogLinkRepository
      .create(linkEntity);
  }

  public async show(id: number) {
    const existLink = await this.blogLinkRepository
      .findById(id);

    if (! existLink) {
      throw new NotFoundException(ValuePublicationLink.LinkNotFound);
    }

    return existLink
  }

  public async delete(id: number) {
    const informationDeleteLink = await this.blogLinkRepository.destroy(id);

    return informationDeleteLink
  }

public async update(id: number, dataLink: Link) {
  const linkEntity =  new BlogLinkEntity(dataLink);

  const editedLink = await this.blogLinkRepository
    .update(id, null, linkEntity);

  if (! editedLink) {
    throw new ConflictException(ValuePublicationLink.LinkNotFound);
  }

  return editedLink
}
}
