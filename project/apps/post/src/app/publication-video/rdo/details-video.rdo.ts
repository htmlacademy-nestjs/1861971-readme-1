import { Expose, Transform } from 'class-transformer';

import { TypePublication } from '@project/shared-types';

export class DetailsVideoRdo {
  @Expose()
  public id: string;

  @Expose()
  public namePublication: string;

  @Expose()
  public linkVideo: string;

  @Expose()
  public setTag: string;

  @Expose()
  public authorPublication: string;

  @Expose()
  public typePublication: TypePublication;

  @Expose()
  public countLike: number;

  @Expose()
  public comments: number;

  @Expose()
  public datePublication: string;
}
