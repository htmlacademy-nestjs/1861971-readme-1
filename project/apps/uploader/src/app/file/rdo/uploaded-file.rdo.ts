import { Expose } from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class UploadedFileRdo {
  @ApiProperty({
    description: 'User unique image',
    example: 2
  })
  @Expose()
  public id: string;

  @ApiProperty({
    name: 'cat.jpg'
  })
  @Expose()
  public originalName: string;

  @ApiProperty({
    example: '5f65dadc-641c-474e-a679-05bffc55c542.png'
  })
  @Expose()
  public hashName: string;

  @ApiProperty({
    example: 'png'
  })
  @Expose()
  public mimetype: string;

  @ApiProperty({
    example: 22811
  })
  @Expose()
  public size: number;

  @ApiProperty({
    example: '/2024/08/5f65dadc-641c-474e-a679-05bffc55c542.png'
  })
  @Expose()
  public path: string;
}
