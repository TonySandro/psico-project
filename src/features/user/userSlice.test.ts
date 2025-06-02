import userReducer, { login } from "./userSlice";
import { UserState, User } from "./userTypes";

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

const mockUser: User = {
  name: "Tony",
  email: "tony@example.com",
  role: "client",
};

describe("userSlice", () => {
  it("ure to return the initial state", () => {
    expect(userReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("Ensure that user data will be stored when logging in", () => {
    const nextState = userReducer(initialState, login(mockUser));
    expect(nextState.isAuthenticated).toBe(true);
    expect(nextState.user).toEqual(mockUser);
  });
});
