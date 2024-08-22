import { Link } from '@project/shared-types'

export class BlogLinkEntity implements Link {
  public link: string;
  public description: string;
  public setTag: string;
  public authorLink: string;
  public originolAuthor: '';
  public repost: '';
  public originolId: '';

  constructor(dataLink: Link) {
    this.fillEntity(dataLink);
  }

  public toObject() {
    return {
      link: this.link,
      description: this.description,
      setTag: this.setTag,
      authorLink: this.authorLink,
      originolAuthor: this.originolAuthor,
      repost: this.repost,
      originolId: this.originolId
    };
  }

  public fillEntity(dataLink: Link) {
    this.link = dataLink.link;
    this.description = dataLink.description;
    this.setTag = dataLink.setTag;
    this.authorLink = dataLink.authorLink;
    this.originolAuthor = '';
    this.repost = '';
    this.originolId = '';
  }

}
