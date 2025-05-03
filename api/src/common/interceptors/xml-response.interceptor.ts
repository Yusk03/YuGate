import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import { XML_RESPONSE_KEY } from '../decorators/xml-response.decorator';
import { XMLBuilder } from 'fast-xml-parser';

@Injectable()
export class XmlResponseInterceptor implements NestInterceptor {
  private builder: XMLBuilder;

  constructor(private reflector: Reflector) {
    this.builder = new XMLBuilder({
      ignoreAttributes: false,
      format: true,
    });
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isXml = this.reflector.get<boolean>(
      XML_RESPONSE_KEY,
      context.getHandler(),
    );

    if (!isXml) {
      return next.handle();
    }

    const response = context.switchToHttp().getResponse();
    response.setHeader('Content-Type', 'application/xml');

    return next
      .handle()
      .pipe(map(data => this.builder.build({ response: data })));
  }
}
