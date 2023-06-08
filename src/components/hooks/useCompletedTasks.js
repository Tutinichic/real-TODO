import { useEffect, useState } from "react";

const useCompletedTasks = (props) => {
  const [tasksDone, setTasksDone] = useState([]);

  useEffect(() => {
    const filteredTasks = props.tasks.filter((task) => {
      if (props.done) {
        return task.completed;
      } else {
        return !task.completed;
      }
    });
    setTasksDone(filteredTasks);
  }, [props.tasks, props.done]);

  return tasksDone;
};

export default useCompletedTasks;
