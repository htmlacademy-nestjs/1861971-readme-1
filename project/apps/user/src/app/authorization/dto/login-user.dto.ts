import {ApiProperty} from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'Current email',
    required: true,
    example: 'vlad@v.com'
  })
  public email: string;

  @ApiProperty({
    description: 'Current password',
    required: true,
    example: 'Volga34'
  })
  public password: string;
}
