import { Comment } from '@project/shared-types';

export class BlogCommentEntity implements Comment {
  public text: string;
  public authorComment: string;
  public idVideo: number;
  public idText: number;
  public idQuote: number;
  public idPhoto: number;
  public idLink: number;

  constructor(dataComment: Comment) {
    this.fillEntity(dataComment);
  }

  public toObject() {
    return {
      text: this.text,
      authorComment: this.authorComment,
      idVideo: this.idVideo,
      idText: this.idText,
      idQuote: this.idQuote,
      idPhoto: this.idPhoto,
      idLink: this.idLink
    };
  }

  public fillEntity(dataComment: Comment) {
    this.text = dataComment.text;
    this.authorComment = dataComment.authorComment;
    this.idVideo = dataComment.idVideo;
    this.idText = dataComment.idText;
    this.idQuote = dataComment.idQuote;
    this.idPhoto = dataComment.idPhoto;
    this.idLink = dataComment.idLink;
  }
}
