import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  getServerResponse(name: string): string {
    const random = Math.random();
    return name + random;
  }
}
