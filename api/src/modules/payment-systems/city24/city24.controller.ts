import { Controller, Get } from '@nestjs/common';

@Controller('payment-systems')
export class City24Controller {
  @Get('city24')
  pay() {
    return { provider: 'city24', status: 'success' };
  }
}
