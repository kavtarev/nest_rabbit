import { DynamicModule, FactoryProvider, Module } from '@nest_rabbit/nest';
import { IMetrics } from './interface';
import { PrometheusService } from './prom';

const OPTS = 'OPTS';
export const PROM = 'PROM';

@Module({})
export class MetricsModule {
    static forRoot(
        options: Omit<FactoryProvider<Promise<IMetrics> | IMetrics>, 'provide'>,
    ): DynamicModule {
        return {
            global: true,
            module: MetricsModule,
            providers: [
                {
                    provide: OPTS,
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
                {
                    provide: PROM,
                    useFactory: (opts: IMetrics) => {
                        if (opts.disabled) {
                            return {};
                        }

                        return new PrometheusService(opts.port);
                    },
                    inject: [OPTS],
                },
            ],
            exports: [PROM],
        };
    }
}
