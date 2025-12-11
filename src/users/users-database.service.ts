/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { usersData } from "./data/user";
import { UserEntity } from "./data/user.entity";
import { UserQueryDTO } from "./dto/user-query.dto";
import { Repository } from "typeorm";

@Injectable()
export class UsersDatabaseService {
  constructor(
    @Inject("USER_REPOSITORY")
    private userRepository: Repository<UserEntity>
  ) {}

  private data = usersData;
  async create(createUserDto: CreateUserDto) {
    try {
      await this.userRepository.save(createUserDto);
    } catch (error) {
      return false;
    }

    return true;
  }

  async findAll(query: UserQueryDTO) {
    try {
      const index = query.page * query.limit;
      const queryBuilder =
        this.userRepository.createQueryBuilder("user_entity");
      const total = await queryBuilder.getCount();
      const result = await queryBuilder
        .orderBy("id", "DESC")
        .skip(index)
        .take(query.limit)
        .getMany();

      return {
        data: result,
        total: total,
      };
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.userRepository
        .createQueryBuilder("user")
        .where("user.id = :id", { id: id })
        .getOne();
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateUserDto: CreateUserDto) {
    const result = await this.userRepository.update(id, updateUserDto);
    if (result.affected === 0) {
      throw new NotFoundException("User not found");
    }
    return Boolean(result.affected);
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException("User not found");
    }
    return Boolean(result.affected);
  }
}
