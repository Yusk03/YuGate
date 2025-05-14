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
import { City24Service } from './city24.service';
import { City24Dto } from './dto';

@UseInterceptors(XmlResponseInterceptor)
@Controller('payment-systems')
export class City24Controller {
  constructor(private city24Service: City24Service) {}

  @Post('city24')
  @HttpCode(HttpStatus.OK)
  @XmlResponse({
    rootName: 'commandResponse',
  })
  process(
    @Body()
    city24Dto: City24Dto,
  ) {
    return this.city24Service.process(city24Dto);
  }
}
