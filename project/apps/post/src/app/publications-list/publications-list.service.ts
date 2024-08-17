import { Injectable } from '@nestjs/common';

import { BlogVideoRepository } from '../blog-video/blog-video.repository';
import { BlogTextRepository } from '../blog-text/blog-text.repository';
import { BlogQuoteMemoryRepository } from '../blog-quote/blog-quote-memory-repository';
import { BlogPhotoMemoryRepository } from '../blog-photo/blog-photo-memory-repository';
import { BlogLinkMemoryRepository } from '../blog-link/blog-link-memory-repository';
import {
  TypePublication,
  Video,
  ParametersList,
  Text,
  Quote,
  Photo,
  Link,

} from '@project/shared-types';

@Injectable()
export class PublicationsListService {
  constructor(
    private readonly blogVideoRepository: BlogVideoRepository,
    private readonly blogTextRepository: BlogTextRepository,
    private readonly blogQuoteMemoryRepository: BlogQuoteMemoryRepository,
    private readonly blogPhotoMemoryRepository: BlogPhotoMemoryRepository,
    private readonly blogLinkMemoryRepository: BlogLinkMemoryRepository
  ){}

  public async index(parameter: ParametersList) {
    const {count, user, typeSort, typePublication} = parameter;

    let datasList: Video[] | Text[] | Quote[] | Photo[] | Link[];
    const blogList = [
      this.blogVideoRepository,
      this.blogTextRepository,
      this.blogQuoteMemoryRepository,
      this.blogPhotoMemoryRepository,
      this.blogLinkMemoryRepository
    ];
    const dataBlogList: (Video[] | Text[] | Quote[] | Photo[] | Link[])[] = []

    switch (typePublication) {
      /*
      case TypePublication.Video:
        datasList = await this.blogVideoRepository.find({count, user, typeSort});
        return datasList;

      case TypePublication.Text:
        datasList = await this.blogTextRepository.find({count, user, typeSort});
        return datasList;
        */
      case TypePublication.Quote:
        datasList = await this.blogQuoteMemoryRepository.find({count, user, typeSort});
        return datasList;
      case TypePublication.Photo:
        datasList = await this.blogPhotoMemoryRepository.find({count, user, typeSort});
        return datasList;
      case TypePublication.Link:
        datasList = await this.blogLinkMemoryRepository.find({count, user, typeSort});
        return datasList;
      default:
        /*
        for await(const element of blogList){
          const data = await element.find({count, user, typeSort})
          data.forEach((element) => dataBlogList.push(element))
        }
          */
        return dataBlogList;
    };
  }
}
