import {ApiProperty} from '@nestjs/swagger';
import {Expose, Transform} from 'class-transformer';

export class Photo {
  @ApiProperty({
    description: 'Unique photo id',
    example: 1
  })
  @Expose()
  id: number;

  @ApiProperty({
    example: 'bild.jpg'
  })
  @Expose()
  photo: string;

  @ApiProperty({
    example:'прогулка'
  })
  @Expose()
  setTag: string[];

  @ApiProperty({
    example: 'Vlad'
  })
  @Expose()
  authorPublication: string;

  @ApiProperty({
    description: 'Your publicashon corresponds to the type of publication',
    example: 'photo'
  })
  @Expose()
  typePublication: string;

  @ApiProperty({
    example: 2
  })
  @Expose()
  countLike: number;

  @ApiProperty({
    example: 3
  })
  @Expose({name: 'comments'})
  @Transform(({ value }) => value.length)

  @ApiProperty({
    example: '2024-08-17 18:06:41.519'
  })
  @Expose()
  dateCreation: Date;

  @ApiProperty({
    example: '2024-08-17 18:06:41.519'
  })
  @Expose()
  datePublication: Date;

  @ApiProperty({
    description: 'State after creation is "Опубликована"',
    example: 'Опубликована'
  })
  @Expose()
  state: string;

  @ApiProperty({
    description: 'If value is an empty string then the value "false" or the information about the original author is preserved',
    example: false
  })
  @Expose()
  originolAuthor: string | boolean;

  @ApiProperty({
    description: 'If value is an empty string then the value "false" or the "Репост" attribute is fixed',
    example: 'Репост'
  })
  @Expose()
  repost: string | boolean;

  @ApiProperty({
    description: 'If value is an empty string then the value "false" or the unique id of the original publication is retained',
    example: 4
  })
  @Expose()
  originolId: string | boolean;
}
