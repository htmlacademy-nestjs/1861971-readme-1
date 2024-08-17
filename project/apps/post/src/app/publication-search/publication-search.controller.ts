import {
  Controller,
  //Get,
  //Body
 } from '@nestjs/common';

 //import { CreateSearchDto } from './dto/creat-search.dto';
 import { PublicationSearchService } from './publication-search.service';

@Controller('search')
export class PublicationSearchController {
  constructor(
    private readonly publicationSearchService: PublicationSearchService
  ){}
/*
  @Get('publication')
  public async index(@Body() {word}: CreateSearchDto) {
    const publicationsList = await this.publicationSearchService.index(word);
    return publicationsList;
  }
    */
}
