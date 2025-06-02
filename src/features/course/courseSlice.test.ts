import coursesReducer, {
  addCourse,
  updateCourse,
  deleteCourse,
} from "./courseSlice";
import { Course } from "../../interfaces/course";

const initialState = {
  list: [],
};

const mockCourse: Course = {
  id: "1",
  title: "React Básico",
  description: "Curso de introdução ao React",
  imageUrl: "https://example.com/image.png",
};

describe("courseSlice", () => {
  it("Ensure to return the initial state", () => {
    expect(coursesReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("Ensure the addition of the course", () => {
    const nextState = coursesReducer(initialState, addCourse(mockCourse));
    expect(nextState.list).toHaveLength(1);
    expect(nextState.list[0]).toEqual(mockCourse);
  });

  it("Ensures that the updated course exists", () => {
    const updatedCourse: Course = { ...mockCourse, title: "React Avançado" };
    const state = { list: [mockCourse] };
    const nextState = coursesReducer(state, updateCourse(updatedCourse));
    expect(nextState.list[0].title).toBe("React Avançado");
  });

  it("Should not update if the course does not exist", () => {
    const updatedCourse: Course = {
      ...mockCourse,
      id: "999",
      title: "Outro Curso",
    };
    const state = { list: [mockCourse] };
    const nextState = coursesReducer(state, updateCourse(updatedCourse));
    expect(nextState.list[0].title).toBe(mockCourse.title);
  });

  it("Ensures that the course is removed by ID", () => {
    const state = { list: [mockCourse] };
    const nextState = coursesReducer(state, deleteCourse("1"));
    expect(nextState.list).toHaveLength(0);
  });

  it("Should not remove if ID does not exist", () => {
    const state = { list: [mockCourse] };
    const nextState = coursesReducer(state, deleteCourse("999"));
    expect(nextState.list).toHaveLength(1);
  });
});
