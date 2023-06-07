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

  const fullDate = new Date(task.date);
  const month = fullDate.getMonth();
  const day = fullDate.getDate();
  const year = fullDate.getFullYear();

  const dateFormated = month + "/" + day + "/" + year;

 return (
  <li key={task.id}>
    <button className="bg-rose-200 text-rose-600 px-4 py-1 rounded-t-md ml-auto mr-4 block transition hover:bg-rose-300">
      {task.dir}
    </button>
    <article
      className={`bg-slate-100 rounded-lg p-4 flex text-left transition hover:shadow-lg hover:shadow-slate-300 ${
        isListInView1 ? "flex-row h-32" : "flex-col h-64"
      }`}
    >
      <div className="flex flex-col flex-1">
        <span
          className={`block font-medium ${isListInView1 ? "mb-2" : "mb-4"}`}
        >
          {task.title}
        </span>
        <p className="description text-slate-400">{task.description}</p>
        <time className="mt-auto flex w-full">
          <img src={Calendar} alt="" className="mr-2 w-5"/> {dateFormated}
        </time>
      </div>
      <div
        className={`flex border-slate-200 ${
          isListInView1 ? "items-center" : "border-t-2 w-full pt-4 mt-4"
        }`}
      >
        <span
          className={`${
            task.completed
              ? "bg-green-200 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          } py-1 px-3 rounded-full font-medium mr-4`}
        >
          {task.completed ? "completed" : "not completed"}
        </span>
        <Tooltip
          txt={task.important ? "unmark as important" : "mark as important"}
          className="mr-2 ml-auto"
        >
          <button onClick={() => markAsImportantHandler(task.id)}>
          <img src={StarLine} alt="" 
              className={`w-6 h-6 ${
                task.important ? "fill-rose-500 stroke-rose-500" : "fill-none"
              }`}
            />
          </button>
        </Tooltip>
        <Tooltip txt="delete task">
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
