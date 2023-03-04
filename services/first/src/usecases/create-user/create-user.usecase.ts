import { Injectable, InjectRepository, Repository } from '@nest_rabbit/nest';
import { randomUUID } from 'crypto';
import { UserEntity } from '../../core/user/user.entity';

@Injectable()
export class CreateUserUsecase {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
  ) {}

  async execute(name: string) {
    return this.repo.save({ name, id: randomUUID() });
  }
}
