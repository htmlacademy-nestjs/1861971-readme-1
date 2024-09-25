import { IsEmail, IsNotEmpty } from 'class-validator';

import { MessageSubscriber } from '@project/validation-message';

export class CreateSubscriberDto {
  @IsEmail({}, { message: MessageSubscriber.incorrectEmail })
  public email: string;

  @IsNotEmpty({ message: MessageSubscriber.incorrectFirstname })
  public firstname: string;
}
