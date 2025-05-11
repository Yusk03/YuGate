export type Users = {
  total: number;
  users: User[];
};

export type User = {
  userId: string | number;
  balance: number;
  username: string;
  address?: string;
  contractId?: string;
  login?: string;
  uid?: number;
  billId?: number;
};
