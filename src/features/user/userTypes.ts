export type UserRole = "admin" | "client";

export interface User {
  name: string;
  email: string;
  role: UserRole;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}
