import { Injectable } from '@nestjs/common';
import {
  CommandPayDto,
  City24Dto,
  CommandCancelDto,
  CommandCheckDto,
  CommandCheckStatusDto,
} from './dto';
import { CONFIG, TRANSACTION_PREFIX } from './constants';
import { AbillsService } from '../../billings/abills/abills.service';

@Injectable()
export class City24Service {
  constructor(private abillsService: AbillsService) {}

  async process(request: City24Dto) {
    const isAuth = this.checkAuth(
      request.commandCall.login || '',
      request.commandCall.password || '',
    );

    if (!isAuth) {
      return {
        result: 300,
        comment: 'Wrong login or password!',
      };
    }

    switch (request.commandCall.command) {
      case 'check':
        return this.check(request.commandCall as CommandCheckDto);
      case 'pay':
        return this.pay(request.commandCall as CommandPayDto);
      // case 'check_status':
      //   return this.checkStatus(request.commandCall as CommandCheckStatusDto);
      // case 'cancel':
      //   return this.cancel(request.commandCall as CommandCancelDto);
      default:
        return {
          result: 300,
          comment: 'Unknown command!',
        };
    }
  }

  private async check(request: CommandCheckDto) {
    const user = await this.abillsService.searchUser(request.account);

    //TODO: add products flow and extra fields
    if (!user.total) {
      return {
        result: 5,
        account: request.account,
        comment: 'User not exists or can not make payment',
      };
    }

    return {
      result: 0,
      account: request.account,
      comment: 'User exists',
    };
  }

  private async pay(request: CommandPayDto) {
    const user = await this.abillsService.searchUser(request.account);

    if (!('users' in user) || !user.total) {
      return {
        result: 5,
        account: request.account,
        comment: 'User not exists or can not make payment',
      };
    }

    // TODO: rewrite as unified style for different billings
    const pay = await this.abillsService.createPayment({
      sum: request.amount / 100,
      transactionId: request.payID,
      transactionPrefix: TRANSACTION_PREFIX,
      userId: user?.users[0].userId,
      extraData: {
        billId: user?.users[0].billId,
      },
    });

    if (pay.error) {
      return {
        result: 7,
        account: request.account,
        extTransactionID: 0,
        comment: pay?.comment || 'Unknown error',
      };
    }

    return {
      result: 0,
      account: request.account,
      extTransactionID: pay?.paymentId || 0,
      comment: 'Successful payment',
    };
  }

  // TODO: implement check status of payments
  // private cancel(transactionID: CommandCancelDto) {
  //   return {
  //     result: 200,
  //     comment: 'cancel',
  //   };
  // }

  // TODO: implement check status of payments
  // private checkStatus(transactionID: CommandCheckStatusDto) {
  //   return {
  //     result: 200,
  //     comment: 'staus',
  //   };
  // }

  private checkAuth(login: string, password: string) {
    return login === CONFIG.login && password === CONFIG.password;
  }
}
