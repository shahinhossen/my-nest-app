import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
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
    /**
     * Check User already exists
     * hash password
     * create user
     */

    const isExist = this.userService.findUserByEmail(data.email);
    if (isExist) throw new ConflictException('User Already Exists!');

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = this.userService.createUser({
      ...data,
      password: hashedPassword,
    });
    return user;
  }

  async login(data: LoginData) {
    /**
     * Check user exists
     * check password match
     * return response
     */

    const user = this.userService.findUserByEmail(data.email);
    if (!user) throw new BadRequestException('Invalid Credentials!');

    const matchPassword = await bcrypt.compare(data.password, user.password);
    if (!matchPassword) throw new BadRequestException('Invalid Credentials!');

    return { message: `Welcome Back! Hello ${user.name}` };
  }
}
