import { Expose } from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({
    description: 'Unique user id',
    example: '66aa47a11ee332582a197c8f'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Unique user email',
    example: 'vlad@v.com'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Vlad'
  })
  @Expose()
  public firstName: string;

  @ApiProperty({
    description: 'Photo for user avatar',
    example: 'vlad.png'
  })
  @Expose()
  public avatar: string;
}
