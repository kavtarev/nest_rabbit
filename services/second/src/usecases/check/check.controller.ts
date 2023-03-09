import { Controller, Get } from '@nest_rabbit/nest';
import { CheckUsecase } from './check.usecase';

@Controller()
export class CheckController {
  constructor(
    private readonly usecase: CheckUsecase,
  ) {}

  @Get('trial')
  async execute() {
    // const check = await this.usecase.execute('ss');
    return 'check';
  }
}
