import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BlogFileEntity } from './blog-file-entity';
import { BlogFileModule } from './blog-file.module';
import { File } from '@project/shared-types';

@Injectable()
export class BlogFileRepository {
  constructor(
    @InjectModel(BlogFileModule.name) private readonly blogFileModel: Model<BlogFileEntity>
  ) {}

  public async create(item: BlogFileEntity): Promise<File> {
    const file = new this.blogFileModel(item);
    return file.save();
  }

  public async findById(id: string): Promise<File | null> {
    return this.blogFileModel
      .findOne({ _id: id})
      .exec();
  }
}
