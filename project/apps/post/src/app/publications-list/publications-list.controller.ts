import {
  Controller,
  Get,
  Body,
  UseGuards,
  Request
} from '@nestjs/common';
import {
  ApiTags,
  ApiFoundResponse,
  ApiQuery,
  ApiHeader
} from '@nestjs/swagger';

import { ParametersList, TypePublication } from '@project/shared-types';
import { PublicationsListService } from './publications-list.service';
import { fillObject } from '@project/util-core';
import { Video } from '../publication-video/rdo/video.rdo';
import { Text } from '../publication-text/rdo/text.rdo';
import { Quote } from '../publication-quote/rdo/quote.rdo';
import { Photo } from '../publication-photo/rdo/photo.rdo';
import { Link } from '../publication-link/rdo/link.rdo';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { TokenPayload } from '@project/shared-types';

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

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'accessToken',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2Q3MGZlMDhlNDAwNWY4NmQxNDczNiIsImVtYWlsIjoidmx3MDQsImV4cCI6MTcyNTYwODkwNH0.ReWjyAgo2dsO1Kpbqrn0tfpaFK89YLXM3J39pGXpG4E'
  })
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
  @UseGuards(JwtAuthGuard)
  @Get('drafts')
  public async indexDrafts(@Request() req) {
    const {id} = req.user as TokenPayload

    const postsList: Array<Video | Text | Quote | Photo | Link> = [];
    const publicationsList = await this.publicationsListService.indexDraft(id);

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
