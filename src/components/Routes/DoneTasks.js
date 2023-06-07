import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import LayoutRoutes from "../Utilities/LayoutRoutes";

const DoneTasks = ({ done, title }) => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const [tasksDone, setTasksDone] = useState([]);

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => {
      if (done) {
        return task.completed;
      } else {
        return !task.completed;
      }
    });
    setTasksDone(filteredTasks);
  }, [tasks, done]);

  return <LayoutRoutes title={title} tasks={tasksDone}></LayoutRoutes>;
};

export default DoneTasks;
