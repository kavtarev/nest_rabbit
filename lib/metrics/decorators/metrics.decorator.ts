import {
  applyDecorators,
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nest_rabbit/nest';
import {
 catchError, Observable, tap, throwError,
} from 'rxjs';
import { PrometheusService } from '../prom';
import { PROM } from '../metrics.module';

@Injectable()
class UseMetricsInterceptor implements NestInterceptor {
  constructor(@Inject(PROM) private metrics: PrometheusService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const routerName = context.getClass().name;
    const methodName = context.getHandler().name;

    const fullRoute = `${routerName}/${methodName}`;

    const { finish, finishWithError } = this.metrics.registerMetrics(fullRoute);

    return next.handle().pipe(
      tap(() => {
        console.log('in interceptor');

        finish();
      }),
      catchError((err) => {
        finishWithError();
        return throwError(() => err);
      }),
    );
  }
}

export const UseMetrics = () => applyDecorators(UseInterceptors(UseMetricsInterceptor));
