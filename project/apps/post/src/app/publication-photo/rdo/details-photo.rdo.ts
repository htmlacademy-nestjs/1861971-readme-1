import { Expose } from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

import { TypePublication } from '@project/shared-types';

export class DetailsPhotoRdo {
  @ApiProperty({
    description: 'Unique photo id',
    example: 1
  })
  @Expose()
  public id: number;

  @ApiProperty({
    example: 'bild.jpg'
  })
  @Expose()
  public photo: string;

  @ApiProperty({
    example:'прогулка'
  })
  @Expose()
  public setTag: string;

  @ApiProperty({
    example: 'Vlad'
  })
  @Expose()
  public authorPhoto: string;

  @ApiProperty({
    description: 'Your publicashon corresponds to the type of publication',
    example: 'photo'
  })
  @Expose()
  typePublication: TypePublication;

  @ApiProperty({
    example: 2
  })
  @Expose()
  countLike: number;

  @ApiProperty({
    example: 3
  })
  @Expose()
  comments: number;

  @ApiProperty({
    example: '2024-08-17 18:06:41.519'
  })
  @Expose()
  public datePublication: string;
}
