export type CreatePaymentRequest = {
  sum: number;
  transactionId: string | number;
  transactionPrefix: string;
  userId: string | number;
  description?: string;
  extraData?: ExtraData;
};

type ExtraData = {
  method?: number;
  billId?: number;
};
