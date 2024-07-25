import { VideoState } from './video-state.enum';
import { TypePublication } from './type-publication.enum';

export interface Video {
  id?: string
  namePublication: string;
  linkVideo: string;
  setTag: string;
  authorPublication: string;
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
