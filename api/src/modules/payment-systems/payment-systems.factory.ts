import { DynamicModule, Module } from '@nestjs/common';
import { LiqpayController } from './liqpay/liqpay.controller';
import { City24Controller } from './city24/city24.controller';

const CONTROLLERS_MAP = {
  liqpay: LiqpayController,
  city24: City24Controller,
};

type PaymentSystem = keyof typeof CONTROLLERS_MAP;

@Module({})
export class PaymentSystemsFactory {
  static register(paymentSystems: PaymentSystem[]): DynamicModule {
    const controllers = paymentSystems.map(system => CONTROLLERS_MAP[system]);

    return {
      module: PaymentSystemsFactory,
      controllers,
    };
  }
}
