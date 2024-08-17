import {Prisma} from "@prisma/client";

import { Comment } from "@project/shared-types";
import { Publication } from "../publication-comment/dto/id-list.dto";

export interface CommentInterface {
  create(dto: Comment): Promise<Comment>;
  findById(idPost: number, count: number): Promise<Comment[] | []>;
  destroy(idList: Publication): Promise<Prisma.BatchPayload>;
}
