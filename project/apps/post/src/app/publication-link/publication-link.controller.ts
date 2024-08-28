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

import { PublicationLinkService } from './publication-link.service';
import { CreateLinkDto } from './dto/creat-link.dto';
import {fillObject} from '@project/util-core';
import { DetailsLinkRdo } from './rdo/details-quote.rdo';
import { Link } from './rdo/link.rdo';

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
  @Post('publication')
  public async create(@Body() dto: CreateLinkDto) {
    const newLink = await this.publicationLinkService.create(dto);
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
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: CreateLinkDto) {

    const editedLink = await this.publicationLinkService.update(Number(id), dto);
    return fillObject(DetailsLinkRdo, editedLink);
  }
}
