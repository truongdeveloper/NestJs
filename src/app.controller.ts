/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */

import {
  Controller,
  Get,
  Request,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { LocalAuthGuard } from "./auth/local -auth.service";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/guard/jwt-auth.guard";
import { JwtRefreshAuthGuard } from "./auth/guard/jwt-refresh-token.guard";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) {}

  @Get("/hello-world")
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("name")
  getName(@Query("name") name: string): string {
    return this.appService.getServerResponse(name);
  }

  @UseGuards(LocalAuthGuard)
  @Post("/auth/login")
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(LocalAuthGuard)
  @Post("/auth/logout")
  async logout(@Request() req: any) {
    return req.logout();
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post("/auth/refresh-token")
  async getToken(@Request() req: any) {
    const userId = req.user["sub"];
    const refreshToken = req.user["refreshToken"];
    return this.authService.refreshToken(userId, refreshToken);
  }
}
