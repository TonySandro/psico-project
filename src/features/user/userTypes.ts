export type UserRole = "admin" | "client";

export interface User {
  id?: string;
  name: string;
  email: string;
  role: UserRole;
  token?: string;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}
