import { Comment } from "./comment.interface";

export interface Link {
  id?: number
  link: string;
  description: string;
  setTag?: string[];
  idAuthorLink?: string;
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
