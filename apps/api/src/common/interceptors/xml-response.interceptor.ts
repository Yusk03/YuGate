import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import {
  XML_RESPONSE_KEY,
  XmlResponseOptions,
} from '../decorators/xml-response.decorator';
import { XMLBuilder } from 'fast-xml-parser';

@Injectable()
export class XmlResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const options = this.reflector.get<XmlResponseOptions>(
      XML_RESPONSE_KEY,
      context.getHandler(),
    );

    if (!options) {
      return next.handle();
    }

    const {
      rootName,
      includeDeclaration = false,
      encoding = 'UTF-8',
    } = options;

    const builder = new XMLBuilder({
      ignoreAttributes: false,
      format: true,
    });

    const response = context.switchToHttp().getResponse();
    response.setHeader('Content-Type', 'application/xml');

    return next.handle().pipe(
      map(data => {
        const xmlObject = rootName ? { [rootName]: data } : data;
        const xmlBody = builder.build(xmlObject);

        if (includeDeclaration) {
          return `<?xml version="1.0" encoding="${encoding}"?>\n${xmlBody}`;
        }

        return xmlBody;
      }),
    );
  }
}
