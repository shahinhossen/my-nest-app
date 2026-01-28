import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

type CreateUser = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class UserService {
  private users: CreateUser[] = [
    {
      id: '01',
      name: 'Shahin Rana',
      email: 'shahin@gmail.com',
      password: 'Test1234',
    },
    {
      id: '02',
      name: 'Shahin Rana',
      email: 'shahin1@gmail.com',
      password: 'Test1234',
    },
  ];

  findUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  createUser(data: CreateUser) {
    const id = (this.users.length + 1).toString();
    this.users.push({ id, ...data });
    return { message: 'User Created!', data };
  }

  findAll() {
    return this.users;
  }

  findById(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not Fount!');
    return user;
  }

  updateUserInfo(id: string, data: { name?: string; email?: string }) {
    const user = this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    if (data.name) {
      if (user.name.toLowerCase() === data.name.toLowerCase()) {
        throw new BadRequestException(
          'Current name and new name cannot be the same!',
        );
      }
      user.name = data.name;
    }

    if (data.email) {
      if (user.email.toLowerCase() === data.email.toLowerCase()) {
        throw new BadRequestException(
          'Current email and new email cannot be the same!',
        );
      }

      const existingUser = this.findUserByEmail(data.email);

      if (existingUser && existingUser.id !== user.id) {
        throw new ConflictException(
          'This email is already used by another account!',
        );
      }

      user.email = data.email;
    }

    return { message: 'User updated!', user };
  }

  deleteUser(id: string) {
    const user = this.findById(id);
    if (!user) throw new NotFoundException('User not Found!');
    const filteredUser = this.users.filter((user) => user.id !== id);
    this.users = filteredUser;
    return { message: 'User deleted!', deletedUser: user };
  }
}
