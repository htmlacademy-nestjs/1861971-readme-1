import { Photo } from '@project/shared-types'

export class BlogPhotoEntity implements Photo {
  public photo: string;
  public setTag: string[];
  public state: string;
  public originolAuthor: '';
  public repost: '';
  public originolId: '';

  constructor(dataPhoto: Photo) {
    this.fillEntity(dataPhoto);
  }

  public toObject() {
    return {
      photo: this.photo,
      setTag: this.setTag,
      state: this.state,
      originolAuthor: this.originolAuthor,
      repost: this.repost,
      originolId: this.originolId
    };
  }

  public fillEntity(dataPhoto: Photo) {
    this.photo = dataPhoto.photo;
    this.setTag = dataPhoto.setTag;
    this.state = dataPhoto.state,
    this.originolAuthor = '';
    this.repost = '';
    this.originolId = '';
  }

}
