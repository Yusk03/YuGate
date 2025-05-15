import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { AddAdminDto } from './dto/add-admin.dto';
import { PrismaService } from '../prisma/prisma.service';

// This should be a real class/interface representing a admin entity
export type Admin = any;

@Injectable()
export class AdminsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(admin: AddAdminDto): Promise<Admin> {
    // TODO: add saltOrRounds to env and change in seed.ts after addition
    const hashedPassword = await hash(admin.password, 10);

    return this.prisma.admins.create({
      data: {
        login: admin.login,
        password: hashedPassword,
      },
    });
  }

  async findAll(): Promise<Admin[]> {
    return this.prisma.admins.findMany();
  }

  async findOne(login: string): Promise<Admin | undefined> {
    return this.prisma.admins.findFirst({
      where: {
        OR: [{ login: login }],
      },
    });
  }
}
