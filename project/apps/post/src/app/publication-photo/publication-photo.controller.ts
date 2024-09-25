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
  ApiResponse,
  ApiHeader
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

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'accessToken',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2Q3MGZlMDhlNDAwNWY4NmQxNDczNiIsImVtYWlsIjoidmx3MDQsImV4cCI6MTcyNTYwODkwNH0.ReWjyAgo2dsO1Kpbqrn0tfpaFK89YLXM3J39pGXpG4E'
  })
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

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'accessToken',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2Q3MGZlMDhlNDAwNWY4NmQxNDczNiIsImVtYWlsIjoidmx3MDQsImV4cCI6MTcyNTYwODkwNH0.ReWjyAgo2dsO1Kpbqrn0tfpaFK89YLXM3J39pGXpG4E'
  })
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

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'accessToken',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2Q3MGZlMDhlNDAwNWY4NmQxNDczNiIsImVtYWlsIjoidmx3MDQsImV4cCI6MTcyNTYwODkwNH0.ReWjyAgo2dsO1Kpbqrn0tfpaFK89YLXM3J39pGXpG4E'
  })
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

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'accessToken',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2Q3MGZlMDhlNDAwNWY4NmQxNDczNiIsImVtYWlsIjoidmx3MDQsImV4cCI6MTcyNTYwODkwNH0.ReWjyAgo2dsO1Kpbqrn0tfpaFK89YLXM3J39pGXpG4E'
  })
  @ApiParam({
    name: 'idPublication',
    description: 'Photo id for repost',
    example: '66aa47a11ee332582a197c8f'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Photo repost',
    type: Photo
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Photo not found to add to repost'
  })
  @UseGuards(JwtAuthGuard)
  @Post(':idPublication')
  public async repost(@Request() req, @Param('idPublication') idPublication: string) {
    const {id} = req.user as TokenPayload

    const publication = await this.publicationPhotoService.addRepost(idPublication, id);
    return fillObject(Photo, publication);
  }
}
