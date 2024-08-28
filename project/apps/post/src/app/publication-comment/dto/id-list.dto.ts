import {IsNumber} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

import { MessageComment } from '@project/validation-message';

const {idPost} = MessageComment

export class Publication {
  @ApiProperty({
    description: 'Unique "video","text","quote","photo","link" publications id which comment or comments refer to',
    required: true,
    example: '{idPost: 3}'
  })
  @IsNumber({}, {message: idPost})
  public idPost: number;
}
