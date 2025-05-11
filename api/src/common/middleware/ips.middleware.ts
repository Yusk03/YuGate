import { Request, Response, NextFunction } from 'express';
import { ForbiddenException } from '@nestjs/common';

export function ipsFilterMiddleware(allowedIps: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    //TODO: change of getting client IP, because insecure
    const clientIp = req.ip || '';

    const devIps = ['127.0.0.1', '::1'];

    if (process.env.APP_ENV === 'development' && devIps.includes(clientIp)) {
      next();
    } else if (allowedIps.includes(clientIp)) {
      next();
    } else {
      throw new ForbiddenException(`Access denied from IP: ${clientIp}`);
    }
  };
}
