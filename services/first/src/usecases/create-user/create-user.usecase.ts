import {
    Injectable,
    InjectRepository,
    Repository,
    SetMetadata,
    Inject,
    Logger,
} from '@nest_rabbit/nest';
import { Channel, CHANNEL, Queues } from '@nest_rabbit/rabbit';
import { randomUUID } from 'crypto';
import { UserEntity } from '../../core/user/user.entity';

@Injectable()
export class CreateUserUsecase {
    logger = new Logger(CreateUserUsecase.name);

    constructor(
        @InjectRepository(UserEntity)
        private repo: Repository<UserEntity>,
        @Inject(CHANNEL) private channel: Channel
    ) {}

    async execute(name: string) {
        const user = await this.repo.save({
            name,
            id: randomUUID(),
            checkPassed: false,
        });
        const res = await this.channel.publish(Queues.CHECK_USER, user);
    }
}
