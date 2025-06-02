import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../../interfaces/course";

interface CoursesState {
  list: Course[];
}

const initialState: CoursesState = {
  list: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<Course>) => {
      state.list.push(action.payload);
    },
    updateCourse: (state, action: PayloadAction<Course>) => {
      const index = state.list.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
    deleteCourse: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((course) => course.id !== action.payload);
    },
  },
});

export const { addCourse, updateCourse, deleteCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
