import { Injectable } from '@nestjs/common';

import { BlogTextMemoryRepository } from '../blog-text/blog-text-memory-repository';
import { BlogVideoMemoryRepository } from '../blog-video/blog-video-memory-repository';
import {
  Video,
  Text
 } from '@project/shared-types';

@Injectable()
export class PublicationSearchService {
  blogList: (BlogVideoMemoryRepository | BlogTextMemoryRepository)[];

  constructor(
    private readonly blogVideoMemoryRepository: BlogVideoMemoryRepository,
    private readonly blogTextMemoryRepository: BlogTextMemoryRepository
  ){
    this.blogList = [
      this.blogVideoMemoryRepository,
      this.blogTextMemoryRepository
    ];
  }

  public async index(word: string) {
    const publicationList: (Video | Text)[] = [];

    for(const element of this.blogList) {
      const dataList = await element.findByWord(word);

      if(dataList.length !== 0) {
        dataList.forEach((element:Video | Text) => publicationList.push(element))
      }
    }

    return publicationList
  }
}
