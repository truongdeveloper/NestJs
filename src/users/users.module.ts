import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UserProviders } from "./entity/user.providers";
import { DatabaseModule } from "src/database/database.module";
import { UsersDatabaseService } from "./users-database.service";
import { ShareModule } from "src/common/share.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [DatabaseModule, ShareModule],
  controllers: [UsersController],
  providers: [
    ...UserProviders,
    UsersService, UsersDatabaseService],
  exports: [UsersDatabaseService]
})
export class UsersModule {}
