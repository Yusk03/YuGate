import { Module } from '@nestjs/common';
import { PaymentSystemsFactory } from './payment-systems.factory';

@Module({
  imports: [PaymentSystemsFactory.register(['liqpay', 'city24'])],
})
export class PaymentSystemsModule {}
