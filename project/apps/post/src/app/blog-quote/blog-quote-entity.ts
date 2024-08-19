import { Quote } from '@project/shared-types'

export class BlogQuoteEntity implements Quote {
  public textQuote: string;
  public setTag: string;
  public authorQuote: string;
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
      authorQuote: this.authorQuote,
      originolAuthor: this.originolAuthor,
      repost: this.repost,
      originolId: this.originolId
    };
  }

  public fillEntity(dataQuote: Quote) {
    this.textQuote = dataQuote.textQuote;
    this.setTag = dataQuote.setTag;
    this.authorQuote = dataQuote.authorQuote;
    this.originolAuthor = '';
    this.repost = '';
    this.originolId = '';
  }

}
