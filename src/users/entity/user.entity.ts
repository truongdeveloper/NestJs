import { Column, Entity, IsNull, PrimaryGeneratedColumn } from "typeorm";
import { roleType } from "../dto/create-user.dto";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column("text")
  fistName: string;
  @Column("text")
  lastName: string;
  @Column("text")
  email: string;
  @Column("text")
  role: string;
  @Column("text")
  password: string;

  @Column({ nullable: true, type: "text" })
  refreshToken!: string | null

  constructor(
    id: string,
    fistName: string,
    lastName: string,
    email: string,
    role: roleType,
    password: string
  ) {
    this.id = id;
    this.fistName = fistName ?? "";
    this.lastName = lastName ?? "";
    this.email = email ?? "";
    this.role = role ?? "USER";
    this.password = password ?? "";
  }
}
