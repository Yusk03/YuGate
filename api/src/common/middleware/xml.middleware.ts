import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { parseString } from 'xml2js';

@Injectable()
export class XmlMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.is('application/xml')) {
      let data = '';
      req.setEncoding('utf8');

      req.on('data', chunk => {
        data += chunk;
      });

      req.on('end', () => {
        parseString(data, { explicitArray: false }, (err, result) => {
          if (err) {
            return res.status(400).send('Invalid XML');
          }
          req.body = result;
          next();
        });
      });
    } else {
      next();
    }
  }
}
