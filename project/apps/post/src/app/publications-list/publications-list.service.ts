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
  Link
} from '@project/shared-types';

@Injectable()
export class PublicationsListService {
  constructor(
    private readonly blogVideoRepository: BlogVideoRepository,
    private readonly blogTextRepository: BlogTextRepository,
    private readonly blogQuoteRepository: BlogQuoteRepository,
    private readonly blogPhotoRepository: BlogPhotoRepository,
    private readonly blogLinkRepository: BlogLinkRepository
  ){}

  public async index(parameter: ParametersList, count: string | undefined) {
    const {user, typeSort, typePublication} = parameter;

    let datasList: Video[] | Text[] | Quote[] | Photo[] | Link[];
    const blogList = [
      this.blogVideoRepository,
      this.blogTextRepository,
      this.blogQuoteRepository,
      this.blogPhotoRepository,
      this.blogLinkRepository
    ];
    const dataBlogList: (Video[] | Text[] | Quote[] | Photo[] | Link[])[] = []

    switch (typePublication) {
      case TypePublication.Video:
        datasList = await this.blogVideoRepository.find({count, user, typeSort});
        return datasList;
      case TypePublication.Text:
        datasList = await this.blogTextRepository.find({count, user, typeSort});
        return datasList;
      case TypePublication.Quote:
        datasList = await this.blogQuoteRepository.find({count, user, typeSort});
        return datasList;
      case TypePublication.Photo:
        datasList = await this.blogPhotoRepository.find({count, user, typeSort});
        return datasList;
      case TypePublication.Link:
        datasList = await this.blogLinkRepository.find({count, user, typeSort});
        return datasList;
      default:
        for await(const element of blogList){
          const data = await element.find({count, user, typeSort})
          data.forEach((element) => dataBlogList.push(element))
        }
    };
  }
}
