import { PipeTransform, Injectable, ConflictException } from '@nestjs/common';

import { UploaderAvatar, UploaderPhoto } from '@project/validation-message';

type File = {
  buffer: Buffer;
  encoding: string;
  fieldname: string;
  mimetype: string;
  originalname: string;
  size: number;
}

const TYPE_AVATAR = ['jpeg', 'png'];
const TYPE_PHOTO =  ['jpg', 'png'];

const MAX_SIZE_FOR_AVATAR = 500000;
const MAX_SIZE_FOR_PHOTO = 1000000;

@Injectable()
export class FileTypeValidatorPipe implements PipeTransform {
  transform(value: File) {

    if(!value){
      return value
    }

    const {fieldname, size} = value;
    const destructuringOriginalname = value.originalname.split('.');
    let isResult = false;

    if (fieldname === 'avatar') {
      TYPE_AVATAR.forEach((type) => {
        if(type === destructuringOriginalname[destructuringOriginalname.length -1]) {
          isResult = true;
          return
        }
      })

      if(isResult && size <= MAX_SIZE_FOR_AVATAR) {
        isResult = true
        return value
      }

      if(!isResult)
      throw new ConflictException(UploaderAvatar.incorrect)
    }

    if (fieldname === 'photo') {
      TYPE_PHOTO.forEach((type) => {
        if(type === destructuringOriginalname[destructuringOriginalname.length -1]) {
          isResult = true;
          return
        }
      })

      if(isResult && size <= MAX_SIZE_FOR_PHOTO) {
        isResult = true
        return value
      }

      if(!isResult)
      throw new ConflictException(UploaderPhoto.incorrect)
    }

    return value;
  }
}
