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
