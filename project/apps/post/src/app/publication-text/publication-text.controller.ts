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

import { PublicationTextService } from './publication-text.service';
import { CreateTextDto } from './dto/creat-text.dto';
import {fillObject} from '@project/util-core';
import { DetailsTextRdo } from './rdo/details-text.rdo';
import { Text } from './rdo/text.rdo';

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
  @Post('publication')
  public async create(@Body() dto: CreateTextDto) {
    const newText = await this.publicationTextService.create(dto);
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
    return detaileAboutText
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
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    const informationDeleteText = await this.publicationTextService.delete(Number(id));
    return informationDeleteText
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
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: CreateTextDto) {

    const editedText = await this.publicationTextService.update(Number(id), dto);
    return fillObject(DetailsTextRdo, editedText);
  }
}
