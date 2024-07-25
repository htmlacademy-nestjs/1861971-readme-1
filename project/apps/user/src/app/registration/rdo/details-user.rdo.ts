import { Expose } from 'class-transformer';

export class DetailsUserRdo {
  @Expose()
  public id: string;

  @Expose()
  public dataRegistration: string;
}
