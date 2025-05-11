import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Users } from '../../../common/types/user';
import { userConvert } from './utils/abills2yugate';
import { RequestError } from '../../../common/types/errors';
import { CreatePaymentRequest } from '../../../common/types/requests';

@Injectable()
export class AbillsService {
  constructor(private httpService: HttpService) {}

  private readonly url = process.env.BILLING_URL;
  private readonly apiKey = process.env.BILLING_API_KEY;

  // TODO: add add checking version of billing during define of YuGate
  // async getVersion() {
  //   try {
  //     const response = await firstValueFrom(
  //       this.httpService.get(`${this.url}/version`, {
  //         headers: {
  //           KEY: this.apiKey,
  //         },
  //       }),
  //     );
  //     return response.data;
  //   } catch (error) {
  //     const status = error.response?.status || 500;
  //     const message = error.response?.data?.message || error.message;
  //
  //     return {
  //       status,
  //       message,
  //     };
  //   }
  // }

  async searchUser(userId: string | number): Promise<Users | RequestError> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.url}/users/all?login=${userId}&fio&addressFull&deposit&contractId&login&billId`,
          {
            headers: {
              KEY: this.apiKey,
            },
          },
        ),
      );

      return userConvert(response.data);
    } catch (error) {
      const httpStatus = error.response?.status || 500;
      const message = error.message;
      const billingData = error.response?.data;

      return {
        total: 0,
        httpStatus,
        message,
        billingData,
        error: true,
      };
    }
  }

  // TODO: create normal promise validations
  async createPayment(payment: CreatePaymentRequest): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.url}/payments/users/${payment.userId}`,
          {
            sum: payment.sum,
            billId: payment.extraData?.billId,
            describe: payment.description,
            extId: `${payment.transactionPrefix}:${payment.transactionId}`,
            method: 2,
            checkExtId: `${payment.transactionPrefix}:${payment.transactionId}`,
          },
          {
            headers: {
              KEY: this.apiKey,
            },
          },
        ),
      );

      return response.data;
    } catch (error) {
      const httpStatus = error.response?.status || 500;
      const message = error.message;
      const billingData = error.response?.data;

      return {
        httpStatus,
        message,
        billingData,
        comment: `ABillS error: ${billingData?.errno || billingData?.error || 'Unknown'}`,
        error: true,
      };
    }
  }
}
