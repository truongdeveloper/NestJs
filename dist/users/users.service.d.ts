import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./data/user.entity";
export declare class UsersService {
    private data;
    create(createUserDto: CreateUserDto): boolean;
    findAll(query: {
        page: number;
        limit: number;
    }): {
        data: UserEntity[];
        total: number;
    };
    findOne(id: string): UserEntity | "User not exist";
    update(id: string, updateUserDto: CreateUserDto): string;
    remove(id: string): true | "Id not exist";
    mapUser(user: CreateUserDto, id: string): UserEntity;
}
