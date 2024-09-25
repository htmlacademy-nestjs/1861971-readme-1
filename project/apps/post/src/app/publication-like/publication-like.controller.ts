import {
  Controller,
  Patch,
  Body,
  HttpStatus,
  UseGuards,
  Request
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiNotFoundResponse,
  ApiHeader
} from '@nestjs/swagger';

import { PublicationLikeService } from './publication-like.service';
import { LikeDto } from './dto/like.dto';
import { fillObject } from '@project/util-core';
import { DetailsVideoRdo } from '../publication-video/rdo/details-video.rdo';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { TokenPayload } from '@project/shared-types';

@ApiTags('like')
@Controller('like')
export class PublicationLikeController {

  constructor(
    private readonly publicationLikeService: PublicationLikeService
  ){}

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'accessToken',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2Q3MGZlMDhlNDAwNWY4NmQxNDczNiIsImVtYWlsIjoidmx3MDQsImV4cCI6MTcyNTYwODkwNH0.ReWjyAgo2dsO1Kpbqrn0tfpaFK89YLXM3J39pGXpG4E'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Like added or like removed',
    type: DetailsVideoRdo
  })
  @ApiNotFoundResponse({
    status:HttpStatus.NOT_FOUND,
    description: 'There is no publication with this id',
    example: 'Video not found'
  })
  @UseGuards(JwtAuthGuard)
  @Patch('redaction')
  public async show(@Request() req, @Body() body: LikeDto) {
    const {id} = req.user as TokenPayload

    const parameter: {dataPublication, rdo} = await this.publicationLikeService.show(body, id);
    const {rdo, dataPublication} = parameter;
    return fillObject(rdo, dataPublication)
  }
}
