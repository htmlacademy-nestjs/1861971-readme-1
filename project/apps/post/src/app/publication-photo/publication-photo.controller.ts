import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param,
  HttpStatus
 } from '@nestjs/common';
 import {
  ApiTags,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiResponse
} from '@nestjs/swagger';

import { PublicationPhotoService } from './publication-photo.service';
import { CreatePhotoDto } from './dto/creat-photo.dto';
import {fillObject} from '@project/util-core';
import { DetailsPhotoRdo } from './rdo/details-photo.rdo';
import { Photo } from './rdo/photo.rdo';

@ApiTags('photo')
@Controller('photo')
export class PublicationPhotoController {
  constructor(
    private readonly publicationPhotoService: PublicationPhotoService
  ) {}

  @ApiCreatedResponse({
    description: 'Photo publication created',
    type: DetailsPhotoRdo
  })
  @Post('publication')
  public async create(@Body() dto: CreatePhotoDto) {
    const newPhoto = await this.publicationPhotoService.create(dto);
    return fillObject(DetailsPhotoRdo, newPhoto);
  }

  @ApiFoundResponse({
    description: 'Found a photo',
    type: Photo
  })
  @ApiNotFoundResponse({
    description: 'Photo not found'
  })
  @ApiParam({
    name: 'id',
    description: 'Unique photo id',
    example: '1'
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const detaileAboutPhoto = await this.publicationPhotoService.show(Number(id));
    return detaileAboutPhoto
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Photo deleted',
    type: Photo
  })
  @ApiParam({
    name: 'id',
    description: 'Unique photo id',
    example: '1'
  })
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    const informationDeletePhoto = await this.publicationPhotoService.delete(Number(id));
    return informationDeletePhoto
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Photo updated',
    type: DetailsPhotoRdo
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Photo not found'
  })
  @ApiParam({
    name: 'id',
    description: 'Unique photo id',
    example: '1'
  })
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: CreatePhotoDto) {

    const editedPhoto = await this.publicationPhotoService.update(Number(id), dto);
    return fillObject(DetailsPhotoRdo, editedPhoto);
  }
}
