import { Controller, Get } from '@nest_rabbit/nest';

@Controller()
export class TrialModuleController {
  @Get('trial')
  async execute() {
    return 42;
  }
}
