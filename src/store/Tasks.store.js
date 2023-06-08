import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      title: "Wash the dishes",
      dir: "School",
      description: "This is the description for this task.",
      date: "2022-10-08",
      completed: false,
      important: false,
      id: "dY7aN",
    },
    {
      title: "Do homework",
      dir: "Home",
      description: "This is the description for this task.",
      date: "2022-10-08",
      completed: true,
      important: true,
      id: "hYsk8",
    },
    {
      title: "Wash the dishes",
      dir: "Home",
      description: "This is the description for this task.",
      date: "2024-10-08",
      completed: true,
      important: false,
      id: "hdg9M",
    },
    {
      title: "Test",
      dir: "Test",
      description: "This is the description for this task.",
      date: "2023-06-08",
      completed: false,
      important: false,
      id: "dhsD1",
    },
  ],
  directories: ["Home", "School", "Main"],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    addNewTask(state, action) {
      state.tasks = [action.payload, ...state.tasks];
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
    editTask(state, action) {
      const taskId = action.payload.id;

      const newTaskEdited = state.tasks.find((task) => task.id === taskId);
      const indexTask = state.tasks.indexOf(newTaskEdited);
      state.tasks[indexTask] = action.payload;
    },
    toggleTaskCompleted(state, action) {
      const taskId = action.payload;

      const currTask = state.tasks.find((task) => task.id === taskId);

      currTask.completed = !currTask.completed;
    },
    deleteAllTasks(state) {
      state.tasks = [];
    },
    createDirectory(state, action) {
      const newDirectory = action.payload;
      const directoryAlreadyExists = state.directories.includes(newDirectory);
      if (directoryAlreadyExists) return;
      state.directories = [newDirectory, ...state.directories];
    },
    deleteDirectory(state, action) {
      const dirName = action.payload;

      state.directories = state.directories.filter((dir) => dir !== dirName);
      state.tasks = state.tasks.filter((task) => task.dir !== dirName);
    },
    editDirectoryName(state, action) {
      const newDirName = action.payload.newDirName;
      const previousDirName = action.payload.previousDirName;
      const directoryAlreadyExists = state.directories.includes(newDirName);
      if (directoryAlreadyExists) return;

      const dirIndex = state.directories.indexOf(previousDirName);

      state.directories[dirIndex] = newDirName;
      state.tasks.forEach((task) => {
        if (task.dir === previousDirName) {
          task.dir = newDirName;
        }
      });
    },
  },
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;