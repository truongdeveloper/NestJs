import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { WebSocketModule } from "./websocket/websocket.module";
import { AuthModule } from "./auth/auth.module";
import { ShareModule } from "./common/share.module";

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), UsersModule, WebSocketModule, AuthModule, ShareModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
