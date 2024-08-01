import {plainToInstance, ClassConstructor} from 'class-transformer';
import {compare, genSalt, hash} from 'bcrypt'

import {SALT_ROUNDS} from '@project/util/util-types'

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export async function comparePassword (password: string, passwordHash: string): Promise<boolean> {
  return compare(password, passwordHash);
}

export async function setPassword(password: string): Promise<string> {
  const salt = await genSalt(SALT_ROUNDS);
  const passwordHash = await hash(password, salt);
  return passwordHash
}

export const getMongoURI = (
  username: string,
  password: string,
  host: string,
  port: string
): string => `mongodb://${username}:${password}@${host}:${port}/`;
