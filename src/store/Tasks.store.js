import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      title: "Wash the dishes",
      dir: "Test2",
      description: "This is the description for this task.",
      date: "2022-10-08",
      completed: false,
      important: false,
      id: "dY7aN",
    },
    {
      title: "Do homework",
      dir: "Test2",
      description: "This is the description for this task.",
      date: "2022-10-08",
      completed: true,
      important: true,
      id: "hYsk8",
    },
    {
      title: "Wash the dishes",
      dir: "Test4",
      description: "This is the description for this task.",
      date: "2024-10-08",
      completed: true,
      important: false,
      id: "hdg9M",
    },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    addNewTask(state, action) {
      state.tasks = [...state.tasks, action.payload];
    },
    removeTask(state, action) {
      const newTasksList = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      state.tasks = newTasksList;
    },
    markAsImportant(state, action) {
      const newTaskFavorited = state.tasks.find(
        (task) => task.id === action.payload
      );
      newTaskFavorited.important = !newTaskFavorited.important;
    },
  },
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;
