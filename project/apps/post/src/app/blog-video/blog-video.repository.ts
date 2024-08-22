import { Injectable } from '@nestjs/common';

import { CRUDRepository } from '@project/util/util-types';
import {
  Video,
  Parameter
 } from '@project/shared-types';
import { BlogVideoEntity } from './blog-video-entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogVideoRepository implements CRUDRepository<BlogVideoEntity, number, Video> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogVideoEntity): Promise<Video> {
    const dataVideo = { ...item.toObject()};
    const creatNewVideo = await this.prisma.video.create({
      data: {
        ...dataVideo,
        comments: {
          connect: []
        }
      },
      include: {
        comments: true
      }
    })

    return creatNewVideo;
  }

  public async findById(videoId: number): Promise<Video | null> {
    const existVideo = await this.prisma.video.findUnique({
      where: {
        id: videoId
      },
      include: {
        comments: true
      }
    })

    if (existVideo) {
      return existVideo;
    }

    return null;
  }

  public async destroy(videoId: number): Promise<Video> {
    const informationDeleteVideo = await this.prisma.video.delete({
      where: {
        id: videoId
      }
    })

    return informationDeleteVideo
  }

  public async update(videoId: number, _passwordHash, data: BlogVideoEntity): Promise<Video> {
    const dataViideo = data.toObject();
    const updateOldVideo = await this.prisma.video.update({
      where: {
        id: videoId
      },
      data: {
        ...dataViideo
      },
      include: {
        comments: true
      }
    })

      if (! updateOldVideo) {
        return null
      }

      return updateOldVideo
  }

  public async findByWord(word: string): Promise<Video[] | []> {
    const videosList = await this.prisma.video.findMany({
      where: {
        namePublication: {
          search: word
        },
      },
    })

    return videosList
  }

  public async find(parameter: Parameter): Promise<Video[] | []> {
    const {count, user, typeSort} = parameter;

    const videosList = this.prisma.video.findMany({
      take: Number(count)
    })

      return videosList;
  }

  /*
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
*/
}
