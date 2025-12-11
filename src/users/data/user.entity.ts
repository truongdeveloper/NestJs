import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { roleType } from "../dto/create-user.dto";

@Entity()
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column('text')
  fistName: string;
  @Column('text')
  lastName: string;
  @Column('text')
  email: string;
  @Column('text')
  role: string;
  @Column('text')
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
