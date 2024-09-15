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

  @UseGuards(JwtAuthGuard)
  @Post(':idPublication')
  public async repost(@Request() req, @Param('idPublication') idPublication: string) {
    const {id} = req.user as TokenPayload

    const publication = await this.publicationTextService.addRepost(idPublication, id);
    return fillObject(Text, publication);
  }
}
