import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ENV {
  public PORT: number | undefined; 
  public SALT_HASH_PASS: number; 
  public JWT_SECRET_KEY: string;
  public JWT_SECRET_REFRESH_KEY: string;
  public TIME_EXPIRE: any;
  public TIME_EXPIRE_REFRESH_TOKEN: any
  
  constructor(private configService: ConfigService) {
    this.PORT = this.configService.get<number>('PORT');
    this.SALT_HASH_PASS = this.configService.get<number>('SALT_HASH_PASS') ?? 10

    this.JWT_SECRET_KEY = this.configService.get<string>('JWT_SECRET_KEY') ?? 'devngukiemsong';
    this.JWT_SECRET_REFRESH_KEY = this.configService.get<string>('JWT_SECRET_REFRESH_KEY') ?? 'devkhonkiemtien';
    this.TIME_EXPIRE = this.configService.get<string>('TIME_EXPIRE');
    this.TIME_EXPIRE_REFRESH_TOKEN = this.configService.get<string>('TIME_EXPIRE_REFRESH_TOKEN');
  }
}