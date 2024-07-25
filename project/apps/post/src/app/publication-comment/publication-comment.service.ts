import { Injectable, NotFoundException } from '@nestjs/common';

import { BlogCommentMemoryRepository } from '../blog-comment/blog-comment-memory-repository';
import { BlogLinkMemoryRepository } from '../blog-link/blog-link-memory-repository';
import { BlogPhotoMemoryRepository } from '../blog-photo/blog-photo-memory-repository';
import { BlogQuoteMemoryRepository } from '../blog-quote/blog-quote-memory-repository';
import { BlogTextMemoryRepository } from '../blog-text/blog-text-memory-repository';
import { BlogVideoMemoryRepository } from '../blog-video/blog-video-memory-repository';
import { CreateCommentDto } from './dto/creat-comment.dto';
import { BlogCommentEntity } from '../blog-comment/blog-comment-entity';
import { ValueComment } from './publication.enum';

@Injectable()
export class PublicationCommentService {
  blogList: (BlogVideoMemoryRepository | BlogTextMemoryRepository | BlogQuoteMemoryRepository | BlogPhotoMemoryRepository | BlogLinkMemoryRepository)[] = [];

  constructor(
    private readonly blogCommentMemoryRepository: BlogCommentMemoryRepository,
    private readonly blogVideoMemoryRepository: BlogVideoMemoryRepository,
    private readonly blogTextMemoryRepository: BlogTextMemoryRepository,
    private readonly blogQuoteMemoryRepository: BlogQuoteMemoryRepository,
    private readonly blogPhotoMemoryRepository: BlogPhotoMemoryRepository,
    private readonly blogLinkMemoryRepository: BlogLinkMemoryRepository
  ){
    this.blogList = [
      this.blogVideoMemoryRepository,
      this.blogTextMemoryRepository,
      this.blogQuoteMemoryRepository,
      this.blogPhotoMemoryRepository,
      this.blogLinkMemoryRepository
    ];
  }

  public async create(dto: CreateCommentDto, id: string) {

    const commentEntity = await new BlogCommentEntity(dto)

    const comment = await this.blogCommentMemoryRepository
      .create(commentEntity);

    for await (const value of this.blogList) {
      const element = await value.findById(id);

      if(element) {
        value.addComment({
          idComment: comment.id,
          idPublication: id
        })

        return comment
      }
    }
  }

  public async findById(idList: string[]) {
    const existComment = await this.blogCommentMemoryRepository.findById(idList);

    if (! existComment) {
      throw new NotFoundException(ValueComment.CommentNotFound);
    }

    return existComment;
  }

  public async delete(idList: string[]) {
    let indicator = false;

    await this.blogCommentMemoryRepository.destroy(idList);

    indicator = await this.blogVideoMemoryRepository.deleteComment(idList);

    if(indicator) {return}
    indicator = await this.blogTextMemoryRepository.deleteComment(idList);

    if(indicator) {return}
    indicator = await this.blogQuoteMemoryRepository.deleteComment(idList);

    if(indicator) {return}
    indicator = await this.blogPhotoMemoryRepository.deleteComment(idList);

    if(indicator) {return}
    indicator = await this.blogLinkMemoryRepository.deleteComment(idList);
}
}
