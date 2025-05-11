export interface CreatePaymentRequest {
  sum: number;
  method?: number;
  billId: number;
  describe?: string;
  innerDescribe?: string;
  date?: string;
  exchangeId?: number;
  cashboxId?: number;
  createReceipt?: number;
  applyToInvoice?: number;
  extId: string;
  checkExtId?: string;
}
