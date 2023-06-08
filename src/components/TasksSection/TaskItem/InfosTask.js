import React, { useState } from "react";
import OptionsSvg from "../../../assets/options.svg";
import Calendar from "../../../assets/date.svg";
import { useAppDispatch } from "../../../store/hooks";
import { tasksActions } from "../../../store/Tasks.store";
import ModalCreateTask from "../../Utilities/ModalTask";
import Tooltip from "../../Utilities/Tooltip";

const InfosTask = ({ task, isListInView1 }) => {
  const [modalEditTaskOpen, setModalEditTaskOpen] = useState(false);
  const dispatch = useAppDispatch();

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

  const closeModalEditTask = () => {
    setModalEditTaskOpen(false);
  };

  const openModalEditTask = () => {
    setModalEditTaskOpen(true);
  };

  const editTaskHandler = (task) => {
    dispatch(tasksActions.editTask(task));
  };

  return (
    <div className="flex flex-col flex-1">
      <div
        className={`flex items-center justify-between ${
          isListInView1 ? "mb-1" : "mb-2"
        }`}
      >
        <span className="block font-medium dark:text-slate-200">
          {task.title}
        </span>
        <Tooltip txt="edit task">
          <button
            className="rounded-full hover:bg-slate-200 w-8 h-8 grid place-items-center dark:hover:bg-slate-800"
            onClick={openModalEditTask}
          >
            <img src={OptionsSvg} alt="" className="w-5 h-5" />
          </button>
        </Tooltip>
        {modalEditTaskOpen && (
          <ModalCreateTask
            onClose={closeModalEditTask}
            task={task}
            nameForm="Edit task"
            onConfirm={editTaskHandler}
          />
        )}
      </div>
      <p className="description text-slate-400 dark:text-slate-500">
        {task.description}
      </p>
      <time className="mt-auto flex w-full">
      <img src={Calendar} alt="" className="mr-2 w-5"/> {dateFormated}
      </time>
    </div>
  );
};

export default InfosTask;
