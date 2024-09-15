import {ApiProperty} from '@nestjs/swagger';
import {
  IsString,
  IsEnum
} from 'class-validator';

import { TypeSort } from "./type-sort.enum"
import { TypePublication } from "./type-publication.enum"
import {MessageList} from '@project/validation-message';

export class ParametersList  {
  @ApiProperty({
    description: 'Name of the author of the publication',
    example: 'Alex'
  })
  @IsString({message: MessageList.incorrectAuthPublication})
  public idAuthPublication?: string;

  @ApiProperty({
    description: 'Sorting type: "datePublication", "like", "discussed"',
    example: 'like'
  })
  @IsEnum(TypeSort,{message: MessageList.incorrectTypeSort})
  public typeSort?: TypeSort;

  @ApiProperty({
    description: 'Publication types: "video", "text", "quote", "photo", "link", "all"',
    example: 'photo'
  })
  @IsEnum(TypePublication,{message: MessageList.incorrectTypePublication})
  public typePublication?: TypePublication;

  @ApiProperty({
    description: 'Tage consist of one word',
    example: 'отдых'
  })
  @IsString({message: MessageList.incorrectNameTag})
  nameTag?: string
}
