import {
  Video,
  defaultValues
} from '@project/shared-types'

export class BlogVideoEntity implements Video {
  public namePublication: string;
  public linkVideo: string;
  public setTag: string;
  public authorPublication: string;
  public countLike?: number;
  public originolAuthor: string;
  public repost: string;
  public originolId: string;

  constructor(dataVideo: Video) {
    this.fillEntity(dataVideo);
  }

  public toObject() {
    return {
      namePublication: this.namePublication,
      linkVideo: this.linkVideo,
      setTag: this.setTag,
      authorPublication: this.authorPublication,
      countLike: this.countLike,
      originolAuthor: this.originolAuthor,
      repost: this.repost,
      originolId: this.originolId
    };
  }

  public fillEntity(dataVideo: Video) {
    this.namePublication = dataVideo.namePublication;
    this.linkVideo = dataVideo.linkVideo;
    this.setTag = dataVideo.setTag;
    this.authorPublication = dataVideo.authorPublication;
    this.countLike = defaultValues.zero,
    this.originolAuthor = '';
    this.repost = '';
    this.originolId = '';
  }

}
