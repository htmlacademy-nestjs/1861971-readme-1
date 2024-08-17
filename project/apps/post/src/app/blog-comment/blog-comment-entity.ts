import { Comment } from '@project/shared-types';

export class BlogCommentEntity implements Comment {
  public text: string;
  public authorComment: string;
  public idVideo: number;
  public idText: number;

  constructor(dataComment: Comment) {
    this.fillEntity(dataComment);
  }

  public toObject() {
    return {
      text: this.text,
      authorComment: this.authorComment,
      idVideo: this.idVideo,
      idText: this.idText
    };
  }

  public fillEntity(dataComment: Comment) {
    this.text = dataComment.text;
    this.authorComment = dataComment.authorComment;
    this.idVideo = dataComment.idVideo;
    this.idText = dataComment.idText;
  }
}
