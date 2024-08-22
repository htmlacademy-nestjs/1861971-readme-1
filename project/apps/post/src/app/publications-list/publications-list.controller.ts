import {
  Controller,
  Get,
  Query,
  Body
} from '@nestjs/common';

import { ParametersList } from '@project/shared-types';
import { PublicationsListService } from './publications-list.service';
import { DetailsPublicationRdo } from './rdo/details-publication.rdo';
import { fillObject } from '@project/util-core';


@Controller('publications')
export class PublicationsListController {

  constructor(
    private readonly publicationsListService: PublicationsListService
  ){}

  @Get('list')
  public async index(@Body() parameters: ParametersList, @Query() {count}: {count: string | undefined}) {
    const publicationsList = await this.publicationsListService.index(parameters, count);
    return fillObject(DetailsPublicationRdo, publicationsList)
  }
}
