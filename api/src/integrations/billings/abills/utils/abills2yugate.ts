import { User as AbillsUser } from '../types/users';
import { Users } from '../../../../common/types/user';

export const userConvert = (user: AbillsUser[]): Users => {
  return {
    total: user.length,
    users: user.map(userItem => ({
      userId: userItem.uid,
      balance: parseFloat(userItem.deposit.toFixed(2)),
      username: userItem.fio.toString() || '',
      address: userItem.addressFull.toString() || '',
      contractId: userItem.contractId.toString(),
      login: userItem.login.toString(),
      uid: userItem.uid,
      billId: userItem.billId,
    })),
  };
};
