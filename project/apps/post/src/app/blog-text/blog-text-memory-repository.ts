import { Injectable } from '@nestjs/common';

import {CRUDRepository} from '@project/util/util-types';
import {
  Text,
  Parameter,
  defaultValues,
  ParameterLike,
  DataUser,
  ParameterComment
} from '@project/shared-types';
import { BlogTextEntity } from './blog-text-entity';

@Injectable()
export class BlogTextMemoryRepository implements CRUDRepository<BlogTextEntity, string, Text> {
  private repositoryText: Text[] = [];
  private repositoryLike: DataUser[] = [];

  public async create(item: BlogTextEntity): Promise<Text> {
    const dataText = { ...item.toObject()};
    this.repositoryText.push(dataText);

    return dataText
  }

  public async findById(id: string): Promise<Text> {
    const existText = this.repositoryText.find((element) => element.id === id);

    if (existText) {
      return existText
    }
    return null;
  }

  public async destroy(id: string): Promise<string[]> {
    const index = this.repositoryText.findIndex((element) => element.id === id);
    const idList = this.repositoryText[index].countComments;

    this.repositoryText = [
      ...this.repositoryText.slice(0, index),
      ...this.repositoryText.slice(index + 1),
    ];

    return idList
  }

  public async update(_id, _passwordHash, data: Text): Promise<Text> {
    const existText = this.repositoryText
      .find((element) => element.id === data.id);

      if (! existText) {
        return null
      }

      const editedText = {
        ...data,
        dateCreation: existText.dateCreation,
        datePublication: new Date().toISOString(),
        state: existText.state,
        originolAuthor: existText.originolAuthor,
        repost: existText.repost,
        originolId: existText.originolId
      }

      const index = this.repositoryText.findIndex((element) => element.id === data.id);
      this.repositoryText = [
        ...this.repositoryText.slice(0, index),
        editedText,
        ...this.repositoryText.slice(index + 1),
      ];

      return editedText
  }

  public async find(parameter: Parameter): Promise<Text[]> {
    const {count, user} = parameter;

    const textList: Text[] = []
    const limit = count ?? defaultValues.count;
    const nameUser = user ?? false;

    if(nameUser) {
      this.repositoryText.forEach((element) => {
      if(element.authorPublication === user) {
        textList.push(element)
      }
    })}

    if(! nameUser){
      for(const element of this.repositoryText){ textList.push(element); }
      ;}

    textList.slice(defaultValues.zero, Number(limit))

      return textList;
  }

  public async addLike(parameter: ParameterLike): Promise<Text> {
    const {nameUser, idPublication} = parameter;
    let dataText: Text

    const existUser = this.repositoryLike
      .find((element) => {
        if(element.nameUser === nameUser && element.idPublication === idPublication){
          return element
        }
      });

      if(existUser) {
        dataText = await this.findById(idPublication);
        dataText.countLike = dataText.countLike - defaultValues.one;

        const index = this.repositoryText.findIndex((element) => element.id === idPublication);
        this.repositoryText = [
          ...this.repositoryText.slice(defaultValues.zero, index),
          dataText,
          ...this.repositoryText.slice(index + 1),
        ];

        return dataText
      }

    dataText = await this.findById(idPublication);

    if(! dataText) {
      return null
    }

    const changeText = {
      ... dataText,
      countLike: dataText.countLike + defaultValues.one
    }

    const index = this.repositoryText.findIndex((element) => element.id === idPublication);
      this.repositoryText = [
        ...this.repositoryText.slice(defaultValues.zero, index),
        changeText,
        ...this.repositoryText.slice(index + 1),
      ];

    this.repositoryLike.push({
      nameUser,
      idPublication
    })

    return changeText
  }

  public async addComment(parameter: ParameterComment): Promise<Text> {
    const {idComment, idPublication} = parameter;

    const dataText = await this.findById(idPublication);

    if(! dataText) {
      return null
    }

    dataText.countComments.push(idComment)

    const changeText = {
      ... dataText,
      countComments: dataText.countComments
    }

    const index = this.repositoryText.findIndex((element) => element.id === idPublication);
      this.repositoryText = [
        ...this.repositoryText.slice(defaultValues.zero, index),
        changeText,
        ...this.repositoryText.slice(index + 1),
      ];

    return changeText
  }

  public async deleteComment(idList: string[]): Promise<boolean> {
    let indicator = false;
    let indexId: number

    idList.forEach((value) => {

      const index = this.repositoryText
      .findIndex(({countComments}) => {
        const element = countComments.find((id) => id === value)
        return element === value
      });

      if(index !== -1) {
      indexId = this.repositoryText[index].countComments
      .findIndex((id) => id === value)
      }

      if(index !== -1) {
        this.repositoryText[index].countComments = [
          ...this.repositoryText[index].countComments.slice(0,indexId),
          ...this.repositoryText[index].countComments.slice(indexId + 1)
        ]

        indicator = true
      }
    })

    return indicator
  }

  public async findByWord(word: string): Promise<Text[]> {
    const textList: Text[] = [];

    this.repositoryText.forEach((value) => {

      const {namePublication} = value;
      if(namePublication.includes(word)) {
        textList.push(value)
      }
    })

    return textList
  }
}
