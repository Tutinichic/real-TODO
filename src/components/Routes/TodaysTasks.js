import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import LayoutRoutes from "../Utilities/LayoutRoutes";

const TodaysTasks = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [todaysTasks, setTodaysTasks] = useState([]);

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dateTimeFormat = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  useEffect(() => {
    let filteredTasks = tasks.filter((task) => task.date === dateTimeFormat);
    setTodaysTasks(filteredTasks);
  }, [dateTimeFormat, tasks]);

  return (
    <LayoutRoutes title="Today's tasks" tasks={todaysTasks}></LayoutRoutes>
  );
};

export default TodaysTasks;
