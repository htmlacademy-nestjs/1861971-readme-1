import { Injectable } from '@nestjs/common';

import {CRUDRepository} from '@project/util/util-types';
import {
  Photo,
  Parameter
 } from '@project/shared-types';
import { BlogPhotoEntity } from './blog-photo-entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogPhotoRepository implements CRUDRepository<BlogPhotoEntity, number, Photo>{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogPhotoEntity): Promise<Photo> {
    const dataPhoto = { ...item.toObject()};
    const creatNewPhoto = await this.prisma.photo.create({
      data: {
        ...dataPhoto,
        comments: {
          connect: []
        }
      },
      include: {
        comments: true
      }
    })

    return creatNewPhoto;
  }

  public async findById(photoId: number): Promise<Photo | null> {
    const existPhoto = await this.prisma.photo.findUnique({
      where: {
        id: photoId
      },
      include: {
        comments: true
      }
    })

    if (existPhoto) {
      return existPhoto;
    }

    return null;
  }

  public async destroy(photoId: number): Promise<Photo> {
    const informationDeletePhoto = await this.prisma.photo.delete({
      where: {
        id: photoId
      }
    })

    return informationDeletePhoto
  }

  public async update(photoId: number, _passwordHash, data: BlogPhotoEntity): Promise<Photo> {
    const dataPhoto = data.toObject();
    const updateOldPhoto = await this.prisma.photo.update({
      where: {
        id: photoId
      },
      data: {
        ...dataPhoto
      },
      include: {
        comments: true
      }
    })

      if (! updateOldPhoto) {
        return null
      }

      return updateOldPhoto
  }

  public async find(parameter: Parameter): Promise<Photo[] | []> {
    const {count, user, typeSort} = parameter;

    const photoList = this.prisma.photo.findMany({
      take: Number(count)
    })

    return photoList;
  }
/*
  public async addLike(parameter: ParameterLike): Promise<Photo> {
    const {nameUser, idPublication} = parameter;
    let dataPhoto: Photo

    const existUser = this.repositoryLike
      .find((element) => {
        if(element.nameUser === nameUser && element.idPublication === idPublication){
          return element
        }
      });

      if(existUser) {
        dataPhoto = await this.findById(idPublication);
        dataPhoto.countLike = dataPhoto.countLike - defaultValues.one;

        const index = this.repositoryPhoto.findIndex((element) => element.id === idPublication);
        this.repositoryPhoto = [
          ...this.repositoryPhoto.slice(defaultValues.zero, index),
          dataPhoto,
          ...this.repositoryPhoto.slice(index + 1),
        ];

        return dataPhoto
      }

    dataPhoto = await this.findById(idPublication);

    if(! dataPhoto) {
      return null
    }

    const changePhoto = {
      ... dataPhoto,
      countLike: dataPhoto.countLike + defaultValues.one
    }

    const index = this.repositoryPhoto.findIndex((element) => element.id === idPublication);
      this.repositoryPhoto = [
        ...this.repositoryPhoto.slice(defaultValues.zero, index),
        changePhoto,
        ...this.repositoryPhoto.slice(index + 1),
      ];

    this.repositoryLike.push({
      nameUser,
      idPublication
    })

    return changePhoto
  }

  public async addComment(parameter: ParameterComment): Promise<Photo> {
    const {idComment, idPublication} = parameter;

    const dataPhoto = await this.findById(idPublication);

    if(! dataPhoto) {
      return null
    }

    dataPhoto.countComments.push(idComment)

    const changePhoto = {
      ... dataPhoto,
      countComments: dataPhoto.countComments
    }

    const index = this.repositoryPhoto.findIndex((element) => element.id === idPublication);
      this.repositoryPhoto = [
        ...this.repositoryPhoto.slice(defaultValues.zero, index),
        changePhoto,
        ...this.repositoryPhoto.slice(index + 1),
      ];

    return changePhoto
  }

  public async deleteComment(idList: string[]): Promise<boolean> {
    let indicator = false;
    let indexId: number

    idList.forEach((value) => {

      const index = this.repositoryPhoto
      .findIndex(({countComments}) => {
        const element = countComments.find((id) => id === value)
        return element === value
      });

      if(index !== -1) {
      indexId = this.repositoryPhoto[index].countComments
      .findIndex((id) => id === value)
      }

      if(index !== -1) {
        this.repositoryPhoto[index].countComments = [
          ...this.repositoryPhoto[index].countComments.slice(0,indexId),
          ...this.repositoryPhoto[index].countComments.slice(indexId + 1)
        ]

        indicator = true
      }
    })

    return indicator
  }
    */
}
