import {ApiProperty} from '@nestjs/swagger';
import {
  IsString,
  Length,
  IsOptional,
  IsNumber
} from 'class-validator';

import { MessageComment } from '@project/validation-message';

const {
  text,
  idVideo,
  idText,
  idQuote,
  idPhoto,
  idLink
} = MessageComment;

export class CreateCommentDto {
  @ApiProperty({
    description: 'Text comment',
    required: true,
    minLength: 10,
    maxLength: 300,
    example: 'Good trip in Australia'
  })
  @IsString({message: text.stringComment})
  @Length(10, 300, {message: text.lengthComment})
  public text: string;

  @ApiProperty({
    description: 'idVideo of the publication for which the comment is being created.',
    required: true,
    example: 4
  })
  @IsOptional()
  @IsNumber({}, {message: idVideo})
  public idVideo?: number;

  @ApiProperty({
    description: 'idText of the publication for which the comment is being created.',
    required: true,
    example: 1
  })
  @IsOptional()
  @IsNumber({}, {message: idText})
  public idText?: number;

  @ApiProperty({
    description: 'idQuote of the publication for which the comment is being created.',
    required: true,
    example: 1
  })
  @IsOptional()
  @IsNumber({}, {message: idQuote})
  public idQuote?: number;

  @ApiProperty({
    description: 'idPhoto of the publication for which the comment is being created.',
    required: true,
    example: 1
  })
  @IsOptional()
  @IsNumber({}, {message: idPhoto})
  public idPhoto?: number;

  @ApiProperty({
    description: 'idLink of the publication for which the comment is being created.',
    required: true,
    example: 1
  })
  @IsOptional()
  @IsNumber({}, {message: idLink})
  public idLink?: number;
}
