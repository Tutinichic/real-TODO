import React from "react";
import { useAppSelector } from "../../store/hooks";
import useCompletedTasks from "../hooks/useCompletedTasks";
import LayoutRoutes from "../Utilities/LayoutRoutes";

const DoneTasks = ({ done, title }) => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const { tasks: tasksFiltered } = useCompletedTasks({ tasks, done });

  return <LayoutRoutes title={title} tasks={tasksFiltered}></LayoutRoutes>;
};

export default DoneTasks;
