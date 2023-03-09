import {
 Inject, Injectable, InjectRepository, Logger, Repository,
} from '@nest_rabbit/nest';
import { Channel, CHANNEL, Queues } from '@nest_rabbit/rabbit';
import { ConsumeMessage } from 'amqplib';
import { CheckEntity } from '../../core/check/check.entity';

@Injectable()
export class CheckUsecase {
  logger = new Logger(CheckUsecase.name);

  constructor(
    @InjectRepository(CheckEntity)
    private repo: Repository<CheckEntity>,
    @Inject(CHANNEL)private channel: Channel,

  ) {
    this.channel.subscribe(Queues.CHECK_USER, (msg: ConsumeMessage) => this.execute(msg));
  }

  async execute(msg: ConsumeMessage) {
    const queueMessage = JSON.parse(msg.content.toString());
    await this.repo.save({ userId: queueMessage.id });
    this.channel.publish(Queues.VERIFY_USER, { id: queueMessage.id, isLegit: true });
    this.channel.ack(msg);
  }
}
