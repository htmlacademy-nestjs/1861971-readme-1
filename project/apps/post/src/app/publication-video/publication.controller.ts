import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch
} from '@nestjs/common';

import { PublicationService } from './publication.service';
import { CreateVideoDto } from './dto/creat-video.dto';
import {fillObject} from '@project/util-core';
import { DetailsVideoRdo } from './rdo/details-video.rdo';

@Controller('video')
export class PublicationController {
  constructor(
    private readonly publicationService: PublicationService
  ) {}

  @Post('publication')
  public async create(@Body() dto: CreateVideoDto) {
    const newVideo = await this.publicationService.create(dto);
    return fillObject(DetailsVideoRdo, newVideo);
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const detaileAboutVideo = await this.publicationService.show(id);
    return detaileAboutVideo;
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.publicationService.delete(id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: CreateVideoDto) {

    const dataVideo = {
      ...dto,
      id: id
    }

    const editedVideo = await this.publicationService.update(dataVideo);
    return fillObject(DetailsVideoRdo, editedVideo);
  }
}
