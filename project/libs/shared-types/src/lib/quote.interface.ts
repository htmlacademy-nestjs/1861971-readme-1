import { VideoState } from './video-state.enum';
import { TypePublication } from './type-publication.enum';

export interface Quote {
  id?: string
  textQuote: string;
  setTag: string;
  authorQuote: string;
  typePublication?: TypePublication;
  countLike?: number;
  countComments?: string[];
  dateCreation?: string;
  datePublication?: string;
  state?: VideoState;
  originolAuthor?: string | boolean;
  repost?: string | boolean;
  originolId?: string | boolean;
}
