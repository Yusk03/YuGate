import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { AddAdminDto } from './dto/add-admin.dto';
import { ADMINS } from '../../common/constants/constants';
import { PrismaService } from '../prisma/prisma.service';

// This should be a real class/interface representing a admin entity
export type Admin = any;

@Injectable()
export class AdminsService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly admins = ADMINS;

  async create(admin: AddAdminDto): Promise<Admin> {
    const hashedPassword = await hash(admin.password, 10);

    return this.prisma.admins.create({
      data: {
        login: admin.login,
        password: hashedPassword,
      },
    });
  }

  async findAll(): Promise<Admin[]> {
    return this.admins;
  }

  async findOne(login: string): Promise<Admin | undefined> {
    return this.admins.find(admin => admin.login === login);
  }
}
