import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): boolean;
    findAll(query: {
        page: number;
        limit: number;
    }): {
        data: import("./data/user.entity").UserEntity[];
        total: number;
    };
    findOne(id: string): import("./data/user.entity").UserEntity | "User not exist";
    update(id: string, updateUserDto: CreateUserDto): string;
    remove(id: string): true | "Id not exist";
}
