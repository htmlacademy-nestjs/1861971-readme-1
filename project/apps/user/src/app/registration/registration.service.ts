import {ConflictException, NotFoundException, Injectable } from '@nestjs/common';

import { BlogUserMemoryRepository } from '../blog-user/blog-user-memory.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { ValueRegistration } from './registration.enum';
import { BlogUserEntity } from '../blog-user/blog-user-entity';

@Injectable()
export class RegistrationService {

  constructor(
    private readonly blogUserMemoryRepository: BlogUserMemoryRepository
  ){}

  public async register(dto: CreateUserDto) {

    const existUser = await this.blogUserMemoryRepository
      .findByEmail(dto.email);

    if (existUser) {
      throw new ConflictException(ValueRegistration.UserExists);
    }

    const userEntity = await new BlogUserEntity(dto)
      .setPassword(dto.password)

    return this.blogUserMemoryRepository
      .create(userEntity);
  }

  public async getUser(id: string) {
    const existUser = await this.blogUserMemoryRepository
      .findById(id);

    if (! existUser) {
      throw new NotFoundException(ValueRegistration.UserNotFound);
    }

    return existUser
  }
}
