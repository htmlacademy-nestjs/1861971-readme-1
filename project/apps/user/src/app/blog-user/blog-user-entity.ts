import {randomUUID} from 'node:crypto'
import {genSalt, hash, compare} from 'bcrypt'

import {User} from '@project/shared-types'
import {SALT_ROUNDS} from '@project/util/util-types'

export class BlogUserEntity implements User {
  public id: string;
  public email: string;
  public firstName: string;
  private password: string;
  public avatar: string;
  public dataRegistration: string;

  constructor(dataUser: User) {
    this.fillEntity(dataUser);
  }

  public toObject() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      passwordHash: this.password,
      avatar: this.avatar,
      dataRegistration: this.dataRegistration
    };
  }

  public fillEntity(dataUser: User) {
    this.id = randomUUID();
    this.email = dataUser.email;
    this.firstName = dataUser.firstName;
    this.avatar = dataUser.avatar;
    this.dataRegistration = new Date().toISOString();
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.password = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
