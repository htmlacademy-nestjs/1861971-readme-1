import {ApiProperty} from '@nestjs/swagger';
import {
  IsString,
  Length,
  Validate,
  IsOptional,
  ArrayMaxSize,
  IsEnum
} from 'class-validator';

import {MessageVideo} from '@project/validation-message';
import {ValidationLinkVideo, ValidationLengthTag, ValidationGapTag} from '@project/util-core';
import {VideoState} from '@project/shared-types';

const {
  namePublication,
  linkVideo,
  setTag,
  state
} = MessageVideo;

export class CreateVideoDto {
  @ApiProperty({
    description: 'Title Publication',
    minLength: 20,
    maxLength: 50,
    required: true,
    example: 'Я среди гор Домбая в Карачаево-Черкесии'
  })
  @IsString({message: `${namePublication.stringPublication}`})
  @Length(20, 50, {message: `${namePublication.lengthPublication}`})
  public namePublication: string;

  @ApiProperty({
    description: 'A valid link to the page with the video on YouTube',
    required: true,
    example: 'https://www.youtube.com/watch?v=VvulHi6Lw9c'
  })
  @Validate(ValidationLinkVideo, {
    message: linkVideo,
  })
  public linkVideo: string;

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
