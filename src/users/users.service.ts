import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { usersData } from "./data/user";
import { UserEntity } from "./data/user.entity";
import { UserQueryDTO } from "./dto/user-query.dto";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {

  private data = usersData
  create(createUserDto: CreateUserDto) {
    const id = crypto.randomUUID();
    const user = this.mapUser(createUserDto, id);
    this.data.push(user)
    return user;
  }

  findAll(query: UserQueryDTO) {
    const index = query.page * query.limit;
    return {data: this.data.slice(index,index + query.limit), total: this.data.length}
  }

  findOne(id: string) {
    const user = this.data.find((item) => item.id == id);
    if(user) {
      return user
    }else{
      return "User not exist"
    }
  }

  update(id: string, updateUserDto: CreateUserDto) {
    let user = null;
    this.data.every((item, index) => {
      if(item.id == id) {
        this.data[index] = this.mapUser(updateUserDto, id);
        user = this.data[index];
        return false;
      }
      return true;
    });
    if(!user) {
      return "Id not exist"
    }else {
      return user
    }
  }

  remove(id: string) {
    const index = this.data.findIndex((item) => item.id == id);
    if(index == -1) {
      return "Id not exist"
    }
    this.data.splice(index, 1);
    return true;
  }

  mapUser(user: CreateUserDto, id: string) {
    return new UserEntity(id, user.fistName, user.lastName, user.email, user.role, user.password);
  }
}
