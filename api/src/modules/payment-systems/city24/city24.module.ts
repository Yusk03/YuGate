import { Module, MiddlewareConsumer } from '@nestjs/common';
import { City24Controller } from './city24.controller';
import { XmlMiddleware } from '../../../common/middleware/xml.middleware';
import { City24Service } from './city24.service';
import { ipsFilterMiddleware } from '../../../common/middleware/ips.middleware';
import { ALLOWED_IPS } from './constants';
import { AbillsModule } from '../../../integrations/billings/abills/abills.module';

@Module({
  imports: [AbillsModule],
  providers: [City24Service],
  exports: [City24Service],
  controllers: [City24Controller],
})
export class City24Module {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(XmlMiddleware).forRoutes(City24Controller);
    consumer
      .apply(ipsFilterMiddleware(ALLOWED_IPS))
      .forRoutes(City24Controller);
  }
}
