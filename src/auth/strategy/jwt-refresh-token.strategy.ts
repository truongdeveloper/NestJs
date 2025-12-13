/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { ENV } from "src/common/environment-variables.service";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh-token"
) {
  constructor(private env: ENV) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField("refresh_token"),
      secretOrKey: env.JWT_SECRET_REFRESH_KEY,
      passReqToCallback: true,
    });
  }
  validate(req: Request, payload: any) {
    const refreshToken = req.body['refresh_token']
    return {
      sub: payload.id,
      refreshToken: refreshToken,
    };
  }
}
