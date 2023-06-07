import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { modalActions } from "../../store/Modal.store";
import ButtonsSort from "../TasksSection/ButtonsSort";
import TaskItem from "../TasksSection/TaskItem";

const LayoutRoutes = ({ title, tasks }) => {
  const [isListInView1, setIsListInView1] = useState(false);

  const [sortedBy, setSortedBy] = useState("");

  const [sortedTasks, setSortedTasks] = useState(tasks);

  const dispatch = useAppDispatch();

  const openModalHandler = () => {
    dispatch(modalActions.openModalHandler());
  };

  useEffect(() => {
    const sortByDate = (order) => {
      const toMillisseconds = (date) => Date.parse(date);
      const tasksCopy = [...tasks];
      const sorted = tasksCopy.sort((task1, task2) => {
        const date1 = toMillisseconds(task1.date);
        const date2 = toMillisseconds(task2.date);

        if (date1 < date2) {
          return -1;
        }

        if (date1 > date2) {
          return 1;
        }

        return 0;
      });

      if (order === "min-date") {
        return sorted;
      }

      if (order === "max-date") {
        return sorted.reverse();
      }

      return tasks;
    };

    const sortByCompletedStatus = (completed) => {
      const tasksCopy = [...tasks];
      const sorted = tasksCopy.sort((task1) => {
        if (task1.completed) {
          return -1;
        }
        return 0;
      });

      if (completed) {
        return sorted;
      }

      if (!completed) {
        return sorted.reverse();
      }
      
      return tasks;
    };

    if (sortedBy === "min-date" || sortedBy === "max-date") {
      setSortedTasks(sortByDate(sortedBy));
    }
    if (sortedBy === "") {
      setSortedTasks(tasks);
    }
    if (sortedBy === "completed-first") {
      setSortedTasks(sortByCompletedStatus(true));
    }
    if (sortedBy === "uncompleted-first") {
      setSortedTasks(sortByCompletedStatus(false));
    }
  }, [sortedBy, tasks]);

  return (
    <section>
      <h1 className="font-medium my-8 text-2xl">
        {title} ({tasks.length} tasks)
      </h1>
      <ButtonsSort
        isListInView1={isListInView1}
        setIsListInView1={setIsListInView1}
        sortedBy={sortedBy}
        setSortedBy={setSortedBy}
      />
      <ul
        className={`tasksList mt-4 grid gap-6 ${
          isListInView1 ? "grid-cols-1" : "grid-cols-3 items-end"
        }`}
      >
        {sortedTasks.map((task) => (
          <TaskItem key={task.id} isListInView1={isListInView1} task={task} />
        ))}
        <li>
          <button
            onClick={openModalHandler}
            className={`border-2 border-slate-300 text-slate-400 w-full rounded-lg border-dashed transition hover:bg-slate-300 hover:text-slate-500 ${
              isListInView1 ? "h-32" : "h-64"
            }`}
          >
            Add task
          </button>
        </li>
      </ul>
    </section>
  );
};

export default LayoutRoutes;