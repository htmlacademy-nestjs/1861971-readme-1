import {IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';


import { MessageSearch } from '@project/validation-message';

const {stringSearch} = MessageSearch

export class CreateSearchDto {
  @ApiProperty({
    description: 'Enter a random word',
    required: true,
    example: 'Планета'
  })
  @IsString({message: stringSearch})
  public word: string;
}
