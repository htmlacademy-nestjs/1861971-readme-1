import { VideoState } from './video-state.enum';
import { TypePublication } from './type-publication.enum';

export interface Link {
  id?: string
  link: string;
  description: string;
  setTag: string;
  authorLink: string;
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
