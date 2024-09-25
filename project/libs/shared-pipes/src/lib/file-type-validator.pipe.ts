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
const TYPE_PHOTO =  ['jpg', 'png']

@Injectable()
export class FileTypeValidatorPipe implements PipeTransform {
  transform(value: File) {

    const {fieldname} = value;
    const destructuringOriginalname = value.originalname.split('.');
    let isResult = false;

    if (fieldname === 'avatar') {
      TYPE_AVATAR.forEach((type) => {
        if(type === destructuringOriginalname[destructuringOriginalname.length -1]) {
          isResult = true;
          return
        }
      })
      if(!isResult)
      throw new ConflictException(UploaderAvatar.incorrectType)
    }

    if (fieldname === 'photo') {
      TYPE_PHOTO.forEach((type) => {
        if(type === destructuringOriginalname[destructuringOriginalname.length -1]) {
          isResult = true;
          return
        }
      })
      if(!isResult)
      throw new ConflictException(UploaderPhoto.incorrectType)
    }

    return value;
  }
}
