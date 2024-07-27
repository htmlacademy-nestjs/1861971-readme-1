import {randomUUID} from 'node:crypto'

import { Comment } from '@project/shared-types'

export class BlogCommentEntity implements Comment {
  public id?: string;
  public text: string;
  public authorComment: string;
  public dateCreation?: string;

  constructor(dataComment: Comment) {
    this.fillEntity(dataComment);
  }

  public toObject() {
    return {
      id: this.id,
      text: this.text,
      authorComment: this.authorComment,
      dateCreation: this.dateCreation,
    };
  }

  public fillEntity(dataComment: Comment) {
    this.id = randomUUID();
    this.text = dataComment.text;
    this.authorComment = dataComment.authorComment;
    this.dateCreation = new Date().toISOString();
  }
}
