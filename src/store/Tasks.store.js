import { createSlice } from "@reduxjs/toolkit";

const defaultTasks = [
  {
    title: "Test 1",
    important: false,
    description: "Test",
    date: "2023-03-06",
    dir: "Main",
    completed: true,
    id: "t1",
  },
  {
    title: "Test 2",
    important: true,
    description: "Test Test Test",
    date: "2322-06-25",
    dir: "Main",
    completed: true,
    id: "t2",
  },
  {
    title: "Test 3",
    important: true,
    description: "TestTestTestTest",
    date: "2022-07-21",
    dir: "Main",
    completed: false,
    id: "t3",
  },
];

const getSavedDirectories = () => {
  let dirList = [];
  if (localStorage.getItem("directories")) {
    dirList = JSON.parse(localStorage.getItem("directories"));
    const mainDirExists = dirList.some((dir) => dir === "Main");
    if (!mainDirExists) {
      dirList.push("Main");
    }
  } else {
    dirList.push("Main");
  }

  if (localStorage.getItem("tasks")) {
    const savedTasksList = JSON.parse(localStorage.getItem("tasks"));
    let dirNotSaved = [];
    savedTasksList.forEach((task) => {
      if (!dirList.includes(task.dir)) {
        if (!dirNotSaved.includes(task.dir)) {
          dirNotSaved.push(task.dir);
        }
      }
    });
    dirList = [...dirList, ...dirNotSaved];
  }
  return dirList;
};

const initialState = {
  tasks: localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : defaultTasks,
  directories: getSavedDirectories(),
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
    deleteAllData(state) {
      state.tasks = [];
      state.directories = ["Main"];
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

export const tasksMiddleware = (store) => (next) => (action) => {
  const nextAction = next(action);
  const actionChangeOnlyDirectories =
    tasksActions.createDirectory.match(action);

  const isADirectoryAction =
    action.type.toLowerCase().includes("directory");

  if (action.type.startsWith("tasks/") && !actionChangeOnlyDirectories) {
    const tasksList = store.getState().tasks.tasks;
    localStorage.setItem("tasks", JSON.stringify(tasksList));
  }
  if (action.type.startsWith("tasks/") && isADirectoryAction) {
    const dirList = store.getState().tasks.directories;
    localStorage.setItem("directories", JSON.stringify(dirList));
  }

  if (tasksActions.deleteAllData.match(action)) {
    localStorage.removeItem("tasks");
    localStorage.removeItem("directories");
    localStorage.removeItem("darkmode");
  }

  if (tasksActions.removeTask.match(action)) {
    console.log(JSON.parse(localStorage.getItem("tasks")));
    if (localStorage.getItem("tasks")) {
      const localStorageTasks = JSON.parse(localStorage.getItem("tasks"));
      if (localStorageTasks.length === 0) {
        localStorage.removeItem("tasks");
      }
    }
  }
  return nextAction;
};
