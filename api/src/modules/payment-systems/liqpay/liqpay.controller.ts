import { Controller, Get } from '@nestjs/common';

@Controller('payment-systems')
export class LiqpayController {
  @Get('liqpay')
  pay() {
    return { provider: 'liqpay', status: 'success' };
  }
}
