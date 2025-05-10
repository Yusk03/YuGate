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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddAdminDto } from './dto/add-admin.dto';

@ApiTags('Admins manage paths')
@UseInterceptors(XmlResponseInterceptor)
@Controller('admins')
export class AdminsController {
  constructor(private adminsService: AdminsService) {}

  @Post('')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Creates a new admin' })
  addAdmin(@Body() admin: AddAdminDto) {
    return this.adminsService.create(admin);
  }

  @Get('xml')
  @UseGuards(AccessTokenGuard)
  @XmlResponse()
  getAdminsXml() {
    return this.adminsService.findAll();
  }

  @Get('')
  @UseGuards(AccessTokenGuard)
  getAdmins() {
    return this.adminsService.findAll();
  }
}
