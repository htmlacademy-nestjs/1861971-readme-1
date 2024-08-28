import {ApiProperty} from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Length,
  IsOptional,
  Validate
} from 'class-validator';

import { ValidationPhoto } from '@project/util-core';
import {MessageRegistration} from '@project/validation-message';

const {
  incorrectEmail,
  firstName,
  incorrectPassword,
  incorrectAvatar
} = MessageRegistration

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    required: true,
    example: 'vlad@v.com'
  })
  @IsEmail({}, {message: incorrectEmail})
  public email: string;

  @ApiProperty({
    description: 'User name',
    required: true,
    minLength: 3,
    maxLength: 50,
    example: 'Vlad'
  })
  @IsString({message: firstName.stringFirstName})
  @Length(3, 50, {message: firstName.lengthFirstName})
  public firstName: string;

  @ApiProperty({
    description: 'User password',
    required: true,
    minLength: 6,
    maxLength: 12,
    example: 'Volga34'
  })
  @Length(6, 12, {message: incorrectPassword})
  public password: string;

  @ApiProperty({
    description: 'Photo for user avatar. Restrictions: no more than 500 kilobytes, jpeg or png format.',
    required: true,
    example: 'Yna.png'
  })
  @IsOptional()
  @IsString({message: incorrectAvatar.stringAvatar})
  @Validate(ValidationPhoto, {message: incorrectAvatar.formatsAvatar})
  public avatar: string;
}
