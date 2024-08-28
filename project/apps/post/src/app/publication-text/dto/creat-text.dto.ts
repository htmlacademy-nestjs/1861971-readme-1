import {ApiProperty} from '@nestjs/swagger';
import {
  IsString,
  Length,
  Validate,
  IsOptional,
  ArrayMaxSize,
  IsEnum
} from 'class-validator';

import {MessageText} from '@project/validation-message';
import {ValidationLengthTag, ValidationGapTag} from '@project/util-core';
import {VideoState} from '@project/shared-types';

const {
  namePublication,
  announcementPublication,
  textPublication,
  setTag,
  state
} = MessageText;

export class CreateTextDto {
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
    description: 'Text of announcement publication',
    minLength: 50,
    maxLength: 255,
    required: true,
    example: 'Я среди гор Домбая в Карачаево-Черкесии. Для любящих активный отдых и пешии прогулки.'
  })
  @IsString({message: `${announcementPublication.stringAnnouncement}`})
  @Length(50, 255, {message: `${announcementPublication.lengthAnnouncement}`})
  public announcementPublication: string;

  @ApiProperty({
    description: 'Text publication',
    minLength: 100,
    maxLength: 1024,
    required: true,
    example: 'Это было не забываемо. Советую.'
  })
  @IsString({message: `${textPublication.stringText}`})
  @Length(50, 255, {message: `${textPublication.lengthText}`})
  public textPublication: string;

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
