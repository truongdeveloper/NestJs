"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_1 = require("./data/user");
const user_entity_1 = require("./data/user.entity");
let UsersService = class UsersService {
    data = user_1.usersData;
    create(createUserDto) {
        const id = crypto.randomUUID();
        const user = this.mapUser(createUserDto, id);
        this.data.push(user);
        return true;
    }
    findAll(query) {
        const index = query.page * query.limit;
        return { data: this.data.slice(index, index + query.limit), total: this.data.length };
    }
    findOne(id) {
        const user = this.data.find((item) => item.id == id);
        if (user) {
            return user;
        }
        else {
            return "User not exist";
        }
    }
    update(id, updateUserDto) {
        let user = null;
        this.data.every((item, index) => {
            if (item.id == id) {
                this.data[index] = this.mapUser(updateUserDto, id);
                user = this.data[index];
                return false;
            }
            return true;
        });
        if (!user) {
            return "Id not exist";
        }
        else {
            return user;
        }
    }
    remove(id) {
        const index = this.data.findIndex((item) => item.id == id);
        if (index == -1) {
            return "Id not exist";
        }
        this.data.splice(index, 1);
        return true;
    }
    mapUser(user, id) {
        return new user_entity_1.UserEntity(id, user.fistName, user.lastName, user.email, user.role, user.password);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map