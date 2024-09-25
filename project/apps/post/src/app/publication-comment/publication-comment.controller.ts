import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  HttpStatus,
  UseGuards,
  Request
 } from '@nestjs/common';
 import {
  ApiTags,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiResponse,
  ApiHeader
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateCommentDto } from './dto/creat-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';
import { Publication } from './dto/id-list.dto';
import { PublicationCommentService } from './publication-comment.service';
import { fillObject } from '@project/util-core';
import { TokenPayload } from '@project/shared-types';

@ApiTags('comment')
@Controller('comment')
export class PublicationCommentController {
  constructor(
    private readonly publicationCommentService: PublicationCommentService
  ) {}

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'accessToken',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2Q3MGZlMDhlNDAwNWY4NmQxNDczNiIsImVtYWlsIjoidmx3MDQsImV4cCI6MTcyNTYwODkwNH0.ReWjyAgo2dsO1Kpbqrn0tfpaFK89YLXM3J39pGXpG4E'
  })
  @ApiCreatedResponse({
    description: 'Comment publication created',
    type: CommentRdo
  })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  public async create(@Request() req, @Body() dto: CreateCommentDto) {
    const {id} = req.user as TokenPayload

    const updateDto = {
      ...dto,
      idAuthorComment: id
    }

    const existComment = await this.publicationCommentService.create(updateDto);
    return fillObject(CommentRdo, existComment);
  }

  @ApiFoundResponse({
    description: 'Found a comment',
    type: CommentRdo
  })
  @Get('list')
  public async index(@Body() {idPost}: Publication) {
    const commentsList = await this.publicationCommentService.findById(idPost);
    return fillObject(CommentRdo, commentsList)
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'accessToken',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2Q3MGZlMDhlNDAwNWY4NmQxNDczNiIsImVtYWlsIjoidmx3MDQsImV4cCI6MTcyNTYwODkwNH0.ReWjyAgo2dsO1Kpbqrn0tfpaFK89YLXM3J39pGXpG4E'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comment or comments deleted',
    example: 'Comments have been 4 deleted'
  })
  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  public async delete(@Request() req, @Body() dataPost: Publication) {
    const {id} = req.user as TokenPayload

    const updateDataPost = {
      ...dataPost,
      idAuthorComment: id
    }

    const {count} = await this.publicationCommentService.delete(updateDataPost);

     return `Comments have been ${count} deleted`
  }
}
