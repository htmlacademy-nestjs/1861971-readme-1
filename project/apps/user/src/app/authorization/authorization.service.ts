import {
  Injectable,
  NotFoundException,
  ConflictException
} from '@nestjs/common';

import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { LoginUserDto } from './dto/login-user.dto';
import { ValueRegistration } from '../registration/registration.enum';
import {comparePassword, setPassword} from '@project/util-core';
import { ChangPasswordUserDto } from './dto/chang-password-user.dto';

@Injectable()
export class AuthorizationService {

  constructor(
    private readonly blogUserRepository: BlogUserRepository
  ){}

  public async verify(dto: LoginUserDto) {
    const existUser = await this.blogUserRepository
      .findByEmail(dto.email);

    if(! existUser) {
      throw new NotFoundException(ValueRegistration.UserNotFound);
    }

    const isPassword = await comparePassword(dto.password, existUser.password)

    if(! isPassword) {
      throw new ConflictException(ValueRegistration.UserPasswordWrong);
    }

    return existUser;
  }

  public async update(id: string, dto: ChangPasswordUserDto) {
    const existUser = await this.blogUserRepository
      .findById(id);

    if(! existUser) {
      throw new NotFoundException(ValueRegistration.UserNotFound);
    }

    const isPassword = await comparePassword(dto.password, existUser.password)

    if(! isPassword) {
      throw new ConflictException(ValueRegistration.UserPasswordWrong);
    }

    const newPasswordHash = await setPassword(dto.newPassword);

    const user = await this.blogUserRepository
      .update(id, newPasswordHash)

    return user
  }
}
