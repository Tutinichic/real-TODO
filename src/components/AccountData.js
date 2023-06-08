import React from "react";
import { useAppSelector } from "../store/hooks";
import useCompletedTasks from "./hooks/useCompletedTasks";
import useTodayTasks from "./hooks/useTodayTasks";

const AccountData = () => {
  const todaysTasks = useTodayTasks();
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const todayTasksDone = useCompletedTasks({ tasks: todaysTasks, done: true });
  const allTasksDone = useCompletedTasks({ tasks: tasks, done: true });

  const toggleDarkMode = () => {
    const html = document.querySelector("html");
    html.classList.toggle("dark");
  };

  const percentageTodayTasks = (todayTasksDone.length * 100) / todaysTasks.length;
  const percentageAllTasks = (allTasksDone.length * 100) / tasks.length;

  return (
    <section className="p-5 bg-slate-100 flex flex-col w-2/12 fixed top-0 right-0 h-screen dark:bg-slate-800/[.5]">
      
      <button
        className="mt-8 text-left flex items-center justify-between"
        onClick={toggleDarkMode}
      >
        <span className="dark:text-slate-200">Darkmode</span>
        <div className="w-10 h-5 bg-slate-200 rounded-full px-0.5 dark:bg-slate-700 relative flex items-center dark:justify-end">
          <div className="w-4 h-4 rounded-full bg-orange-500 absolute"></div>
        </div>
      </button>

      {todaysTasks.length !== 0 && (
        <div className="mt-8">
          <span className="flex justify-between mb-2">
            <span>Tasks today</span> {todayTasksDone.length}/{todaysTasks.length}
          </span>
          <div className="barProgress">
            <div style={{ width: percentageTodayTasks + "%" }}></div>
          </div>
        </div>
      )}
      <div className="mt-4">
        <span className="flex justify-between mb-2">
          <span>All tasks </span> {allTasksDone.length}/{tasks.length}
        </span>
        <div className="barProgress">
          <div style={{ width: percentageAllTasks + "%" }}></div>
        </div>
      </div>

      {todaysTasks.length === 0 && <span>No tasks today</span>}
    </section>
  );
};

export default AccountData;