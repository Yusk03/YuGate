import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [AdminsService, PrismaService],
  exports: [AdminsService],
  controllers: [AdminsController],
})
export class AdminsModule {}
