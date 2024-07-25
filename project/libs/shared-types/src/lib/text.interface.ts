import { VideoState } from './video-state.enum';

export interface Text {
  id?: string
  namePublication: string;
  announcementPublication: string;
  textPublication: string;
  setTag: string;
  authorPublication: string;
  typePublication?: string;
  countLike?: number;
  countComments?: string[];
  dateCreation?: string;
  datePublication?: string;
  state?: VideoState;
  originolAuthor?: string | boolean;
  repost?: string | boolean;
  originolId?: string | boolean;
}
