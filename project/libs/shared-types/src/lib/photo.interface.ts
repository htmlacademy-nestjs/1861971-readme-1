import { Comment } from "./comment.interface";

export interface Photo {
  id?: number
  photo: string;
  setTag?: string[];
  idAuthorPhoto?: string;
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
