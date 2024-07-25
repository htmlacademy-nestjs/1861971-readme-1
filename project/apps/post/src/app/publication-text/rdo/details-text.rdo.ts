import { Expose } from 'class-transformer';
import { TypePublication } from '@project/shared-types';

export class DetailsTextRdo {
  @Expose()
  public id: string;

  @Expose()
  public namePublication: string;

  @Expose()
  public announcementPublication: string;

  @Expose()
  public textPublication: string;

  @Expose()
  public setTag: string;

  @Expose()
  public authorPublication: string;

  @Expose()
  typePublication: TypePublication;

  @Expose()
  countLike: number;

  @Expose()
  countComments: number;

  @Expose()
  public datePublication: string;
}
