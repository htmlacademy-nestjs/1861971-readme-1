import { Expose } from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class DetailsUserRdo {
  @ApiProperty({
    description: 'Unique user id',
    example: '66aa47a11ee332582a197c8f'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User registration date (ISO format)',
    example: '2024-07-31T14:18:09.541Z'
  })
  @Expose({name: 'createdAt'})
  public dataRegistration: string;
}
