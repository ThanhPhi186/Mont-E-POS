export const STORE_KEY = {
  CURRENT_DOMAIN: 'CURRENT_DOMAIN',
  CURRENT_USERNAME: 'CURRENT_USERNAME',
  CURRENT_PASSWORD: 'CURRENT_PASSWORD',
  CURRENT_CHANNEL: 'CURRENT_CHANNEL',
  CURRENT_USER: 'CURRENT_USER',
  COMPANY_CODE: 'COMPANY_CODE',
  API_KEY: 'API_KEY',
};

export const CHANNELS = {
  KENH_TAP_HOA: 'Kênh tạp hóa',
};

export type TOrderType =
  | 'OrderOpen'
  | 'OrderApproved'
  | 'OrderCompleted'
  | 'OrderCancelled';

export type TReturnType =
  | 'ReturnCreated'
  | 'ReturnApproved'
  | 'ReturnCompleted'
  | 'ReturnCancelled';
