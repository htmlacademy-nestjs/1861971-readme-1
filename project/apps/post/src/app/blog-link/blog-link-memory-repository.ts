import { Injectable } from '@nestjs/common';

import {CRUDRepository} from '@project/util/util-types';
import {
  Link,
  Parameter,
  defaultValues,
  ParameterLike,
  DataUser,
  ParameterComment
} from '@project/shared-types';
import { BlogLinkEntity } from './blog-photo-entity';

@Injectable()
export class BlogLinkMemoryRepository implements CRUDRepository<BlogLinkEntity, string, Link> {
  private repositoryLink: Link[] = [];
  private repositoryLike: DataUser[] = [];

  public async create(item: BlogLinkEntity): Promise<Link> {
    const dataLink = { ...item.toObject()};
    this.repositoryLink.push(dataLink);

    return dataLink;
  }

  public async findById(id: string): Promise<Link> {
    const existLink = this.repositoryLink.find((element) => element.id === id);

    if (existLink) {
      return existLink;
    }

    return null;
  }

  public async destroy(id: string): Promise<string[]> {
    const index = this.repositoryLink.findIndex((element) => element.id === id);
    const idList = this.repositoryLink[index].countComments;

    this.repositoryLink = [
      ...this.repositoryLink.slice(0, index),
      ...this.repositoryLink.slice(index + 1),
    ];

    return idList
  }

  public async update(_id, _passwordHash, data: Link): Promise<Link> {
    const existLink = this.repositoryLink
      .find((element) => element.id === data.id);

      if (! existLink) {
        return null
      }

      const editedLink = {
        ...data,
        dateCreation: existLink.dateCreation,
        datePublication: new Date().toISOString(),
        state: existLink.state,
        originolAuthor: existLink.originolAuthor,
        repost: existLink.repost,
        originolId: existLink.originolId
      }

      const index = this.repositoryLink.findIndex((element) => element.id === data.id);
      this.repositoryLink = [
        ...this.repositoryLink.slice(0, index),
        editedLink,
        ...this.repositoryLink.slice(index + 1),
      ];

      return editedLink
  }

  public async find(parameter: Parameter): Promise<Link[]> {
    const {count, user} = parameter;

    const linkList: Link[] = []
    const limit = count ?? defaultValues.count;
    const nameUser = user ?? false;

    if(nameUser) {
      this.repositoryLink.forEach((element) => {
      if(element.authorLink === user) {
        linkList.push(element)
      }
    })}

    if(! nameUser){
      for(const element of this.repositoryLink){ linkList.push(element); }
    }

    linkList.slice(defaultValues.zero, Number(limit))

    return linkList;
  }

  public async addLike(parameter: ParameterLike): Promise<Link> {
    const {nameUser, idPublication} = parameter;
    let dataLink: Link

    const existUser = this.repositoryLike
      .find((element) => {
        if(element.nameUser === nameUser && element.idPublication === idPublication){
          return element
        }
      });

      if(existUser) {
        dataLink = await this.findById(idPublication);
        dataLink.countLike = dataLink.countLike - defaultValues.one;

        const index = this.repositoryLink.findIndex((element) => element.id === idPublication);
        this.repositoryLink = [
          ...this.repositoryLink.slice(defaultValues.zero, index),
          dataLink,
          ...this.repositoryLink.slice(index + 1),
        ];

        return dataLink
      }

    dataLink = await this.findById(idPublication);

    if(! dataLink) {
      return null
    }

    const changeLink = {
      ... dataLink,
      countLike: dataLink.countLike + defaultValues.one
    }

    const index = this.repositoryLink.findIndex((element) => element.id === idPublication);
      this.repositoryLink = [
        ...this.repositoryLink.slice(defaultValues.zero, index),
        changeLink,
        ...this.repositoryLink.slice(index + 1),
      ];

    this.repositoryLike.push({
      nameUser,
      idPublication
    })

    return changeLink
  }

  public async addComment(parameter: ParameterComment): Promise<Link> {
    const {idComment, idPublication} = parameter;

    const dataLink = await this.findById(idPublication);

    if(! dataLink) {
      return null
    }

    dataLink.countComments.push(idComment)

    const changeLink = {
      ... dataLink,
      countComments: dataLink.countComments
    }

    const index = this.repositoryLink.findIndex((element) => element.id === idPublication);
      this.repositoryLink = [
        ...this.repositoryLink.slice(defaultValues.zero, index),
        changeLink,
        ...this.repositoryLink.slice(index + 1),
      ];

    return changeLink
  }

  public async deleteComment(idList: string[]): Promise<boolean> {
    let indicator = false;
    let indexId: number

    idList.forEach((value) => {

      const index = this.repositoryLink
      .findIndex(({countComments}) => {
        const element = countComments.find((id) => id === value)
        return element === value
      });

      if(index !== -1) {
      indexId = this.repositoryLink[index].countComments
      .findIndex((id) => id === value)
      }

      if(index !== -1) {
        this.repositoryLink[index].countComments = [
          ...this.repositoryLink[index].countComments.slice(0,indexId),
          ...this.repositoryLink[index].countComments.slice(indexId + 1)
        ]

        indicator = true
      }
    })

    return indicator
  }
}
