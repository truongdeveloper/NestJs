/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { usersData } from "./entity/user";
import { UserEntity } from "./entity/user.entity";
import { UserQueryDTO } from "./dto/user-query.dto";
import { Repository } from "typeorm";
import { PasswordService } from "src/auth/password.service";

@Injectable()
export class UsersDatabaseService {
  constructor(
    @Inject("USER_REPOSITORY")
    private userRepository: Repository<UserEntity>,
    private passwordService: PasswordService
  ) {}

  private data = usersData;
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .where("user.email = :email", { email: createUserDto.email })
      .getOne();
    if (user) {
      throw new ConflictException("User is Exist");
    }
    createUserDto.password = await this.passwordService.hashPassword(
      createUserDto.password
    );
    console.log(createUserDto.password)
    await this.userRepository.save(createUserDto);
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
      const user = await this.userRepository
        .createQueryBuilder("user")
        .where("user.id = :id", { id: id })
        .getOne();
      if (user) {
        const { password, ...result } = user;
        return result;
      }
    } catch (error) {
      return error;
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.userRepository
        .createQueryBuilder("user")
        .where("user.email = :email", { email: email })
        .getOne();
    } catch (error) {
      return error;
    }
  }

  async update(
    id: string,
    updateUserDto:
      | Omit<CreateUserDto, "password" | "id">
      | { refreshToken?: string }
  ) {
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
