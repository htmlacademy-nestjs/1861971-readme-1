import {ApiProperty} from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  IsUrl,
  Validate,
  IsOptional,
  ArrayMaxSize,
  IsEnum
} from 'class-validator';

import {MessageLink} from '@project/validation-message';
import {ValidationLengthTag, ValidationGapTag} from '@project/util-core';
import {VideoState} from '@project/shared-types';

const {
  link,
  description,
  setTag,
  state
} = MessageLink;

export class CreateLinkDto {
  @ApiProperty({
    description: 'Valid URL',
    required:true,
    example: 'https://www.prisma.io/docs/orm/reference/prisma-client-reference#equals'
  })
  @IsUrl({}, {message: link})
  public link: string;

  @ApiProperty({
    description: 'Link Description',
    maxLength: 300,
    example: 'Информация по Prisma'
  })
  @IsOptional()
  @IsString({message: description.stringLink})
  @MaxLength(300, {message: description.lengthLink})
  public description: string;

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
