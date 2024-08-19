import { Text } from '@project/shared-types'

export class BlogTextEntity implements Text {
  public namePublication: string;
  public announcementPublication: string;
  public textPublication: string;
  public setTag: string;
  public authorPublication: string;
  public originolAuthor: string;
  public repost: string;
  public originolId: string;

  constructor(dataText: Text) {
    this.fillEntity(dataText);
  }

  public toObject() {
    return {
      namePublication: this.namePublication,
      announcementPublication: this.announcementPublication,
      textPublication: this.textPublication,
      setTag: this.setTag,
      authorPublication: this.authorPublication,
      originolAuthor: this.originolAuthor,
      repost: this.repost,
      originolId: this.originolId
    };
  }

  public fillEntity(dataText: Text) {
    this.namePublication = dataText.namePublication;
    this.announcementPublication = dataText.announcementPublication;
    this.textPublication = dataText.textPublication;
    this.setTag = dataText.setTag;
    this.authorPublication = dataText.authorPublication;
    this.originolAuthor = '';
    this.repost = '';
    this.originolId = '';
  }

}
