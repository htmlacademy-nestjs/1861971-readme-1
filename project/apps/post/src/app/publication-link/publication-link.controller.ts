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

import { PublicationLinkService } from './publication-link.service';
import { CreateLinkDto } from './dto/creat-link.dto';
import {fillObject} from '@project/util-core';
import { DetailsLinkRdo } from './rdo/details-quote.rdo';
import { Link } from './rdo/link.rdo';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { TokenPayload } from '@project/shared-types';

@ApiTags('link')
@Controller('link')
export class PublicationLinkController {
  constructor(
    private readonly publicationLinkService: PublicationLinkService
  ) {}

  @ApiCreatedResponse({
    description: 'Link publication created',
    type: DetailsLinkRdo
  })
  @UseGuards(JwtAuthGuard)
  @Post('publication')
  public async create(@Request() req, @Body() dto: CreateLinkDto) {
    const {id} = req.user as TokenPayload

    const newLink = await this.publicationLinkService.create(dto, id);
    return fillObject(DetailsLinkRdo, newLink);
  }

  @ApiFoundResponse({
    description: 'Found a link',
    type: Link
  })
  @ApiNotFoundResponse({
    description: 'Link not found'
  })
  @ApiParam({
    name: 'id',
    description: 'Unique link id',
    example: '1'
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const detaileAboutLink = await this.publicationLinkService.show(Number(id));
    return fillObject(Link, detaileAboutLink);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Link deleted',
    type: Link
  })
  @ApiParam({
    name: 'id',
    description: 'Unique link id',
    example: '1'
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    const informationDeleteLink = await this.publicationLinkService.delete(Number(id));
    return fillObject(Link, informationDeleteLink);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Video updated',
    type: DetailsLinkRdo
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Link not found'
  })
  @ApiParam({
    name: 'id',
    description: 'Unique link id',
    example: '1'
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: CreateLinkDto) {
    const editedLink = await this.publicationLinkService.update(Number(id), dto);
    return fillObject(DetailsLinkRdo, editedLink);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':idPublication')
  public async repost(@Request() req, @Param('idPublication') idPublication: string) {
    const {id} = req.user as TokenPayload

    const publication = await this.publicationLinkService.addRepost(idPublication, id);
    return fillObject(Link, publication);
  }
}
