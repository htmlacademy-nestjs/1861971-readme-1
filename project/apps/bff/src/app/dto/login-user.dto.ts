import {ApiProperty} from '@nestjs/swagger';
import {
  IsEmail,
  Length
} from 'class-validator';

import {MessageRegistration} from '@project/validation-message';

const {
  incorrectEmail,
  incorrectPassword
} = MessageRegistration

export class LoginUserDto {
  @ApiProperty({
    description: 'Current email',
    required: true,
    example: 'vlad@v.com'
  })
  @IsEmail({}, {message: incorrectEmail})
  public email: string;

  @ApiProperty({
    description: 'Current password',
    required: true,
    example: 'Volga34'
  })
  @Length(6, 12, {message: incorrectPassword})
  public password: string;
}
