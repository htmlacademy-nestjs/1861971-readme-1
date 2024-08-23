import { Expose } from 'class-transformer';
import { TypePublication } from '@project/shared-types';
import {ApiProperty} from '@nestjs/swagger';

export class DetailsTextRdo {
  @ApiProperty({
    description: 'Unique text id',
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
    description: 'Text announcement publication',
    example: 'Как провел отпуск в горной Архызе'
  })
  @Expose()
  public announcementPublication: string;

  @ApiProperty({
    example: 'Это было не забываемо. Советую'
  })
  @Expose()
  public textPublication: string;

  @ApiProperty({
    example:'горы'
  })
  @Expose()
  public setTag: string;

  @ApiProperty({
    example: 'Vlad'
  })
  @Expose()
  public authorPublication: string;

  @ApiProperty({
    description: 'Your publicashon corresponds to the type of publication',
    example: 'text'
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
