import {ApiProperty} from '@nestjs/swagger';
import {Expose, Transform} from 'class-transformer';

export class Quote {
  @ApiProperty({
    description: 'Unique quote id',
    example: 1
  })
  @Expose()
  id: number;

  @ApiProperty({
    example: 'Это было не забываемо. Советую'
  })
  @Expose()
  textQuote: string;

  @ApiProperty({
    example:'прогулка'
  })
  @Expose()
  setTag: string[];

  @ApiProperty({
    example: 'Vlad'
  })
  @Expose()
  authorQuote: string;

  @ApiProperty({
    description: 'Your publicashon corresponds to the type of publication',
    example: 'quote'
  })
  @Expose()
  typePublication: string;

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
  commentCounter: number;

  @ApiProperty({
    example: '2024-08-17 18:06:41.519'
  })
  @Expose()
  dateCreation: Date;

  @ApiProperty({
    example: '2024-08-17 18:06:41.519'
  })
  @Expose()
  datePublication: Date;

  @ApiProperty({
    description: 'State after creation is "Опубликована"',
    example: 'Опубликована'
  })
  @Expose()
  state: string;

  @ApiProperty({
    description: 'If value is an empty string then the value "false" or the information about the original author is preserved',
    example: false
  })
  @Expose()
  originolAuthor: string | boolean;

  @ApiProperty({
    description: 'If value is an empty string then the value "false" or the "Репост" attribute is fixed',
    example: 'Репост'
  })
  @Expose()
  repost: string | boolean;

  @ApiProperty({
    description: 'If value is an empty string then the value "false" or the unique id of the original publication is retained',
    example: 4
  })
  @Expose()
  originolId: string | boolean;
}
