import { Injectable } from '@nestjs/common';
import {
    OnApplicationBootstrap,
    OnApplicationShutdown,
} from '@nest_rabbit/nest';
import { createServer, Server } from 'http';
import { collectDefaultMetrics, Gauge, Histogram, Registry } from 'prom-client';

export type PrometheusHistogram = Histogram<string>;

interface MapHistogram {
    [key: string]: Histogram<string>;
}

interface MapGauge {
    [key: string]: Gauge<string>;
}

@Injectable()
export class PrometheusService
    implements OnApplicationBootstrap, OnApplicationShutdown {
    private readonly serviceTitle = 'Backend-For-Frontend';

    private readonly servicePrefix = 'FrontendMetrics_';

    private registeredMetrics: MapHistogram = {};

    private registeredGauges: MapGauge = {};

    private readonly registry: Registry;

    private server: Server;

    public get metrics(): Promise<string> {
        return this.registry.metrics();
    }

    constructor(private port: number) {
        this.registry = new Registry();
        this.registry.setDefaultLabels({
            app: this.serviceTitle,
        });
        collectDefaultMetrics({
            register: this.registry,
            prefix: this.servicePrefix,
        });
    }

    onApplicationBootstrap() {
        this.start(this.port);
    }

    onApplicationShutdown(signal?: string) {
        this.shutDown();
    }
    /* eslint-disable */

    public registerMetrics(name: string) {
        if (this.registeredMetrics[name] === undefined) {
            const histogram = new Histogram({
                name: 'response_latency',
                help: 'Response latency histogram in seconds, grouped by route',
                labelNames: ['route', 'status'] as const,
                buckets: [0.5, 1, 1.5, 2, 2.5, 3],
            });
            this.registry.registerMetric(histogram);
            this.registeredMetrics[name] = histogram;
        }

        return this.startMonitoring(name, this.registeredMetrics[name]);
    }

    startMonitoring(name: string, histogram: Histogram) {
        const endTimer = histogram.startTimer();

        return {
            finish() {
                endTimer({ route: name, status: 'success' });
            },
            finishWithError() {
                endTimer({ route: name, status: 'fail' });
            },
        };
    }

    public registerGauge(name: string, help: string): Gauge<string> {
        if (this.registeredGauges[name] === undefined) {
            const gauge = (this.registeredGauges[name] = new Gauge({
                name: this.servicePrefix + name,
                help,
            }));
            this.registry.registerMetric(gauge);
            this.registeredGauges[name] = gauge;
        }
        return this.registeredGauges[name];
    }

    public removeSingleMetric(name: string): void {
        return this.registry.removeSingleMetric(name);
    }

    public clearMetrics(): void {
        this.registry.resetMetrics();
        return this.registry.clear();
    }

    private start(port: number) {
        this.server = createServer();

        this.server.on('request', async (req, res) => {
            if (req.url === '/metrics') {
                res.write(await this.metrics);
                res.statusCode = 200;
            } else {
                res.statusCode = 404;
                res.write('Not Found');
            }

            res.end();
        });

        this.server.on('error', () => {
            console.error('METRICS SERVER IS DOWN');
        });

        this.server.listen(port);
    }

    private shutDown() {
        this.server.close();
    }
}
