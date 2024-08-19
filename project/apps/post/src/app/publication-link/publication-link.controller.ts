import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param
 } from '@nestjs/common';

import { PublicationLinkService } from './publication-link.service';
import { CreateLinkDto } from './dto/creat-link.dto';
import {fillObject} from '@project/util-core';
import { DetailsLinkRdo } from './rdo/details-quote.rdo';

@Controller('link')
export class PublicationLinkController {
  constructor(
    private readonly publicationLinkService: PublicationLinkService
  ) {}

  @Post('publication')
  public async create(@Body() dto: CreateLinkDto) {
    const newLink = await this.publicationLinkService.create(dto);
    return fillObject(DetailsLinkRdo, newLink);
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const detaileAboutLink = await this.publicationLinkService.show(Number(id));
    return detaileAboutLink
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    const informationDeleteLink = await this.publicationLinkService.delete(Number(id));
    return informationDeleteLink
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: CreateLinkDto) {

    const editedLink = await this.publicationLinkService.update(Number(id), dto);
    return fillObject(DetailsLinkRdo, editedLink);
  }
}
