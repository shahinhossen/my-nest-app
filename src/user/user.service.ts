import { Injectable } from '@nestjs/common';

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
}
