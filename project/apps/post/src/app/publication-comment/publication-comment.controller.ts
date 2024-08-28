import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Query,
  HttpStatus
 } from '@nestjs/common';
 import {
  ApiTags,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiParam,
  ApiResponse
} from '@nestjs/swagger';

import { CreateCommentDto } from './dto/creat-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';
import { Publication } from './dto/id-list.dto';
import { PublicationCommentService } from './publication-comment.service';
import { fillObject } from '@project/util-core';

@ApiTags('comment')
@Controller('comment')
export class PublicationCommentController {
  constructor(
    private readonly publicationCommentService: PublicationCommentService
  ) {}

  @ApiCreatedResponse({
    description: 'Comment publication created',
    type: CommentRdo
  })
  @Post('create')
  public async create(@Body() dto: CreateCommentDto) {

    const updateDto = {
      ...dto,
      authorComment: 'Vlad'
    }

    const existComment = await this.publicationCommentService.create(updateDto);
    return fillObject(CommentRdo, existComment);
  }

  @ApiFoundResponse({
    description: 'Found a comment',
    type: CommentRdo
  })
  @ApiParam({
    name: 'count',
    description: 'User can request next 50 comments',
    example: 'http://localhost:4000/api/comment/list?count=50'
  })
  @Get('list')
  public async index(@Body() {idPost}: Publication, @Query() {count}: {count: string | undefined} ) {

    const commentsList = await this.publicationCommentService.findById(idPost, count);
    return fillObject(CommentRdo, commentsList)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comment or comments deleted',
    example: 'Comments have been 4 deleted'
  })
  @Delete('delete')
  public async delete(@Body() dataPost: Publication) {

    const updateDataPost = {
      ...dataPost,
      authorComment: 'Vlad'
    }

    const {count} = await this.publicationCommentService.delete(updateDataPost);

     return `Comments have been ${count} deleted`
  }
}
