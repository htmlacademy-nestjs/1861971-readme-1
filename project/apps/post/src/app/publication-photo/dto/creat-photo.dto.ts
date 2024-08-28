import {ApiProperty} from '@nestjs/swagger';
import {
  IsString,
  Validate,
  IsOptional,
  ArrayMaxSize,
  IsEnum
} from 'class-validator';

import { MessagePhoto } from '@project/validation-message';
import {ValidationPhoto, ValidationLengthTag, ValidationGapTag} from '@project/util-core';
import {VideoState} from '@project/shared-types';

const {
  photo,
  setTag,
  state
} = MessagePhoto;

export class CreatePhotoDto {
  @ApiProperty({
    description: 'Maximum photo size: 1 megabyte. Accepted formats: jpg, png',
    required: true,
    example: 'bild.jpg'
  })
  @IsString({message: `${photo.stringPhoto}`})
  @Validate(ValidationPhoto, {
    message: photo.formatsPhoto
  })
  public photo: string;

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
