import {
 Injectable, Inject, InjectRepository, Repository, Logger,
} from '@nest_rabbit/nest';
import { CHANNEL, Channel, Queues } from '@nest_rabbit/rabbit';
import { ConsumeMessage } from 'amqplib';
import { UserEntity } from '../../core/user/user.entity';

@Injectable()
export class VerifyUserUsecase {
  logger = new Logger(VerifyUserUsecase.name);

  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
    @Inject(CHANNEL)private channel: Channel,
  ) {
    this.channel.subscribe(Queues.VERIFY_USER, (msg: ConsumeMessage) => this.doSome(msg));
  }

  async doSome(msg: ConsumeMessage) {
    const queueResult = JSON.parse(msg.content.toString());
    await this.repo.save({ id: queueResult.id, checkPassed: true });
    await this.channel.ack(msg);
  }
}
