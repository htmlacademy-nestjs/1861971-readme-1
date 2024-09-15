import { Subscriber } from '@project/shared-types';

export class EmailSubscriberEntity implements Subscriber {
  public id: string;
  public email: string;
  public firstname: string;
  public userId: string;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity) {
    this.email = entity.email;
    this.firstname = entity.firstname;
    this.id = entity.id ?? '';
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}
