import testsReducer, { addTest, updateTest, deleteTest } from "./testSlice";
import { Test } from "../../interfaces/test";

const initialState = {
  list: [],
};

const mockTest: Test = {
  id: "1",
  title: "React Básico",
  description: "Curso de introdução ao React",
  imageUrl: "https://example.com/image.png",
};

describe("testSlice", () => {
  it("Ensure to return the initial state", () => {
    expect(testsReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("Ensure the addition of the test", () => {
    const nextState = testsReducer(initialState, addTest(mockTest));
    expect(nextState.list).toHaveLength(1);
    expect(nextState.list[0]).toEqual(mockTest);
  });

  it("Ensures that the updated test exists", () => {
    const updatedTest: Test = { ...mockTest, title: "React Avançado" };
    const state = { list: [mockTest] };
    const nextState = testsReducer(state, updateTest(updatedTest));
    expect(nextState.list[0].title).toBe("React Avançado");
  });

  it("Should not update if the test does not exist", () => {
    const updatedTest: Test = {
      ...mockTest,
      id: "999",
      title: "Outro Curso",
    };
    const state = { list: [mockTest] };
    const nextState = testsReducer(state, updateTest(updatedTest));
    expect(nextState.list[0].title).toBe(mockTest.title);
  });

  it("Ensures that the test is removed by ID", () => {
    const state = { list: [mockTest] };
    const nextState = testsReducer(state, deleteTest("1"));
    expect(nextState.list).toHaveLength(0);
  });

  it("Should not remove if ID does not exist", () => {
    const state = { list: [mockTest] };
    const nextState = testsReducer(state, deleteTest("999"));
    expect(nextState.list).toHaveLength(1);
  });
});
