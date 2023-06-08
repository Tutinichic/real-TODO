import React from "react";
import StarLine from "../../assets/star-line.svg";
import Trash from "../../assets/trash.svg";
import Calendar from "../../assets/date.svg";
import Tooltip from "../Utilities/Tooltip";
import { tasksActions } from "../../store/Tasks.store";
import { useAppDispatch } from "../../store/hooks";

const TaskItem = ({ isListInView1, task }) => {
  const dispatch = useAppDispatch();

  const markAsImportantHandler = (id) => {
    dispatch(tasksActions.markAsImportant(id));
  };

  const removeTaskHandler = (id) => {
    dispatch(tasksActions.removeTask(id));
  };

  const fullDate = new Date(task.date.replaceAll("-", "/"));
  const month = fullDate.getMonth() + 1;
  const day = fullDate.getDate();
  const year = fullDate.getFullYear();

  const dateFormated =
    month.toString().padStart(2, "0") +
    "/" +
    day.toString().padStart(2, "0") +
    "/" +
    year;

 return (
  <li key={task.id}>
    <button className=" bg-rose-200 text-rose-600 px-4 py-1 rounded-t-md ml-auto mr-4 block transition dark:bg-slate-700 dark:text-slate-200">
      {task.dir}
    </button>
    <article
      className={`bg-slate-100 rounded-lg p-4 flex text-left transition hover:shadow-lg hover:shadow-slate-300 dark:bg-slate-800/[.5] dark:hover:shadow-transparent ${
        isListInView1 ? "flex-row h-32" : "flex-col h-64"
      }`}
    >
      <div className="flex flex-col flex-1">
        <span
            className={`block font-medium dark:text-slate-200 ${
              isListInView1 ? "mb-2" : "mb-4"
            }`}
          >
          {task.title}
        </span>
          <p className="description text-slate-400 dark:text-slate-500">
            {task.description}
          </p>
        <time className="mt-auto flex w-full">
          <img src={Calendar} alt="" className="mr-2 w-5"/> {dateFormated}
        </time>
      </div>
      <div
        className={`flex border-slate-200 dark:border-slate-800 ${
          isListInView1 ? "items-center" : "border-t-2 w-full pt-4 mt-4"
        }`}
      >
        <span
          className={`${
            task.completed
                ? "bg-emerald-200 text-emerald-700 "
                : "bg-yellow-100 text-yellow-700 "
          } py-1 px-3 rounded-full font-medium mr-4`}
        >
          {task.completed ? "completed" : "not completed"}
        </span>
        <Tooltip
          txt={task.important ? "unmark as important" : "mark as important"}
          className="mr-2 ml-auto"
        >
            <button
              onClick={() => markAsImportantHandler(task.id)}
              className="transition hover:text-slate-700 dark:hover:text-slate-200"
            >
          <img src={StarLine} alt="" 
              className={`w-6 h-6 ${
                task.important ? "fill-rose-500 stroke-rose-500" : "fill-none"
              }`}
            />
          </button>
        </Tooltip>
          <Tooltip
            txt="delete task"
            className="transition hover:text-slate-700 dark:hover:text-slate-200"
          >
          <button onClick={() => removeTaskHandler(task.id)}>
            <img src={Trash} alt="" />
          </button>
        </Tooltip>
      </div>
    </article>
  </li>
);
};

export default TaskItem;