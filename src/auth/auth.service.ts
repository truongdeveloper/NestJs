/* eslint-disable @typescript-eslint/no-unsafe-argument */

import {
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { UserEntity } from "src/users/entity/user.entity";
import { UsersDatabaseService } from "src/users/users-database.service";
import { PasswordService } from "./password.service";
import { JwtService } from "@nestjs/jwt";
import { ENV } from "src/common/environment-variables.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersDatabaseService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
    private env: ENV
  ) {}
  async validateUser(email: string, password: string) {
    const user: UserEntity = await this.userService.findByEmail(email);
    if (user) {
      const isMatch = await this.passwordService.comparePassword(
        password,
        user.password
      );
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload = {
      username: user.email,
      sub: user.id,
      fistName: user.fistName,
      lastName: user.lastName,
      role: user.role,
    }
    return await this.UpdateToken(user.id, payload);
  }
  async refreshToken(userId: any, refreshTokenRequest: any) {
    const user: UserEntity = await this.userService.findOne(userId);
    if (user.refreshToken !== refreshTokenRequest) {
      throw new ForbiddenException("Access Denied");
    }
    const { password, refreshToken, ...payload } = user;
    return await this.UpdateToken(user.id, payload)
  }

  private async generateToken(payload: any) {
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.env.JWT_SECRET_KEY,
        expiresIn: '1h'
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        secret: "devkhonkiemtien",
        expiresIn: '7d'
      }),
    };
  }

  private async UpdateToken(id: string, payload: any) {
    const tokens = await this.generateToken(payload);
    await this.userService.update(id, {
      refreshToken: tokens.refresh_token,
    });
    return tokens;
  }
}
