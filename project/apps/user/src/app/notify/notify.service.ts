import { Injectable, Inject } from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {ConfigType} from '@nestjs/config';

import {rebbitConfig} from '@project/config-users';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { RabbitRouting } from '@project/shared-types';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rebbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rebbitConfig>,
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish<CreateSubscriberDto>(
      this.rabbiOptions.exchange,
      RabbitRouting.AddSubscriber,
      { ...dto }
    );
  }
}
