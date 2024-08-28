import {ApiProperty} from '@nestjs/swagger';
import {
  IsString,
  Length,
  Validate,
  IsOptional,
  ArrayMaxSize,
  IsEnum
} from 'class-validator';

import {MessageQuote} from '@project/validation-message';
import {ValidationLengthTag, ValidationGapTag} from '@project/util-core';
import {VideoState} from '@project/shared-types';

const {
  textQuote,
  setTag,
  state
} = MessageQuote;

export class CreateQuoteDto {
  @ApiProperty({
    description: 'Quote text',
    minLength: 20,
    maxLength: 300,
    required: true,
    example: 'Это было не забываемо. Советую'
  })
  @IsString({message: `${textQuote.stringQuote}`})
  @Length(20, 300, {message: `${textQuote.lengthQuote}`})
  public textQuote: string;

  @ApiProperty({
    description: 'List of tags for publication. Tage consist of one word.The maximum number of tags for a publication is eight',
    minLength: 3,
    maxLength: 10,
    example: 'прогулка'
  })
  @IsOptional()
  @ArrayMaxSize(8, {message: setTag.lengthArrayWithTags})
  @Validate(ValidationGapTag, {
    message: setTag.gapTag,
  })
  @Validate(ValidationLengthTag, {
    message: setTag.lengthTag,
  })
  public setTag: string[];

  @ApiProperty({
    description: 'A publication can be in one of two states',
    enum: VideoState,
    required: true,
    example: 'Черновик'
  })
  @IsEnum(VideoState, {message: state})
  public state: VideoState;
}
