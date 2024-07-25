import { Injectable } from '@nestjs/common'

import {CRUDRepository} from '@project/util/util-types';
import {
  Video,
  Parameter,
  defaultValues,
  ParameterLike,
  ParameterComment,
  DataUser
} from '@project/shared-types';
import { BlogVideoEntity } from './blog-video-entity';

@Injectable()
export class BlogVideoMemoryRepository implements CRUDRepository<BlogVideoEntity, string, Video> {
  private repositoryVideo: Video[] = [];
  private repositoryLike: DataUser[] = [];

  public async create(item: BlogVideoEntity): Promise<Video> {
    const dataVideo = { ...item.toObject()};
    this.repositoryVideo.push(dataVideo);

    return dataVideo;
  }

  public async findById(id: string): Promise<Video> {
    const existVideo = this.repositoryVideo.find((video) => video.id === id);

    if (existVideo) {
      return existVideo;
    }

    return null;
  }

  public async destroy(id: string): Promise<string[]> {
    const index = this.repositoryVideo.findIndex((element) => element.id === id);
    const idList = this.repositoryVideo[index].countComments;

    this.repositoryVideo = [
      ...this.repositoryVideo.slice(defaultValues.zero, index),
      ...this.repositoryVideo.slice(index + 1),
    ];

    return idList
  }

  public async update(_id, _passwordHash, data: Video): Promise<Video> {
    const existVideo = this.repositoryVideo
      .find((element) => element.id === data.id);

      if (! existVideo) {
        return null
      }

      const editedVideo = {
        ...data,
        typePublication: existVideo.typePublication,
        countLike: existVideo.countLike,
        countComments: existVideo.countComments,
        dateCreation: existVideo.dateCreation,
        datePublication: new Date().toISOString(),
        state: existVideo.state,
        originolAuthor: existVideo.originolAuthor,
        repost: existVideo.repost,
        originolId: existVideo.originolId
      }

      const index = this.repositoryVideo.findIndex((element) => element.id === data.id);
      this.repositoryVideo = [
        ...this.repositoryVideo.slice(defaultValues.zero, index),
        editedVideo,
        ...this.repositoryVideo.slice(index + 1),
      ];

      return editedVideo
  }

  public async find(parameter: Parameter): Promise<Video[]> {
    const {count, user} = parameter;

    const videosList: Video[] = []
    const limit = count ?? defaultValues.count;
    const nameUser = user ?? false;

    if(nameUser) {
      this.repositoryVideo.forEach((element) => {
      if(element.authorPublication === user) {
        videosList.push(element)
      }
    })}

    if(! nameUser){
      for(const element of this.repositoryVideo){ videosList.push(element); }
      ;}

    videosList.slice(defaultValues.zero, Number(limit))

      return videosList;
  }

  public async addLike(parameter: ParameterLike): Promise<Video> {
    const {nameUser, idPublication} = parameter;
    let dataVideo: Video

    const existUser = this.repositoryLike
      .find((element) => {
        if(element.nameUser === nameUser && element.idPublication === idPublication){
          return element
        }
      });

      if(existUser) {
        dataVideo = await this.findById(idPublication);
        dataVideo.countLike = dataVideo.countLike - defaultValues.one;

        const index = this.repositoryVideo.findIndex((element) => element.id === idPublication);
        this.repositoryVideo = [
          ...this.repositoryVideo.slice(defaultValues.zero, index),
          dataVideo,
          ...this.repositoryVideo.slice(index + 1),
        ];

        return dataVideo
      }

    dataVideo = await this.findById(idPublication);

    if(! dataVideo) {
      return null
    }

    const changeVideo = {
      ... dataVideo,
      countLike: 1
    }

    const index = this.repositoryVideo.findIndex((element) => element.id === idPublication);
      this.repositoryVideo = [
        ...this.repositoryVideo.slice(defaultValues.zero, index),
        changeVideo,
        ...this.repositoryVideo.slice(index + 1),
      ];

    this.repositoryLike.push({
      nameUser,
      idPublication
    })

    return changeVideo
  }

  public async addComment(parameter: ParameterComment): Promise<Video> {
    const {idComment, idPublication} = parameter;

    const dataVideo = await this.findById(idPublication);

    if(! dataVideo) {
      return null
    }

    dataVideo.countComments.push(idComment)

    const changeVideo = {
      ... dataVideo,
      countComments: dataVideo.countComments
    }

    const index = this.repositoryVideo.findIndex((element) => element.id === idPublication);
      this.repositoryVideo = [
        ...this.repositoryVideo.slice(defaultValues.zero, index),
        changeVideo,
        ...this.repositoryVideo.slice(index + 1),
      ];

    return changeVideo
  }

  public async deleteComment(idList: string[]): Promise<boolean> {
    let indicator = false;
    let indexId: number

    idList.forEach((value) => {

      const index = this.repositoryVideo
      .findIndex(({countComments}) => {
        const element = countComments.find((id) => id === value)
        return element === value
      });

      if(index !== -1) {
      indexId = this.repositoryVideo[index].countComments
      .findIndex((id) => id === value)
      }

      if(index !== -1) {
        this.repositoryVideo[index].countComments = [
          ...this.repositoryVideo[index].countComments.slice(0,indexId),
          ...this.repositoryVideo[index].countComments.slice(indexId + 1)
        ]

        indicator = true
      }
    })

    return indicator
  }

  public async findByWord(word: string): Promise<Video[]> {
    const videosList: Video[] = [];

    this.repositoryVideo.forEach((value) => {

      const {namePublication} = value;
      if(namePublication.includes(word)) {
        videosList.push(value)
      }
    })

    return videosList
  }
}
