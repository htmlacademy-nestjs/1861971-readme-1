import {ApiProperty} from '@nestjs/swagger';

export class CreateLinkDto {
  @ApiProperty({
    description: 'Valid URL',
    required:true,
    example: 'https://www.prisma.io/docs/orm/reference/prisma-client-reference#equals'
  })
  public link: string;

  @ApiProperty({
    description: 'Link Description',
    maxLength: 300,
    example: 'Информация по Prisma'
  })
  public description: string;

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
  public authorLink: string;
}
