import { Quote } from '@project/shared-types'

export class BlogQuoteEntity implements Quote {
  public textQuote: string;
  public setTag: string[];
  public state: string;
  public originolAuthor: string;
  public repost: string;
  public originolId: string;

  constructor(dataQuote: Quote) {
    this.fillEntity(dataQuote);
  }

  public toObject() {
    return {
      textQuote: this.textQuote,
      setTag: this.setTag,
      state: this.state,
      originolAuthor: this.originolAuthor,
      repost: this.repost,
      originolId: this.originolId
    };
  }

  public fillEntity(dataQuote: Quote) {
    this.textQuote = dataQuote.textQuote;
    this.setTag = dataQuote.setTag;
    this.state = dataQuote.state;
    this.originolAuthor = '';
    this.repost = '';
    this.originolId = '';
  }

}
