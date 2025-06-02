import { User } from "../features/user/userTypes";

export const fakeUsers: (User & { password: string })[] = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "Client User",
    email: "client@email.com",
    password: "client123",
    role: "client",
  },
];
