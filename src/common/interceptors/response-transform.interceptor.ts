import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

interface Response {
  ok: number;
  d: any;
  e: any;
}
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response> {
    return next.handle().pipe(
      map((data) => {
        return { ok: 1, d: data, e: null };
      })
    );
  }
}
