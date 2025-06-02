import { User } from "../features/user/userTypes";

export const fakeUsers: (User & { password: string })[] = [
  {
    name: "Admin User",
    email: "admin@mk.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "Client User",
    email: "client@mk.com",
    password: "client123",
    role: "client",
  },
];
