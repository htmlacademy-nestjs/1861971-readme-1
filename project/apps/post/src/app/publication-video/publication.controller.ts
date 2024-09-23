import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
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

import { PublicationService } from './publication.service';
import { CreateVideoDto } from './dto/creat-video.dto';
import {fillObject} from '@project/util-core';
import { DetailsVideoRdo } from './rdo/details-video.rdo';
import { Video } from './rdo/video.rdo';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { TokenPayload } from '@project/shared-types';

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
  @UseGuards(JwtAuthGuard)
  @Post('publication')
  public async create(@Request() req, @Body() dto: CreateVideoDto) {
    const {id} = req.user as TokenPayload

    const newVideo = await this.publicationService.create(dto, id);

    const video = {
      ...newVideo,
      nameAuthor: req.user
    }
    return fillObject(DetailsVideoRdo, video);
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
    return fillObject(Video, detaileAboutVideo);
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
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    const informationDeleteVideo = await this.publicationService.delete(Number(id));
    return fillObject(Video, informationDeleteVideo)
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
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  public async update(@Request() req, @Param('id') id: string, @Body() dto: CreateVideoDto) {
    const editedVideo = await this.publicationService.update(Number(id), dto);

    const video = {
      ...editedVideo,
      nameAuthor: req.user
    }
    return fillObject(DetailsVideoRdo, video);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':idPublication')
  public async repost(@Request() req, @Param('idPublication') idPublication: string) {
    const {id} = req.user as TokenPayload

    const publication = await this.publicationService.addRepost(idPublication, id);
    return fillObject(Video, publication);
  }
}
