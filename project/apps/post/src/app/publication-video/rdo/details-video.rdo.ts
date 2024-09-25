import { Expose, Transform } from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

import { UserRdo } from './user.rdo';

export class DetailsVideoRdo {
  @ApiProperty({
    description: 'Unique video id',
    example: 1
  })
  @Expose()
  public id: number;

  @ApiProperty({
    example: 'Я среди гор'
  })
  @Expose()
  public namePublication: string;

  @ApiProperty({
    description: 'Video download link',
    example: 'http://month'
  })
  @Expose()
  public linkVideo: string;

  @ApiProperty({
    example:'горы'
  })
  @Expose()
  public setTag: string[];

  @ApiProperty({
    type: UserRdo
  })
  @Expose()
  public nameAuthor: UserRdo;

  @ApiProperty({
    description: 'Your publicashon corresponds to the type of publication',
    example: 'video'
  })
  @Expose()
  public typePublication: string;

  @ApiProperty({
    example: 2
  })
  @Expose()
  @Transform(({ value }) => value.length)
  public countLike: number;

  @ApiProperty({
    example: 3
  })
  @Expose({name: 'comments'})
  @Transform(({ value }) => value.length)
  public commentCounter: number;

  @ApiProperty({
    example: '2024-08-17 18:06:41.519'
  })
  @Expose()
  public datePublication: string;
}
