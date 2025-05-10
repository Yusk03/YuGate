import { Module } from '@nestjs/common';
import { LiqpayController } from './liqpay.controller';

@Module({
  controllers: [LiqpayController],
})
export class LiqpayModule {}
