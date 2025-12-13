import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PasswordService } from "src/auth/password.service";
import { ENV } from "./environment-variables.service";

@Global()
@Module({
  imports: [ConfigModule],
  providers: [PasswordService, ENV],
  exports: [PasswordService, ENV]
})
export class ShareModule {}