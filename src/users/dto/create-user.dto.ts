import { Allow, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsStrongPassword, MinLength } from "class-validator";
export enum roleType {ADMIN = 'ADMIN' , USER = 'USER', ANONYMOUS = 'ANONYMOUS'}

export class CreateUserDto {
  
  @IsNotEmpty()
  @Allow()
  fistName: string;

  @IsNotEmpty()
  @Allow()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Allow()
  @IsOptional()
  @IsEnum(roleType, {message: "Role must be enum value"})
  role: roleType;
  
  @MinLength(6, {
    message: "Password must be 6 character"
  })
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minSymbols: 1
  }, {
    message: "Password is not strong enough"
  })
  password: string;
}
