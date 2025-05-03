import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AccessTokenGuard } from '../auth/guards/access-token/access-token.guard';
import { AdminsService } from './admins.service';
import { XmlResponse } from '../../common/decorators/xml-response.decorator';
import { XmlResponseInterceptor } from '../../common/interceptors/xml-response.interceptor';

@UseInterceptors(XmlResponseInterceptor)
@Controller('admins')
export class AdminsController {
  constructor(private adminsService: AdminsService) {}

  @UseGuards(AccessTokenGuard)
  @Post('')
  addAdmin(@Body() admin: Record<string, any>) {
    return this.adminsService.create(admin.username, admin.password);
  }

  @XmlResponse()
  @UseGuards(AccessTokenGuard)
  @Get('xml')
  getAdminsXml() {
    return this.adminsService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get('')
  getAdmins() {
    return this.adminsService.findAll();
  }
}
