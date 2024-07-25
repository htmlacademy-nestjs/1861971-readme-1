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
    const detaileAboutPhoto = await this.publicationPhotoService.show(id);
    return detaileAboutPhoto
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.publicationPhotoService.delete(id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: CreatePhotoDto) {

    const dataPhoto = {
      ...dto,
      id: id
    }

    const editedPhoto = await this.publicationPhotoService.update(dataPhoto);
    return fillObject(DetailsPhotoRdo, editedPhoto);
  }
}
