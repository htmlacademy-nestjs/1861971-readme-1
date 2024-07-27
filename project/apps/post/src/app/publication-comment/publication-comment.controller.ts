import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body
 } from '@nestjs/common';

import { CreateCommentDto } from './dto/creat-comment.dto';
import { IdList } from './dto/id-list.dto';
import { PublicationCommentService } from './publication-comment.service';

@Controller('comment')
export class PublicationCommentController {
  constructor(
    private readonly publicationCommentService: PublicationCommentService
  ) {}

  @Post(':id')
  public async update(@Param('id') id: string, @Body() dto: CreateCommentDto) {

    const existComment = await this.publicationCommentService.create(dto, id);
    return existComment
  }

  @Get('list')
  public async index(@Body() {idList}: IdList) {

    const commentsList = await this.publicationCommentService.findById(idList);
    return commentsList
  }

  @Delete('delete')
  public async delete(@Body() {idList}: IdList) {
    await this.publicationCommentService.delete(idList);
  }
}
