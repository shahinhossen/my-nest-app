import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

type CreateUser = {
  name: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(data: CreateUser) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = this.userService.createUser({
      ...data,
      password: hashedPassword,
    });
    return user;
  }

  async login(data: LoginData) {
    const result = await this.userService.loginUser(data);
    return result;
  }
}
