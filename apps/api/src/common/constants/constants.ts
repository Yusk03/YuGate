export const ADMINS = [
  {
    id: 1,
    login: 'john',
    password: 'changeme',
  },
  {
    id: 2,
    login: 'maria',
    password: 'guess',
  },
];

export const USERS = [
  {
    login: 'yusk03',
    balance: 154.2,
    username: 'Іван Іванович Кравчук',
    phone: '+380504060505',
    email: '1bZ4o@example.com',
    recommendedPayments: 20.5,
    address: 'Київ, вул. Тараса Шевченка, 1',
  },
];

export const ERRORS = {
  USER_NOT_FOUND: 1,
  USER_NOT_ALLOWED_TO_PAY: 2,
  ERR_MIN_SUM: 3,
  ERR_MAX_SUM: 4,
  ERR_BILLING_ERROR: 5,
  ERR_UNKNOWN: 6,
};

export const BILLINGS = {
  ABillS: 1,
  Ubilling: 2,
  NoDeny: 3,
};
