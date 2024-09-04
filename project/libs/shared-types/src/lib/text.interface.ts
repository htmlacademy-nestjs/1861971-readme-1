import { Comment } from './comment.interface';

export interface Text {
  id?: number
  namePublication: string;
  announcementPublication: string;
  textPublication: string;
  setTag?: string[];
  authorPublication?: string;
  typePublication?: string;
  countLike?: string[];
  comments?: Comment[];
  dateCreation?: Date;
  datePublication?: Date;
  state: string;
  originolAuthor?: string | boolean;
  repost?: string | boolean;
  originolId?: string | boolean;
}
