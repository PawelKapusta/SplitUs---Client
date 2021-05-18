export default interface User {
  FullName: string;
  Email: string;
  Password: string;
  Phone: number;
  BirthDate: string;
  AvatarImage?: string;
  isAdmin: boolean;
  isBlocked: boolean;
  token: string;
}

export interface Group {
  Name: string;
  Description: string;
  DataCreated: string;
}

export interface Currency {
  currency: string;
  code: string;
  mid: number;
}
export interface CurrencyState {
  readonly loading: boolean;
  readonly currency: Currency[];
  readonly errors?: string;
}
