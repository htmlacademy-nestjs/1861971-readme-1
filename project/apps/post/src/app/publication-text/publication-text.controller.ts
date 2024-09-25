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

import { PublicationTextService } from './publication-text.service';
import { CreateTextDto } from './dto/creat-text.dto';
import {fillObject} from '@project/util-core';
import { DetailsTextRdo } from './rdo/details-text.rdo';
import { Text } from './rdo/text.rdo';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { TokenPayload } from '@project/shared-types';

@ApiTags('text')
@Controller('text')
export class PublicationTextController {
  constructor(
    private readonly publicationTextService: PublicationTextService
  ) {}

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'accessToken',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2Q3MGZlMDhlNDAwNWY4NmQxNDczNiIsImVtYWlsIjoidmx3MDQsImV4cCI6MTcyNTYwODkwNH0.ReWjyAgo2dsO1Kpbqrn0tfpaFK89YLXM3J39pGXpG4E'
  })
  @ApiCreatedResponse({
    description: 'Video publication created',
    type: DetailsTextRdo
  })
  @UseGuards(JwtAuthGuard)
  @Post('publication')
  public async create(@Request() req, @Body() dto: CreateTextDto) {
    const {id} = req.user as TokenPayload

    const newText = await this.publicationTextService.create(dto, id);
    return fillObject(DetailsTextRdo, newText);
  }

  @ApiFoundResponse({
    description: 'Found a text',
    type: Text
  })
  @ApiNotFoundResponse({
    description: 'Text not found'
  })
  @ApiParam({
    name: 'id',
    description: 'Unique text id',
    example: '1'
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const detaileAboutText = await this.publicationTextService.show(Number(id));
    return fillObject(Text, detaileAboutText);
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'accessToken',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2Q3MGZlMDhlNDAwNWY4NmQxNDczNiIsImVtYWlsIjoidmx3MDQsImV4cCI6MTcyNTYwODkwNH0.ReWjyAgo2dsO1Kpbqrn0tfpaFK89YLXM3J39pGXpG4E'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Text deleted',
    type: Text
  })
  @ApiParam({
    name: 'id',
    description: 'Unique text id',
    example: '1'
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    const informationDeleteText = await this.publicationTextService.delete(Number(id));
    return fillObject(Text, informationDeleteText);
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'accessToken',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2Q3MGZlMDhlNDAwNWY4NmQxNDczNiIsImVtYWlsIjoidmx3MDQsImV4cCI6MTcyNTYwODkwNH0.ReWjyAgo2dsO1Kpbqrn0tfpaFK89YLXM3J39pGXpG4E'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Video updated',
    type: DetailsTextRdo
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Text not found'
  })
  @ApiParam({
    name: 'id',
    description: 'Unique text id',
    example: '1'
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: CreateTextDto) {
    const editedText = await this.publicationTextService.update(Number(id), dto);
    return fillObject(DetailsTextRdo, editedText);
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'accessToken',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2Q3MGZlMDhlNDAwNWY4NmQxNDczNiIsImVtYWlsIjoidmx3MDQsImV4cCI6MTcyNTYwODkwNH0.ReWjyAgo2dsO1Kpbqrn0tfpaFK89YLXM3J39pGXpG4E'
  })
  @ApiParam({
    name: 'idPublication',
    description: 'Post id for repost',
    example: '66aa47a11ee332582a197c8f'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Text repost',
    type: Text
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Text not found to add to repost'
  })
  @UseGuards(JwtAuthGuard)
  @Post(':idPublication')
  public async repost(@Request() req, @Param('idPublication') idPublication: string) {
    const {id} = req.user as TokenPayload

    const publication = await this.publicationTextService.addRepost(idPublication, id);
    return fillObject(Text, publication);
  }
}
