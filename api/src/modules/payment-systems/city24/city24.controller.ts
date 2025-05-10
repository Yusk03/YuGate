import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { XmlResponse } from '../../../common/decorators/xml-response.decorator';
import { XmlResponseInterceptor } from '../../../common/interceptors/xml-response.interceptor';
import { CommandCancelDto } from './dto/cancel.dto';
import { CommandCheckDto } from './dto/check.dto';
import { CommandPayDto } from './dto/pay.dto';
import { CommandCheckStatusDto } from './dto/check-status.dto';
import { City24Service } from './city24.service';

@UseInterceptors(XmlResponseInterceptor)
@Controller('payment-systems')
export class City24Controller {
  constructor(private city24Service: City24Service) {}

  @Post('city24')
  @HttpCode(HttpStatus.OK)
  @XmlResponse()
  process(
    @Body()
    city24Dto:
      | CommandCancelDto
      | CommandCheckDto
      | CommandPayDto
      | CommandCheckStatusDto,
  ) {
    return this.city24Service.process(city24Dto);
  }
}
