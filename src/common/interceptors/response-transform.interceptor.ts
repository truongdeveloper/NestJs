 

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { catchError, map, Observable, of } from "rxjs";

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
      }),
    );
  }
}
