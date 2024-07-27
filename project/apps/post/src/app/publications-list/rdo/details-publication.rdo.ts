import { Expose } from 'class-transformer';

export class DetailsPublicationRdo {
  @Expose()
  public typePublication: string;

  @Expose()
  public countLike: number;

  @Expose()
  public countComments: number;
}
