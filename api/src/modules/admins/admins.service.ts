import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { AddAdminDto } from './dto/add-admin.dto';
import { ADMINS } from '../../common/constants/constants';

// This should be a real class/interface representing a admin entity
export type Admin = any;

@Injectable()
export class AdminsService {
  private readonly admins = ADMINS;

  async create(admin: AddAdminDto): Promise<Admin> {
    const hashedPassword = await hash(admin.password, 10);

    const newAdmin = {
      id: this.admins.length + 1,
      login: admin.login,
      password: hashedPassword,
    };
    this.admins.push(newAdmin);
    return this.admins;
  }

  async findAll(): Promise<Admin[]> {
    return this.admins;
  }

  async findOne(login: string): Promise<Admin | undefined> {
    return this.admins.find(admin => admin.login === login);
  }
}
