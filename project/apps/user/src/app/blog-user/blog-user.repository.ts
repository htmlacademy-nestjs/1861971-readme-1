import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {CRUDRepository} from '@project/util/util-types';
import {User} from '@project/shared-types';
import { BlogUserEntity } from './blog-user-entity';
import { BlogUserModel } from './blog-user.model';
import { ValueRegistration } from '../registration/registration.enum';

@Injectable()
export class BlogUserRepository implements CRUDRepository<BlogUserEntity, string, User>{
  constructor(
    @InjectModel(BlogUserModel.name) private readonly blogUserModel: Model<BlogUserModel>) {
  }

  public async create(item: BlogUserEntity): Promise<User> {
    const dataUser = new this.blogUserModel(item);

    return dataUser.save();
  }

  public async findById(id: string): Promise<User> {
    const existUser = this.blogUserModel
    .findById(id)
    .exec();

    if (existUser) {
      return existUser;
    }

    return null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const existUser = this.blogUserModel
    .findOne({email: email})
    .exec();

    if (! existUser) {
      return null;
    }

    return existUser;
  }

  public async destroy(id: string): Promise<void> {
    id
    throw new ConflictException(ValueRegistration.RepositoryMethod);
  }

  public async update(id: string, newPasswordHash: string): Promise<User> {
    const user = this.blogUserModel
    .findByIdAndUpdate(id, {password: newPasswordHash}, {new: true})
    return user
  }
}
