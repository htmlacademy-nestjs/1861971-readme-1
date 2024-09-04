import {ApiProperty} from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsNumber
} from 'class-validator';

import {MessageLike} from '@project/validation-message';
import { TypePublication } from "@project/shared-types";

const {
  incorrectIdUser,
  incorrectTypePublication,
  incorrectIdPublication
} = MessageLike

export class LikeDto {
  @ApiProperty({
    description: 'Unique user id',
    required: true,
    example: '5tr67kkl'
  })
  @IsString({message: incorrectIdUser})
  public idUser: string;

  @ApiProperty({
    description: 'Specify one of the following types: "video", "text", "photo", "quote", "link"',
    required: true,
    example: 'text'
  })
  @IsEnum(TypePublication, {message: incorrectTypePublication})
  public typePublication?: TypePublication;

  @ApiProperty({
    description: 'Unique publication id',
    required: true,
    example: 2
  })
  @IsNumber({}, {message: incorrectIdPublication})
  public idPublication: number;
}
