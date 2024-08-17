import { Injectable } from '@nestjs/common';

import { BlogCommentRepository } from '../blog-comment/blog-comment.repository';
import { CreateCommentDto } from './dto/creat-comment.dto';
import { BlogCommentEntity } from '../blog-comment/blog-comment-entity';
import { defaultValues } from '@project/shared-types';
import { Publication } from './dto/id-list.dto';

@Injectable()
export class PublicationCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository){}

  public async create(dto: CreateCommentDto) {

    const commentEntity = await new BlogCommentEntity(dto)

    return this.blogCommentRepository
      .create(commentEntity);
  }

  public async findById(idPost: number, count: string | number) {
    const limit = count ?? defaultValues.commentCount;
    const commentsList = await this.blogCommentRepository.findById(idPost, Number(limit));

    return commentsList;
  }

  public async delete(dataPost: Publication) {
    const informationDeleteComments = await this.blogCommentRepository.destroy(dataPost);

    return informationDeleteComments
  }
}
