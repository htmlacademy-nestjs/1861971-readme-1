import { Injectable } from '@nestjs/common';

import { CRUDRepository } from '@project/util/util-types';
import {
  Video,
  Parameter,
  VideoState,
  TypeSort
 } from '@project/shared-types';
import { BlogVideoEntity } from './blog-video-entity';
import { PrismaService } from '../prisma/prisma.service';
import { defaultValues, ParameterLike } from '@project/shared-types';

let skip = 0;
const SORT = 'desc';

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
      },
      include: {
        comments: true
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
      take: defaultValues.countSearch,
      include: {
        comments: true
      }
    })

    return videosList
  }

  public async find(parameter: Parameter): Promise<Video[] | []> {
    const {limit, idAuthPublication, typeSort, nameTag} = parameter;

    const videosList = await this.prisma.video.findMany({
      where: {
        state: {
          contains: VideoState.Published
        },
        idAuthorPublication: idAuthPublication ? {contains: idAuthPublication} : undefined,
        setTag: nameTag ? {has: nameTag} : undefined
      },
      orderBy: {
        datePublication: typeSort === TypeSort.DatePublication ? SORT : undefined,
        countLike: typeSort === TypeSort.Like ? SORT : undefined,
        comments: typeSort === TypeSort.Discussed ? {_count: SORT} : undefined
      },
      include: {
        comments: true
      },
      skip: skip,
      take: limit,
    })

    skip += limit;

    return videosList
  }

  public async draftsList({limit, idAuthor}: {limit: number, idAuthor: string}): Promise<Video[] | []> {
    const videosList = await this.prisma.video.findMany({
      where: {
        idAuthorPublication: {
          contains: idAuthor
        },
        state: {
          contains: VideoState.Draft
        }
      },
      include: {
        comments: true
      },
      orderBy: [
        {
          datePublication: 'desc'
        }
      ],
      skip: skip,
      take: limit,
    })

    skip += limit;

    return videosList
  }

  public async addLike(parameter: ParameterLike): Promise<Video> {
    const {idUser, idPublication} = parameter;

    const video = await this.prisma.video.findFirst({
      where: {
        id: idPublication
      }
      })

      if (! video) {
        return null
      }

      if(!video.countLike.includes(idUser)) {
        video.countLike.push(idUser)
      } else {
        const index = video.countLike.findIndex((element) => element === idUser)

        video.countLike = [
          ...video.countLike.slice(0, index),
          ...video.countLike.slice(index+1)
        ]
      }

      const updeteVideo = await this.prisma.video.update({
        where: {
          id: idPublication
        },
        data: {
          countLike: video.countLike
        },
        include: {
          comments: true
        }
      })

      return updeteVideo
  }

  public async repost(idPublication: string, idUser: string): Promise<Video | null> {
    let publication = null;
    let idComments = [];

    publication = await this.prisma.video.findFirst({
      where: {
        idAuthorPublication: {
          search: idUser
        },
        originolId: {
          search: idPublication
        }
      },
      include: {
        comments: true
      }
    })

    if(publication){
      return publication
    }

    publication = await this.findById(Number(idPublication))

    if(!publication) {
      return publication
    }

    const newPublication = {
      ...publication,
      idAuthorPublication: idUser,
      dateCreation: publication.datePublication,
      originolAuthor: publication.idAuthorPublication,
      repost: defaultValues.repost,
      originolId: String(publication.id)
    }

    delete newPublication.id

    if(newPublication.comments.length !== 0) {
      newPublication.comments.forEach(({id}) => {
        idComments.push({id})
      });
    }else{
      idComments = newPublication.comments
    }

    publication = await this.prisma.video.create({
      data: {
        ...newPublication,
        comments: {
        connect: idComments
      }
    },
    include: {
      comments: true
    }
    })

    return publication
  }
}
