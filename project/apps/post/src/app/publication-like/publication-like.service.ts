import { Injectable, NotFoundException } from '@nestjs/common';

import { BlogVideoRepository } from '../blog-video/blog-video.repository';
import { BlogTextRepository } from '../blog-text/blog-text.repository';
import { BlogQuoteRepository } from '../blog-quote/blog-quote.repository';
import { BlogPhotoRepository } from '../blog-photo/blog-photo.repository';
import { BlogLinkRepository } from '../blog-link/blog-link.repository';
import {
  TypePublication,
  Video,
  Text,
  Quote,
  Photo,
  Link,

} from '@project/shared-types';

import { LikeDto } from './dto/like.dto';
//import { DetailsVideoRdo } from '../publication-video/rdo/details-video.rdo';
//import { DetailsTextRdo } from '../publication-text/rdo/details-text.rdo';
import { DetailsQuoteRdo } from '../publication-quote/rdo/details-quote.rdo';
import { DetailsPhotoRdo } from '../publication-photo/rdo/details-photo.rdo';
import { DetailsLinkRdo } from '../publication-link/rdo/details-quote.rdo';
//import { ValuePublication } from '../publication-video/publication.enum';
//import { ValuePublicationText } from '../publication-text/publication.enum';
import { ValuePublicationQuote } from '../publication-quote/publication.enum';
import { ValuePublicationPhoto } from '../publication-photo/publication.enum';
import { ValuePublicationLink } from '../publication-link/publication.enum';

@Injectable()
export class PublicationLikeService {
  constructor(
    private readonly blogVideoRepository: BlogVideoRepository,
    private readonly blogTextRepository: BlogTextRepository,
    private readonly blogQuoteRepository: BlogQuoteRepository,
    private readonly blogPhotoRepository: BlogPhotoRepository,
    private readonly blogLinkRepository: BlogLinkRepository
  ){}

  public async show(parameter: LikeDto) {
    const {typePublication, nameUser, idPublication} = parameter;

    let dataPublication: Video | Text | Quote | Photo | Link;
/*
    switch (typePublication) {
      case TypePublication.Video:
        dataPublication = await this.blogVideoRepository
        .addLike({nameUser, idPublication});

        if (! dataPublication) {
          throw new NotFoundException(ValuePublication.VideoNotFound);
        }

        return {
          dataPublication,
          rdo: DetailsVideoRdo
        };

      case TypePublication.Text:
        dataPublication = await this.blogTextRepository
        .addLike({nameUser, idPublication});

        if (! dataPublication) {
          throw new NotFoundException(ValuePublicationText.TextNotFound);
        }

        return {
          dataPublication,
          rdo: DetailsTextRdo
        };
      case TypePublication.Quote:
        dataPublication = await this.blogQuoteMemoryRepository
        .addLike({nameUser, idPublication});

        if (! dataPublication) {
          throw new NotFoundException(ValuePublicationQuote.QuoteNotFound);
        }

        return {
          dataPublication,
          rdo: DetailsQuoteRdo
        };

      case TypePublication.Photo:
        dataPublication = await this.blogPhotoMemoryRepository
        .addLike({nameUser, idPublication});

        if (! dataPublication) {
          throw new NotFoundException(ValuePublicationPhoto.PhotoNotFound);
        }

        return {
          dataPublication,
          rdo: DetailsPhotoRdo
        };

      case TypePublication.Link:
        dataPublication = await this.blogLinkMemoryRepository
        .addLike({nameUser, idPublication});

        if (! dataPublication) {
          throw new NotFoundException(ValuePublicationLink.LinkNotFound);
        }

        return {
          dataPublication,
          rdo: DetailsLinkRdo
        };
    };
    */
  }
}
