import { UserEntity } from "./user.entity";

export const usersData: UserEntity[] = [
  {
    id: '1',
    fistName: "Trường",
    lastName: "Văn Minh",
    email: "vanminhtruong678@gmail.com",
    role: "admin",
    password: "truong123",
    refreshToken: ''
  },

  {
    id: '2',
    fistName: "Nguyễn",
    lastName: "Hải Nam",
    email: "hainam.dev@example.com",
    role: "user",
    password: "nam123",
    refreshToken: ''

  },

  {
    id: '3',
    fistName: "Lê",
    lastName: "Thu Hằng",
    email: "lethuhang@example.com",
    role: "editor",
    password: "hang123",
    refreshToken: ''
  },

  {
    id: "4",
    fistName: "Phạm",
    lastName: "Hoàng Long",
    email: "long.pham@example.com",
    role: "user",
    password: "long123",
    refreshToken: ''
  },

  {
    id: '5',
    fistName: "Bùi",
    lastName: "Minh Khoa",
    email: "buiminhkhoa@example.com",
    role: "admin",
    password: "khoa123",
    refreshToken: ''
  },

  {
    id: '6',
    fistName: "Đặng",
    lastName: "Uyên Nhi",
    email: "uyen.nhi@example.com",
    role: "user",
    password: "nhi123",
    refreshToken: ''
  },
];
