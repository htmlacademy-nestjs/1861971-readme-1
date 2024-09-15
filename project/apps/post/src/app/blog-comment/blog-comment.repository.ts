import { Injectable } from '@nestjs/common';
import {Prisma} from '@prisma/client';

import { CommentInterface } from './comment.interface';
import { Comment } from '@project/shared-types';
import { BlogCommentEntity } from './blog-comment-entity';
import { PrismaService } from '../prisma/prisma.service';
import { Publication } from '@project/shared-types';

let skip = 0;

@Injectable()
export class BlogCommentRepository implements CommentInterface {
  constructor(private readonly prisma: PrismaService){}

  public async create(item: BlogCommentEntity): Promise<Comment> {
    const dataComment = { ...item.toObject()};
    const creatNewComment = await this.prisma.comment.create({
     data: {
      ...dataComment
     }
    })

    return creatNewComment;
  }

  public async findById(idPost: number, count: number): Promise<Comment[] | []> {
    const commentsList = await this.prisma.comment.findMany({
      where: {
        OR: [
          {
            idVideo: idPost
          },
          {
            idText: idPost
          },
          {
            idQuote: idPost
          },
          {
            idPhoto: idPost
          },
          {
            idLink: idPost
          }
        ]
      },
      skip: skip,
      take: count
    })

    skip += count;

    return commentsList
  }

  public async destroy(dataPost: Publication): Promise<Prisma.BatchPayload> {
    const {idPost, idAuthorComment} = dataPost;
    const informationDeleteComments = await this.prisma.comment.deleteMany({
      where: {
        OR: [
          {
            idVideo: idPost
          },
          {
            idText: idPost
          },
          {
            idQuote: idPost
          },
          {
            idPhoto: idPost
          },
          {
            idLink: idPost
          }
        ],
        AND: {
          idAuthorComment: idAuthorComment
        }
      }
    })

    return informationDeleteComments
  }
}
