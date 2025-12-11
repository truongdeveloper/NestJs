import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UserProviders } from "./user.providers";
import { DatabaseModule } from "src/database/database.module";
import { UsersDatabaseService } from "./users-database.service";

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    ...UserProviders,
    UsersService, UsersDatabaseService],
})
export class UsersModule {}
