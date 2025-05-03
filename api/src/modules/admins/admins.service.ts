import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { AddAdminDto } from './dto/add-admin.dto';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class AdminsService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async create(admin: AddAdminDto): Promise<User> {
    const hashedPassword = await hash(admin.password, 10);

    const newUser = {
      userId: this.users.length + 1,
      username: admin.login,
      password: hashedPassword,
    };
    this.users.push(newUser);
    return this.users;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
