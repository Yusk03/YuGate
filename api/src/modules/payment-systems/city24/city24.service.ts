import { Body, Injectable } from '@nestjs/common';
import { CommandCancelDto } from './dto/cancel.dto';
import { CommandCheckDto } from './dto/check.dto';
import { CommandPayDto } from './dto/pay.dto';
import { CommandCheckStatusDto } from './dto/check-status.dto';

@Injectable()
export class City24Service {
  async process(
    city24Dto:
      | CommandCancelDto
      | CommandCheckDto
      | CommandPayDto
      | CommandCheckStatusDto,
  ) {
    this.checkAuth(city24Dto.login  || '', city24Dto.password ||'');
    return city24Dto;
  }

  checkAuth(login: string, password: string) {
    const validLogin = 'YuGate';
    const validPassword = 'yusk03';

    if (login !== validLogin || password !== validPassword) {
      return {
        account: login,
        result: 300,
        comment: 'Wrong login or password!',
      };
    }
    return {
      account: login,
      result: 200,
      comment: 'Login successful!',
    };
  }
}
