import { Injectable, InjectRepository, Repository } from '@nest_rabbit/nest';
import { TrialEntity } from '../../core/trial/trial.entity';

@Injectable()
export class TrialUsecase {
  constructor(
    @InjectRepository(TrialEntity)
    private repo: Repository<TrialEntity>,
  ) {}

  async execute() {
    await this.repo.save({ name: 'guga' });
  }
}
