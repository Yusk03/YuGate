import { DynamicModule, Module } from '@nestjs/common';
import { City24Module } from './city24/city24.module';
import { LiqpayModule } from './liqpay/liqpay.module';

const MODULES_MAP = {
  city24: City24Module,
  liqpay: LiqpayModule,
};

type PaymentSystem = keyof typeof MODULES_MAP;

@Module({})
export class PaymentSystemsFactory {
  static register(paymentSystems: PaymentSystem[]): DynamicModule {
    const modules = paymentSystems.map(system => MODULES_MAP[system]);
    return {
      module: PaymentSystemsFactory,
      imports: modules,
    };
  }
}
