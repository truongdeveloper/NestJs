import { roleType } from "../dto/create-user.dto";

export class UserEntity {
  id: string;
  fistName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;

  constructor(  id: string,
  fistName: string,
  lastName: string,
  email: string,
  role: roleType,
  password: string,) {
    this.id = id;
    this.fistName = fistName ?? ''
    this.lastName = lastName ?? ''
    this.email = email ?? ""
    this.role = role ?? 'user'
    this.password = password ?? ""
  }
}
