import {
  Controller,
  Patch,
  Body
} from '@nestjs/common';

import { PublicationLikeService } from './publication-like.service';
import { LikeDto } from './dto/like.dto';
import { fillObject } from '@project/util-core';

@Controller('like')
export class PublicationLikeController {

  constructor(
    private readonly publicationLikeService: PublicationLikeService
  ){}
/*
  @Patch('redaction')
  public async show(@Body() body: LikeDto) {
    const parameter: {dataPublication, rdo} = await this.publicationLikeService.show(body);
    const {rdo, dataPublication} = parameter;
    return fillObject(rdo, dataPublication)
  }
    */
}
