import {ApiProperty} from '@nestjs/swagger';

export class Video {
  @ApiProperty({
    description: 'Unique video id',
    example: 1
  })
  id: number;

  @ApiProperty({
    example: 'Я среди гор'
  })
  namePublication: string;

  @ApiProperty({
    description: 'Video download link',
    example: 'http://month'
  })
  linkVideo: string;

  @ApiProperty({
    example:'горы'
  })
  setTag: string;

  @ApiProperty({
    example: 'Vlad'
  })
  authorPublication: string;

  @ApiProperty({
    description: 'Your publicashon corresponds to the type of publication',
    example: 'video'
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
