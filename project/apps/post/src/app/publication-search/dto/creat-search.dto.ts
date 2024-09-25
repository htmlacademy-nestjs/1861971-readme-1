import {IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';


import { MessageSearch } from '@project/validation-message';

const {stringSearch} = MessageSearch

export class CreateSearchDto {
  @ApiProperty({
    description: 'Enter a random publication title',
    required: true,
    example: 'Земля - это планета, которую населяют люди.'
  })
  @IsString({message: stringSearch})
  public titlePublication: string;
}
