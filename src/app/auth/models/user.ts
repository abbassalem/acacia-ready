import { Address } from '../../shop/models/address.model';

export interface Authenticate {
  email: string;
  password?: string;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  emailVerified: boolean;
  // id: number;
  // email: string;
  // telephone: string;
  // password: string;
  // firstName: string;
  // lastName: string;
  // addresses?: Array<Address>;
  // iban?: string;
  // name?: string;
  // paymentMethod?: PaymentMothodType;
  // level?: LevelType;
  // language?: LanguageType;
}

export enum LanguageType {
  en = 'en',
  fr = 'fr',
  nl = 'nl'
}

export enum LevelType {
  LEVEL_1 = 'LEVEL_1',
  LEVEL_2 = 'LEVEL_2',
  LEVEL_3 = 'LEVEL_3',
  LEVEL_4 = 'LEVEL_4',
  LEVEL_5 = 'LEVEL_5'
}


export enum PaymentMothodType {
  CHECK = 'CHECK',
  TRANSFER = 'TRANSFER',
  CASH = 'CASH',
  ACCOUNT = 'ACCOUNT'
}