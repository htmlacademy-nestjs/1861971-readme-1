import {randomUUID} from 'node:crypto'

import {
  Photo,
  VideoState,
  TypePublication,
  defaultValues
} from '@project/shared-types'

export class BlogPhotoEntity implements Photo {
  public id: string
  public photo: string;
  public setTag: string;
  public authorPhoto: string;
  public typePublication?: TypePublication;
  public countLike?: number;
  public countComments?: string[];
  public dateCreation: string;
  public datePublication: string;
  public state: VideoState;
  public originolAuthor: boolean;
  public repost: boolean;
  public originolId: boolean;

  constructor(dataPhoto: Photo) {
    this.fillEntity(dataPhoto);
  }

  public toObject() {
    return {
      id: this.id,
      photo: this.photo,
      setTag: this.setTag,
      authorPhoto: this.authorPhoto,
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

  public fillEntity(dataPhoto: Photo) {
    this.id = randomUUID();
    this.photo = dataPhoto.photo;
    this.setTag = dataPhoto.setTag;
    this.authorPhoto = dataPhoto.authorPhoto;
    this.typePublication = TypePublication.Photo;
    this.countLike = defaultValues.zero;
    this.countComments = [];
    this.dateCreation = new Date().toISOString();
    this.datePublication = new Date().toISOString();
    this.state = VideoState.Published;
    this.originolAuthor = false;
    this.repost = false;
    this.originolId = false;
  }

}
