import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param
 } from '@nestjs/common';

import { PublicationPhotoService } from './publication-photo.service';
import { CreatePhotoDto } from './dto/creat-photo.dto';
import {fillObject} from '@project/util-core';
import { DetailsPhotoRdo } from './rdo/details-quote.rdo';

@Controller('photo')
export class PublicationPhotoController {
  constructor(
    private readonly publicationPhotoService: PublicationPhotoService
  ) {}

  @Post('publication')
  public async create(@Body() dto: CreatePhotoDto) {
    const newPhoto = await this.publicationPhotoService.create(dto);
    return fillObject(DetailsPhotoRdo, newPhoto);
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const detaileAboutPhoto = await this.publicationPhotoService.show(Number(id));
    return detaileAboutPhoto
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    const informationDeletePhoto = await this.publicationPhotoService.delete(Number(id));
    return informationDeletePhoto
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: CreatePhotoDto) {

    const editedPhoto = await this.publicationPhotoService.update(Number(id), dto);
    return fillObject(DetailsPhotoRdo, editedPhoto);
  }
}
