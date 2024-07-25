import {randomUUID} from 'node:crypto'

import {
  Text,
  VideoState,
  TypePublication,
  defaultValues
} from '@project/shared-types'

export class BlogTextEntity implements Text {
  public id: string
  public namePublication: string;
  public announcementPublication: string;
  public textPublication: string;
  public setTag: string;
  public authorPublication: string;
  public typePublication?: TypePublication;
  public countLike?: number;
  public countComments: string[];
  public dateCreation: string;
  public datePublication: string;
  public state: VideoState;
  public originolAuthor: boolean;
  public repost: boolean;
  public originolId: boolean;

  constructor(dataText: Text) {
    this.fillEntity(dataText);
  }

  public toObject() {
    return {
      id: this.id,
      namePublication: this.namePublication,
      announcementPublication: this.announcementPublication,
      textPublication: this.textPublication,
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

  public fillEntity(dataText: Text) {
    this.id = randomUUID();
    this.namePublication = dataText.namePublication;
    this.announcementPublication = dataText.announcementPublication;
    this.textPublication = dataText.textPublication;
    this.setTag = dataText.setTag;
    this.authorPublication = dataText.authorPublication;
    this.typePublication = TypePublication.Text;
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
