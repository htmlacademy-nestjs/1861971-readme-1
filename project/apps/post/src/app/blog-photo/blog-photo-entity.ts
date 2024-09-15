import { Photo } from '@project/shared-types'

export class BlogPhotoEntity implements Photo {
  public photo: string;
  public setTag: string[];
  public idAuthorPhoto: string;
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
      idAuthorPhoto: this.idAuthorPhoto,
      state: this.state,
      originolAuthor: this.originolAuthor,
      repost: this.repost,
      originolId: this.originolId
    };
  }

  public fillEntity(dataPhoto: Photo) {
    this.photo = dataPhoto.photo;
    this.setTag = dataPhoto.setTag;
    this.idAuthorPhoto = dataPhoto.idAuthorPhoto;
    this.state = dataPhoto.state,
    this.originolAuthor = '';
    this.repost = '';
    this.originolId = '';
  }

}
