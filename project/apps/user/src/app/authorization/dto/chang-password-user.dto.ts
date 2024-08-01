import {ApiProperty} from '@nestjs/swagger';

export class ChangPasswordUserDto {
  @ApiProperty({
    description: 'Current password',
    required: true,
    example: 'Volga34'
  })
  public password: string;

  @ApiProperty({
    description: 'New password',
    required: true,
    minLength: 6,
    maxLength: 12,
    example: 'NewJersey'
  })
  public newPassword: string
}
