import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    required: true,
    example: 'vlad@v.com'
  })
  public email: string;

  @ApiProperty({
    description: 'User name',
    required: true,
    minLength: 3,
    maxLength: 50,
    example: 'Vlad'
  })
  public firstName: string;

  @ApiProperty({
    description: 'User password',
    required: true,
    minLength: 6,
    maxLength: 12,
    example: 'Volga34'
  })
  public password: string;

  @ApiProperty({
    description: 'Photo for user avatar. Restrictions: no more than 500 kilobytes, jpeg or png format.',
    required: true,
    example: 'Yna.png'
  })
  public avatar: string;
}
