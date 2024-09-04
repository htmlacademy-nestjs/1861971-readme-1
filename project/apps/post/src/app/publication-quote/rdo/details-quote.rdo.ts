import { Expose, Transform } from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

import { TypePublication } from '@project/shared-types';

export class DetailsQuoteRdo {
  @ApiProperty({
    description: 'Unique video id',
    example: 1
  })
  @Expose()
  public id: number;

  @ApiProperty({
    example: 'Это было не забываемо. Советую'
  })
  @Expose()
  public textQuote: string;

  @ApiProperty({
    example:'горы'
  })
  @Expose()
  public setTag: string[];

  @ApiProperty({
    example: 'Vlad'
  })
  @Expose()
  public authorQuote: string;

  @ApiProperty({
    description: 'Your publicashon corresponds to the type of publication',
    example: 'quote'
  })
  @Expose()
  typePublication: TypePublication;

  @ApiProperty({
    example: 2
  })
  @Expose()
  @Transform(({ value }) => value.length)
  countLike: number;

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
