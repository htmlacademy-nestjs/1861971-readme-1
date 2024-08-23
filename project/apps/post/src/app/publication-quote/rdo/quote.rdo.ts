import {ApiProperty} from '@nestjs/swagger';

export class Quote {
  @ApiProperty({
    description: 'Unique quote id',
    example: 1
  })
  id: number;

  @ApiProperty({
    example: 'Это было не забываемо. Советую'
  })
  textQuote: string;

  @ApiProperty({
    example:'прогулка'
  })
  setTag: string;

  @ApiProperty({
    example: 'Vlad'
  })
  authorQuote: string;

  @ApiProperty({
    description: 'Your publicashon corresponds to the type of publication',
    example: 'quote'
  })
  typePublication: string;

  @ApiProperty({
    example: 2
  })
  countLike: number;

  @ApiProperty({
    example: 3
  })
  comments: number;

  @ApiProperty({
    example: '2024-08-17 18:06:41.519'
  })
  dateCreation: Date;

  @ApiProperty({
    example: '2024-08-17 18:06:41.519'
  })
  datePublication: Date;

  @ApiProperty({
    description: 'State after creation is "Опубликована"',
    example: 'Опубликована'
  })
  state: string;

  @ApiProperty({
    description: 'If value is an empty string then the value "false" or the information about the original author is preserved',
    example: false
  })
  originolAuthor: string | boolean;

  @ApiProperty({
    description: 'If value is an empty string then the value "false" or the "Репост" attribute is fixed',
    example: 'Репост'
  })
  repost: string | boolean;

  @ApiProperty({
    description: 'If value is an empty string then the value "false" or the unique id of the original publication is retained',
    example: 4
  })
  originolId: string | boolean;
}
