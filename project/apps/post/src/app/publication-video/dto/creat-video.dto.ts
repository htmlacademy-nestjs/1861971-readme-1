import {ApiProperty} from '@nestjs/swagger';

export class CreateVideoDto {
  @ApiProperty({
    description: 'Title Publication',
    minLength: 20,
    maxLength: 50,
    required: true,
    example: 'Я среди гор Домбая в Карачаево-Черкесии'
  })
  public namePublication: string;

  @ApiProperty({
    description: 'A valid link to the page with the video on YouTube',
    required: true,
    example: 'https://www.youtube.com/watch?v=VvulHi6Lw9c'
  })
  public linkVideo: string;

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
