import { Module } from '@nestjs/common';
import { City24Controller } from './city24.controller';

@Module({
  controllers: [City24Controller],
})
export class City24Module {}
