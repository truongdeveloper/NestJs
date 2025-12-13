/* eslint-disable @typescript-eslint/require-await */
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local-strategy.service";
import { UsersModule } from "src/users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { ConfigModule } from "@nestjs/config";
import { RefreshTokenStrategy } from "./strategy/jwt-refresh-token.strategy";
import { ENV } from "src/common/environment-variables.service";
import { ShareModule } from "src/common/share.module";

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, PassportModule, JwtModule.registerAsync({
    imports: [ShareModule],
    useFactory: async (env: ENV) => ({
      secret: env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: env.TIME_EXPIRE
      }
    }),
    inject: [ENV]
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokenStrategy],
  exports: [AuthService]
})
export class AuthModule {}