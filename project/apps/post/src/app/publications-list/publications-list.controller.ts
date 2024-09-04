import {
  Controller,
  Get,
  Body,
  Query
} from '@nestjs/common';
import {
  ApiTags,
  ApiFoundResponse,
  ApiQuery
} from '@nestjs/swagger';

import { ParametersList, TypePublication } from '@project/shared-types';
import { PublicationsListService } from './publications-list.service';
import { fillObject } from '@project/util-core';
import { Video } from '../publication-video/rdo/video.rdo';
import { Text } from '../publication-text/rdo/text.rdo';
import { Quote } from '../publication-quote/rdo/quote.rdo';
import { Photo } from '../publication-photo/rdo/photo.rdo';
import { Link } from '../publication-link/rdo/link.rdo';

@ApiTags('publications')
@Controller('publications')
export class PublicationsListController {

  constructor(
    private readonly publicationsListService: PublicationsListService
  ){}

  @ApiFoundResponse({
    description: 'Found for publications',
    type: [Video]
  })
  @Get('list')
  public async index(@Body() parameters: ParametersList) {
    const postsList: Array<Video | Text | Quote | Photo | Link> = [];
    const publicationsList = await this.publicationsListService.index(parameters);

    if(publicationsList.length === 0) {return publicationsList};

    publicationsList.forEach((post) => {
      const {typePublication} = post
      let transformationList: Video | Text | Quote | Photo | Link

    switch (typePublication) {
      case TypePublication.Video:
        transformationList = fillObject(Video, post)
        postsList.push(transformationList);
        break;
      case TypePublication.Text:
        transformationList = fillObject(Text, post)
        postsList.push(transformationList);
        break;
      case TypePublication.Quote:
        transformationList = fillObject(Quote, post)
        postsList.push(transformationList);
        break;
      case TypePublication.Photo:
        transformationList = fillObject(Photo, post)
        postsList.push(transformationList);
        break;
      case TypePublication.Link:
        transformationList = fillObject(Link, post)
        postsList.push(transformationList);
        break;
    };
    })

    return postsList
  }

  @ApiFoundResponse({
    description: 'Found for publications',
    type: [Video]
  })
  @ApiQuery({
    name: 'author',
    description: 'Name of the author of the publication',
    required: true,
    example: 'http://localhost:4000/api/publications/drafts?author=Vlad'
  })
  @Get('drafts')
  public async indexDrafts(@Query() author: string) {
    const postsList: Array<Video | Text | Quote | Photo | Link> = [];
    const publicationsList = await this.publicationsListService.indexDraft(author);

    if(publicationsList.length === 0) {return publicationsList};

    publicationsList.forEach((post) => {
      const {typePublication} = post
      let transformationList: Video | Text | Quote | Photo | Link

    switch (typePublication) {
      case TypePublication.Video:
        transformationList = fillObject(Video, post)
        postsList.push(transformationList);
        break;
      case TypePublication.Text:
        transformationList = fillObject(Text, post)
        postsList.push(transformationList);
        break;
      case TypePublication.Quote:
        transformationList = fillObject(Quote, post)
        postsList.push(transformationList);
        break;
      case TypePublication.Photo:
        transformationList = fillObject(Photo, post)
        postsList.push(transformationList);
        break;
      case TypePublication.Link:
        transformationList = fillObject(Link, post)
        postsList.push(transformationList);
        break;
    };
    })

    return postsList
  }
}
