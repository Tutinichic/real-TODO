import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Directory from "../Routes/Directory";
import DoneTasks from "../Routes/DoneTasks";
import Home from "../Routes/Home";
import ImportantTasks from "../Routes/ImportantTasks";
import SearchResults from "../Routes/SearchResults";
import TodaysTasks from "../Routes/TodaysTasks";
import HeaderTasks from "./HeaderTasks";

const TasksSection = () => {
  return (
    <main className=" pt-5 pb-16 px-8 md:w-full xl:w-8/12 m-auto min-h-screen">
      <HeaderTasks />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/today" element={<TodaysTasks />} />
        <Route path="/important" element={<ImportantTasks />} />
        <Route
          path="/done"
          element={<DoneTasks done={true} title="Completed tasks" />}
        />
        <Route
          path="/upcoming"
          element={<DoneTasks done={false} title="Uncompleted tasks" />}
        />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/:dir" element={<Directory />} />
        <Route path="*" element={<Navigate to="" />} />
      </Routes>
    </main>
  );
};

export default TasksSection;
