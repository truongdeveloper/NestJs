 
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
 
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const getStatus = (exception: any): number => {
      if (exception instanceof HttpException){
        return exception.getStatus();
      }else {
        return HttpStatus.BAD_GATEWAY
      }
    };
    const status = getStatus(exception);


    response.status(status).json({
      ok: 0,
      data: null,
      error: exception?.response ?? exception,
    });
  }
}
