import {ApiProperty} from '@nestjs/swagger';

export class CreatePhotoDto {
  @ApiProperty({
    description: 'Maximum photo size: 1 megabyte. Accepted formats: jpg, png',
    required: true,
    example: 'bild.jpg'
  })
  public photo: string;

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
  public authorPhoto: string;
}
