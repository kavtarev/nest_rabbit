/* eslint-disable */
import { PROM, UseMetrics } from '@nest_rabbit/metrics';
import { Body, Controller, Inject, Post } from '@nest_rabbit/nest';
import { CreateUserDto } from './create-user.dto';
import { CreateUserUsecase } from './create-user.usecase';

const PrintLog = (
    target: object,
    name: string,
    descriptor: TypedPropertyDescriptor<any>
) => {
    const className = target.constructor.name;
    const original = descriptor.value;

    descriptor.value = function (...args: any) {
        console.log(
            `Call with args: ${JSON.stringify(args)}`,
            `${className}#${name}`
        );
        const result = original.apply(this, args);
        return result;
    };
};

@Controller()
export class CreateUserController {
    constructor(
        @Inject(PROM)
        prom: any,
        private readonly usecase: CreateUserUsecase
    ) {}

    @Post('create')
    @UseMetrics()
    async execute(@Body() dto: CreateUserDto) {
        const user = await this.usecase.execute(dto.name);
        return 'user';
    }
}
