import { Injectable } from '@nestjs/common';

import {CRUDRepository} from '@project/util/util-types';
import {
  Photo,
  Parameter,
  defaultValues,
  ParameterLike,
  DataUser,
  ParameterComment
} from '@project/shared-types';
import { BlogPhotoEntity } from './blog-photo-entity';

@Injectable()
export class BlogPhotoMemoryRepository implements CRUDRepository<BlogPhotoEntity, string, Photo>{
  private repositoryPhoto: Photo[] = [];
  private repositoryLike: DataUser[] = [];

  public async create(item: BlogPhotoEntity): Promise<Photo> {
    const dataPhoto = { ...item.toObject()};
    this.repositoryPhoto.push(dataPhoto);

    return dataPhoto;
  }

  public async findById(id: string): Promise<Photo> {
    const existPhoto = this.repositoryPhoto.find((element) => element.id === id);

    if (existPhoto) {
      return existPhoto;
    }

    return null;
  }

  public async destroy(id: string): Promise<string[]> {
    const index = this.repositoryPhoto.findIndex((element) => element.id === id);
    const idList = this.repositoryPhoto[index].countComments;

    this.repositoryPhoto = [
      ...this.repositoryPhoto.slice(0, index),
      ...this.repositoryPhoto.slice(index + 1),
    ];

    return idList
  }

  public async update(_id, _passwordHash, data: Photo): Promise<Photo> {
    const existPhoto = this.repositoryPhoto
      .find((element) => element.id === data.id);

      if (! existPhoto) {
        return null
      }

      const editedPhoto = {
        ...data,
        dateCreation: existPhoto.dateCreation,
        datePublication: new Date().toISOString(),
        state: existPhoto.state,
        originolAuthor: existPhoto.originolAuthor,
        repost: existPhoto.repost,
        originolId: existPhoto.originolId
      }

      const index = this.repositoryPhoto.findIndex((element) => element.id === data.id);
      this.repositoryPhoto = [
        ...this.repositoryPhoto.slice(0, index),
        editedPhoto,
        ...this.repositoryPhoto.slice(index + 1),
      ];

      return editedPhoto
  }

  public async find(parameter: Parameter): Promise<Photo[]> {
    const {count, user} = parameter;

    const photoList: Photo[] = []
    const limit = count ?? defaultValues.count;
    const nameUser = user ?? false;

    if(nameUser) {
      this.repositoryPhoto.forEach((element) => {
      if(element.authorPhoto === user) {
        photoList.push(element)
      }
    })}

    if(! nameUser){
      for(const element of this.repositoryPhoto){ photoList.push(element); }
    }

    photoList.slice(defaultValues.zero, Number(limit))

    return photoList;
  }

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
}
