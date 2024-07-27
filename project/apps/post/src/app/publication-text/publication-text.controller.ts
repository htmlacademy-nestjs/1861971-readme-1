import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param
} from '@nestjs/common';

import { PublicationTextService } from './publication-text.service';
import { CreateTextDto } from './dto/creat-text.dto';
import {fillObject} from '@project/util-core';
import { DetailsTextRdo } from './rdo/details-text.rdo';

@Controller('text')
export class PublicationTextController {
  constructor(
    private readonly publicationTextService: PublicationTextService
  ) {}

  @Post('publication')
  public async create(@Body() dto: CreateTextDto) {
    const newText = await this.publicationTextService.create(dto);
    return fillObject(DetailsTextRdo, newText);
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const detaileAboutText = await this.publicationTextService.show(id);
    return detaileAboutText
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.publicationTextService.delete(id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: CreateTextDto) {

    const dataText = {
      ...dto,
      id: id
    }

    const editedText = await this.publicationTextService.update(dataText);
    return fillObject(DetailsTextRdo, editedText);
  }
}
