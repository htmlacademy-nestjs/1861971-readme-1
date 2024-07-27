import {randomUUID} from 'node:crypto'

import {
  Video,
  VideoState,
  TypePublication,
  defaultValues
} from '@project/shared-types'

export class BlogVideoEntity implements Video {
  public id: string
  public namePublication: string;
  public linkVideo: string;
  public setTag: string;
  public authorPublication: string;
  public typePublication?: TypePublication;
  public countLike?: number;
  public countComments?: string[];
  public dateCreation: string;
  public datePublication: string;
  public state: VideoState;
  public originolAuthor: boolean;
  public repost: boolean;
  public originolId: boolean;

  constructor(dataVideo: Video) {
    this.fillEntity(dataVideo);
  }

  public toObject() {
    return {
      id: this.id,
      namePublication: this.namePublication,
      linkVideo: this.linkVideo,
      setTag: this.setTag,
      authorPublication: this.authorPublication,
      typePublication: this.typePublication,
      countLike: this.countLike,
      countComments: this.countComments,
      dateCreation: this.dateCreation,
      datePublication: this.datePublication,
      state: this.state,
      originolAuthor: this.originolAuthor,
      repost: this.repost,
      originolId: this.originolId
    };
  }

  public fillEntity(dataVideo: Video) {
    this.id = randomUUID();
    this.namePublication = dataVideo.namePublication;
    this.linkVideo = dataVideo.linkVideo;
    this.setTag = dataVideo.setTag;
    this.authorPublication = dataVideo.authorPublication;
    this.typePublication = TypePublication.Video,
    this.countLike = defaultValues.zero,
    this.countComments = [],
    this.dateCreation = new Date().toISOString();
    this.datePublication = new Date().toISOString();
    this.state = VideoState.Published;
    this.originolAuthor = false;
    this.repost = false;
    this.originolId = false;
  }

}
