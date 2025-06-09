export enum UserRole {
  ADMIN = 'ADMIN',
  TRAINER = 'TRAINER',
  TRAINEE = 'TRAINEE'
}

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
} 