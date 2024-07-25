import { Comment } from "@project/shared-types";

export interface CommentInterface {
  create(dto: Comment): Promise<Comment>;
  findById(idList: string[]): Promise<Comment[]>;
  destroy(idList: string[]): Promise<void>;
}
