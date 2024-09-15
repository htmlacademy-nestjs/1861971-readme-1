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

import { PublicationQuoteService } from './publication-quote.service';
import { CreateQuoteDto } from './dto/creat-quote.dto';
import {fillObject} from '@project/util-core';
import { DetailsQuoteRdo } from './rdo/details-quote.rdo';
import { Quote } from './rdo/quote.rdo';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { TokenPayload } from '@project/shared-types';

@ApiTags('quote')
@Controller('quote')
export class PublicationQuoteController {
  constructor(
    private readonly publicationQuoteService: PublicationQuoteService
  ) {}

  @ApiCreatedResponse({
    description: 'Quote publication created',
    type: DetailsQuoteRdo
  })
  @UseGuards(JwtAuthGuard)
  @Post('publication')
  public async create(@Request() req, @Body() dto: CreateQuoteDto) {
    const {id} = req.user as TokenPayload

    const newQuote = await this.publicationQuoteService.create(dto, id);
    return fillObject(DetailsQuoteRdo, newQuote);
  }

  @ApiFoundResponse({
    description: 'Found a quote',
    type: Quote
  })
  @ApiNotFoundResponse({
    description: 'Quote not found'
  })
  @ApiParam({
    name: 'id',
    description: 'Unique quote id',
    example: '1'
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const detaileAboutQuote = await this.publicationQuoteService.show(Number(id));
    return fillObject(Quote, detaileAboutQuote);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Quote deleted',
    type: Quote
  })
  @ApiParam({
    name: 'id',
    description: 'Unique quote id',
    example: '1'
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    const informationDeleteQuote = await this.publicationQuoteService.delete(Number(id));
    return fillObject(Quote, informationDeleteQuote);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Video updated',
    type: DetailsQuoteRdo
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Quote not found'
  })
  @ApiParam({
    name: 'id',
    description: 'Unique quote id',
    example: '1'
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: CreateQuoteDto) {

    const editedQuote = await this.publicationQuoteService.update(Number(id), dto);
    return fillObject(DetailsQuoteRdo, editedQuote);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':idPublication')
  public async repost(@Request() req, @Param('idPublication') idPublication: string) {
    const {id} = req.user as TokenPayload

    const publication = await this.publicationQuoteService.addRepost(idPublication, id);
    return fillObject(Quote, publication);
  }
}
