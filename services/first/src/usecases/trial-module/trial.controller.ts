import { Controller, Get } from '@nest_rabbit/nest';
import { TrialUsecase } from './trial.usecase';

@Controller()
export class TrialController {
  constructor(
    private readonly usecase: TrialUsecase,
  ) {}

  @Get('trial')
  async execute() {
    await this.usecase.execute();
    return 42;
  }
}
