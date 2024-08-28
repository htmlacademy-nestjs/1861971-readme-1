import {
  Controller,
  Get,
  Body
 } from '@nestjs/common';
 import {
  ApiTags,
  ApiFoundResponse
} from '@nestjs/swagger';

 import { CreateSearchDto } from './dto/creat-search.dto';
 import { PublicationSearchService } from './publication-search.service';
 import { TypePublication } from '@project/shared-types';
 import { fillObject } from '@project/util-core';
 import { Video } from '../publication-video/rdo/video.rdo';
 import { Text } from '../publication-text/rdo/text.rdo';

@ApiTags('search')
@Controller('search')
export class PublicationSearchController {
  constructor(
    private readonly publicationSearchService: PublicationSearchService
  ){}

  @ApiFoundResponse({
    description: 'Found a video and text(s)',
    type: [Text]
  })
  @Get('publication')
  public async index(@Body() {word}: CreateSearchDto) {
    const publicationsList = await this.publicationSearchService.index(word);

    const updatePublicationsList = []

    publicationsList.forEach((item) => {
      switch (item.typePublication) {
        case TypePublication.Video: {
          const videoList = fillObject(Video, item);
          updatePublicationsList.push(videoList)
          break
        }
        case TypePublication.Text: {
          const textsList = fillObject(Text, item);
          updatePublicationsList.push(textsList)
          break
        }
      }
    })

    return updatePublicationsList
  }
}
