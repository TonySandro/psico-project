import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Test } from "../../interfaces/test";

interface TestsState {
  list: Test[];
}

const initialState: TestsState = {
  list: [],
};

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    addTest: (state, action: PayloadAction<Test>) => {
      state.list.push(action.payload);
    },
    updateTest: (state, action: PayloadAction<Test>) => {
      const index = state.list.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
    deleteTest: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((test) => test.id !== action.payload);
    },
  },
});

export const { addTest, updateTest, deleteTest } = testsSlice.actions;
export default testsSlice.reducer;
