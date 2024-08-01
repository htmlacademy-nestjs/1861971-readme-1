import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { User } from '@project/shared-types';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class BlogUserModel extends Document implements User {
  @Prop({
    required: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public firstName: string;

  @Prop({
    required: true,
  })
  public password: string;

  @Prop({
    required: true,
  })
  public avatar: string;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);
