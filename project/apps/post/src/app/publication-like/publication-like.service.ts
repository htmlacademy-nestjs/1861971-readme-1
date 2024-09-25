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
import { DetailsVideoRdo } from '../publication-video/rdo/details-video.rdo';
import { DetailsTextRdo } from '../publication-text/rdo/details-text.rdo';
import { DetailsQuoteRdo } from '../publication-quote/rdo/details-quote.rdo';
import { DetailsPhotoRdo } from '../publication-photo/rdo/details-photo.rdo';
import { DetailsLinkRdo } from '../publication-link/rdo/details-quote.rdo';
import { ValuePublication } from '../publication-video/publication.enum';
import { ValuePublicationText } from '../publication-text/publication.enum';
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

  public async show(parameter: LikeDto, idUser: string) {
    const {typePublication, idPublication} = parameter;

    switch (typePublication) {
      case TypePublication.Video: {
        const dataPublication: Video = await this.blogVideoRepository
        .addLike({idUser, idPublication});

        if (! dataPublication) {
          throw new NotFoundException(ValuePublication.VideoNotFound);
        }

        return {
          dataPublication,
          rdo: DetailsVideoRdo
        };
      }
      case TypePublication.Text: {
        const dataPublication: Text = await this.blogTextRepository
        .addLike({idUser, idPublication});

        if (! dataPublication) {
          throw new NotFoundException(ValuePublicationText.TextNotFound);
        }

        return {
          dataPublication,
          rdo: DetailsTextRdo
        };
      }
      case TypePublication.Quote: {
        const dataPublication: Quote = await this.blogQuoteRepository
        .addLike({idUser, idPublication});

        if (! dataPublication) {
          throw new NotFoundException(ValuePublicationQuote.QuoteNotFound);
        }

        return {
          dataPublication,
          rdo: DetailsQuoteRdo
        };
      }
      case TypePublication.Photo: {
        const dataPublication: Photo = await this.blogPhotoRepository
        .addLike({idUser, idPublication});

        if (! dataPublication) {
          throw new NotFoundException(ValuePublicationPhoto.PhotoNotFound);
        }

        return {
          dataPublication,
          rdo: DetailsPhotoRdo
        };
      }
      case TypePublication.Link: {
        const dataPublication: Link = await this.blogLinkRepository
        .addLike({idUser, idPublication});

        if (! dataPublication) {
          throw new NotFoundException(ValuePublicationLink.LinkNotFound);
        }

        return {
          dataPublication,
          rdo: DetailsLinkRdo
        };
      }
    };
  }
}
