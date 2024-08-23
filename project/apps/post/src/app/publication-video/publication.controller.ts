import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
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

import { PublicationService } from './publication.service';
import { CreateVideoDto } from './dto/creat-video.dto';
import {fillObject} from '@project/util-core';
import { DetailsVideoRdo } from './rdo/details-video.rdo';
import { Video } from './rdo/video.rdo';

@ApiTags('video')
@Controller('video')
export class PublicationController {
  constructor(
    private readonly publicationService: PublicationService
  ) {}

  @ApiCreatedResponse({
    description: 'Video publication created',
    type: DetailsVideoRdo
  })
  @Post('publication')
  public async create(@Body() dto: CreateVideoDto) {
    const newVideo = await this.publicationService.create(dto);
    return fillObject(DetailsVideoRdo, newVideo);
  }

  @ApiFoundResponse({
    description: 'Found a video',
    type: Video
  })
  @ApiNotFoundResponse({
    description: 'Video not found'
  })
  @ApiParam({
    name: 'id',
    description: 'Unique video id',
    example: '1'
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const detaileAboutVideo = await this.publicationService.show(Number(id));
    return detaileAboutVideo;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Video deleted',
    type: Video
  })
  @ApiParam({
    name: 'id',
    description: 'Unique video id',
    example: '1'
  })
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    const informationDeleteVideo = await this.publicationService.delete(Number(id));
    return informationDeleteVideo
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Video updated',
    type: DetailsVideoRdo
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Video not found'
  })
  @ApiParam({
    name: 'id',
    description: 'Unique video id',
    example: '1'
  })
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: CreateVideoDto) {

    const editedVideo = await this.publicationService.update(Number(id), dto);
    return fillObject(DetailsVideoRdo, editedVideo);
  }
}
