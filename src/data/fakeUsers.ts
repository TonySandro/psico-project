import { User } from "../features/user/userTypes";

export const fakeUsers: (User & { password: string })[] = [
  {
    name: "Client User",
    email: "client@email.com",
    password: "client123",
    role: "client",
  },
];
