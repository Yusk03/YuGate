import { Injectable } from '@nestjs/common';

// child sandbox module
@Injectable()
export class AppService {
  getHello(): any {
    return {
      message: process.env.JWT_SECRET,
    };
  }
}
