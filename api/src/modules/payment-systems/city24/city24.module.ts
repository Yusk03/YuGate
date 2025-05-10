import { Module, MiddlewareConsumer } from '@nestjs/common';
import { City24Controller } from './city24.controller';
import { XmlMiddleware } from '../../../common/middleware/xml.middleware';
import { City24Service } from './city24.service';

@Module({
  providers: [City24Service],
  exports: [City24Service],
  controllers: [City24Controller],
})
export class City24Module {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(XmlMiddleware).forRoutes(City24Controller);
  }
}
