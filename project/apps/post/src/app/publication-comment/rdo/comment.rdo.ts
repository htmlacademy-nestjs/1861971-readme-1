import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class CommentRdo {
  @ApiProperty({
    description: 'Unique comment id',
    example: 1
  })
  @Expose()
  id: number;

  @ApiProperty({
    example: 'Good trip it is GOOD !!!'
  })
  @Expose()
  text: string;

  @ApiProperty({
    example: 'Vlad'
  })
  @Expose()
  authorComment: string;

  @ApiProperty({
    example: "2024-08-26 16:22:20.853"
  })
  @Expose()
  dateCreation: string;
}
