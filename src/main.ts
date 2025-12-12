import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ResponseTransformInterceptor } from "./common/interceptors/response-transform.interceptor";
import { AllExceptionFilter } from "./common/interceptors/error-response";
import { WsAdapter } from "@nestjs/platform-ws";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }))
  app.useGlobalInterceptors(new ResponseTransformInterceptor())
  app.useGlobalFilters(new AllExceptionFilter())
  app.useWebSocketAdapter(new WsAdapter(app, {
    messageParser: (message: string) => {
      const {t, d} = JSON.parse(message.toString());
      return {event: t, data: d}
    } 
  }))
  app.enableCors({
    origin: ["http://localhost:5158"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  });
  await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
