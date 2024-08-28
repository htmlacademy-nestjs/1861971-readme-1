import {
  Injectable,
  NotFoundException,
  ConflictException
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';

import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { LoginUserDto } from './dto/login-user.dto';
import { ValueRegistration } from '../registration/registration.enum';
import {comparePassword, setPassword} from '@project/util-core';
import { ChangPasswordUserDto } from './dto/chang-password-user.dto';
import { TokenPayload } from '@project/shared-types';

@Injectable()
export class AuthorizationService {

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService
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

    const payload: TokenPayload = {
      id: existUser.id,
      email: existUser.email,
      firstName: existUser.firstName,
      avatar: existUser.avatar
    };

    const accessToken = {
      accessToken: await this.jwtService.signAsync(payload)
    }

    return accessToken;
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
