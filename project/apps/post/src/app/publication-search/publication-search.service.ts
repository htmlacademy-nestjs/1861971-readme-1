import { Injectable } from '@nestjs/common';

import { BlogTextRepository } from '../blog-text/blog-text.repository';
import { BlogVideoRepository } from '../blog-video/blog-video.repository';
import {
  Video,
  Text
 } from '@project/shared-types';

@Injectable()
export class PublicationSearchService {
  blogList: (BlogVideoRepository | BlogTextRepository)[];

  constructor(
    private readonly blogVideoRepository: BlogVideoRepository,
    private readonly blogTextRepository: BlogTextRepository
  ){
    this.blogList = [
      this.blogVideoRepository,
      this.blogTextRepository
    ];
  }

  public async index(titlePublication: string) {
    const updateTitiePublication = titlePublication.replace(/[^A-Z^А-Я\d\s]/gi, '')
    const wordsList = updateTitiePublication.split(' ').join(' | ')
    const publicationList: (Video | Text)[] = [];

    for await(const element of this.blogList) {
      const dataList = await element.findByWord(wordsList);

      if(dataList.length !== 0) {
        dataList.forEach((element:Video | Text) => publicationList.push(element))
      }
    }

    return publicationList
  }
}
