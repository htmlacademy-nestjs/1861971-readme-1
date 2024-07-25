import { Expose } from 'class-transformer';

import { TypePublication } from '@project/shared-types';

export class DetailsLinkRdo {
  @Expose()
  public id: string;

  @Expose()
  public link: string;

  @Expose()
  public description: string;

  @Expose()
  public setTag: string;

  @Expose()
  public authorLink: string;

  @Expose()
  public typePublication?: TypePublication;

  @Expose()
  public countLike?: number;

  @Expose()
  public countComments?: number;

  @Expose()
  public datePublication: string;
}
