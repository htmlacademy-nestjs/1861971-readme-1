import {ApiProperty} from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Text comment',
    minLength: 10,
    maxLength: 300,
    example: 'Good trip in Australia'
  })
  public text: string;

  @ApiProperty({
    description: 'Author of the c',
    required: true,
    example: 'Vlad'
  })
  public authorComment: string;

  @ApiProperty({
    description: 'idVideo of the publication for which the comment is being created.',
    required: true,
    example: 4
  })
  public idVideo?: number;

  @ApiProperty({
    description: 'idText of the publication for which the comment is being created.',
    required: true,
    example: 1
  })
  public idText?: number;

  @ApiProperty({
    description: 'idQuote of the publication for which the comment is being created.',
    required: true,
    example: 1
  })
  public idQuote?: number;

  @ApiProperty({
    description: 'idPhoto of the publication for which the comment is being created.',
    required: true,
    example: 1
  })
  public idPhoto?: number;

  @ApiProperty({
    description: 'idLink of the publication for which the comment is being created.',
    required: true,
    example: 1
  })
  public idLink?: number;
}
