import { Body, Controller, Post } from '@nest_rabbit/nest';
import { CreateUserDto } from './create-user.dto';
import { CreateUserUsecase } from './create-user.usecase';

@Controller()
export class CreateUserController {
  constructor(
    private readonly usecase: CreateUserUsecase,
  ) {}

  @Post('create')
  async execute(
    @Body() dto: CreateUserDto,
  ) {
    const user = await this.usecase.execute(dto.name);
    return user;
  }
}
