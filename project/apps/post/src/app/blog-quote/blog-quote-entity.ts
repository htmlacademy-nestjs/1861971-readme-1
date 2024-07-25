import {randomUUID} from 'node:crypto'

import {
  Quote,
  VideoState,
  TypePublication,
  defaultValues
} from '@project/shared-types'

export class BlogQuoteEntity implements Quote {
  public id: string
  public textQuote: string;
  public setTag: string;
  public authorQuote: string;
  public typePublication?: TypePublication;
  public countLike?: number;
  public countComments?: string[];
  public dateCreation: string;
  public datePublication: string;
  public state: VideoState;
  public originolAuthor: boolean;
  public repost: boolean;
  public originolId: boolean;

  constructor(dataQuote: Quote) {
    this.fillEntity(dataQuote);
  }

  public toObject() {
    return {
      id: this.id,
      textQuote: this.textQuote,
      setTag: this.setTag,
      authorQuote: this.authorQuote,
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

  public fillEntity(dataQuote: Quote) {
    this.id = randomUUID();
    this.textQuote = dataQuote.textQuote;
    this.setTag = dataQuote.setTag;
    this.authorQuote = dataQuote.authorQuote;
    this.typePublication = TypePublication.Quote;
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
