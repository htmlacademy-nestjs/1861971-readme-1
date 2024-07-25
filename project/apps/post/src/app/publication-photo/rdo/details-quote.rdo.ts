import { Expose } from 'class-transformer';

import { TypePublication } from '@project/shared-types';

export class DetailsPhotoRdo {
  @Expose()
  public id: string;

  @Expose()
  public photo: string;

  @Expose()
  public setTag: string;

  @Expose()
  public authorPhoto: string;

  @Expose()
  typePublication: TypePublication;

  @Expose()
  countLike: number;

  @Expose()
  countComments: number;

  @Expose()
  public datePublication: string;
}
