import {ApiProperty} from '@nestjs/swagger';

export class CreateQuoteDto {
  @ApiProperty({
    description: 'Quote text',
    minLength: 20,
    maxLength: 300,
    required: true,
    example: 'Это было не забываемо. Советую'
  })
  public textQuote: string;

  @ApiProperty({
    description: 'List of tags for publication. Tage consist of one word.The maximum number of tags for a publication is eight',
    minLength: 3,
    maxLength: 10,
    example: 'прогулка'
  })
  public setTag: string;

  @ApiProperty({
    description: 'Author of the quote',
    minLength: 3,
    maxLength: 50,
    required: true,
    example: 'Vlad'
  })
  public authorQuote: string;
}
