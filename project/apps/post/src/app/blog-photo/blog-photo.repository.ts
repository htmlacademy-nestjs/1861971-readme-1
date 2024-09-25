import { Injectable } from '@nestjs/common';

import {CRUDRepository} from '@project/util/util-types';
import {
  Photo,
  Parameter,
  VideoState,
  TypeSort
 } from '@project/shared-types';
import { BlogPhotoEntity } from './blog-photo-entity';
import { PrismaService } from '../prisma/prisma.service';
import { ParameterLike, defaultValues } from '@project/shared-types';

let skip = 0;
const SORT = 'desc';

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
      },
      include: {
        comments: true
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
    const {limit, idAuthPublication, typeSort, nameTag} = parameter;

    const photoList = await this.prisma.photo.findMany({
      where: {
        state: {
          contains: VideoState.Published
        },
        idAuthorPhoto: idAuthPublication ? {contains: idAuthPublication} : undefined,
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

    if(typeSort === TypeSort.Like) {
      (await photoList).sort((a, b) => b.countLike.length - a.countLike.length)
    }

    if(typeSort === TypeSort.Discussed) {
      (await photoList).sort((a, b) => b.comments.length - a.comments.length)
    }

    skip += limit;

    return photoList;
  }

  public async draftsList({limit, idAuthor}: {limit: number, idAuthor: string}): Promise<Photo[] | []> {
    const photosList = await this.prisma.photo.findMany({
      where: {
        idAuthorPhoto: {
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

    return photosList
  }

  public async addLike(parameter: ParameterLike): Promise<Photo> {
    const {idUser, idPublication} = parameter;

    const photo = await this.prisma.photo.findFirst({
      where: {
        id: idPublication
      }
      })

      if (! photo) {
        return null
      }

      if(!photo.countLike.includes(idUser)) {
        photo.countLike.push(idUser)
      } else {
        const index = photo.countLike.findIndex((element) => element === idUser)

        photo.countLike = [
          ...photo.countLike.slice(0, index),
          ...photo.countLike.slice(index+1)
        ]
      }

      const updetePhoto = await this.prisma.photo.update({
        where: {
          id: idPublication
        },
        data: {
          countLike: photo.countLike
        },
        include: {
          comments: true
        }
      })

      return updetePhoto
  }

  public async repost(idPublication: string, idUser: string): Promise<Photo | null> {
    let publication = null;
    let idComments = [];

    publication = await this.prisma.photo.findFirst({
      where: {
        idAuthorPhoto: {
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
      idAuthorPhoto: idUser,
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

    publication = await this.prisma.photo.create({
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
