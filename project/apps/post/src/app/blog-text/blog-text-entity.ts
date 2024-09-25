import { Text } from '@project/shared-types'

export class BlogTextEntity implements Text {
  public namePublication: string;
  public announcementPublication: string;
  public textPublication: string;
  public setTag: string[];
  public idAuthorPublication: string;
  public state: string;
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
      idAuthorPublication: this.idAuthorPublication,
      state: this.state,
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
    this.idAuthorPublication = dataText.idAuthorPublication;
    this.state = dataText.state;
    this.originolAuthor = '';
    this.repost = '';
    this.originolId = '';
  }

}
