import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

type CreateUser = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(data: CreateUser) {
    const isAlreadyExist = await this.userModel.findOne({ email: data.email });
    if (isAlreadyExist) {
      throw new ConflictException('With this email already exists!');
    }

    const user = new this.userModel({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    await user.save();
    return { message: 'User Created!', user };
  }

  async loginUser(data: { email: string; password: string }) {
    const user = await this.userModel.findOne({ email: data.email });
    if (!user) {
      throw new NotFoundException('Invalid credentials!');
    }

    const matchPassword = await bcrypt.compare(data.password, user.password);
    if (!matchPassword) {
      throw new NotFoundException('Invalid credentials!');
    }

    const token = `${user.password}`;

    return { message: 'Welcome Back!', token };
  }
}
