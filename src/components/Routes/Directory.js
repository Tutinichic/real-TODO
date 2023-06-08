import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import LayoutRoutes from "../Utilities/LayoutRoutes";

const Directory = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const params = useParams();

  const [tasksInCurrentDirectory, setTasksInCurrentDirectory] = useState([]);

  useEffect(() => {
    const tasksFiltered = tasks.filter((task) => task.dir === params.dir);
    setTasksInCurrentDirectory(tasksFiltered);
  }, [params.dir, tasks]);

  return (
    <LayoutRoutes
      title={`${params.dir}'s tasks`}
      tasks={tasksInCurrentDirectory}
    />
  );
};

export default Directory;
