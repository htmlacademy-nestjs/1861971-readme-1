import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param,
  HttpStatus,
  UseGuards,
  Request
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
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { TokenPayload } from '@project/shared-types';

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
  @UseGuards(JwtAuthGuard)
  @Post('publication')
  public async create(@Request() req, @Body() dto: CreatePhotoDto) {
    const {id} = req.user as TokenPayload

    const newPhoto = await this.publicationPhotoService.create(dto, id);
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
    return fillObject(Photo, detaileAboutPhoto);
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
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    const informationDeletePhoto = await this.publicationPhotoService.delete(Number(id));
    return fillObject(Photo, informationDeletePhoto);
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
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: CreatePhotoDto) {

    const editedPhoto = await this.publicationPhotoService.update(Number(id), dto);
    return fillObject(DetailsPhotoRdo, editedPhoto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':idPublication')
  public async repost(@Request() req, @Param('idPublication') idPublication: string) {
    const {id} = req.user as TokenPayload

    const publication = await this.publicationPhotoService.addRepost(idPublication, id);
    return fillObject(Photo, publication);
  }
}
