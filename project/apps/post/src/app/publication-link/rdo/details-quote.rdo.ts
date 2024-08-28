import { Expose, Transform } from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class DetailsLinkRdo {
  @ApiProperty({
    description: 'Unique link id',
    example: 1
  })
  @Expose()
  public id: number;

  @ApiProperty({
    example: 'https://www.prisma.io/docs/orm/reference/prisma-client-reference#equals'
  })
  @Expose()
  public link: string;

  @ApiProperty({
    example: 'Информация по Prisma'
  })
  @Expose()
  public description: string;

  @ApiProperty({
    example:'горы'
  })
  @Expose()
  public setTag: string[];

  @ApiProperty({
    example: 'Vlad'
  })
  @Expose()
  public authorLink: string;

  @ApiProperty({
    description: 'Your publicashon corresponds to the type of publication',
    example: 'link'
  })
  @Expose()
  public typePublication?: string;

  @ApiProperty({
    example: 2
  })
  @Expose()
  public countLike?: number;

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
