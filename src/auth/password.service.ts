import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { ENV } from "src/common/environment-variables.service";

@Injectable()
export class PasswordService {

  constructor(
    @Inject()
    private configService: ConfigService, private env: ENV){}

  hashPassword(password: string): Promise<string> {

    return bcrypt.hash(password, Number(this.env.SALT_HASH_PASS));
  }

  comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
