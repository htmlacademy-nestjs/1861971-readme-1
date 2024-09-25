import { ConfigService } from '@nestjs/config';

import { getRabbitMQConnectionString } from '@project/util-core';

export function getRabbitMQOptions() {
  return {
    useFactory: async (config: ConfigService) => ({
      exchanges: [
        {
          name: config.get<string>('rabbit.queue'),
          type: 'direct'
        }
      ],
      uri:getRabbitMQConnectionString(
        config.get<string>('rabbit.user') as string,
        config.get<string>('rabbit.password') as string,
        config.get<string>('rabbit.host') as string,
        config.get<string>(`rabbit.port`) as string,
      ),
      connectionInitOptions: { wait: true },
      enableControllerDiscovery: true,
    }),
    inject: [ConfigService]
  }

}
