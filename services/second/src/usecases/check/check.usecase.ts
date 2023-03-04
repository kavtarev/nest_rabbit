import { Injectable, InjectRepository, Repository } from '@nest_rabbit/nest';
import { CheckEntity } from '../../core/check/check.entity';

@Injectable()
export class CheckUsecase {
  constructor(
    @InjectRepository(CheckEntity)
    private repo: Repository<CheckEntity>,
  ) {}

  async execute(userId: string) {
    await this.repo.save({ userId });
  }
}
