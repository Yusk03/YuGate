export type RequestError = {
  httpStatus: number;
  message: string;
  billingData?: any;
  total: number;
  error: boolean;
};
