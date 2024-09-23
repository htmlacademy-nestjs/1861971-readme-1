import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  UseFilters,
  Req,
  Param
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {Request} from 'express';

import { AxiosExceptionFilter } from '@project/exception-filter';
import { ApplicationServiceURL } from '@project/shared-types';
import { CreateVideoDto } from './dto/creat-video.dto';
import { DetailsVideoRdo } from './rdo/details-video.rdo';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { UserRdo } from './rdo/user.rdo';
import { Video } from './rdo/video.rdo';


@Controller('video')
@UseFilters(AxiosExceptionFilter)
export class VideoController {
  private dataAuthor: UserRdo;

  constructor(
    private readonly httpService: HttpService,
  ) {
    this.dataAuthor
  }

  @Post('publication')
  public async create(@Req() {headers}: Request, @Body() dto: CreateVideoDto): Promise<DetailsVideoRdo> {
    const {authorization} = headers

    const {data} = await this.httpService.axiosRef
    .post<DetailsVideoRdo>(`${ApplicationServiceURL.Video}${ApplicationServiceURL.Publication}`,
      dto,
      {headers: {'authorization': authorization}}
    );

    const userAvatar = await this.httpService.axiosRef
    .get<UploadedFileRdo>(`${ApplicationServiceURL.Uploader}/${data.nameAuthor.avatar}`);

    const video = {
      ...data,
      nameAuthor: {
        ...data.nameAuthor,
        avatar: userAvatar.data
      }
    }

    this.dataAuthor = data.nameAuthor;

    return video
  }

  @Get(':id')
  public async show(@Param('id') id: string) {

    const {data} = await this.httpService.axiosRef
    .get<Video>(`${ApplicationServiceURL.Video}/${id}`);

    const userAvatar = await this.httpService.axiosRef
    .get<UploadedFileRdo>(`${ApplicationServiceURL.Uploader}/${this.dataAuthor.avatar}`);

    const video = {
      ...data,
      nameAuthor: {
        ...this.dataAuthor,
        avatar: userAvatar.data
      }
    }

    delete video.idAuthorPublication

    return video
  }

  @Delete(':id')
  public async delete(@Req() {headers}: Request, @Param('id') id: string): Promise<Video> {
    const {authorization} = headers

    const {data} = await this.httpService.axiosRef
    .delete<Video>(`${ApplicationServiceURL.Video}/${id}`,
      {headers: {'authorization': authorization}}
    );

    return data
  }

  @Patch(':id')
  public async update(@Req() {headers}: Request, @Param('id') id: string, @Body() dto: CreateVideoDto): Promise<DetailsVideoRdo> {
    const {authorization} = headers

    const {data} = await this.httpService.axiosRef
    .patch<DetailsVideoRdo>(`${ApplicationServiceURL.Video}/${id}`,
      dto,
      {headers: {'authorization': authorization}}
    );

    const userAvatar = await this.httpService.axiosRef
    .get<UploadedFileRdo>(`${ApplicationServiceURL.Uploader}/${data.nameAuthor.avatar}`);

    const video = {
      ...data,
      nameAuthor: {
        ...data.nameAuthor,
        avatar: userAvatar.data
      }
    }

    return video
  }

  @Post(':id')
  public async repost(@Req() {headers}: Request, @Param('id') idPublication: string) {
    const {authorization} = headers

    const {data} = await this.httpService.axiosRef
    .post<Video>(`${ApplicationServiceURL.Video}/${idPublication}}`,
      {headers: {'authorization': authorization}}
    );

    const userAvatar = await this.httpService.axiosRef
    .get<UploadedFileRdo>(`${ApplicationServiceURL.Uploader}/${this.dataAuthor.avatar}`);

    const video = {
      ...data,
      nameAuthor: {
        ...this.dataAuthor,
        avatar: userAvatar.data
      }
    }

    delete video.idAuthorPublication

    return video
  }
}
