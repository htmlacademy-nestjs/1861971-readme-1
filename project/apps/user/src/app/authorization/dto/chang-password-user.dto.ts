import {ApiProperty} from '@nestjs/swagger';
import {Length} from 'class-validator';

import {MessageRegistration} from '@project/validation-message';

export class ChangPasswordUserDto {
  @ApiProperty({
    description: 'Current password',
    required: true,
    example: 'Volga34'
  })
  @Length(6, 12, {message: MessageRegistration.incorrectPassword})
  public password: string;

  @ApiProperty({
    description: 'New password',
    required: true,
    minLength: 6,
    maxLength: 12,
    example: 'NewJersey'
  })
  @Length(6, 12, {message: MessageRegistration.incorrectNewPassword})
  public newPassword: string
}
