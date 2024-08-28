import {plainToInstance, ClassConstructor} from 'class-transformer';
import {compare, genSalt, hash} from 'bcrypt';
import {ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

import {SALT_ROUNDS} from '@project/util/util-types'
import {
  defaultValues,
  Video,
  Text,
  Quote,
  Photo,
  Link
} from '@project/shared-types';

const LINE = 'www.youtube.com';
const MIN_LENGTH_TAG = 3;
const MAX_LENGTH_TAG = 10;
const formatsList = ['jpg', 'png', 'jpeg']

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

@ValidatorConstraint({ name: 'linkVideo', async: false })
export class ValidationLinkVideo implements ValidatorConstraintInterface {
  validate(text: string) {
    const elementsText = text.split('/');
    const resultCheck = elementsText.includes(LINE);
    return resultCheck
  }
}
@ValidatorConstraint({ name: 'setTag', async: false })
export class ValidationLengthTag implements ValidatorConstraintInterface {
  validate(tagsList: string[]) {
    let value = true
    tagsList.forEach((item: string) => {
      const itemLength = item.length;
      if(!(itemLength >= MIN_LENGTH_TAG && itemLength <= MAX_LENGTH_TAG)) {
        value = false
        return;
      }
    })
  return value
  }
}

@ValidatorConstraint({ name: 'linkVideo', async: false })
export class ValidationGapTag implements ValidatorConstraintInterface {
  validate(tagsList: string[]) {
    let value = true;
    tagsList.forEach((item: string) => {
      const itemLength = item.split(' ').length;
      if(itemLength >= defaultValues.two) {
        value = false
        return;
      }
    })
    return value
  }
}

@ValidatorConstraint({ name: 'photo', async: false })
export class ValidationPhoto implements ValidatorConstraintInterface {
  validate(photo: string) {
    let value = false;
    const valuesList: string[] = photo.split('.')
    const nameFormat = valuesList[valuesList.length -1]

    formatsList.forEach((item) => {
      if(item === nameFormat) {
        value = true;
        return
      }
    })

    return value
  }
}

export const castingToLowercase = <T>(dto: T): T => {
  const newTagsList: string[] = [];

  const {setTag} = dto as Video | Text | Quote | Photo | Link
  setTag?.forEach((item) => {
    newTagsList.push(item.toLowerCase())
  })

  const newDto = {
    ...dto,
    setTag: newTagsList
  }

  return newDto
}

export const removDuplicates = <T>(dto: T): T => {
  const {setTag} = dto as Video | Text | Quote | Photo | Link;
  let newTagsList: string[] = setTag as string[];
  let indexTagsList: number[] = [];

  newTagsList.forEach((item, indexItem) => {
    for(const word of setTag as string[]) {
      if(word === item) {
        indexTagsList.push(indexItem)
      }
    }

    if(indexTagsList.length >= defaultValues.two) {
    const [index] = indexTagsList
    newTagsList = [
      ...newTagsList.slice(0, index),
      ...newTagsList.slice(index + 1),
    ]
    }
    indexTagsList = []
  })

  const newDto = {
    ...dto,
    setTag: newTagsList
  }

  return newDto
}
