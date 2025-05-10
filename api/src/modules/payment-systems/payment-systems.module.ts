import { Module } from '@nestjs/common';
import { PaymentSystemsFactory } from './payment-systems.factory';

@Module({
  imports: [PaymentSystemsFactory.register(['city24', 'liqpay'])],
})
export class PaymentSystemsModule {}
