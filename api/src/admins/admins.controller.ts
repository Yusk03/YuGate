import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../auth/guards/access-token/access-token.guard';
import { AdminsService } from './admins.service';

@Controller('admins')
export class AdminsController {
  constructor(private adminsService: AdminsService) {}

  @UseGuards(AccessTokenGuard)
  @Post('')
  addAdmin(@Body() admin: Record<string, any>) {
    return this.adminsService.create(admin.username, admin.password);
  }
}
