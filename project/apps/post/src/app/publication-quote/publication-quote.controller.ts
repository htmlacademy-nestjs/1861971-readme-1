import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param
 } from '@nestjs/common';

import { PublicationQuoteService } from './publication-quote.service';
import { CreateQuoteDto } from './dto/creat-quote.dto';
import {fillObject} from '@project/util-core';
import { DetailsQuoteRdo } from './rdo/details-quote.rdo';

@Controller('quote')
export class PublicationQuoteController {
  constructor(
    private readonly publicationQuoteService: PublicationQuoteService
  ) {}

  @Post('publication')
  public async create(@Body() dto: CreateQuoteDto) {
    const newQuote = await this.publicationQuoteService.create(dto);
    return fillObject(DetailsQuoteRdo, newQuote);
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const detaileAboutQuote = await this.publicationQuoteService.show(id);
    return detaileAboutQuote
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.publicationQuoteService.delete(id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: CreateQuoteDto) {

    const dataQuote = {
      ...dto,
      id: id
    }

    const editedQuote = await this.publicationQuoteService.update(dataQuote);
    return fillObject(DetailsQuoteRdo, editedQuote);
  }
}
