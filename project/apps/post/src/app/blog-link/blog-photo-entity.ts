import {randomUUID} from 'node:crypto'

import {
  Link,
  VideoState,
  TypePublication,
  defaultValues
} from '@project/shared-types'

export class BlogLinkEntity implements Link {
  public id: string
  public link: string;
  public description: string;
  public setTag: string;
  public authorLink: string;
  public typePublication?: TypePublication;
  public countLike?: number;
  public countComments?: string[];
  public dateCreation: string;
  public datePublication: string;
  public state: VideoState;
  public originolAuthor: boolean;
  public repost: boolean;
  public originolId: boolean;

  constructor(dataLink: Link) {
    this.fillEntity(dataLink);
  }

  public toObject() {
    return {
      id: this.id,
      link: this.link,
      description: this.description,
      setTag: this.setTag,
      authorLink: this.authorLink,
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

  public fillEntity(dataLink: Link) {
    this.id = randomUUID();
    this.link = dataLink.link;
    this.description = dataLink.description;
    this.setTag = dataLink.setTag;
    this.authorLink = dataLink.authorLink;
    this.typePublication = TypePublication.Link;
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
