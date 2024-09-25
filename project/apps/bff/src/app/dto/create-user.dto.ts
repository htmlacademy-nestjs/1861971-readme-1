import {ApiProperty} from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Length,
  IsOptional,
  Validate
} from 'class-validator';

import { ValidationIdPhoto } from '@project/util-core';
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
    description: 'Indicate avatar ID',
    required: true,
    example: '5643drs78op'
  })
  @IsOptional()
  @IsString({message: incorrectAvatar.stringAvatar})
  @Validate(ValidationIdPhoto, {message: incorrectAvatar.formatsAvatar})
  public avatar: string;
}
