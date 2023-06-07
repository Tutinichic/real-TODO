import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./Tasks.store";
import modalReducer from "./Modal.store";

const store = configureStore({
  reducer: { tasks: tasksReducer, modal: modalReducer },
});

export default store;
