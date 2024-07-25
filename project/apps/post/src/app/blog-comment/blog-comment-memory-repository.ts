import { Injectable } from '@nestjs/common';

import { CommentInterface } from './comment.interface';
import { Comment } from '@project/shared-types';
import { BlogCommentEntity } from './blog-comment-entity';

@Injectable()
export class BlogCommentMemoryRepository implements CommentInterface {
  private repositoryComment: Comment[] = [];

  public async create(item: BlogCommentEntity): Promise<Comment> {
    const dataComment = { ...item.toObject()};
    this.repositoryComment.push(dataComment);

    return dataComment;
  }

  public async findById(idList: string[]): Promise<Comment[]> {
    const commentsList: Comment[] = []

    idList.forEach((value) => {
      for(const element of this.repositoryComment) {
        if(element.id === value) {
          commentsList.push(element)
        }
      }
    });

    if (commentsList.length !== 0) {
      return commentsList;
    }

    return null;
  }

  public async destroy(idList: string[]): Promise<void> {
    idList.forEach((value) => {

      const index = this.repositoryComment
      .findIndex((element) => element.id === value)

      if(index !== -1) {
        this.repositoryComment = [
          ...this.repositoryComment.slice(0, index),
          ...this.repositoryComment.slice(index + 1),
        ];
      }
    })
  }
}
