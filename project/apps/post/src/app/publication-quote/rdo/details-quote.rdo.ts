import { Expose } from 'class-transformer';

import { TypePublication } from '@project/shared-types';

export class DetailsQuoteRdo {
  @Expose()
  public id: string;

  @Expose()
  public textQuote: string;

  @Expose()
  public setTag: string;

  @Expose()
  public authorQuote: string;

  @Expose()
  typePublication: TypePublication;

  @Expose()
  countLike: number;

  @Expose()
  countComments: number;

  @Expose()
  public datePublication: string;
}
