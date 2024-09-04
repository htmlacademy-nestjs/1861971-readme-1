import { Injectable } from '@nestjs/common';

import { BlogVideoRepository } from '../blog-video/blog-video.repository';
import { BlogTextRepository } from '../blog-text/blog-text.repository';
import { BlogQuoteRepository } from '../blog-quote/blog-quote.repository';
import { BlogPhotoRepository } from '../blog-photo/blog-photo.repository';
import { BlogLinkRepository } from '../blog-link/blog-link.repository';
import {
  TypePublication,
  Video,
  ParametersList,
  Text,
  Quote,
  Photo,
  Link,
  defaultValues,
  TypeSort
} from '@project/shared-types';

@Injectable()
export class PublicationsListService {
  private readonly limit

  constructor(
    private readonly blogVideoRepository: BlogVideoRepository,
    private readonly blogTextRepository: BlogTextRepository,
    private readonly blogQuoteRepository: BlogQuoteRepository,
    private readonly blogPhotoRepository: BlogPhotoRepository,
    private readonly blogLinkRepository: BlogLinkRepository
  ){
    this.limit = defaultValues.two
  }

  public async index(parameter: ParametersList) {
    const {typePublication = 'All', authPublication = 'All', typeSort = TypeSort.DatePublication, nameTag = null} = parameter;

    let datasList: Video[] | Text[] | Quote[] | Photo[] | Link[] = [];
    const blogList = [
      this.blogVideoRepository,
      this.blogTextRepository,
      this.blogQuoteRepository,
      this.blogPhotoRepository,
      this.blogLinkRepository
    ];

    switch (typePublication) {
      case TypePublication.Video:
        datasList = await this.blogVideoRepository.find({limit: this.limit, authPublication, typeSort, nameTag});
        break;
      case TypePublication.Text:
        datasList = await this.blogTextRepository.find({limit: this.limit, authPublication, typeSort, nameTag});
        break;
      case TypePublication.Quote:
        datasList = await this.blogQuoteRepository.find({limit: this.limit, authPublication, typeSort, nameTag});
        break;
      case TypePublication.Photo:
        datasList = await this.blogPhotoRepository.find({limit: this.limit, authPublication, typeSort, nameTag});
        break;
      case TypePublication.Link:
        datasList = await this.blogLinkRepository.find({limit: this.limit, authPublication, typeSort, nameTag});
        break;
      default:
        for(const element of blogList){
          const data = await element.find({limit: this.limit, authPublication, typeSort, nameTag})
          data.forEach((element) => datasList.push(element))
        }
        break;
    };

    return datasList
  }

  public async indexDraft(author: string) {
    const datasList: Array<Video | Text | Quote | Photo | Link> = [];

    const blogList = [
      this.blogVideoRepository,
      this.blogTextRepository,
      this.blogQuoteRepository,
      this.blogPhotoRepository,
      this.blogLinkRepository
    ];

        for(const element of blogList){
          const data = await element.draftsList({limit: this.limit, author})
          data.forEach((element) => datasList.push(element))
        }

    return datasList
  }
}
