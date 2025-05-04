import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { City24Controller } from './city24.controller';
import { XmlMiddleware } from '../../../common/middleware/xml.middleware';

@Module({
  controllers: [City24Controller],
})
export class City24Module {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(XmlMiddleware).forRoutes(City24Controller);
  }
}
