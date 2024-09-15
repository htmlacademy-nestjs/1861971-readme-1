import {genSalt, hash} from 'bcrypt'

import {User} from '@project/shared-types'
import {SALT_ROUNDS} from '@project/util/util-types'

export class BlogUserEntity implements User {
  public email: string;
  public firstName: string;
  public password: string;
  public avatar: string;

  constructor(dataUser: User) {
    this.fillEntity(dataUser);
  }

  public toObject() {
    return {
      email: this.email,
      firstName: this.firstName,
      passwordHash: this.password,
      avatar: this.avatar
    };
  }

  public fillEntity(dataUser: User) {
    this.email = dataUser.email;
    this.firstName = dataUser.firstName;
    this.avatar = dataUser.avatar;
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.password = await hash(password, salt);
    return this;
  }
}
