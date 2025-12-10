"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
class UserEntity {
    id;
    fistName;
    lastName;
    email;
    role;
    password;
    constructor(id, fistName, lastName, email, role, password) {
        this.id = id;
        this.fistName = fistName ?? '';
        this.lastName = lastName ?? '';
        this.email = email ?? "";
        this.role = role ?? 'user';
        this.password = password ?? "";
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map