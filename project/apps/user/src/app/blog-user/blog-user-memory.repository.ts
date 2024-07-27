import { Injectable } from '@nestjs/common';

import {CRUDRepository} from '@project/util/util-types';
import {User} from '@project/shared-types';
import { BlogUserEntity } from './blog-user-entity';

@Injectable()
export class BlogUserMemoryRepository implements CRUDRepository<BlogUserEntity, string, User>{
  private repository: Record<string, User> = {};

  public async create(item: BlogUserEntity): Promise<User> {
    const dataUser = { ...item.toObject()};
    this.repository[dataUser.id] = dataUser;

    return dataUser;
  }

  public async findById(id: string): Promise<User> {
    const existUser = this.repository[id]

    if (existUser) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const existUser = Object.values(this.repository)
      .find((userItem) => userItem.email === email);

    if (! existUser) {
      return null;
    }

    return { ...existUser};
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, passwordHash: string): Promise<User> {
    const user = await this.findById(id);
    user.passwordHash = passwordHash;
    return user
  }
}
