import { Comment } from "./comment.interface";

export interface Photo {
  id?: number
  photo: string;
  setTag: string;
  authorPhoto: string;
  typePublication?: string;
  countLike?: number;
  comments?: Comment[];
  dateCreation?: Date;
  datePublication?: Date;
  state?: string;
  originolAuthor?: string | boolean;
  repost?: string | boolean;
  originolId?: string | boolean;
}
