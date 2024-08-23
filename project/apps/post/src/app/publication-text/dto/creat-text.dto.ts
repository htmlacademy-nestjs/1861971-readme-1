import {ApiProperty} from '@nestjs/swagger';

export class CreateTextDto {
  @ApiProperty({
    description: 'Title Publication',
    minLength: 20,
    maxLength: 50,
    required: true,
    example: 'Я среди гор Домбая в Карачаево-Черкесии'
  })
  public namePublication: string;

  @ApiProperty({
    description: 'Text of announcement publication',
    minLength: 50,
    maxLength: 255,
    required: true,
    example: 'Я среди гор Домбая в Карачаево-Черкесии. Для любящих активный отдых и пешии прогулки.'
  })
  public announcementPublication: string;

  @ApiProperty({
    description: 'Text publication',
    minLength: 100,
    maxLength: 1024,
    required: true,
    example: 'Это было не забываемо. Советую.'
  })
  public textPublication: string;

  @ApiProperty({
    description: 'List of tags for publication. Tage consist of one word.The maximum number of tags for a publication is eight',
    minLength: 3,
    maxLength: 10,
    example: 'прогулка'
  })
  public setTag: string;

  @ApiProperty({
    description: 'Author of the publication',
    required: true,
    example: 'Vlad'
  })
  public authorPublication: string;
}
