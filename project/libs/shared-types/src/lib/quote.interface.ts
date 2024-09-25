import { Comment } from "./comment.interface";

export interface Quote {
  id?: number;
  textQuote: string;
  setTag?: string[];
  authorQuote?: string;
  idAuthorPublication?: string;
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
