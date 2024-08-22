import { Comment } from "./comment.interface";

export interface Quote {
  id?: number;
  textQuote: string;
  setTag: string;
  authorQuote: string;
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
