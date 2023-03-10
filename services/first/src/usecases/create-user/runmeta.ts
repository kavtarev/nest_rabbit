/* eslint-disable  */
import {
    DiscoveryService,
    Injectable,
    InstanceWrapper,
    MetadataScanner,
    OnApplicationBootstrap,
    Reflector,
} from '@nest_rabbit/nest';

@Injectable()
export class RunMeta implements OnApplicationBootstrap {
    constructor(
        private readonly discovery: DiscoveryService,
        private readonly metadataScanner: MetadataScanner,
        private readonly reflector: Reflector
    ) {}

    onApplicationBootstrap() {
        const instanceWrappers = this.discovery.getProviders();
        instanceWrappers.forEach((wrapper: InstanceWrapper) => {
            const { instance } = wrapper;
            if (!instance || !Object.getPrototypeOf(instance)) {
                return;
            }
            this.metadataScanner.scanFromPrototype(
                instance,
                Object.getPrototypeOf(instance),
                (key: string) =>
                    wrapper.isDependencyTreeStatic()
                        ? this.lookup(instance, key)
                        : this.warnForNonStaticProviders(wrapper, key)
            );
            // console.log(this.reflect.get('some', instance));
        });
    }
    warnForNonStaticProviders(w: any, s: any) {}

    lookup(instance: Record<string, Function>, key: string) {
        const methodRef = instance[key];
        const metricName = this.reflector.get('some', methodRef);

        if (metricName === 'some') {
            instance[key] = function (...args: any[]) {
                console.log(this, args);
            };
        }
        // console.log(methodRef,metricName);
    }
}
