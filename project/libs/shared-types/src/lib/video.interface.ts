import { Comment } from "./comment.interface";

export interface Video {
  id?: number;
  namePublication: string;
  linkVideo: string;
  setTag?: string[];
  authorPublication?: string;
  typePublication?: string;
  countLike?: number;
  comments?: Comment[];
  dateCreation?: Date;
  datePublication?: Date;
  state: string;
  originolAuthor?: string | boolean;
  repost?: string | boolean;
  originolId?: string | boolean;
}
